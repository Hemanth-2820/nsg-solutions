import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import thumb1 from '../../assets/generated/blog_thumb_1_1774529539839.png';
import thumb2 from '../../assets/generated/blog_thumb_2_1774529561593.png';
import thumb3 from '../../assets/generated/blog_thumb_3_1774529578137.png';
import thumb4 from '../../assets/generated/careers_backend_tech_1774529182685.png';
import thumb5 from '../../assets/generated/careers_cloud_tech_1774529148242.png';
import thumb6 from '../../assets/generated/careers_ui_tech_1774529165327.png';

const posts = [
  { id: 1, title: 'Zero-Trust Perimeters in Multi-Cloud Environments', desc: 'A rigorous exploration into deterministic security for distributed enterprise systems operating at scale.', tag: 'Cyber Security', image: thumb1 },
  { id: 2, title: 'Deterministic API Architecture: The Sub-100ms Goal', desc: 'How we leverage gRPC and modern caching strategies to achieve global performance parity.', tag: 'Cloud Native', image: thumb2 },
  { id: 3, title: 'Generative AI: Moving Beyond Prompt Engineering', desc: 'Building custom neural layers for specialized enterprise knowledge bases and reasoning systems.', tag: 'AI Architecture', image: thumb3 },
  { id: 4, title: 'Scalable Microservices with Rust and Go', desc: 'Choosing the right language for high-concurrency enterprise pipelines that never compromise on safety.', tag: 'Cloud Native', image: thumb4 },
  { id: 5, title: 'Quantum-Resistant Encryption Standards', desc: 'Preparing the enterprise for the next era of computational threats with post-quantum cryptography.', tag: 'Cyber Security', image: thumb5 },
  { id: 6, title: 'The Engineering Mindset: Excellence as a Baseline', desc: 'Defining the cultural pillars of a world-class technical organisation obsessed with craft.', tag: 'Engineering Culture', image: thumb6 },
];

const BlogCard = ({ post, index }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onClick={() => navigate(`/blog/post/${post.id}`)}
      className="group relative h-[500px] overflow-hidden cursor-pointer select-none transition-all duration-700 border border-white/5 bg-[#0f172a]"
    >
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-0 transition-opacity duration-700" />
      <div className="absolute inset-0 bg-[#007cc3] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="absolute top-8 left-8 z-20">
        <span className="px-4 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] bg-black text-white">
          {post.tag === 'Cyber Security' ? 'RESEARCH REPORT' : post.tag === 'Cloud Native' ? 'CASE STUDY' : 'BLOG'}
        </span>
      </div>

      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 z-10">
        <h4 className="font-infosys-heading text-[1.5rem] sm:text-[1.8rem] lg:text-[2.2rem] font-black uppercase leading-[1.05] italic mb-6 text-white transition-all duration-500">
          {post.title}
        </h4>
        
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="overflow-hidden">
            <p className="text-white text-sm sm:text-[15px] leading-relaxed mb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
              {post.desc}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.3em] text-white transition-all duration-300">
          <span>READ FULL ARTICLE</span>
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </motion.div>
  );
};

const BlogsGrid = ({ activeCategory }) => {
  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((post) => post.tag === activeCategory);

  return (
    <section className="py-24 px-6 bg-[#0a0f16]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, idx) => (
            <BlogCard key={post.id} post={post} index={idx} />
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center">
            <p className="text-white/30 text-xl italic">
              "No insights found for this category yet. Check back soon."
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BlogsGrid;