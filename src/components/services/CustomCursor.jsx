import React, { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const moveCursor = (e) => {
      const { clientX, clientY } = e;

      dotRef.current.style.transform =
        `translate(${clientX}px, ${clientY}px)`;

      glowRef.current.style.transform =
        `translate(${clientX}px, ${clientY}px)`;
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* DOT */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 rounded-full 
        bg-white pointer-events-none z-[9999] 
        -translate-x-1/2 -translate-y-1/2"
      />

      {/* GLOW */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-40 h-40 rounded-full 
        bg-[#007cc3]/20 blur-3xl pointer-events-none z-[9998] 
        -translate-x-1/2 -translate-y-1/2 transition-transform duration-200"
      />
    </>
  );
};

export default CustomCursor;