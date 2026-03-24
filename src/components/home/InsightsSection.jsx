import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, ArrowRight } from 'lucide-react';

const insightsData = [
  {
    id: 1, category: "AI & Data",
    title: "Unlocking Business Growth with AI-Driven Insights",
    desc: "Discover how advanced machine learning algorithms and predictive models are directly impacting bottom-line revenue across global manufacturing.",
    date: "March 15, 2026",
    img: "https://images.unsplash.com/photo-1488229297570-58520851e868?w=1000&q=80",
    featured: true,
  },
  {
    id: 2, category: "Cloud",
    title: "Scaling Enterprises with Cloud-Native Architecture",
    desc: "A technical analysis of multi-cloud deployments handling extreme data velocity for modern fintech ecosystems.",
    date: "March 12, 2026",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
  },
  {
    id: 3, category: "Engineering",
    title: "Building Future-Ready Applications at Scale",
    desc: "The definitive CIO guide to migrating legacy monolithic systems to resilient decentralized microservice architectures.",
    date: "March 08, 2026",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  },
  {
    id: 4, category: "Industry",
    title: "Digital Supply Chain Optimization for Tomorrow",
    desc: "Predicting the global shift towards autonomous logistics networks and IoT-driven tracking operations worldwide.",
    date: "March 02, 2026",
    img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=800&q=80",
  },
];

const InsightsSection = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const filters = ["All", "AI & Data", "Cloud", "Engineering", "Industry", "Marketing"];

  const filtered   = insightsData.filter(i => activeFilter === "All" || i.category === activeFilter);
  const featured   = filtered[0] ?? null;
  const regular    = filtered.slice(1);

  return (
    <section className="bg-[#f5f7fa] py-28 relative overflow-hidden">
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">

        {/* ── HEADER ── */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-5"
          >
            <Sparkles size={14} className="text-[#007cc3]" />
            <span className="text-[#007cc3] font-bold tracking-[0.3em] text-[11px] uppercase">Insights & Research</span>
            <Sparkles size={14} className="text-[#007cc3]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[2.8rem] md:text-[3.8rem] font-infosys-heading text-[#111] leading-[1.1] tracking-tight mb-5"
          >
            Perspectives, Insights <span className="text-[#007cc3]">&amp; Impact</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#64748b] text-[1.1rem] font-light max-w-2xl leading-relaxed"
          >
            Explore how we help global organizations navigate digital transformations through data, AI, and breakthrough innovation.
          </motion.p>
        </div>

        {/* ── FILTER TABS ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="flex flex-wrap justify-center gap-3 mb-14"
        >
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-7 py-2.5 rounded-full text-[12px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                activeFilter === f
                  ? 'bg-[#1e3a8a] text-white border-[#1e3a8a] shadow-[0_4px_20px_rgba(30,58,138,0.25)]'
                  : 'bg-white text-[#475569] border-gray-200 hover:border-[#1e3a8a] hover:text-[#1e3a8a]'
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center text-[#94a3b8] py-20 font-bold uppercase tracking-widest">No matching insights.</div>
        ) : (
          <div className="flex flex-col gap-10">

            {/* ── FEATURED CARD ── */}
            {featured && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="flex flex-col lg:flex-row bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.05)] group hover:shadow-[0_20px_60px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 cursor-pointer"
              >
                <div className="lg:w-3/5 h-[320px] lg:h-[460px] overflow-hidden relative">
                  <img
                    src={featured.img} alt={featured.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s]"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-[#1e3a8a] font-bold tracking-widest uppercase text-[10px] px-5 py-2 rounded-full">
                    {featured.category}
                  </div>
                </div>

                <div className="lg:w-2/5 p-10 lg:p-14 flex flex-col justify-center bg-white">
                  <div className="flex items-center text-[#94a3b8] text-sm gap-2 mb-6">
                    <Calendar size={14} className="text-[#007cc3]" /> {featured.date}
                  </div>
                  <h3 className="text-[2rem] lg:text-[2.4rem] text-[#111] font-infosys-heading font-bold leading-[1.2] mb-5 group-hover:text-[#007cc3] transition-colors duration-300">
                    {featured.title}
                  </h3>
                  <p className="text-[#64748b] font-light text-[1.05rem] leading-relaxed mb-10">
                    {featured.desc}
                  </p>
                  <span className="text-[#007cc3] font-bold uppercase tracking-widest text-[12px] flex items-center gap-2 group-hover:gap-4 transition-all">
                    Read Full Report <ArrowRight size={14} strokeWidth={3} />
                  </span>
                </div>
              </motion.div>
            )}

            {/* ── REGULAR CARDS ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regular.map((item, idx) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.12 }}
                  className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.04)] group hover:shadow-[0_20px_50px_rgba(0,0,0,0.09)] hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col"
                >
                  <div className="h-[200px] overflow-hidden relative">
                    <img
                      src={item.img} alt={item.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-[1.5s]"
                    />
                    <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm text-[#1e3a8a] font-bold tracking-widest uppercase text-[10px] px-4 py-1.5 rounded-full">
                      {item.category}
                    </div>
                  </div>

                  <div className="p-8 flex flex-col flex-grow">
                    <div className="flex items-center text-[#94a3b8] text-xs gap-2 mb-4">
                      <Calendar size={12} className="text-[#007cc3]" /> {item.date}
                    </div>
                    <h4 className="text-[1.35rem] text-[#111] font-infosys-heading font-bold leading-[1.25] mb-4 group-hover:text-[#007cc3] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-[#64748b] font-light text-sm leading-relaxed mb-8 flex-grow">
                      {item.desc}
                    </p>
                    <span className="text-[#007cc3] font-bold uppercase tracking-widest text-[11px] flex items-center gap-2 group-hover:gap-4 transition-all">
                      Read Article <ArrowRight size={13} strokeWidth={3} />
                    </span>
                  </div>

                  {/* Bottom accent */}
                  <div className="h-[3px] w-0 bg-[#007cc3] group-hover:w-full transition-all duration-700"></div>
                </motion.div>
              ))}
            </div>

          </div>
        )}

        {/* ── VIEW ALL ── */}
        <div className="mt-16 flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <button className="border-[2px] border-[#1e3a8a] text-[#1e3a8a] px-12 py-4 rounded-full font-bold tracking-widest uppercase text-[12px] hover:bg-[#1e3a8a] hover:text-white hover:shadow-[0_10px_30px_rgba(30,58,138,0.25)] hover:scale-105 transition-all duration-300">
              View All Insights
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default InsightsSection;
