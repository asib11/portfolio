"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Code2, Layers, ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const projects = [
  {
    title: "Wiiz AI",
    description: "An AI-powered marketplace connecting companies with agencies for service-based projects, featuring secure subscriptions, intelligent agency recommendations, real-time chat, and a Super Admin Dashboard for full control. It streamlines communication and project management, ensuring an efficient and trusted ecosystem.",
    tools: ["Django", "Django Channel", "Qdrant Vector Database", "Custom Generative AI", "Stripe", "Celery", "Redis", "Docker", "PostgreSQL", "Bash Script", "Nginx", "VPS"],
    repo: "private repo",
    links: [
      { name: "Live Link", url: "https://wiiz.ai" },
      { name: "Dashboard Live Link", url: "https://dashboard.wiiz.ai" }
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
    links: [
      { name: "Live Link", url: "https://portavacation.co" },
      
    ],
    imageGradient: "from-teal-600/40 to-emerald-500/40"
  }
];

export default function Projects() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    [Autoplay({ delay: 6000, stopOnInteraction: true })]
  );
  
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section id="projects" aria-labelledby="projects-heading" className="py-24 relative bg-slate-900/30 border-y border-white/5 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-16">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <h2 id="projects-heading" className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap">Featured Projects</h2>
            <div className="hidden md:block h-[1px] w-32 bg-gradient-to-r from-blue-500/50 to-transparent"></div>
          </div>
          
          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={scrollPrev}
              className="p-3 rounded-full bg-slate-800/50 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Previous project"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={scrollNext}
              className="p-3 rounded-full bg-slate-800/50 border border-white/10 text-white hover:bg-blue-600 hover:border-blue-500 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              aria-label="Next project"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          {/* Embla Viewport */}
          <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex touch-pan-y cursor-grab active:cursor-grabbing">
              {projects.map((project, idx) => (
                <div key={idx} className="min-w-0 flex-[0_0_100%] pl-4 pr-4">
                  <div className="flex flex-col xl:flex-row gap-8 lg:gap-12 items-center bg-slate-800/40 rounded-3xl p-6 lg:p-10 border border-slate-700/50 shadow-2xl transition-all h-full">
                    
                    {/* Project Image Placeholder */}
                    <div className={`w-full xl:w-1/2 aspect-video rounded-2xl overflow-hidden relative shadow-lg bg-gradient-to-br ${project.imageGradient} border border-white/10 flex items-center justify-center p-8 group shrink-0`}>
                       <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-transparent transition-colors duration-500"></div>
                       <Code2 size={80} className="text-white/50 group-hover:scale-110 group-hover:text-white transition-all duration-500 relative z-10" />
                       <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 rounded-2xl transition-colors duration-500 z-20 pointer-events-none"></div>
                    </div>

                    {/* Project Content */}
                    <div className="w-full xl:w-1/2 flex flex-col justify-center">
                      <div className="flex items-center gap-2 text-blue-400 font-medium mb-4 tracking-wide uppercase text-sm">
                        <Layers size={16} />
                        <span>Full Stack Application</span>
                      </div>
                      
                      <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">{project.title}</h3>
                      
                      <div className="text-slate-300 leading-relaxed mb-8 text-lg">
                        <p className="text-justify">{project.description}</p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-10">
                        {project.tools.map((tool, tIdx) => (
                          <span key={tIdx} className="text-sm font-medium text-slate-300 font-mono bg-slate-900/80 px-3 py-1.5 rounded-md border border-slate-700/50 hover:border-slate-500 transition-colors">
                            {tool}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-6 mt-auto pt-4 border-t border-slate-700/50">
                        {project.repo === "private repo" ? (
                          <span className="flex items-center gap-2 text-slate-500 font-medium cursor-not-allowed" title="Private Repository">
                            <Github size={22} /> Private Repo
                          </span>
                        ) : (
                          <a href={project.repo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-slate-300 hover:text-white font-medium transition-colors hover:bg-slate-700 px-4 py-2 rounded-lg -ml-4">
                            <Github size={22} /> View Code
                          </a>
                        )}

                        {project.links.map((link, lIdx) => (
                          <a key={lIdx} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors font-medium hover:underline underline-offset-4">
                            <ExternalLink size={20} /> {link.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-3 mt-10">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  selectedIndex === idx 
                    ? "bg-blue-500 w-8" 
                    : "bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
