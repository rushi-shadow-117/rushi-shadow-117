import React from "react";
import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackgroundGrid } from "@/components/visuals/BackgroundGrid";
import { getGaMeasurementId, isAnalyticsEnabled } from "@/lib/analytics";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "RP | Digital Garden",
  description: "A production-grade personal site featuring a monochromatic, engineering-focused design system.",
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/icon.svg',
  },
  alternates: {
    types: {
      'application/rss+xml': [{ url: '/rss.xml', title: 'RSS Feed' }],
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = getGaMeasurementId();

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans text-black selection:bg-black selection:text-white bg-white bg-noise min-h-screen flex flex-col">
        {/* Google Analytics 4 - only load if ID is configured */}
        {isAnalyticsEnabled() && gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <BackgroundGrid />
        <Navbar />
        <div className="flex-grow flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
