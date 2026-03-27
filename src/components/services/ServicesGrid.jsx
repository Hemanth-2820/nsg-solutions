import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  Code,
  Cloud,
  Brain,
  Briefcase,
  ShoppingCart,
  Video,
  Film,
  Megaphone,
  TrendingUp,
  ArrowRight,
  Sparkles
} from "lucide-react";

const servicesData = [
  {
    id: "it",
    title: "IT Services",
    tag: "CORE",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80",
    shortDesc:
      "Scalable enterprise solutions powered by modern technologies.",
    subServices: [
      { name: "Software Development", icon: Code },
      { name: "Cloud Services", icon: Cloud },
      { name: "AI & Data Analytics", icon: Brain },
      { name: "IT Consulting", icon: Briefcase },
      { name: "E-commerce Solutions", icon: ShoppingCart }
    ]
  },
  {
    id: "creative",
    title: "Video Production",
    tag: "CREATIVE",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80",
    shortDesc: "High-quality storytelling.",
    subServices: [
      { name: "Corporate Films", icon: Video },
      { name: "Ad Films", icon: Film },
      { name: "Short Films", icon: Film },
      { name: "Product Films", icon: Video },
      { name: "Promotional Videos", icon: Megaphone }
    ]
  },
  {
    id: "marketing",
    title: "Digital Media Marketing",
    tag: "MARKETING",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    shortDesc: "Grow your digital presence.",
    subServices: [
      { name: "Brand Building", icon: TrendingUp },
      { name: "Social Media Marketing", icon: Megaphone },
      { name: "Performance Marketing", icon: TrendingUp }
    ]
  },
  {
    id: "publishing",
    title: "Publishing Solutions",
    tag: "EXTERNAL",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    shortDesc: "Research & knowledge platform.",
    redirect: "https://nsgpublishers.com"
  },
  {
    id: "enterprise",
    title: "Enterprise Strategy",
    tag: "CONSULTING",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80",
    shortDesc: "Corporate business architecture.",
    subServices: [
      { name: "Corporate Consulting", icon: Briefcase },
      { name: "Business Modeling", icon: TrendingUp },
      { name: "Strategic Transformation", icon: Brain }
    ]
  }
];

const ServicesGrid = () => {
  const [activeService, setActiveService] = useState(null);
  const detailsRef = useRef(null);
  const location = useLocation();

  // 🔥 DEEP LINK LOGIC: Automatically open service from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const serviceId = params.get('service');
    
    if (serviceId) {
      const found = servicesData.find(s => s.id === serviceId);
      if (found) {
        setActiveService(found);
        setTimeout(() => {
          detailsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 500);
      }
    }
  }, [location.search]);

  return (
    <section className="relative py-32 bg-[#f6e1f7] text-[#0f172a] overflow-hidden">

      {/* 🔥 Clean Grid Background for Light Theme */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle,#007cc3_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10 font-sans">

        {/* Heading */}
        <div className="mb-24 flex items-center gap-6">
          <div className="w-24 h-[3px] bg-gradient-to-r from-[#007cc3] to-purple-400"></div>
          <span className="text-[#007cc3] font-black tracking-[0.3em] uppercase text-[13px]">
            Our Capabilities Matrix
          </span>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">

          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}

              whileHover={{
                y: -15,
                scale: 1.02
              }}

              onClick={() => {
                if (service.redirect) {
                  window.open(service.redirect, "_blank");
                } else {
                  setActiveService(service);
                  setTimeout(() => {
                    detailsRef.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "center"
                    });
                  }, 100);
                }
              }}

              className="
                group cursor-pointer
                bg-white
                border border-white/50
                rounded-[2.5rem] overflow-hidden
                transition-all duration-500
                shadow-[0_15px_45px_rgba(0,0,0,0.05)]
                hover:shadow-[0_30px_70px_rgba(0,124,195,0.15)]
              "
            >

              {/* IMAGE */}
              <div
                className="relative h-[240px] overflow-hidden"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-[2s]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>

                <span className="absolute top-6 left-6 bg-white/90 backdrop-blur px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20 text-[#0f172a]">
                  {service.tag}
                </span>
              </div>

              {/* CONTENT */}
              <div
                className="p-10"
              >
                <h3 className="text-[1.6rem] font-bold mb-4 group-hover:text-[#007cc3] transition-colors leading-tight">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-[1rem] leading-relaxed font-light">
                  {service.shortDesc}
                </p>

                <div className="mt-8 flex items-center text-[#007cc3] font-bold text-xs tracking-widest uppercase gap-2 opacity-50 group-hover:opacity-100 transition-all duration-500">
                  EXPLORE DETAILS <ArrowRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}

        </div>

        {/* DETAILS SECTION */}
        {activeService && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mt-24
              bg-white
              border border-white/50
              rounded-[2.5rem] p-12
              shadow-[0_40px_100px_rgba(0,0,0,0.08)]
              relative z-20
            "
          >

            <button
              onClick={() => setActiveService(null)}
              className="mb-8 flex items-center gap-2 text-[#007cc3] font-black text-xs uppercase tracking-widest hover:-translate-x-2 transition-transform duration-300"
            >
              <ArrowRight size={14} className="rotate-180" /> Back to Matrix
            </button>

            <h2 className="text-4xl font-black text-[#0f172a] mb-16 tracking-tight">
              {activeService.title}
            </h2>

            {/* 🔥 SUB SERVICES (INNOVATIVE TECH CARDS) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

              {activeService.subServices?.map((item, i) => {
                const Icon = item.icon;

                const gradients = [
                  "from-[#007cc3] to-cyan-500",
                  "from-purple-600 to-indigo-600",
                  "from-emerald-600 to-teal-500",
                  "from-orange-500 to-rose-600",
                  "from-blue-700 to-indigo-800"
                ];

                const bg = gradients[i % gradients.length];

                return (
                  <motion.div
                    key={i}
                    whileHover={{
                      scale: 1.05,
                      y: -12
                    }}
                    className={`
                      group relative h-[210px]
                      rounded-[2rem] flex flex-col items-center justify-center text-center
                      bg-gradient-to-br ${bg}
                      transition-all duration-700
                      shadow-[0_20px_50px_rgba(0,0,0,0.15)]
                      cursor-pointer overflow-hidden
                    `}
                  >
                    {/* Hexagonal Tech Background Overlay */}
                    <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none group-hover:scale-110 transition-transform duration-[2s]">
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <pattern id={`hex-sub-${i}`} width="30" height="50" patternUnits="userSpaceOnUse">
                            <path d="M15 0L30 8.5V25.5L15 34L0 25.5V8.5L15 0Z" fill="none" stroke="white" strokeWidth="0.5" />
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#hex-sub-${i})`} />
                      </svg>
                    </div>

                    {/* Floating Glass Icon Container */}
                    <div className="relative z-10 mb-5 p-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl group-hover:rotate-[360deg] transition-transform duration-700">
                      <Icon size={38} className="text-white" />
                    </div>

                    {/* Bold Typography */}
                    <h4 className="relative z-10 text-[1.2rem] font-black text-white px-8 tracking-tight leading-tight group-hover:scale-110 transition-transform duration-500">
                      {item.name}
                    </h4>

                    {/* Corner Accent Glow */}
                    <div className="absolute -top-10 -right-10 w-24 h-24 bg-white/10 blur-2xl rounded-full group-hover:bg-white/30 transition-all duration-500"></div>
                  </motion.div>
                );
              })}

            </div>

          </motion.div>
        )}

      </div>
    </section>
  );
};

export default ServicesGrid;