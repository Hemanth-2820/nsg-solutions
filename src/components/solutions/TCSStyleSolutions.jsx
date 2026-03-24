import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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

const TCSStyleSolutions = () => {
  const scrollRef = useRef(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -400, behavior: 'smooth' });
  };

  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 400, behavior: 'smooth' });
  };

  return (
    <section className="bg-white py-24 pb-32">
      <div className="max-w-[1600px] mx-auto px-6 lg:px-12">
        
        {/* Header exact match to TCS layout */}
        <div className="flex justify-between items-center mb-10 w-full">
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
                    className="min-w-[85vw] md:min-w-[380px] h-[520px] rounded-[1.2rem] relative overflow-hidden flex-shrink-0 snap-start group cursor-pointer"
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
                    <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 z-20 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                        <h3 className="text-white text-[1.8rem] md:text-[2.2rem] font-sans font-medium mb-3 tracking-tight">
                            {item.title}
                        </h3>
                        <p className="text-white/80 text-[1.05rem] md:text-[1.1rem] font-light leading-[1.6]">
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
  );
};

export default TCSStyleSolutions;
