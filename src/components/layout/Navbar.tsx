"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Education", href: "#education" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-900/80 backdrop-blur-md border-b border-white/10 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter text-white">
          ASIB <span className="text-blue-500">AHMED</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          ))}
          <a
            href="mailto:asib.bubt@gmail.com"
            className="px-6 py-2.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-all shadow-md shadow-blue-600/20 hover:shadow-blue-500/40 hover:-translate-y-0.5"
          >
            Contact Me
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-slate-900 border-b border-white/10 overflow-hidden"
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <a
              href="mailto:asib.bubt@gmail.com"
              className="w-full text-center px-5 py-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium transition-colors mt-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
