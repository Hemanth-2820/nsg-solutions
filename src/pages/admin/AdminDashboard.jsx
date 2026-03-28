import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, CheckCircle, XCircle, LogOut, Layout, BookOpen, Plus, Trash2, Edit2, FileText, Tag, Image as ImageIcon, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('testimonials'); // 'testimonials' or 'blogs'
    const [testimonials, setTestimonials] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState(null);
    const [isEditingBlog, setIsEditingBlog] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' });
    
    const navigate = useNavigate();

    // SECURITY CHECK: Ensure user is logged in as admin
    useEffect(() => {
        const adminUser = JSON.parse(localStorage.getItem('nsg_admin_user'));
        if (!adminUser) {
            navigate('/admin-login'); 
        } else {
            fetchData();
        }
    }, [navigate, activeTab]);

    const fetchData = async () => {
        setLoading(true);
        if (activeTab === 'testimonials') {
            await fetchPending();
        } else {
            await fetchBlogs();
        }
        setLoading(false);
    };

    const fetchPending = async () => {
        try {
            const response = await fetch('/api/admin/get_pending.php');
            const data = await response.json();
            if (data.status === 'success') {
                setTestimonials(data.data);
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        }
    };

    const fetchBlogs = async () => {
        try {
            const response = await fetch('/api/get_blogs.php');
            const data = await response.json();
            if (data.status === 'success') {
                // Prepend live domain for thumbnails in the admin list
                const processedBlogs = data.data.map(blog => ({
                    ...blog,
                    image: blog.image.startsWith('/') 
                        ? `https://new.nsgsolutions.in${blog.image}` 
                        : blog.image
                }));
                setBlogs(processedBlogs);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleUpdateTestimonial = async (id, status) => {
        try {
            const response = await fetch('/api/admin/update_status.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ testimonial_id: id, status: status })
            });
            const data = await response.json();
            if (data.status === 'success') {
                showToast(`Testimonial ${status} successfully!`, 'success');
                fetchPending();
            }
        } catch (error) {
            showToast('Update failed. Try again.', 'error');
        }
    };

    const handleSaveBlog = async (e) => {
        e.preventDefault();
        const endpoint = isEditingBlog ? '/api/admin/update_blog.php' : '/api/admin/create_blog.php';
        
        // Strip the domain from the image path before saving to DB
        // (Ensures it stays relative like /blogs-folder/...)
        const blogData = {
            ...currentBlog,
            image: currentBlog.image.replace('https://new.nsgsolutions.in', '')
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(blogData)
            });
            const data = await response.json();
            if (data.status === 'success') {
                showToast(isEditingBlog ? 'Blog updated!' : 'Blog created!', 'success');
                setIsEditingBlog(false);
                setCurrentBlog({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' });
                fetchBlogs();
            }
        } catch (error) {
            showToast('Action failed.', 'error');
        }
    };

    const handleDeleteBlog = async (id) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) return;
        try {
            const response = await fetch('/api/admin/delete_blog.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await response.json();
            if (data.status === 'success') {
                showToast('Blog deleted!', 'success');
                fetchBlogs();
            }
        } catch (error) {
            showToast('Deletion failed.', 'error');
        }
    };

    const showToast = (text, type) => {
        setStatusMessage({ text, type });
        setTimeout(() => setStatusMessage(null), 3000);
    };

    const handleLogout = () => {
        localStorage.removeItem('nsg_admin_user');
        navigate('/admin-login');
    };

    return (
        <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-[#007cc3] selection:text-white">
            <header className="border-b border-white/10 bg-[#0f172a]/80 backdrop-blur-xl sticky top-0 z-50 w-full">
                <div className="max-w-[1400px] mx-auto px-6 h-24 flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-[#007cc3] rounded-xl text-white shadow-lg shadow-blue-500/20">
                                <Layout size={28} />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold uppercase tracking-[0.2em] hidden sm:block">Admin Node</h1>
                                <span className="text-[10px] text-[#007cc3] font-bold uppercase tracking-[0.3em] hidden sm:block">Secure Session</span>
                            </div>
                        </div>
                        
                        <nav className="hidden md:flex items-center gap-2 ml-4">
                            <button 
                                onClick={() => setActiveTab('testimonials')}
                                className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'testimonials' ? 'bg-white/10 text-[#007cc3]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                            >
                                Testimonials
                            </button>
                            <button 
                                onClick={() => setActiveTab('blogs')}
                                className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'blogs' ? 'bg-white/10 text-[#007cc3]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                            >
                                Blogs
                            </button>
                        </nav>
                    </div>

                    <div className="flex items-center gap-6">
                        <button onClick={handleLogout} className="text-white/40 hover:text-red-400 transition-colors capitalize text-sm font-bold flex items-center gap-2">
                           <LogOut size={16} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'testimonials' ? (
                        <motion.div key="testimonials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                             <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl font-black uppercase italic font-infosys-heading tracking-tight mb-2">Testimonial Queue</h2>
                                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">Client feedback moderation</p>
                                </div>
                                <div className="bg-white/5 px-6 py-4 border border-white/10 rounded-2xl text-center">
                                    <span className="block text-[10px] font-black uppercase text-white/30 mb-1 tracking-widest">Pending</span>
                                    <span className="text-2xl font-black text-[#007cc3]">{testimonials.length}</span>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                                <div className="p-8">
                                    {loading ? (
                                        <div className="py-20 text-center text-white/20 uppercase tracking-widest text-xs">Accessing DB...</div>
                                    ) : testimonials.length === 0 ? (
                                        <div className="py-20 text-center flex flex-col items-center">
                                            <CheckCircle size={48} className="text-green-500/20 mb-4" />
                                            <p className="text-white/40 font-bold uppercase tracking-widest text-xs">Queue Clear</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-4">
                                            {testimonials.map((item) => (
                                                <div key={item.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 flex flex-col lg:flex-row gap-6 items-center justify-between">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-3 mb-3">
                                                            <div className="w-8 h-8 rounded-full bg-[#007cc3] flex items-center justify-center font-black text-xs">{item.client_name.charAt(0)}</div>
                                                            <span className="font-bold text-sm uppercase tracking-wider">{item.client_name} <span className="text-white/30 ml-2 font-normal">@{item.company}</span></span>
                                                        </div>
                                                        <p className="text-white/70 italic text-sm leading-relaxed">"{item.content}"</p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => handleUpdateTestimonial(item.id, 'approved')} className="bg-green-500/10 hover:bg-green-500 text-green-500 hover:text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Approve</button>
                                                        <button onClick={() => handleUpdateTestimonial(item.id, 'rejected')} className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all">Reject</button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div key="blogs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl font-black uppercase italic font-infosys-heading tracking-tight mb-2">Blog Management</h2>
                                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">Knowledge Base Control</p>
                                </div>
                                <button 
                                    onClick={() => { setIsEditingBlog(false); setCurrentBlog({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' }); }}
                                    className="bg-[#007cc3] hover:bg-[#0088d8] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                                >
                                    <Plus size={18} /> New Post
                                </button>
                            </div>

                            <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                                {/* Blog List */}
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8 border-b border-white/5 pb-4">Published Articles ({blogs.length})</h3>
                                        <div className="space-y-2">
                                            {blogs.map((blog) => (
                                                <div key={blog.id} className="group bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl p-4 flex items-center justify-between transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-[#0f172a] rounded overflow-hidden border border-white/10">
                                                            <img src={blog.image} className="w-full h-full object-cover opacity-50" onError={(e) => e.target.src='https://via.placeholder.com/100'} />
                                                        </div>
                                                        <div>
                                                            <h4 className="text-sm font-bold mb-1 truncate max-w-[300px]">{blog.title}</h4>
                                                            <span className="text-[9px] font-black uppercase tracking-widest text-[#007cc3]">{blog.tag}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button onClick={() => { setIsEditingBlog(true); setCurrentBlog(blog); }} className="p-2 hover:bg-white/10 rounded-lg text-white/50 hover:text-white transition-all"><Edit2 size={16} /></button>
                                                        <button onClick={() => handleDeleteBlog(blog.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-white/50 hover:text-red-400 transition-all"><Trash2 size={16} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Editor Panel */}
                                <div>
                                    <form onSubmit={handleSaveBlog} className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#007cc3] mb-8 flex items-center gap-2">
                                            {isEditingBlog ? <Edit2 size={14} /> : <Plus size={14} />} 
                                            {isEditingBlog ? 'Edit Article' : 'Compose New Insight'}
                                        </h3>
                                        
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Title</label>
                                                <input 
                                                    required 
                                                    value={currentBlog.title} 
                                                    onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})}
                                                    placeholder="Enter title..." 
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none transition-all" 
                                                />
                                            </div>
                                            
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Category / Tag</label>
                                                    <input 
                                                        value={currentBlog.tag} 
                                                        onChange={e => setCurrentBlog({...currentBlog, tag: e.target.value})}
                                                        placeholder="e.g. AI, Cyber" 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none transition-all" 
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Read Time</label>
                                                    <input 
                                                        value={currentBlog.time_to_read} 
                                                        onChange={e => setCurrentBlog({...currentBlog, time_to_read: e.target.value})}
                                                        placeholder="e.g. 5 min read" 
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none transition-all" 
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Image URL/Path</label>
                                                <input 
                                                    value={currentBlog.image} 
                                                    onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})}
                                                    placeholder="/blogs-folder/image.png" 
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none transition-all" 
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Excerpt / Description</label>
                                                <textarea 
                                                    rows="2" 
                                                    value={currentBlog.description} 
                                                    onChange={e => setCurrentBlog({...currentBlog, description: e.target.value})}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none transition-all resize-none" 
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[9px] font-black uppercase tracking-widest text-white/40 ml-1">Full Content</label>
                                                <textarea 
                                                    required 
                                                    rows="6" 
                                                    value={currentBlog.content} 
                                                    onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})}
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none transition-all resize-none" 
                                                />
                                            </div>

                                            <button 
                                                type="submit" 
                                                className="w-full bg-white text-black hover:bg-[#007cc3] hover:text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all flex items-center justify-center gap-2"
                                            >
                                                <Send size={16} /> {isEditingBlog ? 'Update Post' : 'Publish Article'}
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            <AnimatePresence>
                {statusMessage && (
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }}
                        className={`fixed bottom-10 right-10 z-[100] px-8 py-4 rounded-2xl shadow-2xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-3 ${statusMessage.type === 'success' ? 'bg-[#007cc3] text-white' : 'bg-red-500 text-white'}`}
                    >
                        {statusMessage.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                        {statusMessage.text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
