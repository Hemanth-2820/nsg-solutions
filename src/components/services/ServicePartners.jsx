import React from "react";
import { motion } from "framer-motion";

const partners = [
  {
    title: "Gartner Emerging Tech Leaders",
    color: "from-[#1e3a8a] to-[#3b82f6]",
  },
  {
    title: "Everest Group Leader",
    color: "from-[#e5002b] to-[#ff4d6d]",
  },
  {
    title: "Snowflake Partner Award",
    color: "from-[#610082] to-[#a855f7]",
  },
];

const ServicePartners = () => {
  return (
    <section className="bg-[#0a0f16] py-28">
      <div className="max-w-[1500px] mx-auto px-6">

        {/* TITLE */}
        <h2 className="text-white text-[2.8rem] md:text-[3.5rem] font-infosys-heading mb-16">
          Our Global Partners & Recognitions
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {partners.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}

              className={`
                aspect-square w-full
                flex items-center justify-center text-center
                rounded-2xl text-white font-semibold text-lg
                bg-gradient-to-br ${item.color}
                relative overflow-hidden
                cursor-none
                transition-all duration-500
                hover:scale-[1.05]
                hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)]
              `}
            >

              {/* GLOW EFFECT */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10 blur-2xl"></div>

              {/* CONTENT */}
              <h3 className="relative z-10 px-6 text-[1.3rem] md:text-[1.5rem] leading-[1.4]">
                {item.title}
              </h3>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ServicePartners;