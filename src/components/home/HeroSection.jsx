import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import heroBg from '../../assets/hero_bg.png';

const VerticalCarousel = () => {
  const [col1, setCol1] = useState([]);
  const [col2, setCol2] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const res = await fetch('/api/get_highlights.php');
        const data = await res.json();
        if (data.status === 'success') {
          // Add default fallback if DB is empty but we should have data from setup
          setCol1(data.data.left || []);
          setCol2(data.data.right || []);
        }
      } catch (err) {
        console.error("Failed to fetch highlights:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHighlights();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full h-[650px] flex items-center justify-center bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full h-[280px] lg:h-[650px] overflow-hidden flex gap-2 lg:gap-6 p-1 lg:p-6 bg-white/5 backdrop-blur-[20px] rounded-[2rem] lg:rounded-[2.5rem] border border-white/10 shadow-[0_30px_100px_rgba(0,0,0,0.5)]"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
      }}
    >
      {/* Decorative Orbs */}
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 blur-[80px] rounded-full"></div>
      <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 blur-[80px] rounded-full"></div>

      <motion.div
        className="flex flex-col w-1/2"
        animate={{ y: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...col1, ...col1].map((item, i) => (
          <div key={`c1-${i}`} className="w-full pb-2 md:pb-6">
            <div className="relative w-full h-32 md:h-64 rounded-xl md:rounded-3xl overflow-hidden shadow-2xl group border border-white/5">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-3 left-3 md:bottom-6 md:left-6">
                <span className="text-white font-black text-sm md:text-3xl tracking-tight opacity-90">{item.title}</span>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      <motion.div
        className="flex flex-col w-1/2 pt-8 md:pt-12"
        animate={{ y: ["-50%", "0%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
      >
        {[...col2, ...col2].map((item, i) => (
          <div key={`c2-${i}`} className="w-full pb-2 md:pb-6">
            <div className="relative w-full h-32 md:h-64 rounded-xl md:rounded-3xl overflow-hidden shadow-2xl group border border-white/5">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
              <div className="absolute bottom-2 left-3 md:bottom-5 md:left-6">
                <span className="text-white font-bold text-sm md:text-3xl tracking-tight opacity-90">{item.title}</span>
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
      preTitle: "Transforming Business",
      title: "Delivering Innovative Digital Solutions",
      highlight: "Digital Solutions",
      btnText: "KNOW MORE",
      link: "/services"
    },
    {
      preTitle: "Global Excellence",
      title: "Your Trusted Technology Partner",
      highlight: "Technology Partner",
      btnText: "EXPLORE SERVICES",
      link: "/services"
    },
    {
      preTitle: "Multi-Vertical Expertise",
      title: "Impactful IT and Media Strategies",
      highlight: "Media Strategies",
      btnText: "VIEW PORTFOLIO",
      link: "/portfolio"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section
      className="relative w-full min-h-0 lg:min-h-screen flex items-center overflow-hidden pt-24 md:pt-0"
      style={{ background: 'linear-gradient(135deg, #0B0F2F, #1A1F5A, #2C1983)' }}
    >

      {/* PREMIUM BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <img
            src={heroBg}
            alt="NSG Background"
            className="w-full h-full object-cover opacity-60 mix-blend-soft-light filter brightness-75 scale-110"
          />
        </motion.div>

        {/* Dynamic Mesh Gradient Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#1e3a8a]/30 blur-[150px] rounded-full mix-blend-screen animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#5bb8e4]/20 blur-[150px] rounded-full mix-blend-screen animate-pulse delay-700"></div>

        {/* Subtle Gradient Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F2F]/80 via-[#0B0F2F]/40 to-transparent"></div>

        {/* High-Tech Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 w-full relative z-10 flex flex-col lg:flex-row lg:justify-between items-center h-full gap-8 lg:gap-20">

        {/* TEXT CONTENT COLUMN */}
        <div className="lg:w-1/2 flex flex-col justify-center items-center lg:items-start min-h-0 lg:min-h-screen text-center lg:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center lg:items-start py-6 lg:py-20"
            >
              {/* Animated Label */}
              <div className="flex items-center gap-4 mb-4 md:mb-8 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  className="h-[2px] md:h-[3px] bg-blue-500 rounded-full"
                ></motion.div>
                <span className="text-white text-[10px] md:text-[14px] font-bold tracking-[0.4em] uppercase opacity-70">
                  {slides[currentSlide].preTitle}
                </span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: 60 }}
                  className="h-[2px] md:h-[3px] bg-blue-500 rounded-full lg:hidden"
                ></motion.div>
              </div>

              {/* Bold Typography Title - Sleek & Compact */}
              <h1 className="text-[1.8rem] sm:text-[2.5rem] md:text-[3.8rem] lg:text-[3.5rem] xl:text-[4.5rem] font-black text-white leading-tight md:leading-[0.95] tracking-tighter mb-6 md:mb-12">
                {slides[currentSlide].title.split(' ').map((word, index) => {
                  const isHighlight = slides[currentSlide].highlight.includes(word);
                  return (
                    <span
                      key={index}
                      className={`inline-block mr-2 md:mr-4 ${isHighlight ? "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-blue-600" : "text-white"}`}
                    >
                      {word}
                    </span>
                  );
                })}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* VISUAL CAROUSEL COLUMN */}
        <div className="lg:w-[45%] xl:w-[42%] w-full flex justify-center items-center py-6 lg:py-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative group"
          >
            {/* Background Glow behind Carousel */}
            <div className="absolute inset-0 bg-blue-600/20 blur-[100px] rounded-full scale-90 group-hover:scale-100 transition-transform duration-1000"></div>

            <div className="h-[300px] lg:h-[650px] w-full relative">
              <VerticalCarousel />
            </div>
          </motion.div>
        </div>
      </div>

      {/* MODERN PAGINATION INDICATORS */}
      <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 hidden md:flex flex-col gap-6 z-20">
        {slides.map((_, i) => (
          <div
            key={i}
            onClick={() => setCurrentSlide(i)}
            className="group cursor-pointer flex items-center gap-4"
          >
            <span className={`text-[10px] font-bold tracking-widest transition-all duration-500 ${currentSlide === i ? 'text-white opacity-100' : 'text-white/30 group-hover:text-white/60 opacity-0 group-hover:opacity-100'}`}>
              0{i + 1}
            </span>
            <div className={`h-16 w-[3px] rounded-full transition-all duration-700 ${currentSlide === i ? 'bg-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.8)] h-24' : 'bg-white/10 group-hover:bg-white/30'}`}></div>
          </div>
        ))}
      </div>

    </section>
  );
};

export default HeroSection;
