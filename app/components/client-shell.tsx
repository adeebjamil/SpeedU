"use client";

import { useState, useEffect, lazy, Suspense } from "react";
import { Preloader } from "./global-ui";

// Lazy-load non-critical UI to speed up initial render
const CustomCursor = lazy(() => import("./global-ui").then(m => ({ default: m.CustomCursor })));
const ScrollProgress = lazy(() => import("./global-ui").then(m => ({ default: m.ScrollProgress })));
const BackToTop = lazy(() => import("./global-ui").then(m => ({ default: m.BackToTop })));

export default function ClientShell({ children }: { children: React.ReactNode }) {
  // Always start false to match SSR, then check sessionStorage in useEffect
  const [loaded, setLoaded] = useState(false);
  const [skipPreloader, setSkipPreloader] = useState(false);

  useEffect(() => {
    // If already visited this session, skip preloader entirely
    if (sessionStorage.getItem("speedup_loaded") === "true") {
      setLoaded(true);
      setSkipPreloader(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      sessionStorage.setItem("speedup_loaded", "true");
    }
  }, [loaded]);

  return (
    <>
      {!loaded && !skipPreloader && (
        <Preloader onComplete={() => setLoaded(true)} />
      )}
      <Suspense fallback={null}>
        <CustomCursor />
        <ScrollProgress />
      </Suspense>
      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.3s ease",
        }}
      >
        {children}
      </div>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
    </>
  );
}
