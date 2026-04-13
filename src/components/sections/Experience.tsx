"use client";

import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    company: "Join Venture AI (JVAI)",
    role: "Backend Developer",
    location: "43 Mohakhali, Dhaka",
    date: "Jul 2025 – Present",
    description: "Implemented authentication, authorization, and RBAC, developed real-time chat and notifications with WebSockets, and created an intelligent AI chatbot using semantic search and a vector database. Additionally, designed secure Stripe payment systems, optimized database ER diagrams for performance, and automated testing and deployment with a CI/CD pipeline using GitHub Actions, Docker, Nginx, and AWS services.",
  },
  {
    company: "Coderize IT Solution",
    role: "Jr. Software Engineer",
    location: "Mirpur, Dhaka",
    date: "Aug 2023 – June 2025",
    description: "Developed full-stack apps using React.js (frontend) and DRF (backend), integrating RESTful APIs for seamless data interaction. Optimized MySQL/PostgreSQL models, designed responsive UIs with Tailwind CSS, and deployed apps with Docker and Nginx for scalability and production readiness.",
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[50%] right-[-10%] w-[600px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="flex flex-col items-center justify-center text-center gap-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap">Experience</h2>
          <div className="h-[2px] w-24 bg-indigo-500/50 mt-2 md:mt-0 rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative border-l-2 border-slate-700/50 ml-4 md:ml-6 md:space-y-16 space-y-12">
            {experiences.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 md:pl-16 group"
              >
                {/* Timeline Dot */}
                <span className="absolute -left-[11px] top-1.5 flex h-5 w-5 rounded-full bg-slate-900 border-2 border-slate-600 group-hover:border-indigo-400 items-center justify-center transition-colors duration-300 shadow-md">
                  <span className="h-2 w-2 rounded-full bg-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </span>

                <div className="bg-slate-800/20 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-8 hover:bg-slate-800/40 transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-indigo-500/10">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 mb-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">{exp.role}</h3>
                      <h4 className="text-lg font-medium text-slate-300 flex items-center gap-2 mt-2">
                        <Briefcase size={18} className="text-indigo-400" />
                        {exp.company}
                      </h4>
                    </div>
                    <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
                      <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/30">
                        <Calendar size={14} className="text-indigo-400" />
                        {exp.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-400 font-medium bg-slate-900/50 px-4 py-2 rounded-lg border border-slate-700/30">
                        <MapPin size={14} className="text-indigo-400" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-slate-400 leading-relaxed text-base md:text-lg text-justify">
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
