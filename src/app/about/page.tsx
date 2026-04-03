import Link from 'next/link';

export default function AboutPage() {
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
          <Link href="/blog" className="text-blue-500 hover:text-blue-200 border-l border-blue-900/50 pl-4 ml-2 uppercase">Blog_Intel</Link>
        </div>
        <div className="flex items-center gap-3">
          <span>SYSTEM_STATUS: SECURE</span>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-20 relative z-10">
        {/* 헤더 섹션 */}
        <header className="mb-16 border-l-4 border-blue-600 pl-6 py-2">
          <h1 className="text-3xl sm:text-5xl text-white font-bold tracking-tight mb-4 uppercase">
            System <span className="text-blue-500">Information</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.4em] uppercase">Intelligence Division Operations & Transparency</p>
        </header>

        <main className="space-y-16">
          {/* Mission Objective */}
          <section>
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6 border-b border-blue-900/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600"></span> MISSION_OBJECTIVE
            </h2>
            <div className="bg-slate-950/40 border border-blue-900/20 p-8 rounded-sm">
              <p className="text-slate-300 leading-relaxed">
                YULYULee Intelligence Division은 전 세계 자산 시장의 움직임을 실시간으로 감시하고, 
                복잡한 경제 지표를 분석하여 전략적인 통찰력을 제공하는 것을 목표로 합니다. 
                우리는 파편화된 정보를 OSINT(공개 출처 정보) 기법을 활용해 체계화하고 시각화하여 
                투자자들이 더 나은 결정을 내릴 수 있도록 돕습니다.
              </p>
            </div>
          </section>

          {/* Data Integrity */}
          <section>
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6 border-b border-blue-900/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600"></span> DATA_INTEGRITY_SOURCES
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="border border-blue-900/10 p-4 bg-slate-950/20">
                <h3 className="text-slate-100 text-[10px] font-black mb-2 uppercase tracking-tighter">Market Indicators</h3>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>- CME FedWatch Tool</li>
                  <li>- ISM (Institute for Supply Management)</li>
                  <li>- Bureau of Labor Statistics (BLS)</li>
                </ul>
              </div>
              <div className="border border-blue-900/10 p-4 bg-slate-950/20">
                <h3 className="text-slate-100 text-[10px] font-black mb-2 uppercase tracking-tighter">Real-time Feeds</h3>
                <ul className="text-xs text-slate-400 space-y-1">
                  <li>- TradingView Intelligence Graphs</li>
                  <li>- Google Finance V4 Data Stream</li>
                  <li>- SEC EDGAR Filings</li>
                </ul>
              </div>
            </div>
          </section>

          {/* AI Core System */}
          <section>
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6 border-b border-blue-900/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600"></span> AI_CORE_PROCESSING
            </h2>
            <div className="bg-blue-950/10 border-l-4 border-emerald-600 p-8 rounded-sm">
              <h3 className="text-emerald-500 text-xs font-bold mb-4 uppercase">Content Generation Protocol: Gemini AI</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                본 웹사이트에 게시되는 일일 시황 및 분석 리포트는 Google의 **Gemini AI** 모델을 활용하여 생성됩니다. 
                다양한 OSINT 소스에서 수집된 방대한 데이터를 AI 시스템이 정제하고 요약하여 분석 효율을 극대화합니다.
              </p>
              <div className="flex items-center gap-2 text-[9px] text-emerald-900/60 font-bold uppercase">
                <span className="animate-pulse">●</span> Neural_Processing_Active
              </div>
            </div>
          </section>

          {/* Command Structure */}
          <section>
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-6 border-b border-blue-900/30 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-600"></span> COMMAND_STRUCTURE
            </h2>
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="w-24 h-24 bg-blue-950 border border-blue-500 flex items-center justify-center text-blue-500 font-bold text-2xl">
                YY
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-tight">Analyst: yulyul</h3>
                <p className="text-xs text-blue-400 font-bold mb-4 uppercase tracking-widest leading-loose">
                  Chief Intelligence Officer // Asset Surveillance Specialist
                </p>
                <p className="text-sm text-slate-400 leading-relaxed">
                  yulyul은 거시 경제 지표와 기술적 분석의 융합을 전문으로 하는 리드 분석가입니다. 
                  데이터 속에 숨겨진 전략적 기회를 탐착하고, 이를 OSINT 기반 시스템을 통해 
                  대중에게 명확하고 신속하게 공유하는 것을 사명으로 합니다.
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* 하단 배너 */}
      <footer className="mt-40 w-full">
        <div className="bg-red-900/90 py-3 text-center text-white text-[11px] font-black tracking-[0.5em] uppercase border-y border-red-500/50">
          /// END_OF_SYSTEM_INFO - LOGOUT ///
        </div>
      </footer>
    </div>
  );
}
