import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

const insightsData = [
  {
    id: 1, category: "Research Report",
    title: "Resilience in flight: securing future growth amid volatility",
    desc: "A comprehensive analysis of how global supply chains are buffering against severe economic shocks using decentralized AI forecasting and digital twin simulations.",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
  },
  {
    id: 2, category: "Case Study",
    title: "Global Pharma accelerates drug development with generative AI",
    desc: "Discover how we implemented custom Large Language Models to reduce clinical trial data processing time by 40%, securely isolated within enterprise cloud infrastructure.",
    img: "https://images.unsplash.com/photo-1532187863486-abf9dbade16f?w=800&q=80"
  },
  {
    id: 3, category: "Blog",
    title: "Beyond the hype: Why agentic AI is closer than you think",
    desc: "Our latest research indicates that autonomous AI agents executing multi-step business workflows will dominate enterprise strategies by 2027.",
    img: "https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=800&q=80"
  },
  {
    id: 4, category: "Industry Insight",
    title: "Digital Bank pivots from app to national platform",
    desc: "Transforming legacy banking infrastructure into a seamless, API-driven national platform capable of handling 50,000 transactions per second natively.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
  },
  {
    id: 5, category: "Research Report",
    title: "The carbon-neutral data center imperative",
    desc: "Why aggressive sustainability targets are forcing major corporations to rethink cooling, compute efficiency, and cloud vendor selection globally.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80"
  },
  {
    id: 6, category: "Case Study",
    title: "Automotive giant unifies 80+ legacy CRM systems",
    desc: "We consolidated decades of fragmented customer data into a single, unified view, enabling real-time personalized marketing at a massive global scale.",
    img: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80"
  },
  {
    id: 7, category: "Blog",
    title: "Zero Trust Architecture is no longer optional",
    desc: "With the rise of sophisticated ransomware, identity-first perimeterless security models are the only proven defense for distributed remote workforces.",
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
  },
  {
    id: 8, category: "Perspective",
    title: "The metaverse: Enterprise applications gaining real traction",
    desc: "Moving past consumer hype, VR/AR digital twins are quietly revolutionizing factory floor training, remote maintenance, and architectural design reviews.",
    img: "https://images.unsplash.com/photo-1617802690992-15d93263d3cf?w=800&q=80"
  },
  {
    id: 9, category: "Case Study",
    title: "Retailer slashes inventory waste with IoT tracking",
    desc: "By embedding smart sensors across the supply chain, we reduced perishable inventory loss by 28% while vastly improving shelf availability.",
    img: "https://images.unsplash.com/photo-1586528116311-ad8ed7c80a30?w=800&q=80"
  },
  {
    id: 10, category: "Industry Insight",
    title: "Navigating the maze of European Data Sovereignty",
    desc: "A strategic overview of how multinational organizations are designing hyper-localized cloud clusters to comply with strict GDPR and regional privacy laws.",
    img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
  },
  {
    id: 11, category: "Blog",
    title: "Why your APIs are your biggest security vulnerability",
    desc: "Shadow APIs are proliferating faster than IT can track them. Here is how modern DevSecOps approaches are discovering and securing rogue endpoints.",
    img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80"
  },
  {
    id: 12, category: "Research Report",
    title: "The Human-AI collaboration dynamic in 2026",
    desc: "Our global survey of 5,000 executives reveals that the most productive teams aren't replacing humans with AI, but tightly coupling them in 'centaur' workflows.",
    img: "https://images.unsplash.com/photo-1531297172864-85d371c42275?w=800&q=80"
  },
  {
    id: 13, category: "Case Study",
    title: "Telecom provider automates NOC with ML prediction",
    desc: "By applying predictive analytics to network topology, anomalies are now detected and auto-remediated 40 minutes before customer outages occur.",
    img: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80"
  },
  {
    id: 14, category: "Perspective",
    title: "Microservices: When to consolidate back to a monolith",
    desc: "An contrarian engineering perspective on the hidden costs of extreme service decoupling, and why a modular monolith often scales better.",
    img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80"
  },
  {
    id: 15, category: "Industry Insight",
    title: "The next decade of synthetic biology & computing",
    desc: "How the intersection of cloud compute power and genome sequencing is initiating a new era of personalized medicine and sustainable materials.",
    img: "https://images.unsplash.com/photo-1532187643603-eb1105ce0e1c?w=800&q=80"
  }
];

const InsightsGrid = () => {
  return (
    <section className="bg-[#0f172a] py-32 min-h-screen">
      <div className="max-w-[1500px] mx-auto px-6">
        
        {/* Header Section */}
        <div className="mb-20">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 mb-6"
            >
                <div className="h-[2px] w-8 bg-[#007cc3]"></div>
                <span className="text-[#5bb8e4] font-bold tracking-[0.2em] text-[12px] uppercase">
                    What we think
                </span>
            </motion.div>
            <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-white text-[3.5rem] md:text-[5rem] font-infosys-heading leading-[1.05] tracking-tight max-w-4xl"
            >
                Insights that shape tomorrow's enterprises.
            </motion.h1>
        </div>

        {/* Dynamic 15+ Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {insightsData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (idx % 3) * 0.1, duration: 0.6 }}
              className="group relative overflow-hidden h-[450px] bg-[#1a2235] cursor-pointer"
            >
                {/* 1. Default Background Image */}
                <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-[800ms] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110 group-hover:opacity-0"
                    style={{ backgroundImage: `url(${item.img})` }}
                />

                {/* Always visible category badge */}
                <div className="absolute top-6 left-6 z-20">
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase px-3 py-1 bg-black/50 backdrop-blur-sm border border-white/20">
                        {item.category}
                    </span>
                </div>

                {/* 2. Default Title (Overlay on Image) */}
                <div className="absolute bottom-0 left-0 w-full p-8 pt-24 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-y-10 group-hover:opacity-0 z-10">
                    <h3 className="text-white text-2xl md:text-[1.7rem] font-infosys-heading leading-[1.2]">{item.title}</h3>
                </div>

                {/* 3. Hover Content (Replacing Image entirely) */}
                <div className="absolute inset-0 z-10 flex flex-col justify-center p-10 bg-[#007cc3] opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)]">
                    <h3 className="text-white text-2xl font-infosys-heading mb-5 leading-tight">{item.title}</h3>
                    <p className="text-white/90 text-sm font-light leading-relaxed mb-8 flex-grow line-clamp-4">
                        {item.desc}
                    </p>
                    <div className="mt-auto">
                        <span className="text-white font-bold tracking-widest uppercase text-xs flex items-center gap-3 w-fit group/btn hover:text-[#0f172a] transition-colors">
                            Read Full Article 
                            <ArrowRight size={16} className="transform group-hover/btn:translate-x-2 transition-transform" />
                        </span>
                    </div>
                </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default InsightsGrid;
