import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, TrendingUp, Megaphone } from 'lucide-react';

const subServices = [
  { name: "Brand Building", icon: TrendingUp },
  { name: "Social Media Marketing", icon: Megaphone },
  { name: "Performance Marketing", icon: TrendingUp }
];

const DigitalMarketingPage = () => (
  <div className="min-h-screen font-sans overflow-x-hidden bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE]">

    {/* HERO */}
    <section className="pt-32 pb-20 relative">

      {/* Marketing glow */}
      <div className="absolute right-0 top-0 w-[400px] h-[400px] bg-pink-200 blur-[120px] opacity-30"></div>

      <div className="max-w-[1400px] mx-auto px-6">

        <Link
          to="/services"
          className="mb-8 inline-flex items-center gap-2 text-[#007cc3] font-bold text-xs uppercase tracking-widest hover:-translate-x-1 transition"
        >
          <ArrowLeft size={14} /> Back to Services
        </Link>

        <h1 className="text-[3rem] md:text-[4.5rem] font-extrabold text-[#0f172a] mb-6 tracking-tight">
          Digital Marketing
        </h1>

        <div className="w-24 h-[3px] bg-gradient-to-r from-[#007cc3] to-[#60a5fa] mb-8"></div>

        <p className="text-[#475569] text-[1.2rem] max-w-2xl border-l-[4px] border-[#007cc3] pl-6 leading-relaxed">
          Grow your digital presence — data-driven marketing strategies engineered
          to scale brands in the modern digital landscape.
        </p>

      </div>
    </section>

    {/* SERVICES GRID */}
    <section className="pb-20">
      <div className="max-w-[1400px] mx-auto px-6">

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {subServices.map((item, i) => {
            const Icon = item.icon;

            const cardStyles = [
              "bg-gradient-to-br from-pink-100 to-pink-50 border-pink-200",
              "bg-gradient-to-br from-violet-100 to-violet-50 border-violet-200",
              "bg-gradient-to-br from-blue-100 to-blue-50 border-blue-200"
            ];

            const iconStyles = [
              "bg-pink-600 text-white",
              "bg-violet-600 text-white",
              "bg-blue-600 text-white"
            ];

            const hoverGlow = [
              "hover:shadow-pink-300/60",
              "hover:shadow-violet-300/60",
              "hover:shadow-blue-300/60"
            ];

            return (
              <motion.div
                key={i}
                whileHover={{ y: -12, scale: 1.04 }}
                className={`
                  group relative h-[230px] rounded-2xl flex flex-col items-center justify-center text-center
                  border shadow-md
                  transition-all duration-500 cursor-pointer
                  ${cardStyles[i % 3]} ${hoverGlow[i % 3]}
                `}
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/30 blur-2xl"></div>

                {/* ICON */}
                <div className={`
                  relative z-10 mb-5 p-5 rounded-xl transition group-hover:scale-110
                  ${iconStyles[i % 3]}
                `}>
                  <Icon size={30} />
                </div>

                {/* TITLE */}
                <h4 className="relative z-10 text-[1.2rem] font-bold text-[#0f172a] group-hover:text-black transition">
                  {item.name}
                </h4>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#007cc3] to-transparent opacity-0 group-hover:opacity-100 transition"></div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>

  </div>
);

export default DigitalMarketingPage;