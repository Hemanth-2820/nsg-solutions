import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const VerticalCarousel = () => {
  const col1 = [
    { img: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&q=80", title: "IT Services" },
    { img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&q=80", title: "Video Production" },
    { img: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=500&q=80", title: "Digital Marketing" },
    { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=500&q=80", title: "Smart Classroom" }
  ];
  
  const col2 = [
    { img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500&q=80", title: "E-Commerce" },
    { img: "https://images.unsplash.com/photo-1557992260-ec58e38d363c?w=500&q=80", title: "Surveillance" },
    { img: "https://images.unsplash.com/photo-1538108149393-cebb47ac17e9?w=500&q=80", title: "Healthcare" },
    { img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=500&q=80", title: "EduQuiz" }
  ];

  return (
    <div className="relative w-full h-[600px] overflow-hidden flex gap-4 justify-center items-center rounded-2xl shadow-2xl p-4 bg-white/5 backdrop-blur-sm border border-white/10">
      <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#6ca0d6] to-transparent z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#6ca0d6] to-transparent z-10 pointer-events-none"></div>

      <motion.div 
        className="flex flex-col w-1/2"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 15 }}
      >
        {[...col1, ...col1].map((item, i) => (
          <div key={`c1-${i}`} className="w-full pb-4">
            <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md group">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 z-10">
                 <span className="text-white font-bold font-sans text-lg tracking-wide inline-block">{item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div 
        className="flex flex-col w-1/2"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...col2, ...col2].map((item, i) => (
          <div key={`c2-${i}`} className="w-full pb-4">
            <div className="relative w-full h-48 rounded-xl overflow-hidden shadow-md group">
              <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 z-10">
                 <span className="text-white font-bold font-sans text-lg tracking-wide inline-block">{item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      preTitle: "NSG Solutions",
      title: "Delivering Innovative, High-Quality, and Affordable Solutions",
      btnText: "KNOW MORE",
      link: "/services"
    },
    {
      preTitle: "Our Vision",
      title: "Becoming Your Trusted Global Technology Partner",
      btnText: "EXPLORE SERVICES",
      link: "/services"
    },
    {
      preTitle: "Core Expertise",
      title: "Leading IT Services, Video Production, and Digital Marketing",
      btnText: "VIEW PORTFOLIO",
      link: "/portfolio"
    }
  ];

  // Auto-slide functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="relative w-full min-h-screen flex items-center bg-[#6ca0d6] overflow-hidden pt-24 md:pt-0">
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/hexellence.png')] opacity-30 mix-blend-multiply transition-all duration-1000"></div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full relative z-10 flex flex-col md:flex-row justify-between items-center h-full gap-10">
        
        {/* Dynamic Text Column */}
        <div className="md:w-1/2 flex flex-col items-start xl:pt-16 mt-16 md:mt-0 relative min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full flex flex-col items-start absolute top-0"
            >
              <div className="hidden md:flex flex-col items-start mb-6">
                <span className="text-white text-[16px] font-bold tracking-widest mb-1.5">{slides[currentSlide].preTitle.split(' ')[0]}</span>
                <div className="w-[3rem] h-[3px] bg-white mb-1.5"></div>
                <span className="text-white text-[16px] font-bold tracking-widest">{slides[currentSlide].preTitle.split(' ').slice(1).join(' ')}</span>
              </div>

              <div className="flex flex-col mb-10 w-full max-w-[900px]">
                <h1 className="text-[3rem] md:text-[4rem] lg:text-[4.5rem] xl:text-[5.5rem] font-infosys-heading text-white leading-[1.05] tracking-tight drop-shadow-sm pb-2">
                  {slides[currentSlide].title}
                </h1>
              </div>

              <Link to={slides[currentSlide].link} className="btn-outline border-[2px] mt-4 shadow-lg hover:shadow-xl cursor-pointer">
                {slides[currentSlide].btnText}
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Visual Column */}
        <div className="md:w-[45%] lg:w-[45%] xl:w-[40%] flex justify-center items-center md:h-[600px] relative mt-10 md:mt-0 w-full mb-20 md:mb-0">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
            className="w-full h-full min-h-[400px]"
          >
            <VerticalCarousel />
          </motion.div>
        </div>
      </div>

      {/* Interactive Pagination Dots */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex gap-4 z-20">
        {slides.map((_, i) => (
          <div 
            key={i} 
            onClick={() => setCurrentSlide(i)}
            className={`w-4 h-4 rounded-full cursor-pointer transition-all duration-300 flex items-center justify-center ${currentSlide === i ? 'bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] scale-110' : 'border-2 border-white/60 hover:border-white opacity-60 hover:opacity-100 scale-100'}`}
          ></div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
