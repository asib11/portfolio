"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Database, Globe, Layout, Server, Settings, Terminal, Cpu, Blocks, Brain, Network, Workflow } from "lucide-react";
import { SiPython, SiJavascript, SiCplusplus, SiDjango, SiExpress, SiReact, SiMysql, SiPostgresql, SiStripe, SiCelery, SiRedis, SiPostman, SiGithubactions, SiDocker, SiNginx, SiLinux, SiGit, SiGithub, SiTypescript, SiGo } from "react-icons/si";
import { FaDatabase, FaServer, FaInfinity, FaWindows, FaAws } from "react-icons/fa";

type SkillItem = {
  name: string;
  icon?: React.ReactNode;
};

const skillCategories = [
  {
    title: "Languages",
    icon: <Code size={24} className="text-blue-400" />,
    skills: [
      { name: "Python", icon: <SiPython className="text-[#3776AB]" /> },
      { name: "Go", icon: <SiGo className="text-[#00599C]" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
      { name: "JavaScript", icon: <SiJavascript className="text-[#F7DF1E] rounded-sm bg-black/10" /> },
      { name: "C++", icon: <SiCplusplus className="text-[#00599C]" /> },
      { name: "SQL", icon: <FaDatabase className="text-[#4479A1]" /> },
    ] as SkillItem[],
  },
  {
    title: "Technologies",
    icon: <Database size={24} className="text-indigo-400" />,
    skills: [
      { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
      { name: "DRF", icon: <SiDjango className="text-[#092E20]" /> },
      { name: "Django Channel", icon: <SiDjango className="text-[#092E20]" /> },
      { name: "ExpressJS", icon: <SiExpress className="text-white" /> },
      { name: "React", icon: <SiReact className="text-[#61DAFB]" /> },
      { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
      { name: "Stripe", icon: <SiStripe className="text-[#008CDD]" /> },
      { name: "Celery", icon: <SiCelery className="text-[#37814A]" /> },
      { name: "Redis", icon: <SiRedis className="text-[#DC382D]" /> },
      { name: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
    ] as SkillItem[],
  },
  {
    title: "Server & DevOps",
    icon: <Server size={24} className="text-purple-400" />,
    skills: [
      { name: "CI/CD", icon: <FaInfinity className="text-slate-400" /> },
      { name: "GitHub Actions", icon: <SiGithubactions className="text-[#2088FF]" /> },
      { name: "Docker", icon: <SiDocker className="text-[#2496ED]" /> },
      { name: "Nginx", icon: <SiNginx className="text-[#009639]" /> },
      { name: "VPS", icon: <FaServer className="text-slate-400" /> },
      { name: "AWS", icon: <FaAws className="text-[#232F3E]" /> },
    ] as SkillItem[],
  },
  {
    title: "Core Concepts",
    icon: <Cpu size={24} className="text-teal-400" />,
    skills: [
      { name: "OOP", icon: <Blocks className="text-orange-400" size={16} /> },
      { name: "Data Structures", icon: <Network className="text-blue-400" size={16} /> },
      { name: "Algorithms", icon: <Workflow className="text-green-400" size={16} /> },
      { name: "Problem Solving", icon: <Brain className="text-pink-400" size={16} /> },
    ] as SkillItem[],
  },
  {
    title: "Tools & OS",
    icon: <Terminal size={24} className="text-cyan-400" />,
    skills: [
      { name: "Linux", icon: <SiLinux className="text-white" /> },
      { name: "Windows", icon: <FaWindows className="text-[#0078D6]" /> },
      { name: "Git", icon: <SiGit className="text-[#F05032]" /> },
      { name: "GitHub", icon: <SiGithub className="text-white" /> },
    ] as SkillItem[],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="py-24 relative bg-slate-900/30 border-y border-white/5">
      {/* Decorative blobs */}
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="flex flex-col items-center justify-center text-center gap-4 mb-16">
          <h2 id="skills-heading" className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap">Technical Skills</h2>
          <div className="h-[2px] w-24 bg-blue-500/50 mt-2 md:mt-0 rounded-full"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-slate-800/20 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:bg-slate-800/40 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-slate-900/80 rounded-xl group-hover:bg-slate-900 group-hover:scale-110 transition-all duration-300 border border-slate-700/50">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white tracking-wide">{category.title}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIdx) => (
                  <div 
                    key={skillIdx}
                    className="flex items-center gap-2 px-3 py-2 bg-slate-900/60 hover:bg-slate-800 text-slate-300 text-sm font-medium rounded-lg border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md hover:shadow-indigo-500/10 cursor-default"
                    title={skill.name}
                  >
                    {skill.icon && <span className="text-lg drop-shadow-md">{skill.icon}</span>}
                    <span className="tracking-wide hidden sm:block">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
