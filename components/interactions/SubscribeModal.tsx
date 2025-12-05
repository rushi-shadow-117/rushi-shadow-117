"use client";

import React, { useState, FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    // Basic validation
    if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // In production: await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) })
      setStatus("success");
      setMessage("You have been added to the database.");
      setEmail("");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md p-8 shadow-2xl border border-black/10 animate-in fade-in zoom-in-95 duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neutral-100 rounded-sm transition-colors"
        >
          <X className="w-5 h-5 text-neutral-500" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold tracking-tight mb-2">Join the signal</h2>
          <p className="text-neutral-500 text-sm leading-relaxed">
            Subscribe to <strong>brain dump</strong>. Occasional long-form essays on engineering, design, and entropy. No spam, ever.
          </p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in">
             <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <p className="font-medium text-lg">Subscribed successfully.</p>
             <p className="text-neutral-500 text-sm mt-2">{message}</p>
             <button onClick={onClose} className="mt-6 text-sm underline decoration-neutral-300 underline-offset-4">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs uppercase text-neutral-500">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-neutral-50 border border-neutral-200 p-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                disabled={status === "loading"}
              />
              {status === "error" && (
                <span className="text-red-500 text-xs font-mono">{message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-black text-white p-3 text-sm font-medium tracking-wide hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {status === "loading" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "loading" ? "PROCESSING..." : "SUBSCRIBE"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}