"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowRight, FileText, Github, Linkedin, MapPin, Mail, Phone } from "lucide-react";
import { FaCode, FaServer, FaLayerGroup, FaPython } from "react-icons/fa";
import { SiGo } from "react-icons/si";
import { Orbitron } from "next/font/google";

const futuristicFont = Orbitron({ subsets: ["latin"], weight: ["400", "500", "700", "900"] });

const ROLES = [
  { title: "Software Engineer", icon: FaCode },
  { title: "Backend Engineer", icon: FaServer },
  { title: "Full-Stack Developer", icon: FaLayerGroup },
  { title: "Python Developer", icon: FaPython },
  { title: "Go Developer", icon: SiGo }
];

const PHRASES = [
  "Passionate about building robust backend systems, scalable APIs, and seamless full-stack applications.",
  "Turning complex problems into elegant, user-friendly digital experiences.",
  "Creating high-performance web solutions with clean code and modern architecture."
];

const CODE_SNIPPETS = [
  {
    language: "python",
    code: `from django.urls import path
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def get_user_data(request):
    return Response({
        "status": "success",
        "framework": "Django REST",
        "message": "Building scalable applications"
    })
`
  },
  {
    language: "go",
    code: `package main

import "fmt"

func main() {
    message := "High-performance services"
    fmt.Println("Building: " + message)
    
    // Concurrent processing
    go processData()
}
`
  },
  {
    language: "javascript",
    code: `async function fetchData() {
  try {
    const res = await fetch('/api/data');
    const data = await res.json();
    return data.map(item => ({
      ...item,
      processed: true
    }));
  } catch (error) {
    console.error(error);
  }
}
`
  }
];

const CODE_PHRASES = CODE_SNIPPETS.map((s) => s.code);

function useTypewriter(phrases: string[], typeSpeed = 50, deleteSpeed = 30, delay = 2000) {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(typeSpeed);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentPhrase = phrases[loopNum % phrases.length];

    if (isDeleting) {
      if (text === '') {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
        setTypingSpeed(typeSpeed);
      } else {
        timer = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
        }, deleteSpeed);
      }
    } else {
      if (text === currentPhrase) {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, delay);
      } else {
        timer = setTimeout(() => {
          setText((prev) => currentPhrase.slice(0, prev.length + 1));
        }, typingSpeed);
      }
    }
    return () => clearTimeout(timer);
  }, [text, isDeleting, phrases, loopNum, typingSpeed, typeSpeed, deleteSpeed, delay]);

  return { text, index: loopNum % phrases.length };
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { text: typedText } = useTypewriter(PHRASES);
  const { text: typedCode, index: codeIndex } = useTypewriter(CODE_PHRASES, 20, 10, 3000);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section id="hero" className={`min-h-screen flex items-center pt-28 pb-20 relative overflow-hidden ${futuristicFont.className}`}>
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-blue-400 font-medium tracking-wider mb-6 text-sm uppercase"
          >
            <MapPin size={16} />
            <span>Mirpur, Dhaka</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-white mb-4 drop-shadow-lg"
          >
            ASIB AHMED
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-4xl font-semibold text-slate-300 mb-8 flex items-center h-10 md:h-12"
          >
            <div className="relative overflow-hidden flex-1 h-full flex items-center">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute whitespace-nowrap flex items-center gap-3"
                >
                  {(() => {
                    const Icon = ROLES[roleIndex].icon;
                    return <Icon className="text-blue-400 hidden sm:block" size={32} />;
                  })()}
                  {ROLES[roleIndex].title}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mb-10 h-24 md:h-16"
          >
            {typedText}
            <span className="animate-pulse inline-block w-[3px] h-5 bg-blue-400 ml-1 align-middle"></span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap items-center gap-5"
          >
            <a 
              href="#projects"
              className="px-8 py-4 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1"
            >
              View My Work <ArrowRight size={18} />
            </a>
            <a 
              href="https://www.overleaf.com/download/project/68b4879932e777a14bbc3f50/build/19d84dfe923-1b861a698c03d13d/output/output.pdf?compileGroup=standard&clsiserverid=clsi-pre-emp-c3d-c-f-mpks&enable_pdf_caching=true&popupDownload=true&editorId=f61fe3b6-06f2-4d15-9ff8-cb1727a53cfe"
              target="_blank"
              rel="noreferrer noopener"
              className="px-8 py-4 rounded-full bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white font-medium flex items-center gap-2 transition-all border border-slate-700/50 hover:border-slate-500"
            >
              Download Resume <FileText size={18} />
            </a>
            {/* <a 
              href="#contact"
              className="px-8 py-4 rounded-full bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white font-medium flex items-center gap-2 transition-all border border-slate-700/50 hover:border-slate-500"
            >
              Contact Me <Mail size={18} />
            </a> */}
          </motion.div>

          {/* Social & Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 sm:mt-24 py-6 border-t border-white/5 flex flex-wrap gap-x-10 gap-y-4"
          >
            <div className="flex items-center gap-4">
              <a href="https://github.com/asib11" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-3 bg-slate-800/50 rounded-full hover:bg-slate-700 border border-white/5 hover:border-white/10" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href="https://linkedin.com/in/asib" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors p-3 bg-slate-800/50 rounded-full hover:bg-slate-700 border border-white/5 hover:border-white/10" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 pt-2 sm:pt-0">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail size={16} className="text-blue-400" />
                <a href="mailto:asib.bubt@gmail.com" className="text-sm hover:text-white transition-colors">asib.bubt@gmail.com</a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Phone size={16} className="text-blue-400" />
                <a href="tel:+8801753249719" className="text-sm hover:text-white transition-colors">+88 01753 249719</a>
              </div>
            </div>
          </motion.div>
        </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hidden lg:block relative group font-mono"
          >
            <div className="relative rounded-xl bg-transparent border border-blue-500/40 overflow-hidden shadow-[0_0_20px_rgba(59,130,246,0.15)] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-shadow duration-500 h-[400px] flex flex-col">
              {/* Sci-fi Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-blue-500/20 bg-transparent">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-400 animate-pulse"></div>
                  <div className="w-12 h-1 bg-blue-500/50"></div>
                  <div className="w-4 h-1 bg-blue-500/30"></div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-blue-300 font-bold tracking-[0.2em] uppercase glow">
                    SYS.{CODE_SNIPPETS[codeIndex].language}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-indigo-500/50"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500/50"></div>
                  <div className="w-1.5 h-1.5 bg-indigo-500/50"></div>
                </div>
              </div>
              
              {/* Code body */}
              <div className="p-6 flex-1 overflow-hidden relative">
                {/* Scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent h-[200%] animate-scan pointer-events-none"></div>
                
                <pre className="text-sm md:text-base text-blue-400/90 whitespace-pre-wrap leading-relaxed relative z-10">
                  <code>
                    {typedCode}
                    <span className="animate-pulse inline-block w-2 h-4 bg-blue-400 ml-1 shadow-[0_0_8px_#60a5fa]"></span>
                  </code>
                </pre>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
