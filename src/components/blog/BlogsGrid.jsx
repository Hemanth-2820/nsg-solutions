import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, X, BookOpen } from 'lucide-react';

import thumb1 from '../../assets/generated/blog_thumb_1_1774529539839.png';
import thumb2 from '../../assets/generated/blog_thumb_2_1774529561593.png';
import thumb3 from '../../assets/generated/blog_thumb_3_1774529578137.png';
import thumb4 from '../../assets/generated/careers_backend_tech_1774529182685.png';
import thumb5 from '../../assets/generated/careers_cloud_tech_1774529148242.png';
import thumb6 from '../../assets/generated/careers_ui_tech_1774529165327.png';

const posts = [
  {
    id: 1,
    title: 'Zero-Trust Perimeters in Multi-Cloud Environments',
    desc: 'A rigorous exploration into deterministic security for distributed enterprise systems operating at scale.',
    tag: 'Cyber Security',
    image: thumb1,
    time: '8 min read',
    content: 'Modern enterprises face unprecedented security challenges as workloads span multiple cloud providers. Zero-Trust architecture eliminates implicit trust and continuously validates every request. Our implementation leverages mutual TLS, identity-aware proxies, and real-time threat intelligence to create an impenetrable perimeter that scales with your infrastructure. By shifting from perimeter-based to identity-based trust, organisations achieve 60% faster incident response while reducing the blast radius of any breach.',
  },
  {
    id: 2,
    title: 'Deterministic API Architecture: The Sub-100ms Goal',
    desc: 'How we leverage gRPC and modern caching strategies to achieve global performance parity.',
    tag: 'Cloud Native',
    image: thumb2,
    time: '10 min read',
    content: 'Achieving consistent sub-100ms latency across globally distributed microservices requires a fundamentally different approach to API design. By combining gRPC with protocol buffers, edge caching, and intelligent load distribution, we consistently deliver 40% better performance than traditional REST-based architectures. The secret lies in co-locating compute with data, eliminating serialisation overhead, and using deterministic routing algorithms informed by real-time topology maps.',
  },
  {
    id: 3,
    title: 'Generative AI: Moving Beyond Prompt Engineering',
    desc: 'Building custom neural layers for specialized enterprise knowledge bases and reasoning systems.',
    tag: 'AI Architecture',
    image: thumb3,
    time: '14 min read',
    content: 'The next frontier in enterprise AI is not about crafting better prompts — it is about building domain-specific reasoning layers. Fine-tuned models combined with retrieval-augmented generation (RAG) and custom knowledge graphs deliver accuracy levels that generic LLMs simply cannot match for specialised domains. Our multi-agent orchestration framework routes complex queries through specialised sub-models, achieving 94% task-completion accuracy on enterprise benchmarks.',
  },
  {
    id: 4,
    title: 'Scalable Microservices with Rust and Go',
    desc: 'Choosing the right language for high-concurrency enterprise pipelines that never compromise on safety.',
    tag: 'Cloud Native',
    image: thumb4,
    time: '12 min read',
    content: 'Memory safety and raw throughput are no longer mutually exclusive. Rust handles the performance-critical data ingestion layer while Go orchestrates inter-service communication. This hybrid approach delivers 3x throughput improvement over Node.js equivalents with near-zero runtime allocation overhead. The key architectural decision was treating language boundaries as explicit contracts expressed as protobuf schemas, making cross-language debugging predictable and tooling-friendly.',
  },
  {
    id: 5,
    title: 'Quantum-Resistant Encryption Standards',
    desc: 'Preparing the enterprise for the next era of computational threats with post-quantum cryptography.',
    tag: 'Cyber Security',
    image: thumb5,
    time: '15 min read',
    content: 'With quantum computing advancing rapidly, CISOs must begin migrating to post-quantum cryptographic standards today. NIST-approved algorithms like CRYSTALS-Kyber and CRYSTALS-Dilithium offer a practical migration path. Our phased adoption framework ensures backward compatibility while futureproofing your security posture. Crypto-agility — the ability to swap algorithms without re-architecting systems — is the defining engineering discipline of this decade.',
  },
  {
    id: 6,
    title: 'The Engineering Mindset: Excellence as a Baseline',
    desc: 'Defining the cultural pillars of a world-class technical organisation obsessed with craft.',
    tag: 'Engineering Culture',
    image: thumb6,
    time: '6 min read',
    content: 'Great engineering culture is not born from ping-pong tables or unlimited PTO. It is built on radical ownership, obsessive documentation, and a shared belief that "good enough" is never good enough. The most high-performing teams we have built share one trait: they treat every commit as a public declaration of their craft. Code review is not gatekeeping — it is mentorship delivered at the speed of git.',
  },
];

// ─── Article Modal ────────────────────────────────────────────────────────────

const ArticleModal = ({ post, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Prevent body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <AnimatePresence>
      {post && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6"
            style={{ paddingTop: 'max(72px, env(safe-area-inset-top, 72px))' }}
          >
            <div
              className="relative w-full sm:max-w-2xl lg:max-w-4xl max-h-[calc(100vh-80px)] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white shadow-2xl flex flex-col lg:flex-row pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 flex items-center justify-center w-8 h-8 rounded-full bg-black/10 hover:bg-red-500 hover:text-white text-black/50 transition-all duration-200"
              >
                <X size={15} />
              </button>

              {/* Image — top on mobile/tablet, left on desktop */}
              <div className="relative w-full lg:w-[38%] h-44 sm:h-52 lg:h-auto flex-shrink-0 rounded-t-3xl lg:rounded-r-none lg:rounded-l-3xl overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/50" />
                {/* Tag badge */}
                <div className="absolute bottom-4 left-4">
                  <span className="bg-[#007cc3] text-white text-[9px] font-extrabold uppercase tracking-[0.2em] px-3 py-1.5 rounded-full">
                    {post.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col p-5 sm:p-8 lg:p-10 flex-1">
                {/* Time */}
                <div className="flex items-center gap-1.5 text-black/30 text-[10px] font-semibold uppercase tracking-widest mb-3">
                  <Clock size={11} />
                  {post.time}
                </div>

                {/* Title */}
                <h3 className="text-gray-900 font-bold text-lg sm:text-2xl lg:text-[1.75rem] leading-tight mb-2 sm:mb-3 font-infosys-heading italic">
                  {post.title}
                </h3>

                {/* Subtitle */}
                <p className="text-black/45 text-sm sm:text-[15px] mb-5 leading-relaxed italic">
                  {post.desc}
                </p>

                {/* Divider */}
                <div className="flex items-center gap-3 mb-4">
                  <BookOpen size={13} className="text-[#007cc3] flex-shrink-0" />
                  <span className="text-[#007cc3] text-[10px] font-extrabold uppercase tracking-[0.25em]">
                    Full Article
                  </span>
                  <div className="flex-1 h-px bg-black/8" />
                </div>

                {/* Body */}
                <p className="text-black/55 text-sm sm:text-[15px] leading-relaxed sm:leading-[1.9]">
                  {post.content}
                </p>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-black/6 flex items-center justify-between">
                  <span className="text-black/20 text-[10px] font-semibold uppercase tracking-widest italic hidden sm:block">
                    NSG Solutions
                  </span>
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 ml-auto bg-black/5 hover:bg-red-50 hover:text-red-500 text-black/40 text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-200"
                  >
                    <X size={12} />
                    Close Article
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ─── Blog Card ────────────────────────────────────────────────────────────────

const BlogCard = ({ post, index, onOpen }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: index * 0.08 }}
    className="group relative h-[420px] rounded-[2rem] overflow-hidden cursor-pointer select-none"
  >
    {/* Background image */}
    <img
      src={post.image}
      alt={post.title}
      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
    />

    {/* Permanent subtle bottom gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-transparent" />

    {/* Hover overlay — slides up */}
    <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out bg-gradient-to-t from-black/90 via-black/55 to-transparent">
      {/* Tag + time */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#38bdf8] text-[10px] font-extrabold uppercase tracking-[0.25em]">
          {post.tag}
        </span>
        <div className="flex items-center gap-1.5 text-white/50 text-[10px] font-semibold uppercase tracking-widest">
          <Clock size={11} />
          {post.time}
        </div>
      </div>

      {/* Title */}
      <h4 className="text-white font-bold text-[1.2rem] leading-snug mb-3 font-infosys-heading italic">
        {post.title}
      </h4>

      {/* Description */}
      <p className="text-white/60 text-[13px] leading-relaxed mb-6 line-clamp-2">
        {post.desc}
      </p>

      {/* CTA */}
      <button
        onClick={() => onOpen(post)}
        className="flex items-center gap-2 self-start bg-[#007cc3] hover:bg-[#38bdf8] text-white text-[11px] font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 group/btn"
      >
        Read Article
        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
      </button>
    </div>
  </motion.div>
);

// ─── Grid ─────────────────────────────────────────────────────────────────────

const BlogsGrid = ({ activeCategory }) => {
  const [activePost, setActivePost] = useState(null);

  const filteredPosts =
    activeCategory === 'All'
      ? posts
      : posts.filter((p) => p.tag === activeCategory);

  return (
    <>
      {/* Article Modal — renders outside grid, won't affect layout */}
      <AnimatePresence>
        {activePost && (
          <ArticleModal post={activePost} onClose={() => setActivePost(null)} />
        )}
      </AnimatePresence>

      <section className="py-24 px-6 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, idx) => (
              <BlogCard
                key={post.id}
                post={post}
                index={idx}
                onOpen={setActivePost}
              />
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-20 text-center"
            >
              <p className="text-black/30 text-xl italic">
                "No insights found for this category yet. Check back soon."
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogsGrid;