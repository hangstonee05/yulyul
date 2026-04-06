"use client";

import { useEffect } from "react";

export default function AdBanner() {
  const adsenseId = process.env.NEXT_PUBLIC_ADSENSE_ID;

  useEffect(() => {
    try {
      if (adsenseId && adsenseId !== "나중에_입력") {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err: any) {
      if (err.message && err.message.includes("already have ads")) {
        // 개발 환경의 Strict Mode 등에 의해 두 번 실행되어 발생하는 오류는 무시합니다.
        return;
      }
      console.error("AdSense 오류:", err);
    }
  }, [adsenseId]);

  if (!adsenseId || adsenseId === "나중에_입력") {
    return null;
  }

  return (
    <div className="w-full my-8 text-center flex justify-center overflow-hidden">
      <ins
        className="adsbygoogle"
        style={{ display: "block", minWidth: "250px", minHeight: "50px" }}
        data-ad-client={`ca-${adsenseId}`}
        data-ad-slot="auto"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}
