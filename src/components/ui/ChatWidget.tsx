"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Loader2, Sparkles, ChevronDown, Clock } from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

// ─────────────────────────────────────────────────────────────────────────────
// Suggested prompts shown on first open
// ─────────────────────────────────────────────────────────────────────────────

const SUGGESTED_PROMPTS = [
  "What projects has Asib built?",
  "What are his technical skills?",
  "Tell me about his work experience",
  "How can I contact Asib?",
];

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

function generateId() {
  return Math.random().toString(36).slice(2, 11);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// ─────────────────────────────────────────────────────────────────────────────
// Typing Indicator
// ─────────────────────────────────────────────────────────────────────────────

function TypingIndicator({ slow }: { slow: boolean }) {
  return (
    <div className="flex items-end gap-2.5 mb-4">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
        <Bot size={14} className="text-white" />
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-1 bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 px-4 py-3 rounded-2xl rounded-bl-sm">
          {[0, 0.2, 0.4].map((delay, i) => (
            <span
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
        {slow && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-1.5 text-[10px] text-slate-500 px-1"
          >
            <Clock size={10} />
            Running on CPU — this may take up to a minute…
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual Message Bubble
// ─────────────────────────────────────────────────────────────────────────────

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`flex items-end gap-2.5 mb-4 ${isUser ? "flex-row-reverse" : ""}`}
    >
      {/* Avatar */}
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-lg ${
          isUser
            ? "bg-gradient-to-br from-slate-600 to-slate-700 border border-slate-500/50"
            : "bg-gradient-to-br from-blue-500 to-indigo-600 shadow-blue-500/20"
        }`}
      >
        {isUser ? (
          <User size={14} className="text-white" />
        ) : (
          <Bot size={14} className="text-white" />
        )}
      </div>

      {/* Bubble + timestamp */}
      <div className={`flex flex-col ${isUser ? "items-end" : "items-start"} max-w-[80%]`}>
        <div
          className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-lg ${
            isUser
              ? "bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-br-sm shadow-blue-500/20"
              : "bg-slate-800/80 backdrop-blur-sm border border-slate-700/50 text-slate-200 rounded-bl-sm"
          }`}
        >
          {msg.content}
        </div>
        <span className="text-[10px] text-slate-500 mt-1 px-1">
          {formatTime(msg.timestamp)}
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main ChatWidget Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSlowResponse, setIsSlowResponse] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const slowTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Welcome message on first open
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          id: generateId(),
          role: "assistant",
          content:
            "👋 Hi! I'm Asib's AI portfolio assistant. I can answer questions about his skills, projects, work experience, education, and more. What would you like to know?",
          timestamp: new Date(),
        },
      ]);
    }
  }, [isOpen, messages.length]);

  // Auto-scroll to latest message
  const scrollToBottom = useCallback((smooth = true) => {
    messagesEndRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen, scrollToBottom]);

  // Show scroll-to-bottom button when user scrolls up
  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const distFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    setShowScrollBtn(distFromBottom > 80);
  };

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // ── Send message ───────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed || isLoading) return;

      setHasInteracted(true);
      setInput("");

      const userMsg: Message = {
        id: generateId(),
        role: "user",
        content: trimmed,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setIsLoading(true);
      setIsSlowResponse(false);

      // Show "running on CPU" hint after 15 seconds
      slowTimerRef.current = setTimeout(() => setIsSlowResponse(true), 15000);

      // 4-minute client-side abort (matches Nginx proxy_read_timeout)
      const controller = new AbortController();
      const abortTimeout = setTimeout(() => controller.abort(), 240000);

      try {
        const history = messages
          .filter((_, i) => i > 0 || messages[0]?.role !== "assistant")
          .map((m) => ({ role: m.role, content: m.content }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmed, history }),
          signal: controller.signal,
        });

        const data = await res.json();

        const botMsg: Message = {
          id: generateId(),
          role: "assistant",
          content: data.reply || "I couldn't generate a response. Please try again.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (err) {
        const isAbort = err instanceof DOMException && err.name === "AbortError";
        setMessages((prev) => [
          ...prev,
          {
            id: generateId(),
            role: "assistant",
            content: isAbort
              ? "⏱️ The request timed out. The model is running on CPU and can be slow. Please try again."
              : "⚠️ Something went wrong connecting to the AI. Please try again.",
            timestamp: new Date(),
          },
        ]);
      } finally {
        clearTimeout(slowTimerRef.current!);
        clearTimeout(abortTimeout);
        setIsLoading(false);
        setIsSlowResponse(false);
        setTimeout(() => inputRef.current?.focus(), 50);
      }
    },
    [isLoading, messages]
  );

  // ── Keyboard submit ────────────────────────────────────────────────────────

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  // ── Auto-resize textarea ───────────────────────────────────────────────────

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 96)}px`;
  };

  // ─────────────────────────────────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────────────────────────────────

  return (
    <>
      {/* ── Floating Trigger Button ── */}
      <motion.button
        id="chat-widget-trigger"
        aria-label="Open AI chat assistant"
        onClick={() => setIsOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-110 transition-all duration-300 border border-blue-400/30"
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: "spring", stiffness: 200, damping: 15 }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={22} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Pulse ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping bg-blue-500 opacity-20 pointer-events-none" />
        )}
      </motion.button>

      {/* ── Chat Panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="chat-widget-panel"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 right-6 z-50 w-[370px] max-w-[calc(100vw-1.5rem)] h-[560px] max-h-[calc(100vh-8rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700/60 bg-slate-900/95 backdrop-blur-xl"
            style={{ transformOrigin: "bottom right" }}
          >
            {/* ─── Header ─── */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-slate-700/50 bg-slate-800/60 backdrop-blur-sm shrink-0">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <Bot size={18} className="text-white" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-slate-900" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-white font-semibold text-sm tracking-wide">Asib&apos;s AI</span>
                  <Sparkles size={12} className="text-blue-400" />
                </div>
                <p className="text-[11px] text-slate-400">Portfolio Assistant · Powered by Ollama</p>
              </div>
              <button
                aria-label="Close chat"
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* ─── Messages ─── */}
            <div
              ref={messagesContainerRef}
              onScroll={handleScroll}
              className="flex-1 overflow-y-auto px-4 py-4 scroll-smooth"
              style={{ scrollbarWidth: "thin", scrollbarColor: "#334155 transparent" }}
            >
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              {isLoading && <TypingIndicator slow={isSlowResponse} />}

              {/* Suggested prompts */}
              {!hasInteracted && messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col gap-2 mt-2"
                >
                  <p className="text-[11px] text-slate-500 font-medium tracking-wide uppercase px-1">
                    Suggested questions
                  </p>
                  {SUGGESTED_PROMPTS.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => sendMessage(prompt)}
                      className="text-left text-xs text-slate-300 bg-slate-800/50 hover:bg-slate-700/60 border border-slate-700/40 hover:border-blue-500/40 px-3 py-2.5 rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:text-white"
                    >
                      {prompt}
                    </button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Scroll to bottom button */}
            <AnimatePresence>
              {showScrollBtn && (
                <motion.button
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  onClick={() => scrollToBottom()}
                  className="absolute bottom-20 right-5 p-1.5 rounded-full bg-slate-700/80 border border-slate-600/50 text-slate-300 hover:text-white transition-colors shadow-lg"
                  aria-label="Scroll to bottom"
                >
                  <ChevronDown size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* ─── Input Area ─── */}
            <div className="shrink-0 border-t border-slate-700/50 bg-slate-800/40 px-3 py-3">
              <div className="flex items-end gap-2 bg-slate-800/80 border border-slate-700/50 rounded-xl focus-within:border-blue-500/50 focus-within:shadow-sm focus-within:shadow-blue-500/10 transition-all duration-200 px-3 py-2">
                <textarea
                  ref={inputRef}
                  id="chat-widget-input"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  rows={1}
                  placeholder="Ask about Asib's portfolio…"
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 resize-none outline-none leading-relaxed font-mono disabled:opacity-50 max-h-24"
                  style={{ scrollbarWidth: "none" }}
                />
                <button
                  id="chat-widget-send"
                  onClick={() => sendMessage(input)}
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="shrink-0 p-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-md hover:shadow-blue-500/30 active:scale-95"
                >
                  {isLoading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Send size={16} />
                  )}
                </button>
              </div>
              <p className="text-[10px] text-slate-600 mt-1.5 text-center">
                Press <kbd className="font-sans bg-slate-700/60 px-1 rounded text-slate-500">Enter</kbd> to send · <kbd className="font-sans bg-slate-700/60 px-1 rounded text-slate-500">Shift+Enter</kbd> for new line
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
