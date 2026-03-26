import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const VideoProduction = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isNavigated = false;
    let touchStartX = 0;
    const mountTime = Date.now();
    
    const handleNavigation = (direction) => {
      if (isNavigated) return;
      if (Date.now() - mountTime < 1000) return;

      isNavigated = true;
      if (direction === 'next') navigate('/solutions/digitalmarketing');
      if (direction === 'prev') navigate('/solutions/itservices');
    };

    const handleWheel = (e) => {
      if (Math.abs(e.deltaX) > 40 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 0) handleNavigation('next');
        else handleNavigation('prev');
      }
    };

    const handleTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) handleNavigation('next');
        else if (touchEndX > touchStartX + 50) handleNavigation('prev');
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/30 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=2000&q=80" 
          alt="Video Production" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 text-center px-6 mt-16 max-w-4xl mx-auto">
          <h1 className="text-[3.5rem] md:text-[5rem] font-bold text-white mb-6 font-sans tracking-tight drop-shadow-2xl">
            Video Production
          </h1>
          <div className="w-24 h-1.5 bg-[#5bb8e4] mx-auto rounded-full mb-8 shadow-glow"></div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-[1.8] text-center font-light">
          Unleash the power of visual storytelling. Our video production services deliver high-quality, engaging content tailored precisely to your brand identity, capturing audiences from start to finish.
        </p>
      </div>
    </div>
  );
};

export default VideoProduction;
