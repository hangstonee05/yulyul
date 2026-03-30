"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

// 주식 정보의 형식을 정의해요
interface Stock {
  name: string;
  ticker: string;
  price: string;
  marketCap: string;
  dividendYield: string;
}

interface StockData {
  usStocks: Stock[];
  krStocks: Stock[];
}

export default function Home() {
  const [data, setData] = useState<StockData | null>(null);

  useEffect(() => {
    fetch("/data/stock-info.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("데이터를 불러오지 못했어요:", err));
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black font-mono">
        <div className="text-blue-500 animate-pulse tracking-[0.2em]">INITIALIZING SYSTEM...</div>
      </div>
    );
  }

  // 밀리터리 터미널 스타일의 주식 카드
  const StockCard = ({ stock, isKr }: { stock: Stock; isKr: boolean }) => (
    <Link href={`/stock/${stock.ticker}`} className="block">
      <div className="relative group overflow-hidden border border-blue-900/50 bg-slate-950/40 p-5 backdrop-blur-sm transition-all hover:border-blue-500/50 hover:bg-slate-900/60 shadow-[0_0_15px_rgba(37,99,235,0.05)] hover:shadow-[0_0_25px_rgba(37,99,235,0.15)] rounded-sm cursor-pointer">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-1 opacity-70">Asset Name</span>
            <h3 className="text-sm font-bold text-slate-100 tracking-tight">{stock.name}</h3>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-blue-500 font-bold uppercase tracking-widest mb-1 opacity-70">Price / {isKr ? "KRW" : "USD"}</span>
            <p className="text-lg font-mono font-bold text-blue-400 group-hover:text-blue-300">
               {stock.price}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 border-t border-blue-900/30 pt-4 mt-2">
          <div className="flex flex-col">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Mkt Cap</span>
            <p className="text-xs font-mono text-slate-300">{stock.marketCap}</p>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-[9px] text-slate-500 uppercase font-bold tracking-widest mb-1">Yield</span>
            <p className="text-xs font-mono text-emerald-400">{stock.dividendYield}</p>
          </div>
        </div>

        {/* 데코레이션: 태그 느낌의 사이드바 */}
        <div className="absolute top-0 left-0 h-full w-[2px] bg-blue-600/20 group-hover:bg-blue-500/60 transition-colors"></div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono relative selection:bg-blue-500 selection:text-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@400;700&display=swap');
        
        body {
          background-color: #000;
          overflow-x: hidden;
        }

        .osint-title {
          font-family: 'Press Start 2P', cursive;
          letter-spacing: -0.05em;
        }

        .scanlines {
          position: fixed;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.15) 50%);
          background-size: 100% 4px;
          pointer-events: none;
          z-index: 0;
        }

        .glow-text {
          text-shadow: 0 0 10px rgba(37, 99, 235, 0.5);
        }

        .live-dot {
          width: 8px; height: 8px;
          background-color: #10b981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 10px #10b981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.2); }
          100% { opacity: 1; transform: scale(1); }
        }
      `}</style>

      <div className="scanlines"></div>

      {/* 상단 알림 바 */}
      <div className="bg-blue-900/20 border-b border-blue-900/50 py-2 px-6 text-[10px] text-blue-400 font-bold flex justify-between items-center z-10 relative">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-blue-500"></div> CONN: ESTABLISHED</span>
          <span className="hidden sm:inline">SECURE_CHANNEL: 256-BIT</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="live-dot"></span>
          <span>LIVE_OSINT_FEED</span>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-12 relative z-10">
        {/* 1. 메인 헤더 */}
        <header className="mb-20 text-center sm:text-left border-l-4 border-blue-600 pl-6 py-2">
          <h1 className="osint-title text-2xl sm:text-4xl text-white glow-text mb-4">
            STOCK INTELLIGENCE<br/>
            <span className="text-blue-500">DIVISION</span>
          </h1>
          <p className="text-[10px] font-bold text-slate-500 tracking-[0.4em] uppercase">Global Asset Surveillance Monitor</p>
        </header>

        <main className="space-y-20">
          {/* 2. US Stocks */}
          <section>
            <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-3">
                <span className="text-xs bg-blue-600 text-white px-2 py-0.5 font-bold">INTL</span>
                <h2 className="text-sm font-bold tracking-tighter text-slate-100 uppercase">Sector: World-Class Assets</h2>
              </div>
              <span className="text-[9px] text-slate-600 font-bold">STATUS: ACTIVE</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.usStocks.map((stock: Stock) => (
                <StockCard key={stock.ticker} stock={stock} isKr={false} />
              ))}
            </div>
          </section>

          {/* 3. KR Stocks */}
          <section>
            <div className="mb-8 flex items-end justify-between border-b border-slate-800 pb-2">
              <div className="flex items-center gap-3">
                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 font-bold">LOCL</span>
                <h2 className="text-sm font-bold tracking-tighter text-slate-100 uppercase">Sector: Domestic Core</h2>
              </div>
              <span className="text-[9px] text-slate-600 font-bold">STATUS: ACTIVE</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.krStocks.map((stock: Stock) => (
                <StockCard key={stock.ticker} stock={stock} isKr={true} />
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* 4. 하단 기밀 배너 */}
      <footer className="mt-32 w-full relative z-10">
        <div className="bg-red-900/90 py-3 text-center text-white text-[11px] font-black tracking-[0.5em] uppercase border-y border-red-500/50">
          /// CLASSIFIED INFORMATION - AUTHORIZED PERSONNEL ONLY ///
        </div>
        <div className="bg-slate-950 py-10 px-6 text-[10px] text-slate-600 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>DATA_STREAM: GOOGLE_FINANCE_API_V4</p>
          <p>LAST_SYNC: {new Date().toISOString().replace('T', '_').slice(0, 19)}Z</p>
          <p className="bg-slate-900 px-3 py-1">SID_AUTH: VALIDATED</p>
        </div>
      </footer>
    </div>
  );
}



