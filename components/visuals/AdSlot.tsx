import React from "react";
import { cn } from "@/lib/utils";

interface AdSlotProps {
  className?: string;
  slotId?: string;
}

export function AdSlot({ className, slotId }: AdSlotProps) {
  return (
    <div className={cn("w-full bg-neutral-100/50 border border-neutral-200 border-dashed p-4 flex items-center justify-center min-h-[100px]", className)}>
       {/* 
          ADSENSE INTEGRATION:
          1. Add <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXX" crossorigin="anonymous"></script> to app/layout.tsx
          2. Replace this div contents with:
             <ins class="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-XXXXX"
                  data-ad-slot={slotId}
                  data-ad-format="auto"
                  data-full-width-responsive="true"></ins>
             <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
       */}
       <span className="font-mono text-xs text-neutral-400 select-none">ADVERTISEMENT SPACE</span>
    </div>
  );
}