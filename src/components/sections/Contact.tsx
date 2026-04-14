"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  MessageSquare,
  Send,
  CheckCircle2,
  AlertCircle,
  Github,
  Linkedin,
  Instagram,
  Facebook,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

type FormState = "idle" | "loading" | "success" | "error";

interface FormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  message: string;
}

const INITIAL: FormData = {
  name: "",
  email: "",
  phone: "",
  address: "",
  message: "",
};

const inputBase =
  "w-full bg-slate-900/60 border border-slate-700/60 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500/70 focus:ring-1 focus:ring-blue-500/30 transition-all duration-200 hover:border-slate-600";

export default function Contact() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setState("success");
        setForm(INITIAL);
      } else {
        setState("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="py-24 relative overflow-hidden bg-slate-900/30 border-t border-white/5"
    >
      {/* Background blobs */}
      <div className="absolute top-[10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/8 rounded-full blur-[120px] -z-10 mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600/8 rounded-full blur-[100px] -z-10 mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-12 z-10">
        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-16">
          <h2
            id="contact-heading"
            className="text-3xl md:text-5xl font-bold text-white whitespace-nowrap"
          >
            Contact Me
          </h2>
          <div className="h-[1px] w-full bg-gradient-to-r from-blue-500/50 to-transparent mt-2 md:mt-0" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
          {/* Left info panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div>
              <h3 className="text-xl font-bold text-white mb-3">
                Let&apos;s Talk
              </h3>
              <p className="text-slate-400 leading-relaxed text-sm md:text-base text-justify">
                I&apos;m currently open to new opportunities. Whether you have a
                project in mind, a question, or just want to say hi — my inbox
                is always open!
              </p>
            </div>

            {/* Contact info items */}
            <div className="flex flex-col gap-4">
              {[
                {
                  icon: <Mail size={18} className="text-blue-400" />,
                  label: "Email",
                  value: "asib.bubt@gmail.com",
                  href: "mailto:asib.bubt@gmail.com",
                },
                {
                  icon: <Phone size={18} className="text-blue-400" />,
                  label: "Phone",
                  value: "+88 01753 249719",
                  href: "tel:+8801753249719",
                },
                {
                  icon: <MapPin size={18} className="text-blue-400" />,
                  label: "Location",
                  value: "Mirpur, Dhaka, Bangladesh",
                  href: undefined,
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 p-4 bg-slate-800/30 border border-slate-700/40 rounded-xl hover:border-blue-500/30 transition-colors group"
                >
                  <div className="mt-0.5 p-2 bg-slate-900/80 rounded-lg border border-slate-700/40 shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-slate-300 hover:text-white transition-colors text-sm font-medium"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-slate-300 text-sm font-medium">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/asib11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 hover:border-slate-600 transition-all"
              >
                <Github size={18} />
              </a>
              <a
                href="https://linkedin.com/in/asib"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 transition-all"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="https://facebook.com/asibahmed11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-[#1877F2] hover:bg-slate-800 border border-slate-800 hover:border-[#1877F2] transition-all"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://instagram.com/asibahmed11"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-[#E1306C] hover:bg-slate-800 border border-slate-800 hover:border-[#E1306C] transition-all"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://wa.me/8801753249719"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-[#25D366] hover:bg-slate-800 border border-slate-800 hover:border-[#25D366] transition-all"
              >
                <FaWhatsapp size={18} />
              </a>
            </div>
          </motion.div>

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <div className="bg-slate-800/20 backdrop-blur-md border border-slate-700/50 rounded-2xl p-7 md:p-10 shadow-2xl hover:border-blue-500/20 transition-colors duration-500">
              {/* Success state */}
              {state === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center gap-5 py-12"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                    <CheckCircle2 size={40} className="text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-400 text-sm max-w-sm">
                      Thanks for reaching out. I&apos;ll get back to you as
                      soon as possible.
                    </p>
                  </div>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-4 px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700/50 text-slate-300 hover:text-white text-sm font-medium transition-all"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Row: Name + Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-name"
                        className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <User size={12} /> Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="Asib Ahmed"
                        value={form.name}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-email"
                        className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <Mail size={12} /> Email <span className="text-red-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>
                  </div>

                  {/* Row: Phone + Address */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-phone"
                        className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <Phone size={12} /> Phone
                      </label>
                      <input
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        placeholder="+880 1700 000000"
                        value={form.phone}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="contact-address"
                        className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <MapPin size={12} /> Address
                      </label>
                      <input
                        id="contact-address"
                        name="address"
                        type="text"
                        placeholder="Dhaka, Bangladesh"
                        value={form.address}
                        onChange={handleChange}
                        className={inputBase}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="contact-message"
                      className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5"
                    >
                      <MessageSquare size={12} /> Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me about your project, opportunity, or just say hello..."
                      value={form.message}
                      onChange={handleChange}
                      className={`${inputBase} resize-none`}
                    />
                  </div>

                  {/* Error banner */}
                  {state === "error" && errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm"
                    >
                      <AlertCircle size={18} className="shrink-0" />
                      {errorMsg}
                    </motion.div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="w-full flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0"
                  >
                    {state === "loading" ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                          />
                        </svg>
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message <Send size={16} />
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-slate-600">
                    Fields marked <span className="text-red-400">*</span> are required
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
