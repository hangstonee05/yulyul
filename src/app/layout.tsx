import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider } from "@/context/SidebarContext";

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
                "url": "https://yulyul.pages.dev",
                "logo": "https://yulyul.pages.dev/icon.png",
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
