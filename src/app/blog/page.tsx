import Link from 'next/link';
import { getSortedPostsData } from '@/lib/posts';

export const metadata = {
  title: 'Blog | Stock Intelligence Division',
  description: 'Military OSINT Intelligence Feed & Analysis',
};

export default function BlogPage() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono relative selection:bg-blue-500 selection:text-white">
      {/* 테마용 스캔라인 효과 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

      {/* 상단 알림 바 */}
      <div className="bg-blue-900/20 border-b border-blue-900/50 py-2 px-6 text-[10px] text-blue-400 font-bold flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-4">
          <Link href="/" className="hover:text-blue-200 flex items-center gap-2">
            <span className="text-xs">←</span> BACK_TO_DASHBOARD
          </Link>
          <Link href="/about" className="text-blue-500 hover:text-blue-300 transition-colors border-l border-blue-900/50 pl-4 ml-2 uppercase">About_System</Link>
        </div>
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_5px_#10b981]"></span>
          <span>INTEL_FEED: LIVE</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12 relative z-10">
        {/* 헤더 섹션 */}
        <header className="mb-16 border-l-4 border-blue-600 pl-6 py-2">
          <h1 className="text-3xl sm:text-4xl text-white font-bold tracking-tight mb-2 uppercase">
            Intelligence <span className="text-blue-500">Archive</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.4em] uppercase">Historical Data & Strategic Analysis</p>
        </header>

        {/* 블로그 포스트 목록 */}
        <div className="space-y-12">
          {allPostsData.map(({ slug, date, title, summary, tags, category }) => (
            <article key={slug} className="group relative">
              <div className="absolute -left-6 top-0 h-full w-[2px] bg-blue-900/30 group-hover:bg-blue-500 transition-colors"></div>
              
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3 text-[10px] font-bold">
                  <span className="text-blue-500 uppercase tracking-widest px-2 py-0.5 bg-blue-950/30 border border-blue-900/50">
                    {category}
                  </span>
                  <span className="text-slate-500">{date}</span>
                </div>

                <Link href={`/blog/${slug}`}>
                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors tracking-tight mb-2">
                    {title}
                  </h2>
                </Link>

                <p className="text-sm text-slate-400 leading-relaxed max-w-2xl mb-4 italic">
                  {summary}
                </p>

                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span key={tag} className="text-[9px] text-slate-500 font-bold border border-slate-800 px-2 py-0.5 uppercase">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 하단 기밀 스탬프 효과 (호버 시) */}
              <div className="absolute top-0 right-0 text-[8px] text-blue-900/20 font-black tracking-[0.5em] uppercase select-none group-hover:text-blue-500/10 rotate-12 transition-colors">
                AUTHORIZED_EYES_ONLY
              </div>
            </article>
          ))}

          {allPostsData.length === 0 && (
            <div className="py-20 text-center border-2 border-dashed border-slate-900">
              <p className="text-slate-500 text-xs italic tracking-widest">ERROR: NO_INTEL_RECORDS_FOUND</p>
            </div>
          )}
        </div>
      </div>

      {/* 하단 기밀 배너 */}
      <footer className="mt-32 w-full">
        <div className="bg-red-900/90 py-3 text-center text-white text-[11px] font-black tracking-[0.5em] uppercase border-y border-red-500/50">
          /// CLASSIFIED ARCHIVE - DATA INTEGRITY SECURED ///
        </div>
      </footer>
    </div>
  );
}
