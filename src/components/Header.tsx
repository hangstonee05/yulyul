"use client";

import Link from 'next/link';
import { useSidebar } from '@/context/SidebarContext';
import { Menu, X, Shield, Activity } from 'lucide-react';

export default function Header() {
  const { isMenuOpen, setIsMenuOpen } = useSidebar();

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-blue-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 h-12 flex items-center justify-between text-[11px] font-bold tracking-tight">
        {/* Left: Menu Toggle & Branding */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 -ml-2 bg-blue-900/10 border border-blue-900/30 hover:border-blue-500 hover:text-blue-400 transition-all text-blue-500 rounded-sm"
            title={isMenuOpen ? "Close Menu" : "Open Menu"}
          >
            {isMenuOpen ? <X size={16} /> : <Menu size={16} />}
          </button>

          <Link href="/" className="flex items-center gap-2 group transition-colors">
            <Shield size={14} className="text-blue-600 group-hover:text-blue-400 shadow-[0_0_8px_#2563eb]" />
            <span className="text-white uppercase tracking-widest hidden xs:inline">System_Home</span>
            <span className="text-white uppercase tracking-widest xs:hidden">Home</span>
          </Link>
        </div>

        {/* Right: Status & Signal (Optimized for Mobile) */}
        <div className="flex items-center gap-4">
          {/* Decorative on Desktop, Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-3 text-blue-900/60 font-black">
            <span>CONN: ESTABLISHED</span>
            <span>//</span>
            <span>OSINT_FEED_SECURE</span>
          </div>
          
          {/* Live Indicator */}
          <div className="flex items-center gap-2 pl-4 border-l border-blue-900/30">
            <Activity size={12} className="text-emerald-500 animate-pulse" />
            <span className="text-[9px] text-emerald-600 hidden sm:inline uppercase">Live_Archive_Active</span>
            <span className="text-[9px] text-emerald-600 sm:hidden uppercase">Live</span>
          </div>
        </div>
      </div>
    </header>
  );
}
