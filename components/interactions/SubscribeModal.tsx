"use client";

import React, { useState, FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface SubscribeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SubscribeModal({ isOpen, onClose }: SubscribeModalProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [botField, setBotField] = useState(""); // honeypot

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "modal",
          botField,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSuccess(true);
        setEmail("");
        // Track subscription event if analytics is available
        trackEvent("subscribe", { source: "modal" });
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
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

        {success ? (
          <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in">
             <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
             </div>
             <p className="font-medium text-lg">You're in. Check your inbox soon.</p>
             <button onClick={onClose} className="mt-6 text-sm underline decoration-neutral-300 underline-offset-4">Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Honeypot field - hidden from users */}
            <input
              type="text"
              name="botField"
              value={botField}
              onChange={(e) => setBotField(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
            />
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-mono text-xs uppercase text-neutral-500">Email Address</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full bg-neutral-50 border border-neutral-200 p-3 text-sm focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                disabled={loading}
              />
              {error && (
                <span className="text-red-500 text-xs font-mono">{error}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white p-3 text-sm font-medium tracking-wide hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}