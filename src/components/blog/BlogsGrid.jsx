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
    title: 'How to Keep Your Business Safe Across Multiple Cloud Platforms',
    desc: 'A practical guide to building strong security when your data and apps are spread across different cloud services.',
    tag: 'Cyber Security',
    image: thumb1,
    time: '8 min read',
    content: 'As more businesses move to the cloud, keeping data secure across multiple providers has become a real challenge. Zero-Trust security means you never automatically trust anyone — every user and device must prove who they are, every time. By using encrypted connections, identity checks, and real-time threat monitoring, businesses can protect themselves even if one part of their system is compromised. Companies that take this approach respond to threats 60% faster and limit the damage if something does go wrong.',
  },
  {
    id: 2,
    title: 'Why Fast APIs Matter — And How We Build Them',
    desc: 'How we use modern tools and smart design to make our APIs respond in under 100 milliseconds, anywhere in the world.',
    tag: 'Cloud Technology',
    image: thumb2,
    time: '10 min read',
    content: 'When your app needs to respond quickly — whether loading data, processing a request, or syncing between systems — slow APIs ruin the experience. We use a faster communication format called gRPC (instead of the older REST approach) combined with smart caching to cut response times by 40%. The secret is simple: keep the data close to where it\'s needed, reduce the work required to send and receive it, and use smart routing to find the fastest path every time.',
  },
  {
    id: 3,
    title: 'Going Beyond Chatbots: How We Build AI That Actually Thinks',
    desc: 'Building AI that understands your specific business — not just a generic chatbot that gives vague answers.',
    tag: 'Artificial Intelligence',
    image: thumb3,
    time: '14 min read',
    content: 'Most businesses use AI tools that are trained on general information — so they give generic answers. The real value comes when AI is trained specifically on your industry, your data, and your processes. We build AI systems that combine custom-trained models with a technique called RAG (Retrieval-Augmented Generation) — which means the AI looks up real, up-to-date information before answering. This gives 94% accuracy on complex business tasks, compared to the hit-or-miss results of general AI tools.',
  },
  {
    id: 4,
    title: 'Choosing the Right Tools for High-Speed Apps',
    desc: 'How we use Rust and Go together to build applications that are fast, safe, and built to handle massive traffic.',
    tag: 'Cloud Technology',
    image: thumb4,
    time: '12 min read',
    content: 'Building apps that are both fast and reliable used to be a trade-off. We use two modern programming languages — Rust for raw speed and safety, and Go for managing how different parts of the system talk to each other. Together, they deliver 3x more throughput than apps built with Node.js, with far fewer crashes or memory issues. The key insight is treating each language as a specialist — use Rust where speed matters most, use Go where coordination and simplicity matter most.',
  },
  {
    id: 5,
    title: 'Preparing Your Business for the Future of Cybersecurity',
    desc: 'Quantum computers will eventually break today\'s encryption. Here\'s how to start protecting your business now.',
    tag: 'Cyber Security',
    image: thumb5,
    time: '15 min read',
    content: 'In the coming years, quantum computers will become powerful enough to break the encryption that protects most business data today. The good news: there are already new, quantum-resistant encryption methods available. Our approach is to start the transition now — using new standards approved by NIST (a leading security authority) — while making sure existing systems still work during the switch. The most important thing any business can do is build "crypto-agility" — the ability to change your encryption without overhauling your entire system.',
  },
  {
    id: 6,
    title: 'What Makes a Great Engineering Team?',
    desc: 'Culture, ownership, and the shared belief that good enough is never good enough — the foundation of a high-performing team.',
    tag: 'Team & Culture',
    image: thumb6,
    time: '6 min read',
    content: 'A great engineering team is not built with perks or open offices. It is built on ownership — where every engineer takes full responsibility for their work — and a shared commitment to quality. The best teams we have built all share one trait: they treat every piece of code as a reflection of their craft. Code reviews are not checkpoints — they are mentorship moments. Documentation is not a chore — it is how knowledge gets shared. When everyone holds the same standard, the whole team gets better, faster.',
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

const BlogCard = ({ post, index, onOpen }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      onClick={() => onOpen(post)}
      className="group relative h-[500px] overflow-hidden cursor-pointer select-none transition-all duration-700 border border-white/5 bg-[#0f172a]"
    >
      {/* Background Image — Fades out on hover */}
      <img
        src={post.image}
        alt={post.title}
        className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-0"
      />
      
      {/* Permanent bottom gradient for initial state title readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90 group-hover:opacity-0 transition-opacity duration-700" />

      {/* Hover Blue Overlay — Fades in on hover */}
      <div className="absolute inset-0 bg-[#007cc3] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      {/* Category Badge - Top Left */}
      <div className="absolute top-8 left-8 z-20">
        <span className="px-4 py-2 text-[10px] sm:text-[11px] font-black uppercase tracking-[0.25em] bg-black text-white">
          {post.tag === 'Cyber Security' ? 'SECURITY' : post.tag === 'Cloud Technology' ? 'CLOUD' : post.tag === 'Artificial Intelligence' ? 'AI' : post.tag === 'Team & Culture' ? 'CULTURE' : 'ARTICLE'}
        </span>
      </div>

      {/* Content Container */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 z-10">
        
        {/* Title — Always Visible, stays crisp */}
        <h4 className="font-infosys-heading text-[1.5rem] sm:text-[1.8rem] lg:text-[2.2rem] font-black uppercase leading-[1.05] italic mb-6 text-white transition-all duration-500">
          {post.title}
        </h4>

        {/* Description — Appears only on hover with the blue background */}
        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
          <div className="overflow-hidden">
            <p className="text-white text-sm sm:text-[15px] leading-relaxed mb-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
              {post.desc}
            </p>
          </div>
        </div>

        {/* Action Link — Always Visible at Bottom */}
        <div className="flex items-center gap-3 text-[11px] sm:text-[12px] font-black uppercase tracking-[0.3em] text-white transition-all duration-300">
          <span>READ FULL ARTICLE</span>
          <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>

      {/* Hover Light Overlay */}
      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
    </motion.div>
  );
};

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
                No articles found for this category yet. Check back soon.
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </>
  );
};

export default BlogsGrid;