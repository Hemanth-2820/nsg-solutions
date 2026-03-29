import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, CheckCircle, XCircle, LogOut, Layout, BookOpen, Plus, Trash2, Edit2, FileText, Tag, Image as ImageIcon, Send, Briefcase, Users, MapPin, Download, ExternalLink, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('testimonials'); // 'testimonials', 'blogs', 'jobs', 'applications'
    const [testimonials, setTestimonials] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState(null);
    
    // Blog States
    const [isEditingBlog, setIsEditingBlog] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' });
    
    // Job States
    const [isEditingJob, setIsEditingJob] = useState(false);
    const [currentJob, setCurrentJob] = useState({ title: '', location: '', type: 'Full-time', stack: '', salary: '', description: '' });

    const navigate = useNavigate();

    // SECURITY CHECK
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
        try {
            if (activeTab === 'testimonials') await fetchPending();
            else if (activeTab === 'blogs') await fetchBlogs();
            else if (activeTab === 'jobs') await fetchJobs();
            else if (activeTab === 'applications') await fetchApplications();
        } catch (err) {
            console.error("Fetch error:", err);
        }
        setLoading(false);
    };

    const fetchPending = async () => {
        const res = await fetch('/api/admin/get_pending.php');
        const data = await res.json();
        if (data.status === 'success') setTestimonials(data.data);
    };

    const fetchBlogs = async () => {
        const res = await fetch('/api/get_blogs.php');
        const data = await res.json();
        if (data.status === 'success') {
            const processedBlogs = data.data.map(blog => {
                let img = blog.image;
                if (!img.startsWith('http')) {
                  if (!img.startsWith('/')) img = '/' + img;
                  img = `https://new.nsgsolutions.in${img}`;
                }
                return { ...blog, image: img };
            });
            setBlogs(processedBlogs);
        }
    };

    const fetchJobs = async () => {
        const res = await fetch('/api/get_jobs.php');
        const data = await res.json();
        const processed = data.map(j => ({ ...j, stack: Array.isArray(j.stack) ? j.stack.join(', ') : j.stack }));
        setJobs(processed || []);
    };

    const fetchApplications = async () => {
        const res = await fetch('/api/get_applications.php');
        const data = await res.json();
        setApplications(data || []);
    };

    // JOB ACTIONS
    const handleSaveJob = async (e) => {
        e.preventDefault();
        const endpoint = isEditingJob ? '/api/manage_jobs.php?action=update' : '/api/manage_jobs.php?action=add';
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentJob)
            });
            const data = await res.json();
            if (data.status === 'success') {
                showToast(isEditingJob ? 'Job updated!' : 'Job posted!', 'success');
                setIsEditingJob(false);
                setCurrentJob({ title: '', location: '', type: 'Full-time', stack: '', salary: '', description: '' });
                fetchJobs();
            }
        } catch (err) { showToast('Job save failed.', 'error'); }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm('Confirm job deletion?')) return;
        try {
            const res = await fetch('/api/manage_jobs.php?action=delete', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id })
            });
            const data = await res.json();
            if (data.status === 'success') {
                showToast('Job removed!', 'success');
                fetchJobs();
            }
        } catch (err) { showToast('Deletion failed.', 'error'); }
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
        } catch (error) { showToast('Update failed.', 'error'); }
    };

    const handleSaveBlog = async (e) => {
        e.preventDefault();
        const endpoint = isEditingBlog ? '/api/admin/update_blog.php' : '/api/admin/create_blog.php';
        const blogData = { ...currentBlog, image: currentBlog.image.replace('https://new.nsgsolutions.in', '') };
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
        } catch (error) { showToast('Action failed.', 'error'); }
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
        } catch (error) { showToast('Deletion failed.', 'error'); }
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
                        
                        <nav className="hidden lg:flex items-center gap-2 ml-4">
                            {[
                                { id: 'testimonials', label: 'Testimonials', icon: <CheckCircle size={14} /> },
                                { id: 'blogs', label: 'Blogs', icon: <BookOpen size={14} /> },
                                { id: 'jobs', label: 'Careers', icon: <Briefcase size={14} /> },
                                { id: 'applications', label: 'Applications', icon: <Users size={14} /> }
                            ].map(tab => (
                                <button 
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === tab.id ? 'bg-white/10 text-[#007cc3]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                                >
                                    {tab.icon} {tab.label}
                                </button>
                            ))}
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
                    {activeTab === 'testimonials' && (
                        <motion.div key="testimonials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                             <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl font-black uppercase italic font-infosys-heading tracking-tight mb-2">Testimonial Queue</h2>
                                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">Client feedback moderation</p>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8">
                                {loading ? <div className="py-20 text-center uppercase tracking-widest text-xs opacity-20 animate-pulse">Accessing DB...</div> : testimonials.length === 0 ? (
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
                        </motion.div>
                    )}

                    {activeTab === 'blogs' && (
                        <motion.div key="blogs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl font-black uppercase italic font-infosys-heading tracking-tight mb-2">Insight Flow</h2>
                                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">Knowledge Base Control</p>
                                </div>
                                <button onClick={() => { setIsEditingBlog(false); setCurrentBlog({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' }); }} className="bg-[#007cc3] hover:bg-[#0088d8] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 shadow-xl active:scale-95 transition-all"><Plus size={18} /> New Post</button>
                            </div>

                            <div className="grid lg:grid-cols-[1fr_450px] gap-12">
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8 border-b border-white/5 pb-4">Published Articles ({blogs.length})</h3>
                                        <div className="space-y-2">
                                            {blogs.map((blog) => (
                                                <div key={blog.id} className="group bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl p-4 flex items-center justify-between transition-all">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-[#0f172a] rounded overflow-hidden border border-white/10"><img src={blog.image} className="w-full h-full object-cover opacity-50" onError={(e) => e.target.src='https://via.placeholder.com/100'} /></div>
                                                        <div>
                                                            <h4 className="text-sm font-bold mb-1 truncate max-w-[250px]">{blog.title}</h4>
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

                                <form onSubmit={handleSaveBlog} className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#007cc3] mb-8 flex items-center gap-2">{isEditingBlog ? <Edit2 size={14} /> : <Plus size={14} />} {isEditingJob ? 'Edit Article' : 'Compose insight'}</h3>
                                    <div className="space-y-6">
                                        <input required value={currentBlog.title} onChange={e => setCurrentBlog({...currentBlog, title: e.target.value})} placeholder="Title" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none" />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input value={currentBlog.tag} onChange={e => setCurrentBlog({...currentBlog, tag: e.target.value})} placeholder="Tag" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none" />
                                            <input value={currentBlog.time_to_read} onChange={e => setCurrentBlog({...currentBlog, time_to_read: e.target.value})} placeholder="Read Time" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none" />
                                        </div>
                                        <input value={currentBlog.image} onChange={e => setCurrentBlog({...currentBlog, image: e.target.value})} placeholder="Image Path" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none" />
                                        <textarea rows="6" required value={currentBlog.content} onChange={e => setCurrentBlog({...currentBlog, content: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-[#007cc3] outline-none resize-none" />
                                        <button type="submit" className="w-full bg-[#007cc3] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] hover:bg-[#0088d8] transition-all flex items-center justify-center gap-2"><Send size={16} /> {isEditingBlog ? 'Update' : 'Publish'}</button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'jobs' && (
                        <motion.div key="jobs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl font-black uppercase italic font-infosys-heading tracking-tight mb-2">Talent Acquisition</h2>
                                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">Corporate Role Management</p>
                                </div>
                                <button onClick={() => { setIsEditingJob(false); setCurrentJob({ title: '', location: '', type: 'Full-time', stack: '', salary: '', description: '' }); }} className="bg-[#007cc3] hover:bg-[#0088d8] text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-[11px] flex items-center gap-3 active:scale-95 transition-all"><Plus size={18} /> Post Job</button>
                            </div>

                            <div className="grid lg:grid-cols-[1fr_450px] gap-12">
                                <div className="space-y-4">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-8 border-b border-white/5 pb-4">Active Positions ({jobs.length})</h3>
                                        <div className="space-y-2">
                                            {jobs.map((job) => (
                                                <div key={job.id} className="group bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-xl p-6 flex items-center justify-between transition-all">
                                                    <div className="flex-1">
                                                        <h4 className="text-lg font-bold mb-1">{job.title}</h4>
                                                        <div className="flex items-center gap-4 text-[10px] font-black text-white/40 uppercase tracking-widest">
                                                            <span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span>
                                                            <span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <button onClick={() => { setIsEditingJob(true); setCurrentJob(job); }} className="p-3 hover:bg-white/10 rounded-lg text-white/50 hover:text-[#007cc3] transition-all"><Edit2 size={18} /></button>
                                                        <button onClick={() => handleDeleteJob(job.id)} className="p-3 hover:bg-red-500/10 rounded-lg text-white/50 hover:text-red-400 transition-all"><Trash2 size={18} /></button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <form onSubmit={handleSaveJob} className="bg-white/5 border border-white/10 rounded-3xl p-8 sticky top-32">
                                    <h3 className="text-[10px] font-black uppercase tracking-widest text-[#007cc3] mb-8 flex items-center gap-2">{isEditingJob ? <Edit2 size={14} /> : <Plus size={14} />} {isEditingJob ? 'Edit Position' : 'Broadcast Vacancy'}</h3>
                                    <div className="space-y-5">
                                        <input required value={currentJob.title} onChange={e => setCurrentJob({...currentJob, title: e.target.value})} placeholder="Job Title" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#007cc3] outline-none" />
                                        <input required value={currentJob.location} onChange={e => setCurrentJob({...currentJob, location: e.target.value})} placeholder="Location (e.g. Remote)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#007cc3] outline-none" />
                                        <select value={currentJob.type} onChange={e => setCurrentJob({...currentJob, type: e.target.value})} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#007cc3] outline-none">
                                            <option value="Full-time">Full-time</option>
                                            <option value="Part-time">Part-time</option>
                                            <option value="Contract">Contract</option>
                                            <option value="Remote">Remote</option>
                                        </select>
                                        <input required value={currentJob.stack} onChange={e => setCurrentJob({...currentJob, stack: e.target.value})} placeholder="Stack (comma separated)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#007cc3] outline-none" />
                                        <input required value={currentJob.salary} onChange={e => setCurrentJob({...currentJob, salary: e.target.value})} placeholder="Salary Bracket" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#007cc3] outline-none" />
                                        <textarea rows="4" value={currentJob.description} onChange={e => setCurrentJob({...currentJob, description: e.target.value})} placeholder="Description (Optional)" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-sm focus:border-[#007cc3] outline-none resize-none" />
                                        <button type="submit" className="w-full bg-[#007cc3] text-white py-4 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all hover:bg-[#0088d8] flex items-center justify-center gap-2"><Send size={16} /> {isEditingJob ? 'Update Job' : 'Post Opening'}</button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'applications' && (
                        <motion.div key="applications" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex items-center justify-between mb-12">
                                <div>
                                    <h2 className="text-3xl font-black uppercase italic font-infosys-heading tracking-tight mb-2">Deterministic Candidates</h2>
                                    <p className="text-white/40 text-[11px] font-bold uppercase tracking-[0.3em]">Job application review hub</p>
                                </div>
                                <div className="bg-white/5 px-6 py-4 border border-white/10 rounded-2xl text-center">
                                    <span className="block text-[10px] font-black uppercase text-white/30 mb-1 tracking-widest">Submissions</span>
                                    <span className="text-2xl font-black text-[#007cc3]">{applications.length}</span>
                                </div>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                                {loading ? <div className="py-20 text-center uppercase tracking-widest text-xs opacity-20 animate-pulse">Scanning Archive...</div> : (
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-left border-collapse">
                                            <thead>
                                                <tr className="bg-white/5 text-[10px] font-black uppercase tracking-widest text-white/30 border-b border-white/5">
                                                    <th className="px-8 py-6">Candidate</th>
                                                    <th className="px-8 py-6">Target Role</th>
                                                    <th className="px-8 py-6">Contact</th>
                                                    <th className="px-8 py-6">Applied Date</th>
                                                    <th className="px-8 py-6 text-right">Resume</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {applications.map((app) => (
                                                    <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="px-8 py-6">
                                                            <div className="font-bold text-sm">{app.name}</div>
                                                            {app.portfolio_url && <a href={app.portfolio_url} target="_blank" rel="noreferrer" className="text-[10px] text-[#007cc3] hover:underline flex items-center gap-1 mt-1 font-bold italic"><ExternalLink size={10} /> Portfolio</a>}
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="px-3 py-1 bg-[#007cc3]/10 text-[#007cc3] text-[10px] font-black uppercase tracking-widest rounded-md">{app.job_title || 'Unknown Role'}</span>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <div className="text-sm font-medium">{app.email}</div>
                                                            <div className="text-[10px] text-white/30 font-bold">{app.phone}</div>
                                                        </td>
                                                        <td className="px-8 py-6 text-[11px] font-black text-white/30">
                                                            {new Date(app.created_at).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <a 
                                                                href={`https://new.nsgsolutions.in/api/${app.resume_path}`} 
                                                                target="_blank" 
                                                                rel="noreferrer" 
                                                                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-[#007cc3] text-white rounded-lg text-[10px] font-black uppercase tracking-widest transition-all"
                                                            >
                                                                <Download size={14} /> View CV
                                                            </a>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                        {applications.length === 0 && (
                                            <div className="py-20 text-center">
                                                <Users size={48} className="mx-auto text-white/5 mb-4" />
                                                <p className="text-white/20 font-bold uppercase tracking-widest text-xs">No deterministic candidates yet.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
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
