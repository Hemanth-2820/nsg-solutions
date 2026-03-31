import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Globe } from 'lucide-react';

import author1 from '../../assets/generated/blog_author_1.png';
import author2 from '../../assets/external/blog_author_2.jpg';
import author3 from '../../assets/external/blog_author_3.jpg';

const authors = [
  { 
    name: 'Alex Rivera', 
    role: 'Principal Systems Architect', 
    expertise: 'Distributed Systems',
    img: author1 
  },
  { 
    name: 'Sarah Chen', 
    role: 'Lead AI Researcher', 
    expertise: 'Neural Networks',
    img: author2 
  },
  { 
    name: 'David Kim', 
    role: 'Security Operations Head', 
    expertise: 'Quantum Encryption',
    img: author3 
  }
];

const BlogsAuthors = () => {
  return (
    <section className="py-24 px-6 bg-[#fdfaf6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[10px] mb-8 block"
          >
            Meet Our Authors
          </motion.span>
          <h3 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 font-infosys-heading italic">
            The People Writing <span className="text-[#007cc3]">These Blogs</span>
          </h3>
          <p className="text-black/50 text-xl font-medium max-w-2xl mx-auto italic">Every article is written by an engineer who has solved the problem firsthand.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          {authors.map((author, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.15 }}
              className="relative group bg-white border border-black/5 p-12 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-700 text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-8">
                <div className="absolute inset-0 bg-[#007cc3]/10 rounded-full group-hover:scale-110 transition-transform duration-700" />
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-xl">
                  <img src={author.img} alt={author.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              
              <h4 className="text-2xl font-bold text-gray-900 mb-2 font-infosys-heading group-hover:text-[#007cc3] transition-colors duration-500">{author.name}</h4>
              <p className="text-[#007cc3] text-[10px] font-bold uppercase tracking-[0.3em] mb-6">{author.role}</p>
              
              <div className="flex flex-col items-center gap-4 border-t border-black/5 pt-8">
                 <div className="px-4 py-1.5 bg-[#f5f7fa] text-black/50 text-[10px] font-bold uppercase tracking-widest rounded-full group-hover:bg-[#007cc3]/5 group-hover:text-[#007cc3] transition-all duration-500">
                    Exp: {author.expertise}
                 </div>
                 <div className="flex items-center gap-6 text-black/20 group-hover:text-[#007cc3] transition-colors duration-700">
                    <Linkedin size={18} className="cursor-pointer hover:scale-120 transition-transform" />
                    <Twitter size={18} className="cursor-pointer hover:scale-120 transition-transform" />
                    <Globe size={18} className="cursor-pointer hover:scale-120 transition-transform" />
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogsAuthors;