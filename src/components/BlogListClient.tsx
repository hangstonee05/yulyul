"use client";

import { useEffect, useMemo } from "react";
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { PostData } from '@/lib/posts';
import { ChevronRight, FileText } from 'lucide-react';
import { useSidebar } from "@/context/SidebarContext";

interface BlogListClientProps {
  allPostsData: PostData[];
  categories: string[];
}

export default function BlogListClient({ allPostsData, categories }: BlogListClientProps) {
  const { setCategories, setActiveCategory } = useSidebar();
  const searchParams = useSearchParams();
  
  // URL에서 현재 카테고리 추출
  const currentCategory = searchParams.get("category");

  // 컴포넌트 마운트 및 카테고리 변경 시 전역 상태 동기화
  useEffect(() => {
    setCategories(categories);
    setActiveCategory(currentCategory);
    
    // 언마운트 시 카테고리 목록 초기화 (다른 페이지로 이동 시)
    return () => {
      setCategories([]);
      setActiveCategory(null);
    };
  }, [categories, currentCategory, setCategories, setActiveCategory]);

  // 필터링된 포스트 계산
  const filteredPosts = useMemo(() => {
    if (!currentCategory || currentCategory === "ALL") {
      return allPostsData;
    }
    return allPostsData.filter(post => post.category === currentCategory);
  }, [allPostsData, currentCategory]);

  return (
    <div className="py-6 relative z-10 font-mono">
      {/* 블로그 포스트 목록 (메인 영역) */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6">
        <header className="mb-12 border-l-4 border-blue-600 pl-6 py-2">
          <div className="flex items-center gap-2 text-[10px] text-blue-500 font-bold mb-1">
            <FileText size={12} />
            <span>DATA_STREAM_ACTIVE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl text-white font-bold tracking-tight mb-2 uppercase">
            Intelligence <span className="text-blue-500">Archive</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.4em] uppercase">Historical Data & Strategic Monitoring</p>
        </header>

        <div className="space-y-10">
          {filteredPosts.map(({ slug, date, title, summary, tags, category }) => (
            <article key={slug} className="group relative animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="absolute -left-6 top-0 h-full w-[2px] bg-blue-900/30 group-hover:bg-blue-500 transition-colors"></div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-4 text-[10px] font-bold">
                  <span className="text-blue-500 uppercase tracking-widest px-2 py-0.5 bg-blue-950/30 border border-blue-900/50">
                    {category}
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    <ChevronRight size={10} /> {date}
                  </span>
                </div>

                <Link href={`/blog/${slug}`}>
                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors tracking-tight">
                    {title}
                  </h2>
                </Link>

                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl italic">
                  {summary}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[9px] text-slate-600 font-bold border border-slate-800/50 px-2 py-0.5 uppercase group-hover:border-blue-900/30 transition-colors">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="absolute top-0 right-0 text-[8px] text-blue-900/10 font-black tracking-[0.5em] uppercase select-none group-hover:text-blue-500/10 rotate-12 transition-colors pointer-events-none">
                CLASSIFIED_INTEL
              </div>
            </article>
          ))}

          {filteredPosts.length === 0 && (
            <div className="py-24 text-center border border-dashed border-blue-900/20 bg-blue-950/5">
              <p className="text-blue-900/60 text-[10px] font-bold tracking-widest uppercase">
                [!] ERROR: No records found in category: {currentCategory}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
