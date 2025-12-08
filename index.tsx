
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import RootLayout from "@/app/layout";
import Home from "@/app/page";
import BlogIndex from "@/app/blog/page";
import BlogPost from "@/app/blog/[slug]/page";
import About from "@/app/about/page";
import Contact from "@/app/contact/page";
import WorkPage from "@/app/work/page";
import LifePage from "@/app/life/page";
import FunPage from "@/app/fun/page";

// Simple client-side router
const App = () => {
  const [path, setPath] = useState("/");

  useEffect(() => {
    // Initial path
    setPath(window.location.pathname);

    // Handle back/forward buttons
    const handlePopState = () => {
      setPath(window.location.pathname);
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Simple Router
  let Component;
  let params = {};

  if (path === "/" || path === "") {
    Component = <Home />;
  } else if (path === "/about") {
    Component = <About />;
  } else if (path === "/contact") {
    Component = <Contact />;
  } else if (path === "/work") {
    Component = <WorkPage />;
  } else if (path === "/life") {
    Component = <LifePage />;
  } else if (path === "/fun") {
    Component = <FunPage />;
  } else if (path === "/blog") {
    Component = <BlogIndex />;
  } else if (path.startsWith("/blog/")) {
    const slug = path.replace("/blog/", "");
    // Pass params as Promise to match Next.js 15 App Router pattern
    Component = <BlogPost params={Promise.resolve({ slug })} />;
  } else {
    Component = <Home />;
  }

  return (
    <RootLayout>
      {Component}
    </RootLayout>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);

// Intercept link clicks for SPA feel
document.addEventListener("click", (e) => {
  const target = (e.target as HTMLElement).closest("a");
  if (target && target.href && target.href.startsWith(window.location.origin) && !target.hash) {
    e.preventDefault();
    const path = target.getAttribute("href");
    if (path) {
      window.history.pushState({}, "", path);
      // Dispatch a popstate event to trigger router update
      window.dispatchEvent(new PopStateEvent("popstate"));
      window.scrollTo(0, 0); // Scroll to top on navigation
    }
  }
});
