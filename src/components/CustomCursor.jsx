import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || 
          e.target.tagName.toLowerCase() === 'button' ||
          e.target.closest('a') !== null || 
          e.target.closest('button') !== null ||
          e.target.closest('.premium-card') !== null) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  // Use springs for smooth following effect
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorX = useSpring(mousePosition.x - (isHovering ? 24 : 10), springConfig);
  const cursorY = useSpring(mousePosition.y - (isHovering ? 24 : 10), springConfig);

  // Hidden on small screens via CSS later if needed, but we keep it here as fixed
  return (
    <motion.div
      className="hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
      style={{
        x: cursorX,
        y: cursorY,
        width: isHovering ? 48 : 20,
        height: isHovering ? 48 : 20,
        backgroundColor: isHovering ? 'rgba(0, 124, 195, 0.1)' : 'transparent',
        border: isHovering ? '1px solid #007cc3' : '2px solid #111',
        mixBlendMode: 'difference',
      }}
      animate={{
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    />
  );
}
