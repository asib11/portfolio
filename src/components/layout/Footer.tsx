export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-white/5 py-8 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <p>
          © {currentYear}{" "}
          <span className="text-xl font-signature text-white drop-shadow-md hover:text-blue-400 transition-colors tracking-wider">
            Asib Ahmed
          </span>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
