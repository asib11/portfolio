export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-8 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p className="flex items-center gap-2">
          © {currentYear}{" "}
          <span className="text-xl font-signature text-white drop-shadow-md hover:text-blue-400 transition-colors tracking-wider">
            Asib Ahmed
          </span>
          . All rights reserved.
        </p>
        
        <div className="flex items-center gap-3">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://res.cloudinary.com/mhkmpeii/image/upload/v1787386255/asib_ah59r5.jpg" 
            alt="Asib Ahmed"
            className="w-10 h-10 rounded-full object-cover border border-slate-700 grayscale hover:grayscale-0 transition-all duration-300 shadow-md"
          />
        </div>
      </div>
    </footer>
  );
}
