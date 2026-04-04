"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";
import { 
  ChevronRight, 
  ChevronDown,
  Folder, 
  FolderOpen, 
  Home, 
  BookOpen, 
  Info, 
  Shield, 
  Activity
} from "lucide-react";

export default function Sidebar() {
  const { isMenuOpen, categories, activeCategory, setActiveCategory } = useSidebar();
  const pathname = usePathname();
  const [isBlogExpanded, setIsBlogExpanded] = useState(true);

  // 로컬 스토리지에서 상태 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("sidebar_blog_expanded");
    if (saved !== null) {
      setIsBlogExpanded(saved === "true");
    }
  }, []);

  // 상태 변경 시 로컬 스토리지에 저장
  const toggleBlog = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newState = !isBlogExpanded;
    setIsBlogExpanded(newState);
    localStorage.setItem("sidebar_blog_expanded", String(newState));
  };

  // 현재 경로에 따른 활성화 상태 확인
  const isBlog = pathname.startsWith("/blog");
  const isActive = (path: string) => pathname === path && !activeCategory;

  return (
    <aside 
      className={`transition-all duration-300 ease-in-out flex-shrink-0 z-30 ${
        isMenuOpen ? 'w-full lg:w-64 opacity-100' : 'w-0 opacity-0 overflow-hidden'
      }`}
    >
      <div className="h-[calc(100vh-4rem)] sticky top-16 bg-slate-950/40 border-r border-blue-900/30 p-5 font-mono overflow-y-auto">
        {/* 1. 시스템 메인 메뉴 */}
        <section className="mb-10">
          <h2 className="text-[11px] text-blue-500 font-bold tracking-widest mb-6 uppercase flex items-center gap-2">
            <Shield size={14} className="text-blue-600" />
            Core_Navigation
          </h2>
          
          <nav className="space-y-2 text-[11px]">
            <Link
              href="/"
              onClick={() => setActiveCategory(null)}
              className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${
                isActive("/") 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'
              }`}
            >
              <Home size={14} />
              <span>TERMINAL_HOME</span>
            </Link>

            <div className="space-y-1">
              <div className="flex items-center gap-1">
                <Link
                  href="/blog"
                  onClick={() => setActiveCategory(null)}
                  className={`flex-grow flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${
                    isBlog && !activeCategory
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold' 
                      : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'
                  }`}
                >
                  <BookOpen size={14} />
                  <span>INTEL_ARCHIVE</span>
                </Link>
                <button 
                  onClick={toggleBlog}
                  className="p-2 text-slate-500 hover:text-blue-400 hover:bg-white/5 rounded-sm transition-colors"
                  title={isBlogExpanded ? "Collapse" : "Expand"}
                >
                  {isBlogExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                </button>
              </div>

              {/* Tree Children (Categories) */}
              {isBlogExpanded && (
                <div className="ml-4 pl-4 border-l border-blue-900/20 space-y-1 mt-1 animate-in fade-in slide-in-from-top-1 duration-300">
                  {/* ALL REPORTS Folder as a sub-item if you want, but the main Link is enough. 
                      User asked for categories as children. */}
                  {categories.map((cat) => (
                    <Link
                      key={cat}
                      href={`/blog?category=${cat}`}
                      onClick={() => setActiveCategory(cat)}
                      className={`w-full text-left flex items-center gap-3 px-3 py-2 rounded-sm transition-colors relative ${
                        activeCategory === cat 
                          ? 'bg-blue-600/10 text-blue-400 font-bold' 
                          : 'text-slate-500 hover:bg-white/5 hover:text-slate-400'
                      }`}
                    >
                      <div className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-4 border-t border-blue-900/20"></div>
                      {activeCategory === cat ? <FolderOpen size={12} /> : <Folder size={12} />}
                      <span className="truncate text-[10px]">{cat.toUpperCase()}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/about"
              className={`flex items-center gap-3 px-3 py-2 rounded-sm transition-colors ${
                isActive("/about") 
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-bold' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-slate-300 border border-transparent'
              }`}
            >
              <Info size={14} />
              <span>MISSION_PROTOCOLS</span>
            </Link>
          </nav>
        </section>

        {/* 푸터 영역 */}
        <div className="mt-auto pt-10">
          <div className="p-3 border border-blue-900/20 bg-blue-900/5 rounded-sm">
            <p className="text-[8px] text-blue-900/60 uppercase leading-tight">
              Hardware IDs logged. Sequential access monitored by YULYUL_DIV.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
