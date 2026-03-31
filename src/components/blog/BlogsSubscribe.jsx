import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, ShieldCheck, CheckCircle2 } from 'lucide-react';

const BlogsSubscribe = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="py-24 px-6 bg-[#f5f7fa] relative overflow-hidden">
      {/* Toast Notification */}
      <AnimatePresence>
        {submitted && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[999] flex items-center gap-3 bg-white border border-green-100 text-gray-800 px-6 py-4 rounded-2xl shadow-2xl"
          >
            <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
            <div>
              <p className="font-bold text-sm uppercase tracking-widest text-green-600">Subscribed!</p>
              <p className="text-black/40 text-[12px] mt-0.5">We'll send new articles straight to your inbox.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tech Mesh Decoration */}
      <div className="absolute inset-0 z-0 opacity-[0.03]"
        style={{ backgroundImage: `radial-gradient(#007cc3 1px, transparent 1px)`, backgroundSize: '30px 30px' }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-6xl mx-auto rounded-[3.5rem] bg-white border border-black/5 p-16 md:p-24 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-16"
      >
        <div className="relative z-10 lg:w-1/2">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[10px] mb-8 block"
          >
            Stay Updated
          </motion.span>
          <h3 className="text-4xl md:text-6xl font-bold text-gray-900 mb-8 leading-[1.1] font-infosys-heading italic">
            Get New Articles <br /> <span className="text-[#007cc3]">In Your Inbox</span>
          </h3>
          <p className="text-black/50 text-xl font-medium leading-relaxed italic">
            Subscribe to receive our latest engineering articles, guides, and technology insights every week.
          </p>
        </div>

        <div className="relative z-10 w-full lg:w-1/2">
          <div className="relative flex flex-col sm:flex-row items-center bg-[#f5f7fa] border border-black/5 rounded-[2rem] p-3 focus-within:ring-4 focus-within:ring-[#007cc3]/10 transition-all duration-500">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              placeholder="Enter your email address..."
              className="w-full bg-transparent text-gray-900 px-8 py-4 outline-none placeholder:text-black/20 text-sm font-bold uppercase tracking-widest"
            />
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 15px 30px rgba(0,124,195,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-[#007cc3] text-white px-10 py-5 rounded-[1.5rem] font-bold flex items-center justify-center gap-3 transition-all"
            >
              <span className="uppercase tracking-[0.2em] text-[11px]">Subscribe</span>
              <Send size={16} />
            </motion.button>
          </div>
          {error && (
            <p className="text-red-400 text-[11px] font-semibold uppercase tracking-widest mt-3 pl-4">{error}</p>
          )}
          <div className="flex items-center justify-center lg:justify-start gap-3 mt-6 text-black/30 font-bold uppercase tracking-[0.2em] text-[9px]">
            <ShieldCheck size={14} className="text-[#007cc3]" /> No spam. Unsubscribe anytime.
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default BlogsSubscribe;