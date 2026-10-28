"use client"

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const jumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <div className="fixed top-15 right-0 mb-6 mr-6 z-8">
      <button
        type="button"
        onClick={jumpToTop}
        aria-label="Back to top"
        className="bg-nav text-white rounded-full p-2 hover:bg-nav-accent"
      >
        <ArrowUp aria-hidden="true" />
      </button>
    </div>
  );
}
