import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
              {post.description}
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
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/get_blogs.php?v=' + Date.now());
        const result = await response.json();
        if (result.status === 'success') {
          // Robust Image Normalization
          const processedBlogs = result.data.map(blog => {
            let img = blog.image;
            if (!img.startsWith('http')) {
              if (!img.startsWith('/')) img = '/' + img;
              img = `https://nsgsolutions.in${img}`;
            }
            return { ...blog, image: img };
          });
          setBlogs(processedBlogs);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const filteredPosts =
    activeCategory === 'All'
      ? blogs
      : blogs.filter((post) => post.tag === activeCategory);

  if (loading) {
    return (
      <div className="py-24 flex items-center justify-center">
        <Loader className="text-[#007cc3] animate-spin" size={40} />
      </div>
    );
  }

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