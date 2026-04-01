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
    <section className="relative py-32 bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE] overflow-hidden">

      {/* Softer texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/white-diamond.png')] opacity-5 pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto px-6 relative z-10">

        {/* TITLE */}
        <h2 className="text-[#0f172a] text-[3rem] md:text-[4.2rem] font-extrabold mb-20 leading-tight tracking-tight">
          Our Global Partners <br />
          <span className="text-[#007cc3]">& Recognitions</span>
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
              whileHover={{ y: -10, scale: 1.02 }}

              className={`
                relative h-[200px] w-full
                flex flex-col items-center justify-center text-center
                rounded-[2rem] text-white font-bold
                bg-gradient-to-br ${item.color}
                overflow-hidden
                shadow-[0_10px_30px_rgba(0,0,0,0.08)]
                hover:shadow-[0_25px_60px_rgba(0,124,195,0.18)]
                transition-all duration-500
                group
              `}
            >
              {/* Subtle Hex Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%">
                  <defs>
                    <pattern id={`hex-${index}`} width="40" height="70" patternUnits="userSpaceOnUse">
                      <path d="M20 0L40 11.5V34.5L20 46L0 34.5V11.5L20 0Z" fill="none" stroke="white" strokeWidth="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill={`url(#hex-${index})`} />
                </svg>
              </div>

              {/* Glow */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10 blur-2xl"></div>

              {/* CONTENT */}
              <h3 className="relative z-10 px-8 text-[1.5rem] md:text-[1.7rem] leading-[1.2] tracking-tight font-extrabold group-hover:scale-105 transition-transform duration-500">
                {item.title}
              </h3>

              <div className="absolute bottom-6 opacity-40 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300">
                <ArrowRight size={20} />
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default ServicePartners;