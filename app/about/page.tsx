
import React from "react";
import { OrbitalIcon } from "@/components/visuals/OrbitalIcon";

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

        <div className="max-w-2xl">
          <p className="text-xl md:text-2xl leading-relaxed font-medium mb-12">
            I am a builder, writer, and product engineer based in Chicago.
          </p>
          
          <div className="prose prose-neutral prose-lg">
            <p>
              I believe in the power of shipping. Ideas are cheap; execution is everything. 
              My work spans across full-stack engineering, design systems, and product strategy.
            </p>
            <p>
              Currently, I'm exploring the intersection of AI and creative tools, building 
              systems that help people think better and faster.
            </p>
            <p>
              When I'm not coding, I'm usually reading sci-fi, running, or tinkering with 
              analog photography.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
