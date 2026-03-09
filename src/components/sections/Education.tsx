"use client";

import { motion } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

export default function Education() {
  return (
    <section id="education" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap">Education</h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-purple-500/50 to-transparent mt-2 md:mt-0"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-slate-800/20 backdrop-blur-md border border-slate-700/50 rounded-3xl p-8 md:p-12 shadow-2xl relative group overflow-hidden hover:border-purple-500/30 transition-all duration-500 hover:shadow-purple-500/10 hover:-translate-y-1">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="shrink-0 h-16 w-16 rounded-2xl bg-slate-900/80 border border-slate-700/50 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                  <GraduationCap size={32} />
                </div>
                
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">Computer Science and Engineering</h3>
                  <h4 className="text-xl text-slate-300 font-medium">B.Sc Engg</h4>
                  <div className="mt-2 text-slate-400 font-medium text-lg">
                    Bangladesh University of Business and Technology (BUBT)
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 mt-6">
                    <div className="flex items-center gap-2 text-slate-300 font-medium bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/30 w-fit">
                      <Award size={18} className="text-purple-400" />
                      <span>CGPA: <span className="text-white font-bold">3.75</span> <span className="text-slate-500">/</span> 4.0</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/30 shrink-0 h-fit w-fit mt-4 md:mt-0">
                <Calendar size={14} className="text-purple-400" />
                Oct 2018 – Jan 2023
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
