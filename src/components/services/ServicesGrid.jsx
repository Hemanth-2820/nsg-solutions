import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Cloud,
  Brain,
  Briefcase,
  ShoppingCart,
  Video,
  Film,
  Megaphone,
  TrendingUp
} from "lucide-react";

const servicesData = [
  {
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
    title: "Publishing",
    tag: "EXTERNAL",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    shortDesc: "Research & knowledge platform.",
    redirect: "https://nsgpublishers.com"
  }
];

const ServicesGrid = () => {
  const [activeService, setActiveService] = useState(null);
  const detailsRef = useRef(null);

  return (
    <section className="relative py-28 bg-gradient-to-br from-[#0f172a] via-[#020617] to-black text-white overflow-hidden">

      {/* 🔥 Glow Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-500/20 blur-[120px] rounded-full"></div>

      {/* 🔥 Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full bg-[radial-gradient(circle,#3b82f6_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">

        {/* Heading */}
        <div className="mb-20 flex items-center gap-4">
          <div className="w-20 h-[2px] bg-gradient-to-r from-blue-400 to-purple-500"></div>
          <span className="text-blue-400 font-bold tracking-[0.25em] uppercase text-[12px]">
            Our Capabilities Matrix
          </span>
        </div>

        {/* SERVICES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}

              whileHover={{
                scale: 1.05,
                rotateX: 10,
                rotateY: -10
              }}

              style={{
                transformStyle: "preserve-3d",
                perspective: 1200
              }}

              onClick={() => {
                if (service.redirect) {
                  window.open(service.redirect, "_blank");
                } else {
                  setActiveService(service);
                  setTimeout(() => {
                    detailsRef.current?.scrollIntoView({
                      behavior: "smooth"
                    });
                  }, 100);
                }
              }}

              className="
                group cursor-pointer
                bg-white/5 backdrop-blur-xl
                border border-white/10
                rounded-2xl overflow-hidden
                transition-all duration-500
                hover:shadow-[0_30px_100px_rgba(0,150,255,0.5)]
              "
            >

              {/* IMAGE */}
              <div
                className="relative h-[220px] overflow-hidden"
                style={{ transform: "translateZ(60px)" }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-[1.5s]"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>

                <span className="absolute top-4 left-4 bg-white/10 backdrop-blur px-4 py-1 text-xs uppercase tracking-wider rounded-full border border-white/20">
                  {service.tag}
                </span>
              </div>

              {/* CONTENT */}
              <div
                className="p-8"
                style={{ transform: "translateZ(80px)" }}
              >
                <h3 className="text-[1.4rem] font-semibold mb-3 group-hover:text-blue-400 transition">
                  {service.title}
                </h3>

                <p className="text-gray-400 text-sm">
                  {service.shortDesc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

        {/* DETAILS SECTION */}
        {activeService && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="
              mt-24
              bg-white/5 backdrop-blur-xl
              border border-white/10
              rounded-3xl p-12
              shadow-[0_0_60px_rgba(0,0,0,0.5)]
            "
          >

            <button
              onClick={() => setActiveService(null)}
              className="mb-6 text-blue-400 text-xs uppercase tracking-wider"
            >
              ← Back
            </button>

            <h2 className="text-3xl font-semibold mb-12">
              {activeService.title}
            </h2>

            {/* 🔥 SUB SERVICES (3D + COLORFUL) */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

              {activeService.subServices?.map((item, i) => {
                const Icon = item.icon;

                const gradients = [
                  "from-blue-500 to-cyan-400",
                  "from-purple-500 to-pink-500",
                  "from-green-400 to-emerald-600",
                  "from-orange-400 to-red-500",
                  "from-indigo-500 to-blue-700"
                ];

                const glowColors = [
                  "rgba(59,130,246,0.6)",
                  "rgba(168,85,247,0.6)",
                  "rgba(16,185,129,0.6)",
                  "rgba(249,115,22,0.6)",
                  "rgba(99,102,241,0.6)"
                ];

                const bg = gradients[i % gradients.length];
                const glow = glowColors[i % glowColors.length];

                return (
                  <motion.div
                    key={i}

                    whileHover={{
                      rotateX: 12,
                      rotateY: -12,
                      scale: 1.08
                    }}

                    style={{
                      transformStyle: "preserve-3d",
                      perspective: 1200
                    }}

                    className={`
                      group relative h-[220px]
                      rounded-2xl flex flex-col items-center justify-center text-center
                      bg-gradient-to-br ${bg}
                      transition-all duration-500
                    `}
                  >

                    {/* Glow */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition"
                      style={{ boxShadow: `0 30px 80px ${glow}` }}
                    ></div>

                    {/* Glass */}
                    <div className="absolute inset-0 bg-white/10 backdrop-blur-xl rounded-2xl"></div>

                    {/* Icon */}
                    <div style={{ transform: "translateZ(60px)" }}>
                      <Icon size={40} className="mb-4 text-white" />
                    </div>

                    {/* Text */}
                    <div style={{ transform: "translateZ(80px)" }}>
                      <h4 className="text-lg font-semibold text-white">
                        {item.name}
                      </h4>
                    </div>

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