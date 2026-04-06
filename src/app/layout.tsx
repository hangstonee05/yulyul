import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "YULYULee Intelligence Division",
  description: "Global Asset Surveillance & Strategic Intelligence Monitoring System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black text-slate-300 selection:bg-blue-500 selection:text-white">
        {process.env.NEXT_PUBLIC_ADSENSE_ID && process.env.NEXT_PUBLIC_ADSENSE_ID !== "나중에_입력" && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            crossOrigin="anonymous"
            strategy="lazyOnload"
          />
        )}
        <SidebarProvider>
          {/* Global Header (Fixed) */}
          <Header />
          
          <div className="flex pt-12 min-h-screen">
            {/* Global Sidebar (SNB) */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 w-full overflow-x-hidden">
              {children}
            </main>
          </div>

          {/* Global Structured Data */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "YULYULee Intelligence Division",
                "url": "https://yulyulee.com",
                "logo": "https://yulyulee.com/icon.png",
                "description": "Global Asset Surveillance & Strategic Intelligence Monitoring System",
                "sameAs": []
              })
            }}
          />
        </SidebarProvider>
      </body>
    </html>
  );
}
