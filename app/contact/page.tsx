import React from "react";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: `Contact | ${SITE_NAME}`,
  description: "I love talking to people. Get in touch about anything.",
};

export default function Contact() {
  return (
    <main className="w-full px-6 md:px-20 pt-32 pb-24 bg-white relative z-20 flex-grow">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
            <h1 className="text-5xl md:text-8xl font-semibold tracking-tighter text-black leading-[0.9] mb-8">
              get in<br />
              touch
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-xl break-words">
              I love talking to people. Get in touch about anything.
            </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-black/10 pt-12">
           <div>
             <span className="font-mono text-xs uppercase text-neutral-500 mb-4 block">Email</span>
             <a href="mailto:rushi@shadowsolutions.tech" className="text-xl sm:text-2xl md:text-3xl font-medium hover:text-neutral-600 transition-colors break-all">
               rushi@shadowsolutions.tech
             </a>
           </div>

           <div>
             <span className="font-mono text-xs uppercase text-neutral-500 mb-4 block">Socials</span>
             <div className="flex flex-col gap-4">
               <a 
                 href="https://www.linkedin.com/in/rushi-patel-uiuc/" 
                 target="_blank"
                 rel="noopener noreferrer"
                 className="flex items-center gap-2 group text-xl font-medium"
               >
                 LinkedIn
                 <ArrowUpRight className="w-5 h-5 opacity-50 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
               </a>
             </div>
           </div>
        </div>
      </div>
    </main>
  );
}
