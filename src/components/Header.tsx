"use client";

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-blue-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-12 flex items-center justify-between text-[11px] font-bold tracking-tight">
        {/* Left: Branding & Core Navigation */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link href="/" className="flex items-center gap-2 group transition-colors">
            <div className="w-2 h-2 bg-blue-600 shadow-[0_0_8px_#2563eb] group-hover:bg-blue-400"></div>
            <span className="text-white uppercase tracking-widest hidden xs:inline">System_Home</span>
            <span className="text-white uppercase tracking-widest xs:hidden">Home</span>
          </Link>
          
          <div className="h-4 w-[1px] bg-blue-900/50"></div>
          
          <Link 
            href="/blog" 
            className="text-blue-500 hover:text-blue-300 transition-colors uppercase"
          >
            Blog
          </Link>
          
          <Link 
            href="/about" 
            className="text-blue-500 hover:text-blue-300 transition-colors uppercase"
          >
            About
          </Link>
        </nav>

        {/* Right: Status & Signal (Optimized for Mobile) */}
        <div className="flex items-center gap-4">
          {/* Decorative on Desktop, Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-3 text-blue-900/60 font-black">
            <span>CONN: ESTABLISHED</span>
            <span>//</span>
            <span>SECURE_FEED</span>
          </div>
          
          {/* Live Indicator */}
          <div className="flex items-center gap-2 pl-4 border-l border-blue-900/30">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_#10b981]"></span>
            <span className="text-[9px] text-emerald-600 hidden sm:inline uppercase">Live_Feed_Active</span>
            <span className="text-[9px] text-emerald-600 sm:hidden uppercase">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}
