import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { getPostData, getAllPostSlugs, getAdjacentPosts } from '@/lib/posts';
import { Metadata } from 'next';
import AdBanner from "@/components/AdBanner";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);
  
  return {
    title: `${postData.title} | YULYULee INTEL`,
    description: postData.summary,
    openGraph: {
      title: postData.title,
      description: postData.summary,
      type: 'article',
      publishedTime: postData.date,
      authors: ['yulyul'],
    },
    alternates: {
      canonical: `https://yulyulee.com/blog/${slug}`,
    },
  };
}

export async function generateStaticParams() {
  const posts = getAllPostSlugs();
  return posts;
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const { prev, next } = getAdjacentPosts(slug);

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono relative selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* 테마용 스캔라인 효과 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

      <div className="mx-auto max-w-4xl px-6 py-12 relative z-10">
        {/* 헤더 섹션 */}
        <header className="mb-16 border-l-4 border-blue-600 pl-6 py-2">
          <div className="flex flex-col gap-4 mb-4">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-bold">
              <span className="text-blue-500 uppercase tracking-widest px-2 py-0.5 bg-blue-950/30 border border-blue-900/50">
                {postData.category}
              </span>
              <div className="flex items-center gap-3">
                <span className="text-slate-500">INIT_DATE: {postData.date}</span>
                <span className="text-blue-900/60 font-black px-1 hidden sm:inline">//</span>
                <span className="text-slate-500 hidden sm:inline">LAST_MOD: {postData.lastModified}</span>
              </div>
              <span className="text-slate-500 sm:hidden">LAST_MOD: {postData.lastModified}</span>
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

          {/* 기사 하단 광고 배너 */}
          <div className="mt-8">
            <AdBanner />
          </div>

          {/* 이전글 / 다음글 네비게이션 */}
          <nav className="mt-8 pb-4 relative z-10" aria-label="Post navigation">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 이전글 (더 오래된 글) */}
              <div>
                {prev ? (
                  <Link
                    href={`/blog/${prev.slug}`}
                    className="group flex flex-col gap-1 p-4 border border-blue-900/30 bg-slate-950/20 hover:border-blue-500/50 hover:bg-slate-900/40 transition-all rounded-sm"
                  >
                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest group-hover:text-blue-500 transition-colors flex items-center gap-1">
                      ← PREV_INTEL
                    </span>
                    <span className="text-sm text-slate-300 font-bold group-hover:text-white transition-colors line-clamp-2">
                      {prev.title}
                    </span>
                  </Link>
                ) : (
                  <div className="p-4 border border-dashed border-slate-800/30 rounded-sm">
                    <span className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">← 이전 글 없음</span>
                  </div>
                )}
              </div>

              {/* 다음글 (더 최신 글) */}
              <div>
                {next ? (
                  <Link
                    href={`/blog/${next.slug}`}
                    className="group flex flex-col gap-1 p-4 border border-blue-900/30 bg-slate-950/20 hover:border-blue-500/50 hover:bg-slate-900/40 transition-all rounded-sm text-right"
                  >
                    <span className="text-[9px] text-slate-600 font-bold uppercase tracking-widest group-hover:text-blue-500 transition-colors flex items-center justify-end gap-1">
                      NEXT_INTEL →
                    </span>
                    <span className="text-sm text-slate-300 font-bold group-hover:text-white transition-colors line-clamp-2">
                      {next.title}
                    </span>
                  </Link>
                ) : (
                  <div className="p-4 border border-dashed border-slate-800/30 rounded-sm text-right">
                    <span className="text-[9px] text-slate-700 font-bold uppercase tracking-widest">다음 글 없음 →</span>
                  </div>
                )}
              </div>
            </div>
          </nav>

          {/* E-E-A-T Footnote Sections */}
          <section className="mt-20 pt-12 border-t border-blue-900/30 space-y-12">
            {/* Intelligence Source & AI Disclosure */}
            <div className="grid gap-8 sm:grid-cols-2">
              <div className="bg-slate-950/40 p-6 border border-blue-900/10 rounded-sm">
                <h3 className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-600"></span> Intel_Source_Attribution
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-4 italic">
                  본 리포트는 아래 OSINT 공개 출처 정보를 바탕으로 작성되었습니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['CME FedWatch', 'ISM', 'TradingView', 'Google Finance'].map(source => (
                    <span key={source} className="text-[9px] px-2 py-0.5 bg-blue-950/30 border border-blue-900/30 text-blue-400 font-bold uppercase">
                      {source}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-emerald-950/5 p-6 border border-emerald-900/20 rounded-sm">
                <h3 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-emerald-600"></span> AI_Synthesized_Content
                </h3>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  본 분석 리포트는 **Gemini AI** 인공지능 시스템에 의해 방대한 데이터를 정제 및 요약하여 생성되었습니다. AI는 복잡한 시장 지표를 신속하게 구조화하는 데 활용되었습니다.
                </p>
              </div>
            </div>

            {/* Analyst Profile (Bio) */}
            <div 
              className="bg-blue-900/5 p-8 border border-blue-900/20 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
              role="complementary"
              aria-label="Analyst Intelligence Profile"
            >
              <div className="w-16 h-16 bg-blue-950 border border-blue-500 flex items-center justify-center text-blue-500 font-bold text-xl flex-shrink-0">
                YY
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-white font-bold uppercase tracking-tight mb-1">Lead Analyst: yulyul</h4>
                <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest mb-3">Chief Intelligence Officer // Asset Surveillance</p>
                <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                  yulyul은 데이터 기반 OSINT 분석을 통해 글로벌 자산 시장의 기회와 위협을 탐지합니다. 
                  복잡한 경제 흐름을 누구나 이해할 수 있는 직관적인 정보로 가공하여 제공하는 전문가입니다.
                </p>
              </div>
            </div>
          </section>

          {/* Structured Data: BlogPosting & Breadcrumb */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": postData.title,
                "description": postData.summary,
                "author": {
                  "@type": "Person",
                  "name": "yulyul"
                },
                "datePublished": postData.date,
                "dateModified": postData.lastModified,
                "mainEntityOfPage": {
                  "@type": "WebPage",
                  "@id": `https://yulyulee.com/blog/${slug}`
                }
              })
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": "https://yulyulee.com"
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "name": "Blog",
                    "item": "https://yulyulee.com/blog"
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "name": postData.title,
                    "item": `https://yulyulee.com/blog/${slug}`
                  }
                ]
              })
            }}
          />
        </main>
      </div>


      {/* 하단 기밀 배너 */}
      <footer className="mt-8 w-full">
        <div className="bg-red-900/90 py-3 text-center text-white text-[11px] font-black tracking-[0.5em] uppercase border-y border-red-500/50">
          /// END_OF_REPORT - LOGS_ENCRYPTED ///
        </div>
      </footer>
    </div>
  );
}
