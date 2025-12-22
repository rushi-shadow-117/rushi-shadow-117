import React from "react";
import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";
import { OrbitalIcon } from "@/components/visuals/OrbitalIcon";
import { PortraitImage } from "@/components/visuals/PortraitImage";

export const metadata: Metadata = {
  title: `About | ${SITE_NAME}`,
  description: "I'm Rushi. I build software.",
};

export default function About() {
  return (
    <main className="w-full px-6 md:px-20 pt-32 pb-24 bg-white relative z-20 flex-grow">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-20 gap-8">
          <div className="flex items-center gap-6 md:gap-12">
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter text-black leading-[0.9]">
              about<br />
              me
            </h1>
            <OrbitalIcon />
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 lg:gap-16 items-start">
          {/* Text Content */}
          <div className="flex-1 max-w-2xl">
            <div className="prose prose-neutral prose-lg max-w-none">
              <p className="text-lg sm:text-xl md:text-2xl leading-relaxed font-medium mb-8 break-words">
                I'm Rushi. I build software.
              </p>
              
              <p>
                I studied Chemistry and Computer Science at UIUC, and I've spent the last few years working in IT and data roles at a Fortune 100 company. Alongside that, I build products under Shadow Solutions, where I ship software, manage a small team, and try to turn ideas into things that actually work.
              </p>
              <p>
                This site is where I put work and thoughts as they evolve. Some of it is technical. Some of it isn't. Most of it is unfinished.
              </p>
              <p>
                Outside of work, I'm a huge nerd.
              </p>
              <p>
                I like books, RPGs, comics, and plenty of other things. I'll be writing about these interests as well.
              </p>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="w-full md:w-1/2 lg:w-2/5 flex-shrink-0">
            <div className="relative w-full h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden contrast-110 shadow-2xl shadow-neutral-200 bg-neutral-50">
              <PortraitImage />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
