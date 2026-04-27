import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// ─────────────────────────────────────────────────────────────────────────────
// Config
// ─────────────────────────────────────────────────────────────────────────────

const OLLAMA_BASE_URL =
  process.env.OLLAMA_BASE_URL || "http://ollama:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "qwen2.5:3b";

const SYSTEM_PROMPT = `You are Asib's AI portfolio assistant. Answer questions ONLY based on the provided context below.
If the answer is not in the context, politely state that you only answer questions related to Asib's portfolio and experience.
Be concise, friendly, and professional. Do not make up information.`;

// ─────────────────────────────────────────────────────────────────────────────
// Lightweight RAG — no embedding model required
// ─────────────────────────────────────────────────────────────────────────────

function chunkText(text: string, size = 900, overlap = 120): string[] {
  // Split first on double-newlines (section boundaries), then by size
  const sections = text.split(/\n{2,}/);
  const chunks: string[] = [];
  let current = "";

  for (const section of sections) {
    if ((current + "\n\n" + section).length > size) {
      if (current) chunks.push(current.trim());
      // If a single section is too large, split it further
      if (section.length > size) {
        let start = 0;
        while (start < section.length) {
          chunks.push(section.slice(start, start + size).trim());
          start += size - overlap;
        }
        current = "";
      } else {
        current = section;
      }
    } else {
      current = current ? current + "\n\n" + section : section;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks.filter((c) => c.length > 0);
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[\W_]+/)
    .filter((t) => t.length > 2);
}

const STOP_WORDS = new Set([
  "the", "and", "for", "are", "was", "has", "have", "his", "her", "they",
  "with", "that", "this", "from", "been", "more", "also", "what", "how",
]);

function bm25Score(queryTokens: string[], chunk: string): number {
  const chunkTokens = tokenize(chunk);
  const freq: Record<string, number> = {};
  for (const t of chunkTokens) freq[t] = (freq[t] || 0) + 1;

  const k1 = 1.5, b = 0.75;
  const avgLen = 200;
  const dl = chunkTokens.length;

  let score = 0;
  for (const qt of queryTokens) {
    if (STOP_WORDS.has(qt)) continue;
    const tf = freq[qt] || 0;
    if (tf === 0) continue;
    score +=
      ((tf * (k1 + 1)) / (tf + k1 * (1 - b + b * (dl / avgLen))));
  }
  return score;
}

function retrieveTopK(query: string, chunks: string[], k = 5): string[] {
  const qTokens = tokenize(query).filter((t) => !STOP_WORDS.has(t));
  const scored = chunks
    .map((c) => ({ c, s: bm25Score(qTokens, c) }))
    .sort((a, b) => b.s - a.s);
  // Always include top-k even if score is 0 (guarantees some context)
  return scored.slice(0, k).map((x) => x.c);
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton — load & chunk the portfolio file once per process
// ─────────────────────────────────────────────────────────────────────────────

let portfolioChunks: string[] | null = null;

async function getPortfolioChunks(): Promise<string[]> {
  if (portfolioChunks) return portfolioChunks;
  const mdPath = path.join(process.cwd(), "public", "portfolio_info.md");
  const raw = await fs.readFile(mdPath, "utf-8");
  portfolioChunks = chunkText(raw);
  console.log(`[chat/route] Portfolio indexed — ${portfolioChunks.length} chunks.`);
  return portfolioChunks;
}

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type ChatMessage = { role: "user" | "assistant" | "system"; content: string };
type HistoryMessage = { role: "user" | "assistant"; content: string };

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/chat
// ─────────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [] }: { message: string; history: HistoryMessage[] } =
      body;

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "message is required." },
        { status: 400 }
      );
    }

    // ── 1. RAG retrieval (BM25, no embedding model needed) ────────────────────
    const chunks = await getPortfolioChunks();
    const relevant = retrieveTopK(message, chunks, 5);
    const context = relevant.join("\n\n---\n\n");

    // ── 2. Build the message array for Ollama ─────────────────────────────────
    const messages: ChatMessage[] = [
      {
        role: "system",
        content: `${SYSTEM_PROMPT}\n\n===CONTEXT START===\n${context}\n===CONTEXT END===`,
      },
      // Keep last 8 messages for conversation memory
      ...(history as HistoryMessage[])
        .slice(-8)
        .map((m): ChatMessage => ({ role: m.role, content: m.content })),
      { role: "user", content: message },
    ];

    // ── 3. Call Ollama REST API directly ──────────────────────────────────────
    const ollamaRes = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages,
        stream: false,
        options: {
          temperature: 0.3,
          top_p: 0.9,
          num_ctx: 4096,
        },
      }),
    });

    // ── 4. Handle Ollama-level errors ──────────────────────────────────────────
    if (!ollamaRes.ok) {
      const errText = await ollamaRes.text().catch(() => "unknown error");
      console.error(`[chat/route] Ollama responded ${ollamaRes.status}:`, errText);

      // Model not yet pulled or still loading
      if (
        ollamaRes.status === 404 ||
        errText.toLowerCase().includes("not found") ||
        errText.toLowerCase().includes("pull")
      ) {
        return NextResponse.json({
          reply:
            "🔄 I'm still warming up — the AI model is being downloaded for the first time (this can take a few minutes). Please try again shortly!",
        });
      }

      return NextResponse.json(
        { reply: "⚠️ The AI service returned an unexpected error. Please try again." },
        { status: 200 }
      );
    }

    // ── 5. Parse and return ────────────────────────────────────────────────────
    const data = await ollamaRes.json();
    const reply =
      data.message?.content?.trim() ||
      "I couldn't generate a response. Please try again.";

    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[chat/route] Caught error:", error);

    const msg = error instanceof Error ? error.message : String(error);

    // Ollama not reachable yet (container still starting)
    if (
      msg.includes("ECONNREFUSED") ||
      msg.includes("fetch failed") ||
      msg.includes("ENOTFOUND") ||
      msg.includes("connect")
    ) {
      return NextResponse.json({
        reply:
          "🔄 I'm still warming up — the AI service is starting. Please try again in a few seconds!",
      });
    }

    return NextResponse.json(
      { reply: "⚠️ Something went wrong on my end. Please try again in a moment." },
      { status: 200 }
    );
  }
}
