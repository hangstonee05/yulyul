import fs from "fs";
import path from "path";
import Link from "next/link";
import StockDetailClient from "./StockDetailClient";
import type { Metadata } from "next";

// 주식 정보 타입 정의
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

// 1. [서버사이드] 정적 파라미터 생성 (output: export 필수 항목)
export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), "public/data/stock-info.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  
  const allStocks = [...data.usStocks, ...data.krStocks];
  
  return allStocks.map((stock: Stock) => ({
    ticker: stock.ticker,
  }));
}

// 2. [서버사이드] 동적 메타데이터 생성 (SEO 주식 상세페이지 최적화)
export async function generateMetadata({ params }: { params: Promise<{ ticker: string }> }): Promise<Metadata> {
  const { ticker } = await params;
  
  const filePath = path.join(process.cwd(), "public/data/stock-info.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  
  const allStocks = [...data.usStocks, ...data.krStocks];
  const stock = allStocks.find((s) => s.ticker === decodeURIComponent(ticker));

  if (!stock) {
    return {
      title: "Asset Not Found | YULYULee Intelligence",
    };
  }

  return {
    title: `${stock.name} (${stock.ticker}) 주가 및 기업 인텔리전스 | YULYULee INTEL`,
    description: stock.description.slice(0, 160), // 구글 검색 결과에 보여줄 요약 설명 (초반 160자)
    openGraph: {
      title: `${stock.name} 주식 정보 밎 실시간 지표`,
      description: stock.description.slice(0, 160),
      type: "website",
    },
  };
}

// 3. [서버사이드] 페이지 컴포넌트
export default async function Page({ params }: { params: Promise<{ ticker: string }> }) {
  const { ticker } = await params;
  
  const filePath = path.join(process.cwd(), "public/data/stock-info.json");
  const jsonData = fs.readFileSync(filePath, "utf-8");
  const data = JSON.parse(jsonData);
  
  const allStocks = [...data.usStocks, ...data.krStocks];
  const stock = allStocks.find((s) => s.ticker === decodeURIComponent(ticker)) || null;

  if (!stock) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-black font-mono text-red-500 gap-6">
        <div className="text-2xl uppercase tracking-widest">404: ASSET_NOT_FOUND</div>
        <Link href="/" className="border border-red-500 px-6 py-2 hover:bg-red-950 transition-colors">
          RETURN TO DASHBOARD
        </Link>
      </div>
    );
  }

  // 실제 화면 구현은 클라이언트 컴포넌트(StockDetailClient)에 맡깁니다.
  return <StockDetailClient stock={stock} />;
}
