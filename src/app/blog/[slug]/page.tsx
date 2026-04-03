import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { getPostData, getAllPostSlugs } from '@/lib/posts';

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono relative selection:bg-blue-500 selection:text-white">
      {/* 테마용 스캔라인 효과 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

      {/* 상단 알림 바 */}
      <div className="bg-blue-900/20 border-b border-blue-900/50 py-2 px-6 text-[10px] text-blue-400 font-bold flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-4">
          <Link href="/blog" className="hover:text-blue-200 flex items-center gap-2">
            <span className="text-xs">←</span> BACK_TO_INTEL_ARCHIVE
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <span>REPORT_ID: {slug}</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20 relative z-10">
        {/* 헤더 섹션 */}
        <header className="mb-16 border-l-4 border-blue-600 pl-6 py-2">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex items-center gap-3 text-[10px] font-bold">
              <span className="text-blue-500 uppercase tracking-widest px-2 py-0.5 bg-blue-950/30 border border-blue-900/50">
                {postData.category}
              </span>
              <span className="text-slate-500">{postData.date}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl text-white font-bold tracking-tight uppercase">
              {postData.title}
            </h1>
          </div>
          <p className="text-sm text-slate-400 italic">
            "{postData.summary}"
          </p>
        </header>

        {/* 본문 (Markdown Rendering) */}
        <main className="relative bg-slate-950/20 p-8 sm:p-12 border border-blue-900/10 rounded-sm">
          {/* 장식: 구석의 기밀 표시 */}
          <div className="absolute top-2 right-2 text-[7px] text-blue-900/30 uppercase tracking-widest select-none">
            DATA_INTEGRITY_VERIFIED
          </div>

          <article className="prose prose-invert prose-blue max-w-none 
            prose-headings:font-bold prose-headings:tracking-tight prose-headings:uppercase prose-headings:text-slate-100
            prose-p:text-slate-400 prose-p:leading-relaxed
            prose-strong:text-blue-400
            prose-code:text-emerald-400 prose-code:bg-slate-900 prose-code:p-1 prose-code:rounded-sm prose-code:before:content-none prose-code:after:content-none
            prose-pre:bg-slate-950 prose-pre:border prose-pre:border-blue-900/30
            prose-ul:list-disc prose-li:marker:text-blue-500
          ">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {postData.content}
            </ReactMarkdown>
          </article>
        </main>
      </div>

      {/* 하단 기밀 배너 */}
      <footer className="mt-32 w-full">
        <div className="bg-red-900/90 py-3 text-center text-white text-[11px] font-black tracking-[0.5em] uppercase border-y border-red-500/50">
          /// END_OF_REPORT - LOGS_ENCRYPTED ///
        </div>
      </footer>
    </div>
  );
}
