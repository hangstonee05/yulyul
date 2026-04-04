import { Suspense } from 'react';
import { getSortedPostsData, getAllCategories } from '@/lib/posts';
import BlogListClient from '@/components/BlogListClient';

export const metadata = {
  title: 'Blog | Stock Intelligence Division',
  description: 'Military OSINT Intelligence Feed & Analysis',
};

function BlogListLoading() {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-blue-500 font-mono text-sm animate-pulse tracking-widest uppercase">
        Initializing Intel Archive...
      </div>
    </div>
  );
}

export default function BlogPage() {
  // 서버 사이드에서 데이터를 안전하게 가져옵니다 (fs 사용 가능)
  const allPostsData = getSortedPostsData();
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono relative selection:bg-blue-500 selection:text-white overflow-x-hidden">
      {/* 테마용 스캔라인 효과 */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]"></div>

      {/* 클라이언트 컴포넌트에 데이터를 전달하여 렌더링 */}
      <Suspense fallback={<BlogListLoading />}>
        <BlogListClient allPostsData={allPostsData} categories={categories} />
      </Suspense>

      {/* 하단 기밀 배너 */}
      <footer className="mt-32 w-full">
        <div className="bg-red-900/90 py-3 text-center text-white text-[10px] sm:text-[11px] font-black tracking-[0.2em] sm:tracking-[0.5em] uppercase border-y border-red-500/50">
          /// CLASSIFIED ARCHIVE - DATA INTEGRITY SECURED ///
        </div>
      </footer>
    </div>
  );
}
