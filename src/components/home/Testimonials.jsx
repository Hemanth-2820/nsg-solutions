import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const testimonials = [
  {
    miniTitle: "Unmatched Technical Scale",
    content: "NSG Solutions provided us with a technical framework that scaled perfectly as our global user base tripled. Their approach is truly world-class.",
    author: "ELENA RODRIGUEZ",
    company: "Future Systems Inc.",
    color: "bg-[#0164ff]",
    id: 1,
    marginTop: "20vh",
    marginLeft: "10%"
  },
  {
    miniTitle: "Precision Brand Identity",
    content: "The creative excellence at NSG is outstanding. They captured our brand identity with absolute precision and mastery, exceeding every corporate expectation.",
    author: "MARCUS CHEN",
    company: "Creative Connect Group",
    color: "bg-[#e50000]",
    id: 2,
    marginTop: "60vh",
    marginLeft: "50%"
  },
  {
    miniTitle: "A Trusted Global Partner",
    content: "Reliable, innovative, and cost-effective. NSG has become our trusted global partner for all transformation projects across 40 countries.",
    author: "SARAH JENKINS",
    company: "Streamline Global",
    color: "bg-[#003cff]",
    id: 3,
    marginTop: "60vh",
    marginLeft: "15%"
  },
  {
    miniTitle: "Seamless Cloud Migration",
    content: "Their infrastructure solutions reduced our costs by 40% while increasing performance and global reach for our enterprise platforms.",
    author: "DAVID WAGNER",
    company: "Wagner Logistics",
    color: "bg-[#007cc3]",
    id: 4,
    marginTop: "50vh",
    marginLeft: "60%"
  }
];

const TestimonialCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        marginTop: item.marginTop,
        marginLeft: item.marginLeft,
        width: "320px",
        height: "280px"
      }}
      className={`relative ${item.color} p-8 cursor-pointer shadow-2xl z-20 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-sm`}
    >
      {/* Accenture Line Pattern Overlay */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,0 50,50 T100,50" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M0,80 Q50,30 100,80" fill="none" stroke="white" strokeWidth="0.5" />
          <path d="M10,10 Q60,60 10,110" fill="none" stroke="white" strokeWidth="0.3" />
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col bg-transparent overflow-hidden">
        {/* Title layer - hidden on hover */}
        <div className={`transition-all duration-500 ease-in-out ${isHovered ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
          <h3 className="text-white font-bold text-3xl leading-tight tracking-[0.01em] bg-transparent">
            {item.miniTitle}
          </h3>
        </div>

        {/* Hover content layer - absolute centered/filled */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute inset-0 flex flex-col justify-between bg-transparent"
          >
            <div>
              <p className="text-white text-sm leading-relaxed mb-6 italic">
                "{item.content}"
              </p>
              <div className="pt-6 border-t border-white/20">
                <p className="font-bold text-lg text-white">{item.author}</p>
                <p className="text-white/50 text-[10px] uppercase tracking-widest font-bold tracking-[0.2em]">
                  {item.company}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="flex justify-end mt-auto relative z-20">
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white">
            <ArrowUpRight size={14} />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Testimonials = () => {
  return (
    <section className="relative bg-black h-auto">

      {/* STICKY TEXT LAYER (STAYS PINNED) */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center -z-0 overflow-hidden px-10">
        <h2 className="text-[4rem] md:text-[6rem] lg:text-[8rem] font-bold text-transparent bg-clip-text bg-gradient-to-br from-blue-600 via-white to-blue-400 tracking-tighter leading-[0.9] text-center select-none uppercase pointer-events-none opacity-30">
          VOICES OF <br /> SUCCESS
        </h2>
      </div>

      {/* SCROLLING CARDS LAYER (FLOWS OVER THE STICKY TEXT) */}
      <div className="relative z-10 w-full pb-[40vh] -mt-[100vh]">
        <div className="max-w-[1500px] mx-auto relative h-full">
          {testimonials.map((t) => (
            <TestimonialCard key={t.id} item={t} />
          ))}
        </div>
      </div>

    </section>
  );
};

export default Testimonials;
