import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const solutionsData = [
  { 
    id: 1, 
    title: 'Strategy', 
    desc: 'Enables you to navigate cloud with a framework aligned to your business goals.', 
    img: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80' 
  },
  { 
    id: 2, 
    title: 'Foundation', 
    desc: 'Helps define, design, and deploy cloud foundation services to drive maximum business value.', 
    img: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800&q=80' 
  },
  { 
    id: 3, 
    title: 'Migration', 
    desc: 'Facilitates frictionless migration of applications to public, private, and hybrid cloud ecosystems.', 
    img: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80' 
  },
  { 
    id: 4, 
    title: 'Modernization', 
    desc: 'Accelerates application transformation utilizing decentralized microservices and scalable containers.', 
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80' 
  },
  { 
    id: 5, 
    title: 'Security', 
    desc: 'Integrates zero-trust native security models and compliance governance across global data environments.', 
    img: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80' 
  },
  { 
    id: 6, 
    title: 'Data & AI', 
    desc: 'Harnesses predictive analytics, robust data lakes, and generative AI for exponential operational output.', 
    img: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80' 
  },
  { 
    id: 7, 
    title: 'Edge Computing', 
    desc: 'Unifies edge-to-core infrastructure for extreme computing demands and ultra-low latency requirements.', 
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80' 
  },
  { 
    id: 8, 
    title: 'Sustainability', 
    desc: 'Drives radical carbon-neutral IT transformations using highly optimized proprietary cloud architectures.', 
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80' 
  },
  { 
    id: 9, 
    title: 'AIOps', 
    desc: 'Automates highly complex enterprise NOC workflows via interconnected autonomous intelligent agents.', 
    img: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80' 
  }
];

const projectsData = [
  { id: 1, title: 'IT Services', img: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80', path: '/solutions/itservices' },
  { id: 2, title: 'Video Production', img: 'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=800&q=80', path: '/solutions/videoproduction' },
  { id: 3, title: 'Digital Marketing', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', path: '/solutions/digitalmarketing' },
  { id: 4, title: 'Publishing', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80', path: '/solutions/publishing' }
];

const TCSStyleSolutions = () => {
  const scrollRef = useRef(null);
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  // Root Page level swipe navigation implementation logic
  useEffect(() => {
    let isNavigated = false;
    let touchStartX = 0;
    const mountTime = Date.now();
    
    const handleSwipeNavigation = (direction) => {
      if (isNavigated) return;
      // Critical block: Trackpad inertia keeps firing scroll events for ~1000ms after the physical swipe ends.
      // Ignoring wheel/swipe events instantly after mounting prevents 'skipping' through multiple pages at once!
      if (Date.now() - mountTime < 1000) return;

      isNavigated = true;
      if (direction === 'next') navigate('/solutions/itservices');
      if (direction === 'prev') navigate('/services');
    };

    const handleSwipeWheel = (e) => {
      // Vital: If user is actively hovering over our inner horizontal scroll 
      // container, return instantly to block sudden unexpected routing behavior!
      if (scrollRef.current && scrollRef.current.contains(e.target)) return;

      if (Math.abs(e.deltaX) > 40 && Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        if (e.deltaX > 0) handleSwipeNavigation('next');
        else handleSwipeNavigation('prev');
      }
    };

    const handleSwipeTouchStart = (e) => {
        touchStartX = e.changedTouches[0].screenX;
    };
    
    const handleSwipeTouchEnd = (e) => {
        if (scrollRef.current && scrollRef.current.contains(e.target)) return;

        const touchEndX = e.changedTouches[0].screenX;
        if (touchEndX < touchStartX - 50) handleSwipeNavigation('next');
        else if (touchEndX > touchStartX + 50) handleSwipeNavigation('prev');
    };

    window.addEventListener('wheel', handleSwipeWheel, { passive: true });
    window.addEventListener('touchstart', handleSwipeTouchStart, { passive: true });
    window.addEventListener('touchend', handleSwipeTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleSwipeWheel);
      window.removeEventListener('touchstart', handleSwipeTouchStart);
      window.removeEventListener('touchend', handleSwipeTouchEnd);
    };
  }, [navigate]);

  // Two-Phase Tour Sequence Effect for the "Explore Solutions" button
  useEffect(() => {
    const exploreLinks = document.querySelectorAll('a[href="/solutions#explore"], a[href="#explore"]');
    
    const handleExploreClick = (e) => {
      e.preventDefault();
      
      const viewportHeight = window.innerHeight;
      const totalScrollHeight = document.body.scrollHeight;
      const totalSteps = Math.ceil(totalScrollHeight / viewportHeight) - 1; 

      let currentStep = 1;

      // Recursive function to step down the page showcasing "each content once"
      const executeNextTourStep = () => {
        if (currentStep <= totalSteps) {
           // Scroll exactly one viewport slice down smoothly
           const yOffset = currentStep * viewportHeight;
           window.scrollTo({ top: yOffset, behavior: 'smooth' });
           
           currentStep++;
           
           // Enforce a hard 1.5-second sequence pause per content slice
           setTimeout(executeNextTourStep, 1500); 
        } else {
           // Upon finishing the entire full-page tour sequentially, snap to the final section required
           setTimeout(() => {
             const whatWeDidSection = document.getElementById('what-we-did');
             if (whatWeDidSection) {
               const sectionTarget = whatWeDidSection.getBoundingClientRect().top + window.scrollY - 80;
               window.scrollTo({ top: sectionTarget, behavior: 'smooth' });
             }
           }, 800); // Slight delay at the very bottom
        }
      };

      // Initiate the 1.5-second sequential step tour starting exactly below the active hero banner
      executeNextTourStep();
    };

    exploreLinks.forEach(link => link.addEventListener('click', handleExploreClick));
    return () => exploreLinks.forEach(link => link.removeEventListener('click', handleExploreClick));
  }, []);

  useEffect(() => {
    // Find the 'Scroll to explore' text element from the Hero section
    // We attach the event listener here to strictly adhere to the instruction
    // of ONLY modifying the src/components/solutions directory.
    const spans = document.querySelectorAll('span');
    let scrollButtonContainer = null;
    
    for (const span of Array.from(spans)) {
      if (span.textContent.trim().toLowerCase() === 'scroll to explore') {
        scrollButtonContainer = span.parentElement;
        break;
      }
    }

    const handleScrollClick = () => {
      if (sectionRef.current) {
        // Native scroll into view cleanly respecting scroll-margin-top
        sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (scrollButtonContainer) {
        scrollButtonContainer.style.cursor = 'pointer';
        scrollButtonContainer.style.pointerEvents = 'auto'; // Ensure it captures clicks
        scrollButtonContainer.addEventListener('click', handleScrollClick);
    }

    return () => {
      if (scrollButtonContainer) {
        scrollButtonContainer.removeEventListener('click', handleScrollClick);
        scrollButtonContainer.style.cursor = '';
      }
    };
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current && scrollRef.current.firstElementChild) {
        const cardWidth = scrollRef.current.firstElementChild.clientWidth;
        const gap = parseInt(window.getComputedStyle(scrollRef.current).gap) || 24;
        scrollRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current && scrollRef.current.firstElementChild) {
        const cardWidth = scrollRef.current.firstElementChild.clientWidth;
        const gap = parseInt(window.getComputedStyle(scrollRef.current).gap) || 24;
        scrollRef.current.scrollBy({ left: (cardWidth + gap), behavior: 'smooth' });
    }
  };

  return (
    <>
      <section 
        ref={sectionRef} 
        className="bg-white pt-4 pb-8 relative" 
        style={{ scrollMarginTop: '80px' }}
      >
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Header exact match to TCS layout */}
        <div className="flex justify-between items-center mb-4 w-full">
            <h2 className="text-[2.5rem] md:text-[3.2rem] text-[#111] font-sans font-light tracking-tight">
                Our solutions
            </h2>
            <div className="hidden md:flex items-center gap-4">
                <button onClick={scrollLeft} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-gray-500">
                    <ArrowLeft size={24} strokeWidth={1.5} />
                </button>
                <button onClick={scrollRight} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors text-black">
                    <ArrowRight size={24} strokeWidth={1.5} />
                </button>
            </div>
        </div>

        {/* Carousel Container */}
        <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-10 snap-x snap-mandatory hide-scroll-bar"
            style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
        >
            {solutionsData.map((item, index) => (
                <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="w-[85vw] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] xl:w-[calc(25%-18px)] h-[380px] md:h-[400px] lg:h-[420px] xl:h-[440px] rounded-[1.2rem] relative overflow-hidden flex-shrink-0 snap-start group cursor-pointer"
                >
                    {/* Background Image Image */}
                    <img 
                        src={item.img} 
                        alt={item.title} 
                        className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                    />

                    {/* Gradient Overlay for bottom text completely matching TCS */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>
                    
                    {/* Subtle Top glow (optional but adds depth) */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content Block forced to bottom */}
                    <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 z-20 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-white text-[1.5rem] md:text-[1.8rem] lg:text-[2rem] font-sans font-medium mb-2 tracking-tight">
                            {item.title}
                        </h3>
                        <p className="text-white/80 text-[0.95rem] md:text-[1rem] font-light leading-[1.6]">
                            {item.desc}
                        </p>
                    </div>

                </motion.div>
            ))}
        </div>

      </div>
      
      {/* Small inline style to hide scrollbar for webkit (Chrome/Safari) */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scroll-bar::-webkit-scrollbar {
          display: none;
        }
      `}} />
      </section>

      <section id="what-we-did" className="bg-white border-t border-gray-100 pt-10 pb-24 px-6 md:px-12">
        <div className="max-w-[1500px] mx-auto font-sans">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-[2px] bg-[#1e3a8a]"></div>
                <span className="text-[#1e3a8a] font-bold tracking-[0.3em] text-[11px] uppercase">what we did</span>
            </div>
            <h2 className="text-[2.8rem] md:text-[3.5rem] font-infosys-heading font-medium tracking-tight mb-16 leading-tight text-[#111] capitalize">
                projects we had done till now
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projectsData.map((project, idx) => (
                  <Link to={project.path} key={project.id} className="block w-full outline-none">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: idx * 0.1, duration: 0.6 }}
                        // Swapped portrait aspect-[3/4] to landscape aspect-video / aspect-[4/3] to look great in 2-column spread.
                        className="relative w-full aspect-video md:aspect-[4/3] lg:aspect-[16/10] rounded-2xl overflow-hidden group cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
                    >
                        {/* Background Image */}
                        <img 
                            src={project.img} 
                            alt={project.title} 
                            className="absolute inset-0 w-full h-full object-cover transform scale-[1.03] group-hover:scale-[1.12] transition-transform duration-[1.5s] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                        />

                        {/* Gradient Overlay for Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent z-10 transition-opacity duration-500 group-hover:opacity-90"></div>
                        
                        {/* Title text resting at bottom */}
                        <div className="absolute bottom-8 left-8 right-8 z-20 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                            <h3 className="text-white text-[1.4rem] md:text-[1.6rem] font-sans font-medium tracking-tight leading-snug">
                                {project.title}
                            </h3>
                            <div className="mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                <span className="text-white/90 font-bold tracking-[0.1em] font-sans uppercase text-[10px] flex items-center gap-2 group-hover:gap-3 transition-all">
                                    Explore Project <ArrowRight size={14} strokeWidth={2.5} />
                                </span>
                            </div>
                        </div>
                    </motion.div>
                  </Link>
                ))}
            </div>
        </div>
      </section>
    </>
  );
};

export default TCSStyleSolutions;
