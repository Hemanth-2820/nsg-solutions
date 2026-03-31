import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { Cloud, Cpu, Layout, Database, Shield } from 'lucide-react';

// Using relative path for generated icon
import cloudTopicIcon from '../../assets/generated/blog_topic_icon_1_1774529592983.png';

const Counter = ({ value }) => {
  const count = useMotionValue(0);
  const [displayCount, setDisplayCount] = useState(0);

  useEffect(() => {
    const animation = animate(count, value, { 
      duration: 2, 
      ease: "easeOut",
      onUpdate: (latest) => setDisplayCount(Math.floor(latest))
    });
    return animation.stop;
  }, [value]);

  return <span>{displayCount}</span>;
};

const topics = [
  { name: 'Cloud Technology', count: 24, icon: <img src={cloudTopicIcon} alt="Cloud" className="w-8 h-8 object-contain" /> },
  { name: 'Artificial Intelligence', count: 18, icon: <Cpu size={24} /> },
  { name: 'Frontend Dev', count: 32, icon: <Layout size={24} /> },
  { name: 'Data Engineering', count: 15, icon: <Database size={24} /> },
  { name: 'Security & Ops', count: 29, icon: <Shield size={24} /> }
];

const BlogsTopics = () => {
  return (
    <section className="py-24 px-6 bg-[#f5f7fa]">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[10px] mb-8"
        >
          Browse Topics
        </motion.span>
        <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-16 text-center font-infosys-heading italic">
          What We <span className="text-[#007cc3]">Write About</span>
        </h3>
        
        <div className="flex flex-wrap justify-center gap-8 max-w-5xl">
          {topics.map((topic, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -10, scale: 1.05 }}
              className="px-10 py-6 rounded-3xl bg-white border border-black/5 hover:border-[#007cc3]/30 cursor-pointer flex items-center gap-6 shadow-sm hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="text-[#007cc3] group-hover:scale-110 transition-transform duration-500">
                {topic.icon}
              </div>
              <div>
                <span className="text-gray-900 font-bold block font-infosys-heading transition-colors group-hover:text-[#007cc3]">
                  {topic.name}
                </span>
                <span className="text-[10px] font-bold text-black/30 uppercase tracking-widest">
                  <Counter value={topic.count} /> Articles
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsTopics;