"use client";

import { motion } from "framer-motion";
import { Code, Database, Globe, Layout, Server, Settings, Terminal, Cpu } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: <Code size={24} className="text-blue-400" />,
    skills: ["Python", "JavaScript", "SQL", "C++"],
  },
  {
    title: "Technologies",
    icon: <Database size={24} className="text-indigo-400" />,
    skills: ["Django", "DRF", "Django Channel", "ExpressJS", "React", "MySQL", "PostgreSQL", "Stripe Webhook", "Celery", "Redis", "Postman"],
  },
  {
    title: "Server & DevOps",
    icon: <Server size={24} className="text-purple-400" />,
    skills: ["CI/CD", "GitHub Actions", "Docker", "Nginx", "VPS", "AWS (EC2, S3, AMI)"],
  },
  {
    title: "Core Concepts",
    icon: <Cpu size={24} className="text-teal-400" />,
    skills: ["OOP", "Data Structures", "Algorithms", "Problem Solving"],
  },
  {
    title: "Tools & OS",
    icon: <Terminal size={24} className="text-cyan-400" />,
    skills: ["Linux", "Windows", "Git", "GitHub"],
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
    <section id="skills" className="py-24 relative bg-slate-900/30 border-y border-white/5">
      {/* Decorative blobs */}
      <div className="absolute top-[30%] left-[-10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap">Technical Skills</h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mt-2 md:mt-0"></div>
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
                  <span 
                    key={skillIdx}
                    className="px-3 py-1.5 bg-slate-900/50 text-slate-300 text-sm font-medium rounded-lg border border-slate-700/50 group-hover:border-slate-600 transition-colors duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
