import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Share2, Printer, ChevronRight } from 'lucide-react';

import thumb1 from '../assets/generated/blog_thumb_1_1774529539839.png';
import thumb2 from '../assets/generated/blog_thumb_2_1774529561593.png';
import thumb3 from '../assets/generated/blog_thumb_3_1774529578137.png';
import thumb4 from '../assets/generated/careers_backend_tech_1774529182685.png';
import thumb5 from '../assets/generated/careers_cloud_tech_1774529148242.png';
import thumb6 from '../assets/generated/careers_ui_tech_1774529165327.png';

const posts = [
  { id: 1, title: 'Zero-Trust Perimeters in Multi-Cloud Environments', desc: 'A rigorous exploration into deterministic security for distributed enterprise systems operating at scale.', tag: 'Cyber Security', image: thumb1, time: '8 min read', content: 'Modern enterprises face unprecedented security challenges as workloads span multiple cloud providers. Zero-Trust architecture eliminates implicit trust and continuously validates every request.' },
  { id: 2, title: 'Deterministic API Architecture: The Sub-100ms Goal', desc: 'How we leverage gRPC and modern caching strategies to achieve global performance parity.', tag: 'Cloud Native', image: thumb2, time: '10 min read', content: 'Achieving consistent sub-100ms latency across globally distributed microservices requires a fundamentally different approach to API design.' },
  { id: 3, title: 'Generative AI: Moving Beyond Prompt Engineering', desc: 'Building custom neural layers for specialized enterprise knowledge bases and reasoning systems.', tag: 'AI Architecture', image: thumb3, time: '14 min read', content: 'The next frontier in enterprise AI is not about crafting better prompts — it is about building domain-specific reasoning layers.' },
  { id: 4, title: 'Scalable Microservices with Rust and Go', desc: 'Choosing the right language for high-concurrency enterprise pipelines that never compromise on safety.', tag: 'Cloud Native', image: thumb4, time: '12 min read', content: 'Memory safety and raw throughput are no longer mutually exclusive. Rust handles performance-critical data ingestion.' },
  { id: 5, title: 'Quantum-Resistant Encryption Standards', desc: 'Preparing the enterprise for the next era of computational threats with post-quantum cryptography.', tag: 'Cyber Security', image: thumb5, time: '15 min read', content: 'With quantum computing advancing rapidly, CISOs must begin migrating to post-quantum cryptographic standards today.' },
  { id: 6, title: 'The Engineering Mindset: Excellence as a Baseline', desc: 'Defining the cultural pillars of a world-class technical organisation obsessed with craft.', tag: 'Engineering Culture', image: thumb6, time: '6 min read', content: 'Great engineering culture is built on radical ownership, obsessive documentation, and a shared belief that "good enough" is never good enough.' },
];

const BlogPostPage = () => {
  const { id } = useParams();
  const post = posts.find((p) => p.id === parseInt(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) return <div className="min-h-screen bg-[#0a0f16] flex items-center justify-center text-white">Post Not Found</div>;

  return (
    <div className="min-h-screen bg-[#0a0f16] text-white font-sans pb-32 pt-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center gap-2 text-white/30 text-[10px] font-bold uppercase tracking-widest mb-12">
          <Link to="/" className="hover:text-[#007cc3]">Home</Link>
          <ChevronRight size={10} />
          <Link to="/blog" className="hover:text-[#007cc3]">Blog</Link>
          <ChevronRight size={10} />
          <span className="text-[#007cc3]">{post.tag}</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-block px-4 py-1.5 bg-[#007cc3] text-white text-[10px] font-black uppercase tracking-[0.2em] mb-8 rounded-full">
                {post.tag}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-8 font-infosys-heading italic">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-8 mb-12 border-y border-white/10 py-8">
                <div className="flex items-center gap-3 text-white/50 text-[11px] font-bold uppercase tracking-widest">
                  <Clock size={16} className="text-[#007cc3]" /> {post.time}
                </div>
                <div className="flex items-center gap-3 text-white/50 text-[11px] font-bold uppercase tracking-widest">
                  <BookOpen size={16} className="text-[#007cc3]" /> Research Report
                </div>
              </div>

              <div className="aspect-[21/9] w-full bg-[#1e293b] rounded-3xl overflow-hidden mb-12 shadow-2xl">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
              </div>

              <div className="text-white/80 text-lg leading-[2] font-light max-w-4xl">
                <p className="text-2xl font-light text-white/90 leading-relaxed mb-12 italic border-l-4 border-[#007cc3] pl-8">
                  {post.desc}
                </p>
                {post.content}
                <p className="mt-8">Our implementation architecture for {post.title} focuses on deterministic outcomes and performance predictability...</p>
              </div>
            </motion.div>
          </div>

          <aside className="w-full lg:w-[350px]">
            <div className="bg-white/5 p-10 border border-white/10 rounded-3xl sticky top-32">
              <h3 className="text-[11px] font-black uppercase tracking-widest mb-8 text-white/50">Engagement</h3>
              <div className="flex gap-4 mb-10">
                {[1,2,3].map((i) => (
                  <button key={i} className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#007cc3] hover:text-white transition-all duration-300">
                    <Share2 size={18} />
                  </button>
                ))}
              </div>
              <button className="w-full py-4 bg-white text-black rounded-xl font-bold uppercase tracking-widest text-[11px] hover:bg-[#007cc3] hover:text-white transition-colors flex items-center justify-center gap-3">
                <Printer size={16} /> DOWNLOAD PDF
              </button>
            </div>
          </aside>
        </div>

        <div className="mt-32 pt-20 border-t border-white/10">
          <Link to="/blog" className="group inline-flex items-center gap-4 text-[#007cc3] font-black uppercase tracking-widest text-sm transition-all duration-300 hover:-translate-x-2">
            <ArrowLeft size={18} /> BACK TO RESEARCH INDEX
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
