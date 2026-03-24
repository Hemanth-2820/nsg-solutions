import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "NSG gave me the opportunity to work on AI solutions deployed at a global scale. The learning curve is steep — and that's exactly what I wanted. The mentorship culture here is unmatched.",
    name: 'Priya Shankar',
    role: 'Senior AI Engineer, Hyderabad',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80',
  },
  {
    quote: "Three years in and I have led cloud migration projects across four continents. The exposure NSG gives early-career professionals is something you simply cannot find anywhere else.",
    name: 'Marcus Webb',
    role: 'Cloud Architect, London',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&q=80',
  },
  {
    quote: "The culture of belonging here is real — not just a poster on the wall. I feel valued for who I am as much as what I deliver. That makes all the difference.",
    name: 'Aisha Morten',
    role: 'UX Design Lead, Remote',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80',
  },
  {
    quote: "Moving from a startup to NSG felt like leveling up in every dimension — the projects are bigger, the team is sharper, and the impact is real. Best career decision I ever made.",
    name: 'Rohan Mehta',
    role: 'DevOps Engineer, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&q=80',
  },
];

const CareersTestimonials = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx(i => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIdx(i => (i + 1) % testimonials.length);

  const t = testimonials[idx];

  return (
    <section className="bg-gradient-to-br from-[#0f172a] to-[#1e3a8a] py-28 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0d9488] blur-[300px] opacity-10 rounded-full pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-[2px] bg-[#2dd4bf]"></div>
            <span className="text-[#2dd4bf] font-bold tracking-[0.3em] uppercase text-[11px]">Our People</span>
            <div className="w-8 h-[2px] bg-[#2dd4bf]"></div>
          </div>
          <h2 className="text-[2.8rem] md:text-[4rem] font-infosys-heading text-white tracking-tight leading-tight">
            Hear from the <span className="text-[#2dd4bf]">team</span>
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-12 md:p-16 text-center"
            >
              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-8 ring-4 ring-[#2dd4bf]/40 shadow-lg">
                <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
              </div>

              {/* Quote mark */}
              <div className="text-[#2dd4bf] text-[5rem] font-serif leading-none -mt-4 mb-2 opacity-40">"</div>

              <p className="text-white/90 text-[1.25rem] md:text-[1.4rem] font-light leading-[1.8] mb-10 italic">
                {t.quote}
              </p>

              <p className="text-white font-bold text-[1.1rem]">{t.name}</p>
              <p className="text-[#2dd4bf] text-[13px] uppercase tracking-widest font-bold mt-1">{t.role}</p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            {/* Dots */}
            <div className="flex gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`rounded-full transition-all duration-300 ${i === idx ? 'bg-[#2dd4bf] w-8 h-3' : 'bg-white/30 w-3 h-3 hover:bg-white/60'}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-white/10 hover:border-white/40 transition-all"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareersTestimonials;
