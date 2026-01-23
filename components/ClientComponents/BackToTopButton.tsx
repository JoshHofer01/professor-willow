"use client"

import { ArrowUp } from "lucide-react";
import { Fragment, useEffect, useState } from "react";

export default function BackToTopButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
  });

  const jumpToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Fragment>
      {show ? (
        <div className="fixed top-15 right-0 mb-6 mr-6 z-8">
          <button
            onClick={jumpToTop}
            className="bg-nav text-white rounded-full p-2 hover:bg-nav-accent"
          >
            <ArrowUp />
          </button>
        </div>
      ) : (
        <Fragment />
      )}
    </Fragment>
  );
}
