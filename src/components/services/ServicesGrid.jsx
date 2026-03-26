import React, { useState, useRef } from 'react';
import { ArrowRight, Code, Cloud, Brain, Briefcase, ShoppingCart, Video, Film, Megaphone, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceDetails from "./ServiceDetails"; // ✅ NEW

const servicesData = [
  {
    title: "IT Services",
    badge: "CORE",
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80",
    shortDesc: "Scalable enterprise solutions powered by modern technologies.",
    subServices: [
      {
        name: "Software Development",
        desc: "Custom enterprise-grade applications.",
        icon: Code,
        details: ["Microservices", "Full-stack apps", "API development", "Agile delivery"]
      },
      {
        name: "Cloud Services",
        desc: "Secure cloud infrastructure.",
        icon: Cloud,
        details: ["AWS / Azure", "Cloud migration", "CI/CD", "Scalability"]
      },
      {
        name: "AI & Data Analytics",
        desc: "Predictive insights.",
        icon: Brain,
        details: ["ML models", "Dashboards", "Data pipelines", "Automation"]
      },
      {
        name: "IT Consulting",
        desc: "Strategic transformation.",
        icon: Briefcase,
        details: ["Roadmaps", "Architecture", "Consulting", "Optimization"]
      },
      {
        name: "E-commerce Solutions",
        desc: "Commerce platforms.",
        icon: ShoppingCart,
        details: ["Headless commerce", "Payments", "UX", "Scaling"]
      }
    ]
  },
  {
    title: "Video Production",
    badge: "CREATIVE",
    img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&q=80",
    shortDesc: "High-quality storytelling.",
    subServices: [
      { name: "Corporate Films", desc: "Brand videos", icon: Video, details: ["Corporate branding", "Interviews", "Storytelling"] },
      { name: "Ad Films", desc: "Marketing ads", icon: Film, details: ["Creative ads", "Campaigns", "Visual effects"] }
    ]
  },
  {
    title: "Digital Media Marketing",
    badge: "MARKETING",
    img: "https://images.unsplash.com/photo-1557838923-2985c318be48?w=800&q=80",
    shortDesc: "Grow your digital presence.",
    subServices: [
      { name: "Brand Building", desc: "Strong identity", icon: TrendingUp, details: ["Brand strategy", "Identity design"] },
      { name: "Social Media", desc: "Engagement", icon: Megaphone, details: ["Campaigns", "Content strategy"] }
    ]
  },
  {
    title: "Publishing",
    badge: "EXTERNAL",
    img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    shortDesc: "Research & knowledge platform.",
    redirect: "https://nsgpublishers.com"
  }
];

const ServicesGrid = () => {
  const [activeService, setActiveService] = useState(null);
  const detailsRef = useRef(null);

  return (
    <section className="bg-[#f5f7fa] py-24">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">

        {/* HEADER */}
        <div className="mb-16 flex items-center gap-4">
          <div className="w-10 h-[2px] bg-[#007cc3]"></div>
          <span className="text-[#007cc3] font-bold tracking-[0.2em] uppercase text-[12px]">
            Our Capabilities Matrix
          </span>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              className={`group bg-white rounded-3xl overflow-hidden border hover:-translate-y-2 hover:shadow-xl transition-all duration-500 ${activeService === service ? "ring-2 ring-[#007cc3]" : ""}`}
            >
              <div className="h-[220px] relative overflow-hidden">
                <img src={service.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s]" />
                <div className="absolute top-5 left-5 bg-white px-4 py-1 rounded-full">
                  <span className="text-[#007cc3] text-[10px] uppercase font-bold tracking-[0.2em]">
                    {service.badge}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-[1.5rem] font-infosys-heading mb-4">
                  {service.title}
                </h3>

                <p className="text-[#64748b] text-[14px] leading-[1.6] mb-6">
                  {service.shortDesc}
                </p>

                <button
                  onClick={() => {
                    if (service.redirect) {
                      window.open(service.redirect, "_blank");
                    } else {
                      setActiveService(service === activeService ? null : service);
                      setTimeout(() => {
                        detailsRef.current?.scrollIntoView({ behavior: "smooth" });
                      }, 100);
                    }
                  }}
                  className="flex items-center gap-2 text-[#007cc3] uppercase text-[12px] font-bold tracking-[0.2em]"
                >
                  Explore <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ✅ NEW CLEAN COMPONENT */}
        <div ref={detailsRef}>
          <ServiceDetails
            service={activeService}
            onBack={() => setActiveService(null)}
          />
        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;