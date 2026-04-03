"use client";

import React, { useEffect, useRef, memo } from 'react';

function TradingViewChart({ symbol }: { symbol: string }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current && !container.current.querySelector('script')) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "en",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "calendar": false,
        "support_host": "https://www.tradingview.com",
        "backgroundColor": "rgba(0, 0, 0, 1)",
        "gridColor": "rgba(0, 0, 0, 0)",
        "hide_top_toolbar": false,
        "hide_legend": false,
        "save_image": false,
        "container_id": "tradingview_advanced_chart"
      });
      container.current.appendChild(script);
    }
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" ref={container} style={{ height: "650px", width: "100%" }}>
      <div id="tradingview_advanced_chart" style={{ height: "0px", width: "100%" }}></div>
      <div className="tradingview-widget-copyright" style={{ padding: '8px 0', fontSize: '9px', color: '#475569', fontWeight: 'bold', textTransform: 'uppercase' }}>
        <a href={`https://www.tradingview.com/symbols/${symbol}/`} rel="noopener nofollow" target="_blank" className="text-blue-500 hover:text-blue-400">
          Global_Asset_Surveillance: {symbol}
        </a>
      </div>
    </div>
  );
}

export default memo(TradingViewChart);
