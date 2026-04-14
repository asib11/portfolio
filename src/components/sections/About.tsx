"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-heading" className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <h2 id="about-heading" className="text-3xl md:text-5xl font-bold text-white">About Me</h2>
            <div className="h-[1px] flex-grow bg-slate-700 mt-2"></div>
          </div>
          
          <div className="bg-slate-800/40 backdrop-blur-md border border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden group hover:border-blue-500/30 transition-colors duration-500">
            {/* Subtle gradient glow inside card */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed relative z-10 text-justify">
              An aspiring Software Engineer with expertise in <span className="text-white font-medium">Python, JavaScript, Django, DRF, django channels, payment gateway integration, AWS</span>. 
              <br/><br/>
              Excellent team worker, fluent communicator, ambitious. Aptitude in clean coding and debugging. I thrive in environments that challenge me to learn new technologies and apply them to build scalable and efficient solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
