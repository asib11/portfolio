"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileText, Github, Linkedin, MapPin, Mail, Phone, Code2 } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="min-h-screen flex items-center pt-28 pb-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>
      <div className="absolute bottom-[10%] right-[10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>
      
      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="max-w-4xl">
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
            ASIB <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500">AHMED</span>
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-2xl md:text-4xl font-semibold text-slate-300 mb-8 flex items-center gap-3"
          >
            <Code2 className="text-blue-400 hidden sm:block" size={32} />
            Software Engineer
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mb-10"
          >
            Passionate about building robust backend systems, scalable APIs, and seamless full-stack applications.
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
              href="#contact"
              className="px-8 py-4 rounded-full bg-slate-800/80 hover:bg-slate-700 backdrop-blur-md text-white font-medium flex items-center gap-2 transition-all border border-slate-700/50 hover:border-slate-500"
            >
              Contact Me <Mail size={18} />
            </a>
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
      </div>
    </section>
  );
}
