"use client";

import Script from "next/script";
import { Eye, Users } from "lucide-react";

export function SiteStats() {
  return (
    <>
      {/* 1. 加载不蒜子脚本 
         strategy="afterInteractive" 确保不阻塞页面加载
      */}
      <Script
        src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"
        strategy="afterInteractive"
      />

      <div className="flex items-center gap-4 text-xs text-muted-foreground/80">
        {/* 总访问量 (PV) */}
        <span
          id="busuanzi_container_site_pv"
          className="flex items-center gap-1"
          style={{ display: "none" }} // 默认隐藏，加载成功后脚本会自动移除 display: none
        >
          <Eye className="size-3.5" />
          <span>
            总访问量 <span id="busuanzi_value_site_pv" className="font-mono font-medium">--</span> 次
          </span>
        </span>

        {/* 分隔符 */}
        <span className="text-border">|</span>

        {/* 总访客数 (UV) */}
        <span
          id="busuanzi_container_site_uv"
          className="flex items-center gap-1"
          style={{ display: "none" }}
        >
          <Users className="size-3.5" />
          <span>
            总访客数 <span id="busuanzi_value_site_uv" className="font-mono font-medium">--</span> 人
          </span>
        </span>
      </div>
    </>
  );
}