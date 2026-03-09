"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Layers } from "lucide-react";

const projects = [
  {
    title: "Wiiz AI",
    description: "An AI-powered marketplace connecting companies with agencies for service-based projects, featuring secure subscriptions, intelligent agency recommendations, real-time chat, and a Super Admin Dashboard for full control. It streamlines communication and project management, ensuring an efficient and trusted ecosystem.",
    tools: ["Django", "Django Channel", "Qdrant Vector Database", "Custom Generative AI", "Stripe", "Celery", "Redis", "Docker", "PostgreSQL", "Bash Script", "Nginx", "VPS"],
    repo: "private repo",
    links: [
      { name: "Live Link", url: "#" },
      { name: "Dashboard Live Link", url: "#" }
    ],
    imageGradient: "from-blue-600/40 to-cyan-500/40"
  },
  {
    title: "The Wound Nurse",
    description: "An app that enables nurses to collect patient info and wound images, processed by AI for analysis, medicine, and treatment recommendations. Super users manage all system data, while hospital admins oversee nurses and patient records within their organization.",
    tools: ["Django", "DRF", "PostgreSQL", "Stripe", "Generative AI", "Docker", "Nginx", "AWS (EC2, S3)"],
    repo: "private repo",
    links: [
      { name: "SuperUser Live", url: "#" },
      { name: "Hospital Live", url: "#" }
    ],
    imageGradient: "from-indigo-600/40 to-purple-500/40"
  },
  {
    title: "Port A Vacation",
    description: "A platform integrating vacation homes, car rentals, and activities, with real-time booking, Stripe payment processing, and secure guest verification. It follows strict UX standards and includes a CI/CD pipeline, with future features like an owner portal and ongoing post-launch support.",
    tools: ["DRF", "API Webhook", "Stripe", "PostgreSQL", "Docker", "Nginx", "AWS (EC2, S3)"],
    repo: "private repo",
    links: [],
    imageGradient: "from-teal-600/40 to-emerald-500/40"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-slate-900/30 border-y border-white/5">
      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap">Featured Projects</h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mt-2 md:mt-0"></div>
        </div>

        <div className="flex flex-col gap-16 md:gap-32">
          {projects.map((project, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`group flex flex-col ${idx % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8 lg:gap-16 items-center`}
            >
              {/* Project Image Placeholder */}
              <div className={`w-full md:w-1/2 aspect-video rounded-2xl overflow-hidden relative shadow-2xl bg-gradient-to-br ${project.imageGradient} border border-white/10 flex items-center justify-center p-8`}>
                 <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500"></div>
                 <Code2 size={80} className="text-white/50 group-hover:scale-110 group-hover:text-white transition-all duration-500 relative z-10" />
                 <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-colors duration-500 z-20 pointer-events-none"></div>
              </div>

              {/* Project Content */}
              <div className="w-full md:w-1/2 flex flex-col">
                <div className="flex items-center gap-2 text-blue-400 font-medium mb-3 tracking-wide uppercase text-sm">
                  <Layers size={16} />
                  <span>Full Stack Application</span>
                </div>
                
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">{project.title}</h3>
                
                <div className={`bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 md:p-8 shadow-2xl text-slate-300 leading-relaxed z-10 relative ${idx % 2 === 0 ? 'md:-ml-12' : 'md:-mr-12'} hover:border-slate-500/50 transition-all duration-300 hover:shadow-blue-500/10 hover:-translate-y-1`}>
                  <p>{project.description}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-8">
                  {project.tools.map((tool, tIdx) => (
                    <span key={tIdx} className="text-sm font-medium text-slate-300 font-mono bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-700/50 hover:border-slate-500 transition-colors">
                      {tool}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-6 mt-8">
                  {project.repo === "private repo" ? (
                    <span className="flex items-center gap-2 text-slate-500 text-sm font-medium cursor-not-allowed" title="Private Repository">
                      <Github size={20} /> Private Repo
                    </span>
                  ) : (
                    <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white text-sm font-medium transition-colors hover:bg-slate-800 px-3 py-1.5 rounded-lg -ml-3">
                      <Github size={20} /> View Code
                    </a>
                  )}

                  {project.links.map((link, lIdx) => (
                    <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors text-sm font-medium hover:underline underline-offset-4">
                      <ExternalLink size={18} /> {link.name}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
