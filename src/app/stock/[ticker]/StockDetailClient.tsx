"use client";

import Link from "next/link";
import TradingViewChart from "./TradingViewChart";

interface Stock {
  name: string;
  ticker: string;
  price: string;
  marketCap: string;
  dividendYield: string;
  description: string;
  stats: {
    open: string;
    high: string;
    low: string;
    "52wkHigh": string;
    "52wkLow": string;
    peRatio: string;
  };
  chart: number[];
}

export default function StockDetailClient({ stock }: { stock: Stock }) {
  // TradingView 심볼 매핑 로직
  const getTradingViewSymbol = (ticker: string) => {
    const mapping: { [key: string]: string } = {
      "NVDA": "NASDAQ:NVDA",
      "TSLA": "NASDAQ:TSLA",
      "GOOGL": "NASDAQ:GOOGL",
      "005930.KS": "KRX:005930",
      "000660.KS": "KRX:000660",
    };
    return mapping[ticker] || ticker;
  };

  const tvSymbol = getTradingViewSymbol(stock.ticker);

  return (
    <div className="min-h-screen bg-black text-slate-300 font-mono relative selection:bg-blue-500 selection:text-white pb-20">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=JetBrains+Mono:wght@400;700&display=swap');
        
        body { background-color: #000; overflow-x: hidden; }
        .osint-title { font-family: 'Press Start 2P', cursive; letter-spacing: -0.05em; }
        .glow-text { text-shadow: 0 0 10px rgba(37, 99, 235, 0.5); }
      `}</style>

      <div className="mx-auto max-w-5xl px-6 py-6 relative z-10">
        {/* Header Section */}
        <header className="mb-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] text-blue-500 font-bold tracking-widest mb-2 px-1 border-l-2 border-blue-600">ASSET_IDENTIFICATION</p>
              <h1 className="text-4xl font-bold text-white tracking-tight mb-2">{stock.name}</h1>
              <span className="text-sm font-bold text-blue-400 bg-blue-950/50 px-2 py-0.5 rounded-sm">
                ID: {stock.ticker}
              </span>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-[10px] text-blue-500 font-bold tracking-widest mb-2">CURRENT_VALUATION</p>
              <p className="text-5xl font-mono font-bold text-white glow-text">
                {stock.price}
              </p>
            </div>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Column: Chart & About */}
          <div className="lg:col-span-2 space-y-12">
            {/* Real-Time TradingView Chart Area */}
            <section className="border border-blue-900/50 bg-slate-950/20 p-1 rounded-sm overflow-hidden">
              <div className="flex justify-between items-center p-4">
                <h2 className="text-xs font-bold text-slate-100 uppercase tracking-widest">Live_Asset_Surveillance</h2>
                <div className="text-[10px] text-emerald-400 font-bold px-2 py-0.5 bg-emerald-950/30 animate-pulse">STREAM: ACTIVE</div>
              </div>
              <div className="w-full bg-black">
                <TradingViewChart symbol={tvSymbol} />
              </div>
            </section>

            {/* About Section */}
            <section>
              <h2 className="text-[10px] text-blue-500 font-bold tracking-widest mb-4 uppercase border-b border-blue-900/30 pb-2">Intelligence_Briefing</h2>
              <p className="text-sm leading-relaxed text-slate-400 italic">
                "{stock.description}"
              </p>
            </section>
          </div>

          {/* Right Column: Stats */}
          <aside className="space-y-8">
            <section className="bg-slate-950/40 border border-blue-900/30 p-6 rounded-sm">
              <h2 className="text-[10px] text-blue-500 font-bold tracking-widest mb-6 uppercase">Key_Market_Indicators</h2>
              <div className="space-y-4">
                {[
                  { label: "Market Cap", value: stock.marketCap },
                  { label: "Div Yield", value: stock.dividendYield, color: "text-emerald-400" },
                  { label: "P/E Ratio", value: stock.stats.peRatio },
                  { label: "Day High", value: stock.stats.high },
                  { label: "Day Low", value: stock.stats.low },
                  { label: "52W High", value: stock.stats["52wkHigh"] },
                  { label: "52W Low", value: stock.stats["52wkLow"] },
                ].map((stat, i) => (
                  <div key={i} className="flex justify-between items-center border-b border-blue-900/10 pb-2">
                    <span className="text-[10px] text-slate-500 uppercase font-bold">{stat.label}</span>
                    <span className={`text-sm font-mono font-bold ${stat.color || 'text-slate-200'}`}>{stat.value}</span>
                  </div>
                ))}
              </div>
            </section>

            <div className="p-4 border border-blue-900/20 bg-blue-900/5 rounded-sm">
              <p className="text-[9px] text-blue-500/50 leading-tight">
                NOTICE: Market surveillance data is provided for informational purposes only. Intelligence integrity is maintained by Global Asset Surveillance Monitor.
              </p>
            </div>
          </aside>
        </div>
      </div>

      {/* Red Banner Footer */}
      <footer className="mt-20 w-full">
        <div className="bg-red-900/90 py-3 text-center text-white text-[11px] font-black tracking-[0.5em] uppercase border-y border-red-500/50">
          /// CLASSIFIED REPORT: {stock.ticker} - ACCESS LOGGED ///
        </div>
      </footer>
    </div>
  );
}
