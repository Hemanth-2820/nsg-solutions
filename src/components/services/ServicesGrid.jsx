import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
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
  ArrowRight
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
    path: "/services/it"
  },
  {
    id: "creative",
    title: "Video Production & Animation",
    tag: "CREATIVE",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=1200&q=80",
    shortDesc: "High-quality storytelling & visual effects.",
    path: "/services/creative"
  },
  {
    id: "branding",
    title: "Branding & Design",
    tag: "AESTHETICS",
    image:
      "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=1200&q=80",
    shortDesc: "Crafting iconic corporate identities.",
    path: "/services/branding"
  },
  {
    id: "marketing",
    title: "Digital Media Marketing",
    tag: "MARKETING",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80",
    shortDesc: "Grow your digital presence.",
    path: "/services/marketing"
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
    path: "/services/enterprise"
  }
];

const ServicesGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-32 bg-[#f6e1f7] text-[#0f172a] overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle,#007cc3_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10 font-sans">

        <div className="mb-24 flex items-center gap-6">
          <div className="w-24 h-[3px] bg-gradient-to-r from-[#007cc3] to-purple-400"></div>
          <span className="text-[#007cc3] font-black tracking-[0.3em] uppercase text-[13px]">
            Our Capabilities Matrix
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">

          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              whileHover={{ y: -15, scale: 1.02 }}
              onClick={() => {
                if (service.redirect) {
                  window.open(service.redirect, "_blank");
                } else {
                  navigate(service.path);
                }
              }}
              className="group cursor-pointer bg-white border border-white/50 rounded-[2.5rem] overflow-hidden transition-all duration-500 shadow-[0_15px_45px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_70px_rgba(0,124,195,0.15)]"
            >
              <div className="relative h-[240px] overflow-hidden">
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-[2s]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <span className="absolute top-6 left-6 bg-white/90 backdrop-blur px-5 py-1.5 text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg border border-white/20 text-[#0f172a]">
                  {service.tag}
                </span>
              </div>

              <div className="p-10">
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
      </div>
    </section>
  );
};

export default ServicesGrid;