"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FAQItem {
  q: string;
  a: React.ReactNode;
}

interface FAQProps {
  items: FAQItem[];
  defaultOpenIndex?: number;
}

export function FAQ({ items, defaultOpenIndex = -1 }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpenIndex);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <div className="space-y-0">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const itemId = `faq-item-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div
            key={index}
            className="border-t border-black/10 first:border-t-0"
          >
            <h2>
              <button
                type="button"
                className={cn(
                  "w-full flex items-start justify-between gap-4 py-6 md:py-8 text-left",
                  "hover:text-neutral-600 transition-colors",
                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-black/50 focus-visible:ring-offset-2"
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}
                id={itemId}
              >
                <span className="text-xl md:text-2xl font-semibold tracking-tight text-black flex-1">
                  {item.q}
                </span>
                <ChevronDown
                  className={cn(
                    "w-5 h-5 md:w-6 md:h-6 text-neutral-500 flex-shrink-0 transition-transform duration-300",
                    isOpen && "transform rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h2>
            <div
              id={panelId}
              role="region"
              aria-labelledby={itemId}
              className={cn(
                "overflow-hidden transition-all duration-300 ease-in-out",
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
              )}
            >
              <div className="pb-6 md:pb-8 text-base md:text-lg leading-relaxed text-neutral-700 font-medium space-y-4">
                {item.a}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

