import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const partners = [
  {
    title: "Gartner Emerging Tech Leaders",
    color: "from-[#007cc3] to-[#3b82f6]",
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
    <section className="bg-[#f8fafc] py-32 relative overflow-hidden">
      {/* Decorative texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-10 pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">

        {/* TITLE */}
        <h2 className="text-[#0f172a] text-[3rem] md:text-[4.2rem] font-infosys-heading mb-20 leading-tight">
          Our Global Partners <br /> <span className="text-[#007cc3]">& Recognitions</span>
        </h2>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {partners.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}

              className={`
                relative h-[200px] w-full
                flex flex-col items-center justify-center text-center
                rounded-[2rem] text-white font-bold
                bg-gradient-to-br ${item.color}
                overflow-hidden
                shadow-[0_15px_40px_rgba(0,124,195,0.12)]
                hover:scale-[1.03]
                hover:shadow-[0_40px_80px_rgba(0,124,195,0.2)]
                transition-all duration-700
                group
              `}
            >
              {/* Premium Hexagonal SVG Background Pattern */}
              <div className="absolute inset-0 opacity-20 mix-blend-soft-light pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id={`hex-${index}`} width="40" height="70" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
                      <path d="M20 0L40 11.5V34.5L20 46L0 34.5V11.5L20 0Z" fill="none" stroke="white" strokeWidth="0.5" />
                      <circle cx="20" cy="0" r="1" fill="white" opacity="0.3" />
                      <circle cx="40" cy="11.5" r="1" fill="white" opacity="0.3" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#hex-${index})`} />
                </svg>
              </div>

              {/* Dynamic Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-white/10 blur-3xl"></div>

              {/* CONTENT */}
              <h3 className="relative z-10 px-8 text-[1.5rem] md:text-[1.7rem] leading-[1.2] tracking-tighter font-black group-hover:scale-110 transition-transform duration-700 select-none">
                {item.title}
              </h3>
              
              {/* Refined Arrow */}
              <div className="absolute bottom-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                 <ArrowRight size={22} className="-rotate-12" />
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ServicePartners;