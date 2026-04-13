import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, Share2, Printer, ChevronRight, Loader } from 'lucide-react';

const BlogPostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/get_blogs.php?id=${id}`);
        const result = await response.json();
        if (result.status === 'success') {
          // Robust Image Normalization
          let img = result.data.image;
          if (!img.startsWith('http')) {
            if (!img.startsWith('/')) img = '/' + img;
            img = `https://nsgsolutions.in${img}`;
          }
          const processedPost = {
            ...result.data,
            image: img
          };
          setPost(processedPost);
        }
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0f16] flex items-center justify-center">
        <Loader className="text-[#007cc3] animate-spin" size={48} />
      </div>
    );
  }

  if (!post) return <div className="min-h-screen bg-[#0a0f16] flex items-center justify-center text-white font-black uppercase tracking-widest">Post Not Found</div>;

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
                  <Clock size={16} className="text-[#007cc3]" /> {post.time_to_read}
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
                  {post.description}
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
