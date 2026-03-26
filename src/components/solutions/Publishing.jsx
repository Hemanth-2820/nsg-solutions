import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Publishing = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let isNavigated = false;
    let touchStartX = 0;
    const mountTime = Date.now();
    
    const handleNavigation = (direction) => {
      if (isNavigated) return;
      if (Date.now() - mountTime < 1000) return;

      isNavigated = true;
      if (direction === 'next') navigate('/solutions'); // Next wraps back to solutions main
      if (direction === 'prev') navigate('/solutions/digitalmarketing');
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
          src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=2000&q=80" 
          alt="Publishing" 
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
        <div className="relative z-20 text-center px-6 mt-16 max-w-4xl mx-auto">
          <h1 className="text-[3.5rem] md:text-[5rem] font-bold text-white mb-6 font-sans tracking-tight drop-shadow-2xl">
            Publishing
          </h1>
          <div className="w-24 h-1.5 bg-[#5bb8e4] mx-auto rounded-full mb-8 shadow-glow"></div>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="max-w-[1200px] mx-auto px-6 py-24">
        <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-[1.8] text-center font-light">
          From concept to distribution, our Publishing services ensure your content reaches its maximum potential. We specialize in robust editorial solutions ensuring impact and longevity for your publications.
        </p>
      </div>
    </div>
  );
};

export default Publishing;
