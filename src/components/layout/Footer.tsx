import { Github, Linkedin, Mail, MapPin } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" aria-label="Contact Information" className="bg-slate-950 border-t border-white/5 pt-16 pb-8 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          <div className="flex flex-col gap-6">
            <h2 className="text-3xl font-bold text-white">Let's Connect</h2>
            <p className="text-slate-400 max-w-md leading-relaxed text-justify">
              I'm currently looking for new opportunities as a Software Engineer. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
            <a 
              href="mailto:asib.bubt@gmail.com" 
              className="inline-flex w-fit items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors shadow-lg shadow-blue-500/20"
            >
              <Mail size={18} /> Say Hello
            </a>
          </div>
          
          <div className="flex flex-col gap-6 md:items-end">
            <div className="flex flex-col gap-4 text-slate-300">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-blue-400 border border-slate-800">
                  <Mail size={16} />
                </div>
                <a href="mailto:asib.bubt@gmail.com" className="hover:text-white transition-colors">asib.bubt@gmail.com</a>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-blue-400 border border-slate-800">
                  <MapPin size={16} />
                </div>
                <span>Mirpur, Dhaka, Bangladesh</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              <a href="https://github.com/asib11" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/asib" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-slate-900 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800 transition-all">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {currentYear} <span className="text-xl font-signature text-white drop-shadow-md hover:text-blue-400 transition-colors tracking-wider">
                    Asib Ahmed
                  </span>. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
