"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { SiUdemy, SiCoursera, SiHackerrank } from "react-icons/si";

const certificates = [
  {
    title: "Hands-on Introduction to Linux Commands and Shell Scripting",
    issuer: "Coursera",
    icon: <SiCoursera className="text-[#0056D2]" size={22} />,
    certNo: "QTURQFMRN07L",
    url: "https://www.coursera.org/account/accomplishments/records/QTURQFMRN07L",
    accent: "from-blue-500/20 to-cyan-500/20",
    border: "hover:border-blue-500/40",
    glow: "hover:shadow-blue-500/10",
    dot: "bg-blue-400",
  },
  {
    title: "HackerRank — MySQL",
    issuer: "HackerRank",
    icon: <SiHackerrank className="text-[#00EA64]" size={22} />,
    certNo: "6c600756f8f5",
    url: "https://www.hackerrank.com/certificates/6c600756f8f5",
    accent: "from-green-500/20 to-emerald-500/20",
    border: "hover:border-green-500/40",
    glow: "hover:shadow-green-500/10",
    dot: "bg-green-400",
  },
  {
    title: "The Web Developer Bootcamp 2023",
    issuer: "Udemy",
    icon: <SiUdemy className="text-[#EC5252]" size={22} />,
    certNo: "UC-03db4c65-98ed-40ae-b49d-f7d6502a126f",
    url: "https://www.udemy.com/certificate/UC-03db4c65-98ed-40ae-b49d-f7d6502a126f/",
    accent: "from-orange-500/20 to-red-500/20",
    border: "hover:border-orange-500/40",
    glow: "hover:shadow-orange-500/10",
    dot: "bg-orange-400",
  },
  {
    title: "Python: Master Programming and Development with 15 Projects",
    issuer: "Udemy",
    icon: <SiUdemy className="text-[#EC5252]" size={22} />,
    certNo: "UC-68c55ca8-9642-43a3-b835-45ce0fb31a5e",
    url: "https://udemy.com/certificate/UC-68c55ca8-9642-43a3-b835-45ce0fb31a5e/",
    accent: "from-yellow-500/20 to-orange-500/20",
    border: "hover:border-yellow-500/40",
    glow: "hover:shadow-yellow-500/10",
    dot: "bg-yellow-400",
  },
];

const marqueeItems = [...certificates, ...certificates, ...certificates];

export default function Certificates() {
  return (
    <section
      id="certificates"
      aria-labelledby="certificates-heading"
      className="py-24 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[-5%] w-[500px] h-[500px] bg-amber-600/5 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 z-10">
        {/* Section heading */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16">
          <h2
            id="certificates-heading"
            className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap"
          >
            Certificates
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-amber-500/50 to-transparent mt-2 md:mt-0" />
        </div>
      </div>

      <div className="w-full relative flex overflow-hidden py-4">
        {/* Left/Right Fade Gradients */}
        <div className="absolute top-0 left-0 w-16 md:w-32 h-full bg-gradient-to-r from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 md:w-32 h-full bg-gradient-to-l from-slate-900 to-transparent z-10 pointer-events-none" />
        
        <motion.div
          className="flex gap-6 w-max pl-6"
          animate={{ x: ["0%", "-33.333333%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {marqueeItems.map((cert, idx) => (
            <a
              key={idx}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative flex flex-col gap-4 bg-slate-800/20 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 md:p-7 shadow-xl transition-all duration-300 hover:bg-slate-800/40 hover:shadow-2xl w-[320px] md:w-[450px] shrink-0 ${cert.border} ${cert.glow}`}
            >
              {/* Gradient glow on hover */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${cert.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}
              />

              {/* Top row: issuer icon + badge */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-slate-900/80 border border-slate-700/50 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    {cert.icon}
                  </div>
                  <span className="text-sm font-semibold text-slate-400 tracking-wide uppercase">
                    {cert.issuer}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 bg-slate-900/60 border border-slate-700/40 px-2.5 py-1.5 rounded-lg shrink-0">
                  <Award size={12} className="text-amber-400" />
                  Verified
                </div>
              </div>

              {/* Title */}
              <h3 className="text-base md:text-lg font-bold text-white leading-snug group-hover:text-amber-300 transition-colors duration-300 pr-2 flex-grow">
                {cert.title}
              </h3>

              {/* Certificate number + link */}
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-700/30">
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`shrink-0 w-1.5 h-1.5 rounded-full ${cert.dot}`} />
                  <span className="text-xs text-slate-500 font-mono truncate">
                    {cert.certNo}
                  </span>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:text-amber-300 shrink-0 ml-3 transition-colors">
                  View <ExternalLink size={12} />
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
