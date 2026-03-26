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
    image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=80",
    shortDesc: "Scalable enterprise solutions powered by modern technologies.",
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
    image: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=1200&q=80",
    shortDesc: "High-quality storytelling.",
    subServices: [
      { name: "Corporate Films", icon: Video },
      { name: "Ad Films", icon: Film },
      { name: "Short Films", icon: Film },
      { name: "Product Films", icon: Video },
      { name: "Promotional Videos", icon: Megaphone },
      { name: "Training Videos", icon: Video },
      { name: "Awareness Videos", icon: Video }
    ]
  },
  {
    title: "Digital Media Marketing",
    tag: "MARKETING",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=1200&q=80",
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
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    shortDesc: "Research & knowledge platform.",
    redirect: "https://nsgpublishers.com"
  }
];

const ServicesGrid = () => {
  const [activeService, setActiveService] = useState(null);
  const detailsRef = useRef(null);

  return (
    <section className="relative py-28 bg-[#f5f7fa]">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">

        <div className="mb-20 flex items-center gap-4">
          <div className="w-10 h-[2px] bg-[#007cc3]"></div>
          <span className="text-[#007cc3] font-bold tracking-[0.25em] uppercase text-[12px]">
            Our Capabilities Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}

              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = -(y - centerY) / 15;
                const rotateY = (x - centerX) / 15;

                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateX(${rotateX}deg)
                  rotateY(${rotateY}deg)
                  scale(1.04)
                `;
              }}

              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `
                  perspective(1200px)
                  rotateX(0deg)
                  rotateY(0deg)
                  scale(1)
                `;
              }}

              onClick={() => {
                if (service.redirect) {
                  window.open(service.redirect, "_blank");
                } else {
                  setActiveService(service);
                  setTimeout(() => {
                    detailsRef.current?.scrollIntoView({ behavior: "smooth" });
                  }, 100);
                }
              }}

              className="group cursor-pointer bg-white rounded-2xl overflow-hidden border border-gray-100 transition-all duration-300 will-change-transform hover:shadow-2xl"
            >

              <div className="relative h-[220px] overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                <span className="absolute top-4 left-4 bg-white text-[#007cc3] text-[10px] uppercase font-bold px-4 py-2 rounded-full">
                  {service.tag}
                </span>
              </div>

              <div className="p-8">
                <h3 className="text-[1.5rem] font-semibold text-[#111] mb-3">
                  {service.title}
                </h3>

                <p className="text-[#64748b] text-[14px] mb-6">
                  {service.shortDesc}
                </p>
              </div>
            </motion.div>
          ))}

        </div>

        {activeService && (
          <motion.div
            ref={detailsRef}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-24 bg-white rounded-3xl p-12 shadow-2xl"
          >

            <button
              onClick={() => setActiveService(null)}
              className="mb-6 text-[#007cc3] text-[12px] uppercase font-bold"
            >
              ← Back
            </button>

            <h2 className="text-[2.5rem] font-semibold mb-12">
              {activeService.title}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

              {activeService.subServices?.map((item, i) => {
                const Icon = item.icon;

                const gradients = [
                  "from-[#1e3a8a] to-[#3b82f6]",
                  "from-[#e5002b] to-[#ff4d6d]",
                  "from-[#610082] to-[#a855f7]",
                  "from-[#0f766e] to-[#14b8a6]",
                  "from-[#ff6a00] to-[#f59e0b]"
                ];

                const bg = gradients[i % gradients.length];

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}

                    className={`
                      group cursor-pointer relative
                      h-[260px]
                      rounded-2xl
                      flex flex-col items-center justify-center text-center
                      text-white
                      bg-gradient-to-br ${bg}
                      transition-all duration-500
                      hover:scale-[1.05]
                      hover:shadow-[0_40px_120px_rgba(0,0,0,0.35)]
                    `}
                  >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition rounded-2xl"></div>

                    <Icon size={32} className="mb-4 relative z-10" />

                    <h4 className="text-[1.4rem] font-semibold relative z-10">
                      {item.name}
                    </h4>
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