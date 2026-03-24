export default function Footer() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                <span className="text-white font-bold text-xs">H</span>
              </div>
              <span className="font-semibold text-text-primary">Hamza</span>
            </div>
            <p className="text-sm text-text-muted">Senior AI Engineer — Building intelligent systems</p>
          </div>

          <div className="flex gap-6 md:gap-8 items-center mt-6 md:mt-0">
            <a href="https://github.com/githamza1" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-mono text-text-muted hover:text-accent drop-shadow-[0_0_5px_rgba(57,255,20,0)] hover:drop-shadow-[0_0_10px_rgba(57,255,20,0.6)] transition-all duration-300">
              [ GITHUB ]
            </a>
            <a href="https://www.linkedin.com/in/hamza-mansoor-/" target="_blank" rel="noopener noreferrer" className="text-lg md:text-xl font-mono text-text-muted hover:text-accent drop-shadow-[0_0_5px_rgba(57,255,20,0)] hover:drop-shadow-[0_0_10px_rgba(57,255,20,0.6)] transition-all duration-300">
              [ LINKEDIN ]
            </a>
            <a href="mailto:hamzaa722@gmail.com" className="text-lg md:text-xl font-mono text-text-muted hover:text-accent drop-shadow-[0_0_5px_rgba(57,255,20,0)] hover:drop-shadow-[0_0_10px_rgba(57,255,20,0.6)] transition-all duration-300">
              [ EMAIL ]
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-muted">© {new Date().getFullYear()} Hamza. Crafted with precision.</p>
        </div>
      </div>
    </footer>
  );
}
