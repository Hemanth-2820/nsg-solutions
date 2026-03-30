import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

const staticTestimonials = [
  {
    miniTitle: "Unmatched Technical Scale",
    content: "NSG Solutions provided us with a technical framework that scaled perfectly as our global user base tripled. Their approach is truly world-class.",
    author: "ELENA RODRIGUEZ",
    company: "Future Systems Inc.",
    color: "bg-[#0164ff]",
    id: 1
  },
  {
    miniTitle: "Precision Brand Identity",
    content: "The creative excellence at NSG is outstanding. They captured our brand identity with absolute precision and mastery, exceeding every corporate expectation.",
    author: "MARCUS CHEN",
    company: "Creative Connect Group",
    color: "bg-[#e50000]",
    id: 2
  },
  {
    miniTitle: "A Trusted Global Partner",
    content: "Reliable, innovative, and cost-effective. NSG has become our trusted global partner for all transformation projects across 40 countries.",
    author: "SARAH JENKINS",
    company: "Streamline Global",
    color: "bg-[#003cff]",
    id: 3
  },
  {
    miniTitle: "Seamless Cloud Migration",
    content: "Their infrastructure solutions reduced our costs by 40% while increasing performance and global reach for our enterprise platforms.",
    author: "DAVID WAGNER",
    company: "Wagner Logistics",
    color: "bg-[#007cc3]",
    id: 4
  }
];

const TestimonialCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex-shrink-0 w-[240px] sm:w-[280px] aspect-square ${item.color} p-7 flex flex-col justify-between shadow-2xl snap-center relative overflow-hidden group rounded-sm cursor-pointer`}
    >
      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M0,80 Q50,30 100,80" fill="none" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col overflow-hidden">
        {/* Resting View - Title */}
        <div className={`transition-all duration-500 ease-in-out ${isHovered ? 'opacity-0 -translate-y-4 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
          <h3 className="text-white font-bold text-3xl leading-tight tracking-tight bg-transparent pr-4">
            {item.miniTitle}
          </h3>
        </div>

        {/* Hover View - Content */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="absolute inset-x-0 top-0 flex flex-col justify-between bg-transparent h-auto"
            >
              <div>
                <p className="text-white text-xs sm:text-[13px] leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
                <div className="pt-4 border-t border-white/20">
                  <p className="font-bold text-lg text-white uppercase italic tracking-tight">{item.author}</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold tracking-[0.2em]">
                      {item.company}
                    </p>
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (item.rating || 5) ? 'bg-white' : 'bg-white/10'}`}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-end mt-auto relative z-20">
          <div className={`w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white transition-all duration-500 ${isHovered ? 'bg-white text-black rotate-45 border-white' : ''}`}>
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  const containerRef = useRef(null);
  const [dynamicTestimonials, setDynamicTestimonials] = useState([]);

  useEffect(() => {
    const fetchApproved = async () => {
      try {
        const response = await fetch('/api/get_testimonials.php');
        const data = await response.json();
        if (data.status === 'success') {
          // Normalize DB data to match the UI structure
          const normalized = data.data.map((item, idx) => ({
            id: item.id || `db-${idx}`,
            miniTitle: item.service_name || "Project Excellence",
            content: item.content,
            rating: item.rating,
            author: item.client_name,
            company: item.company || 'Enterprise Partner',
            color: ["bg-[#007cc3]", "bg-[#0164ff]", "bg-[#e50000]", "bg-[#003cff]"][idx % 4]
          }));
          setDynamicTestimonials(normalized);
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
      }
    };
    fetchApproved();
  }, []);

  // Merge Static and Dynamic
  const allTestimonials = [...staticTestimonials, ...dynamicTestimonials];

  const scroll = (direction) => {
    const { current } = containerRef;
    const scrollAmount = 350; // Width + Gap
    if (direction === 'left') {
      current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-black py-20 lg:py-0 lg:h-[150vh]">

      {/* STICKY TEXT LAYER (STAYS PINNED) - HIDDEN OR STATIC ON MOBILE */}
      <div className="relative lg:sticky top-0 h-auto lg:h-screen w-full flex items-center justify-center -z-0 overflow-hidden px-10 py-10 lg:py-0">
        <h2 className="text-[2.5rem] sm:text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-white to-blue-400 tracking-tighter leading-[0.9] text-center select-none uppercase pointer-events-none opacity-30">
          VOICES OF <br /> SUCCESS
        </h2>
      </div>

      {/* HORIZONTAL CAROUSEL LAYER (FLOWS OVER THE STICKY TEXT) */}
      <div className="relative z-10 w-full lg:-mt-[60vh] pb-10 lg:pb-32 overflow-hidden">
        <div className="max-w-[1400px] mx-auto px-6 relative flex flex-col items-center">

          <div className="flex items-center w-full justify-center gap-6 sm:gap-10">
            {/* LEFT ARROW NAVIGATION */}
            <button
              onClick={() => scroll('left')}
              className="hidden sm:flex text-white/30 hover:text-white transition-colors"
              aria-label="Previous Testimonial"
            >
              <ArrowLeft size={64} strokeWidth={1} />
            </button>

            {/* SCROLLING CARDS CONTAINER */}
            <div
              ref={containerRef}
              className="flex gap-10 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 sm:px-10 py-10 w-full max-w-[1100px]"
            >
              {allTestimonials.map((item) => (
                <TestimonialCard key={item.id} item={item} />
              ))}
            </div>

            {/* RIGHT ARROW NAVIGATION */}
            <button
              onClick={() => scroll('right')}
              className="hidden sm:flex text-white/30 hover:text-white transition-colors"
              aria-label="Next Testimonial"
            >
              <ArrowRight size={64} strokeWidth={1} />
            </button>
          </div>

        </div>
      </div>

      {/* ADD SMOOTH SCROLL HIDE STYLE */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
};

export default Testimonials;
