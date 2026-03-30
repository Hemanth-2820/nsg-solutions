import React, { useState, useEffect } from 'react';
import logonavbar from "../../assets/logonavbar.png";
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Clock, CheckCircle, XCircle, LogOut, Layout, BookOpen, Plus, Trash2, Edit2, FileText, Tag, Image as ImageIcon, Send, Briefcase, Users, MapPin, Download, ExternalLink, Zap, ArrowRight, Globe, AlertTriangle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('testimonials'); 
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [testimonials, setTestimonials] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [jobs, setJobs] = useState([]);
    const [applications, setApplications] = useState([]);
    const [solutions, setSolutions] = useState({});
    const [inquiries, setInquiries] = useState([]);
    const [highlights, setHighlights] = useState({ left: [], right: [] });
    const [loading, setLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState(null);
    
    // Sub-states
    const [isEditingBlog, setIsEditingBlog] = useState(false);
    const [currentBlog, setCurrentBlog] = useState({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' });
    const [isEditingJob, setIsEditingJob] = useState(false);
    const [currentJob, setCurrentJob] = useState({ title: '', location: '', type: 'Full-time', stack: '', salary: '', description: '' });
    const [isEditingSolution, setIsEditingSolution] = useState(false);
    const [currentSolution, setCurrentSolution] = useState({ category: 'itservices', title: '', shortDesc: '', desc: '', img: '', features: '' });
    const [isEditingHighlight, setIsEditingHighlight] = useState(false);
    const [currentHighlight, setCurrentHighlight] = useState({ id: null, title: '', image_url: '', column_side: 'left', sort_order: 0 });
    const [confirm, setConfirm] = useState({ isOpen: false, title: '', onConfirm: null });
    const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
    const [currentTestimonial, setCurrentTestimonial] = useState({ client_name: '', service_name: '', content: '', rating: 5 });

    const navigate = useNavigate();

    useEffect(() => {
        const adminUser = JSON.parse(localStorage.getItem('nsg_admin_user'));
        if (!adminUser) navigate('/admin-login'); 
        else fetchData();
    }, [navigate, activeTab]);

    const normalizeImg = (img) => {
        if (!img) return '';
        if (img.startsWith('http')) return img;
        let clean = img;
        if (!clean.startsWith('/')) clean = '/' + clean;
        return `https://new.nsgsolutions.in${clean}`;
    }

    const fetchData = async () => {
        if (!navigator.onLine) return;
        setLoading(true);
        try {
            if (activeTab === 'testimonials') await fetchTestimonials();
            else if (activeTab === 'blogs') await fetchBlogs();
            else if (activeTab === 'jobs') await fetchJobs();
            else if (activeTab === 'applications') await fetchApplications();
            else if (activeTab === 'solutions') await fetchSolutions();
            else if (activeTab === 'inquiries') await fetchInquiries();
            else if (activeTab === 'highlights') await fetchHighlights();
        } catch (err) { console.error(err); }
        setLoading(false);
    };

    const fetchTestimonials = async () => {
        const res = await fetch('/api/admin_manage_testimonials.php?action=list');
        const data = await res.json();
        if (data.status === 'success') setTestimonials(data.all || []);
    };

    const fetchBlogs = async () => {
        const res = await fetch('/api/get_blogs.php');
        const result = await res.json();
        if (result.status === 'success') {
            const processed = result.data.map(b => ({ ...b, displayImg: normalizeImg(b.image) }));
            setBlogs(processed);
        }
    };

    const fetchJobs = async () => {
        const res = await fetch('/api/get_jobs.php');
        const data = await res.json();
        setJobs(data || []);
    };

    const fetchApplications = async () => {
        const res = await fetch('/api/get_applications.php');
        const data = await res.json();
        setApplications(data || []);
    };

    const fetchSolutions = async () => {
        const res = await fetch('/api/get_solutions.php');
        const result = await res.json();
        if (result.status === 'success') {
            const normalized = {};
            Object.keys(result.data).forEach(cat => {
                normalized[cat] = result.data[cat].map(s => ({ ...s, displayImg: normalizeImg(s.img) }));
            });
            setSolutions(normalized);
        }
    };

    const fetchInquiries = async () => {
        const res = await fetch('/api/get_inquiries.php');
        const data = await res.json();
        if (data.status === 'success') setInquiries(data.data);
    };

    const fetchHighlights = async () => {
        const res = await fetch('/api/get_highlights.php');
        const result = await res.json();
        if (result.status === 'success') {
            const norm = { left: [], right: [] };
            if (result.data.left) norm.left = result.data.left.map(h => ({ ...h, displayImg: normalizeImg(h.image_url) }));
            if (result.data.right) norm.right = result.data.right.map(h => ({ ...h, displayImg: normalizeImg(h.image_url) }));
            setHighlights(norm);
        }
    };

    // BLOG ACTIONS
    const handleSaveBlog = async (e) => {
        e.preventDefault();
        const endpoint = isEditingBlog ? '/api/admin/update_blog.php' : '/api/admin/create_blog.php';
        try {
            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentBlog)
            });
            if ((await res.json()).status === 'success') {
                showToast(isEditingBlog ? 'Insight Updated!' : 'Insight Published!', 'success');
                setIsEditingBlog(false);
                setCurrentBlog({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' });
                fetchBlogs();
            }
        } catch (err) { showToast('Action failed', 'error'); }
    }

    const handleDeleteBlog = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Permanently remove this Insight Article?',
            onConfirm: async () => {
                try {
                    const res = await fetch('/api/admin/delete_blog.php', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                    const data = await res.json();
                    if (data.status === 'success') { showToast('Deleted!', 'success'); fetchBlogs(); }
                    else { showToast(data.message || 'Purge failed', 'error'); }
                } catch (err) { showToast('Server communication error', 'error'); }
            }
        });
    }

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
            if ((await res.json()).status === 'success') {
                showToast(isEditingJob ? 'Job Revised!' : 'Vacancy Posted!', 'success');
                setIsEditingJob(false);
                setCurrentJob({ title: '', location: '', type: 'Full-time', stack: '', salary: '', description: '' });
                fetchJobs();
            }
        } catch (err) { showToast('Fails', 'error'); }
    }

    const handleDeleteJob = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Delete this professional vacancy listing?',
            onConfirm: async () => {
                try {
                    const res = await fetch('/api/manage_jobs.php?action=delete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                    const data = await res.json();
                    if (data.status === 'success') { showToast('Deleted!', 'success'); fetchJobs(); }
                    else { showToast(data.message || 'Purge failed', 'error'); }
                } catch (err) { showToast('Server communication error', 'error'); }
            }
        });
    }

    // SOLUTION ACTIONS
    const handleSaveSolution = async (e) => {
        e.preventDefault();
        const method = isEditingSolution ? 'PUT' : 'POST';
        const solData = { ...currentSolution, features: typeof currentSolution.features === 'string' ? currentSolution.features.split(',').map(f => f.trim()) : currentSolution.features };
        try {
            const res = await fetch('/api/manage_solutions.php', {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(solData)
            });
            if ((await res.json()).status === 'success') {
                showToast(isEditingSolution ? 'Project Revised!' : 'Project Added!', 'success');
                setIsEditingSolution(false);
                setCurrentSolution({ category: 'itservices', title: '', shortDesc: '', desc: '', img: '', features: '' });
                fetchSolutions();
            }
        } catch (err) { showToast('Fails', 'error'); }
    }

    const handleDeleteSolution = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Purge this Solution Portfolio entry?',
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/manage_solutions.php?id=${id}`, { method: 'DELETE' });
                    const data = await res.json();
                    if (data.status === 'success') { showToast('Deleted!', 'success'); fetchSolutions(); }
                    else { showToast(data.message || 'Purge failed', 'error'); }
                } catch (err) { showToast('Server communication error', 'error'); }
            }
        });
    }

    // HIGHLIGHT ACTIONS
    const handleSaveHighlight = async (e) => {
        e.preventDefault();
        const method = isEditingHighlight ? 'PUT' : 'POST';
        try {
            const res = await fetch('/api/manage_highlights.php', {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentHighlight)
            });
            if ((await res.json()).status === 'success') {
                showToast(isEditingHighlight ? 'Revised!' : 'Added!', 'success');
                setIsEditingHighlight(false);
                setCurrentHighlight({ id: null, title: '', image_url: '', column_side: 'left', sort_order: 0 });
                fetchHighlights();
            }
        } catch (err) { showToast('Fails', 'error'); }
    }

    const handleDeleteHighlight = async (id) => {
        if (!window.confirm('Delete highlight?')) return;
        try {
            const res = await fetch(`/api/manage_highlights.php?id=${id}`, { method: 'DELETE' });
            if ((await res.json()).status === 'success') { showToast('Deleted!', 'success'); fetchHighlights(); }
        } catch (err) { showToast('Fails', 'error'); }
    }

    const handleDeleteInquiry = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Permanently purge this Intelligent Lead from registry?',
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/manage_inquiries.php?id=${id}`, { method: 'DELETE' });
                    const data = await res.json();
                    if (data.status === 'success') { showToast('Purged Admin Registry', 'success'); fetchInquiries(); }
                    else { showToast(data.message || 'Purge failed', 'error'); }
                } catch (err) { showToast('Server communication error', 'error'); }
            }
        });
    }

    const handleUpdateTestimonial = async (id, status) => {
        try {
            const response = await fetch('/api/admin_manage_testimonials.php?action=status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, status })
            });
            const data = await response.json();
            if (data.status === 'success') { 
                showToast(`Manifest updated: ${status.toUpperCase()}`, 'success'); 
                fetchTestimonials(); 
            }
        } catch (err) { showToast('Sync Fail', 'error'); }
    };

    const handleSaveTestimonial = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/admin_manage_testimonials.php?action=save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(currentTestimonial)
            });
            const data = await res.json();
            if (data.status === 'success') {
                showToast('Intelligence Synchronized!', 'success');
                setIsEditingTestimonial(false);
                setCurrentTestimonial({ client_name: '', service_name: '', content: '', rating: 5 });
                fetchTestimonials();
            }
        } catch (err) { showToast('Save Fail', 'error'); }
    }

    const handleDeleteTestimonial = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Purge this client review from repository?',
            onConfirm: async () => {
                try {
                    const res = await fetch('/api/admin_manage_testimonials.php?action=delete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                    if ((await res.json()).status === 'success') { 
                        showToast('Purged Admin Registry', 'success'); 
                        fetchTestimonials(); 
                    }
                } catch (err) { showToast('Purge Fail', 'error'); }
            }
        });
    }

    const handleLogout = () => {
        localStorage.removeItem('nsg_admin_user');
        navigate('/admin-login');
    };

    const showToast = (text, type) => {
        if (type === 'success') toast.success(text);
        else if (type === 'error') toast.error(text);
        else toast(text);
    };

    const adminTabs = [
        { id: 'testimonials', label: 'Testimonials', icon: <CheckCircle size={18} /> },
        { id: 'solutions', label: 'Solutions', icon: <Briefcase size={18} /> },
        { id: 'highlights', label: 'Highlights', icon: <Zap size={18} /> },
        { id: 'inquiries', label: 'Inquiries', icon: <Send size={18} /> },
        { id: 'blogs', label: 'Blogs', icon: <BookOpen size={18} /> },
        { id: 'jobs', label: 'Careers', icon: <Zap size={18} /> },
        { id: 'applications', label: 'Apps', icon: <Users size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-[#0f172a] text-white pt-28">
            <header className="fixed top-0 left-0 w-full border-b border-white/10 bg-[#0f172a] z-[300] shadow-2xl h-28">
                <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between relative">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-4">
                            <img src={logonavbar} alt="Logo" className="h-10 w-auto" />
                            <div className="flex flex-col">
                                <span className="text-sm font-black uppercase text-[#007cc3]">NSG Command</span>
                                <span className="text-[10px] text-white/30 font-bold uppercase tracking-widest leading-none">Control Panel</span>
                            </div>
                        </Link>
                    </div>

                    <nav className="hidden lg:flex items-center gap-2">
                        {adminTabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white/10 text-[#007cc3]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>{tab.label}</button>
                        ))}
                    </nav>

                    <div className="flex items-center gap-4 relative z-[320]">
                        <button onClick={handleLogout} className="text-white/40 hover:text-red-400 font-bold hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest transition-all"><LogOut size={16} /> Logout</button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10 shadow-xl">{isMenuOpen ? <XCircle size={24} /> : <Layout size={24} />}</button>
                    </div>
                </div>

                <AnimatePresence>
                    {isMenuOpen && (
                        <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-0 bg-[#0A0E27] z-[250] flex flex-col p-8 pt-32 backdrop-blur-3xl bg-opacity-95">
                            <div className="flex flex-col gap-3 overflow-y-auto mt-4">
                                {adminTabs.map(tab => (
                                    <button key={tab.id} onClick={() => { setActiveTab(tab.id); setIsMenuOpen(false); }} className={`w-full p-6 rounded-2xl text-left flex items-center gap-4 font-black uppercase tracking-widest text-lg transition-all ${activeTab === tab.id ? 'bg-[#007cc3] text-white border-none shadow-2xl' : 'bg-white/5 text-white/30 border border-white/5 hover:bg-white/10 hover:text-white'}`}>{tab.icon} {tab.label}</button>
                                ))}
                                <button onClick={handleLogout} className="mt-6 p-6 bg-red-500/10 text-red-500 rounded-2xl font-black uppercase border border-red-500/10 tracking-widest flex items-center justify-center gap-2 pb-10 mb-10"><LogOut size={20} /> Terminate</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <main className="max-w-[1400px] mx-auto px-6 py-12">
                <AnimatePresence mode="wait">
                    {activeTab === 'testimonials' && (
                        <motion.div key="testimonials" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                             <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tight">Voices of Success</h2>
                                <div className="flex gap-4">
                                    <div className="bg-white/5 px-6 py-3 rounded-xl border border-white/10 text-center"><span className="block text-[8px] uppercase font-black text-[#007cc3] mb-1">Queue</span><span className="text-xl font-black">{testimonials.filter(t => t.status === 'pending').length}</span></div>
                                    <div className="bg-[#007cc3]/10 px-6 py-3 rounded-xl border border-[#007cc3]/20 text-center"><span className="block text-[8px] uppercase font-black text-[#007cc3] mb-1">Active</span><span className="text-xl font-black">{testimonials.filter(t => t.status === 'approved').length}</span></div>
                                </div>
                             </div>

                             <div className="grid lg:grid-cols-[1fr_400px] gap-12">
                                <div className="space-y-12">
                                    {/* PENDING SECTION */}
                                    {testimonials.filter(t => t.status === 'pending').length > 0 && (
                                        <div className="bg-white/5 p-8 rounded-[40px] border-2 border-dashed border-[#007cc3]/30">
                                            <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 tracking-[0.2em] flex items-center gap-3"><Clock size={16} /> Incoming Intelligence</h3>
                                            <div className="space-y-4">
                                                {testimonials.filter(t => t.status === 'pending').map(item => (
                                                    <div key={item.id} className="bg-[#0f172a] p-6 rounded-3xl flex flex-col lg:flex-row justify-between items-center gap-6 border border-white/5 shadow-2xl relative overflow-hidden group">
                                                        <div className="absolute left-0 top-0 w-1.5 h-full bg-[#007cc3]"></div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-2">
                                                                <div className="font-black uppercase text-[10px] text-white tracking-widest">{item.client_name}</div>
                                                                <span className="w-1 h-1 rounded-full bg-white/10"></span>
                                                                <div className="text-[10px] font-black text-[#007cc3]/60 uppercase tracking-widest">{item.service_name || 'General Project'}</div>
                                                                <div className="flex gap-0.5 ml-4">
                                                                    {[...Array(5)].map((_, i) => (
                                                                        <div key={i} className={`w-2 h-2 rounded-full ${i < (item.rating || 5) ? 'bg-[#1baade]' : 'bg-white/5'}`}></div>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                            <p className="italic text-white/40 text-sm leading-relaxed font-medium">"{item.content}"</p>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => handleUpdateTestimonial(item.id, 'approved')} className="px-6 py-3 bg-[#007cc3] hover:bg-[#1baade] text-white rounded-xl font-black uppercase text-[9px] tracking-widest transition-all shadow-lg shadow-blue-500/20">Authorize</button>
                                                            <button onClick={() => handleUpdateTestimonial(item.id, 'rejected')} className="px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl font-black uppercase text-[9px] tracking-widest transition-all border border-red-500/10">Discard</button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* PUBLISHED SECTION */}
                                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-2xl backdrop-blur-3xl min-h-[400px]">
                                        <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 tracking-[0.2em] flex items-center gap-3"><CheckCircle size={16} /> Active Reputation</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {testimonials.filter(t => t.status === 'approved' || t.status === 'rejected').map(item => (
                                                <div key={item.id} className="bg-white/5 p-6 rounded-3xl border border-white/5 shadow-xl group hover:border-[#007cc3]/20 transition-all">
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-white/40">{item.client_name?.[0]}</div>
                                                        <div className="flex flex-col items-end">
                                                            <div className="text-[10px] font-black text-white/20 uppercase mb-2">Rating</div>
                                                            <div className="flex gap-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < (item.rating || 5) ? 'bg-[#007cc3]' : 'bg-white/5'}`}></div>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="mb-6 h-[80px] overflow-hidden">
                                                        <h4 className="font-black text-white text-sm uppercase tracking-tighter mb-1 truncate">{item.service_name}</h4>
                                                        <p className="text-[11px] text-white/30 italic line-clamp-2 leading-relaxed font-medium">"{item.content}"</p>
                                                    </div>
                                                    <div className="flex justify-between items-center pt-6 border-t border-white/5">
                                                        <span className={`text-[8px] font-black uppercase tracking-widest ${item.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>{item.status}</span>
                                                        <div className="flex gap-1 opacity-10 group-hover:opacity-100 transition-opacity">
                                                            <button 
                                                                onClick={() => { setIsEditingTestimonial(true); setCurrentTestimonial(item); }}
                                                                className="p-3 bg-white/5 hover:bg-[#007cc3] text-white rounded-xl transition-all"
                                                                title="Format Entry"
                                                            >
                                                                <Edit2 size={14} />
                                                            </button>
                                                            <button 
                                                                onClick={() => handleDeleteTestimonial(item.id)}
                                                                className="p-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-xl transition-all"
                                                                title="Purge Entry"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {testimonials.filter(t => t.status === 'approved' || t.status === 'rejected').length === 0 && (
                                                <div className="col-span-2 py-20 text-center opacity-20 text-[10px] font-black tracking-widest uppercase italic">No managed testimonials found.</div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* EDITING SIDEBAR */}
                                <div className="space-y-6">
                                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit sticky top-40 shadow-2xl animate-fade-in shadow-blue-900/10 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#007cc3]/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                                        <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 tracking-[0.2em] flex items-center gap-3">
                                            {isEditingTestimonial ? <Edit2 size={16} /> : <Plus size={16} />} {isEditingTestimonial ? 'Intelligence Refactoring' : 'Manual Entry'}
                                        </h3>
                                        <form onSubmit={handleSaveTestimonial} className="space-y-6 relative z-10">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Client Identity</label>
                                                <input required value={currentTestimonial.client_name} onChange={e=>setCurrentTestimonial({...currentTestimonial, client_name:e.target.value})} placeholder="Full Name" className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Service Title (Card Header)</label>
                                                <input required value={currentTestimonial.service_name} onChange={e=>setCurrentTestimonial({...currentTestimonial, service_name:e.target.value})} placeholder="e.g. Cloud Migration" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Performance Rating</label>
                                                <select value={currentTestimonial.rating} onChange={e=>setCurrentTestimonial({...currentTestimonial, rating:parseInt(e.target.value)})} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none appearance-none">
                                                    {[1,2,3,4,5].map(v => <option key={v} value={v} className="bg-[#0f172a]">{v} Star Intelligence</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Quote Contents</label>
                                                <textarea required rows="6" value={currentTestimonial.content} onChange={e=>setCurrentTestimonial({...currentTestimonial, content:e.target.value})} placeholder="Feedback data..." className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none resize-none" />
                                            </div>
                                            <button type="submit" className="w-full bg-[#007cc3] py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl shadow-blue-500/20 hover:bg-[#0088d8] transition-all flex items-center justify-center gap-3">
                                                {isEditingTestimonial ? <CheckCircle size={18} /> : <Send size={18} />} {isEditingTestimonial ? 'Commit Changes' : 'Inject Entry'}
                                            </button>
                                            {isEditingTestimonial && (
                                                <button type="button" onClick={() => { setIsEditingTestimonial(false); setCurrentTestimonial({ client_name: '', service_name: '', content: '', rating: 5 }); }} className="w-full text-[9px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-all">Cancel Refactoring</button>
                                            )}
                                        </form>
                                    </div>
                                </div>
                             </div>
                        </motion.div>
                    )}

                    {activeTab === 'blogs' && (
                        <motion.div key="blogs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-black uppercase italic">Insight Flow</h2>
                                <button onClick={() => { setIsEditingBlog(false); setCurrentBlog({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' }); }} className="bg-[#007cc3] text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 transition-all shadow-xl active:scale-95"><Plus size={18} /> Compose</button>
                            </div>
                            <div className="grid lg:grid-cols-[1fr_450px] gap-12">
                                <div className="space-y-4">
                                    {blogs.map(blog => (
                                        <div key={blog.id} className="bg-white/5 border border-white/5 p-5 rounded-3xl flex items-center justify-between group hover:border-[#007cc3]/30 transition-all shadow-xl backdrop-blur-sm">
                                            <div className="flex items-center gap-5">
                                                <div className="w-16 h-16 bg-black rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 shadow-2xl">
                                                    <img src={blog.displayImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-base mb-1 truncate max-w-[250px]">{blog.title}</h4>
                                                    <span className="text-[10px] uppercase font-black text-[#007cc3] opacity-60 tracking-widest">{blog.tag}</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { setIsEditingBlog(true); setCurrentBlog(blog); }} className="p-3 text-white/40 hover:text-white bg-white/5 rounded-xl"><Edit2 size={18} /></button>
                                                <button onClick={() => handleDeleteBlog(blog.id)} className="p-3 text-white/40 hover:text-red-400 bg-red-500/5 rounded-xl"><Trash2 size={18} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSaveBlog} className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit sticky top-40 shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                                    <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-5 flex items-center gap-3">{isEditingBlog ? <Edit2 size={16} /> : <Plus size={16} />} {isEditingBlog ? 'Revise Article' : 'New Publication'}</h3>
                                    <div className="space-y-6">
                                        <input required value={currentBlog.title} onChange={e=>setCurrentBlog({...currentBlog, title:e.target.value})} placeholder="Title" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm focus:border-[#007cc3] outline-none transition-all" />
                                        <div className="flex gap-4">
                                            <input required value={currentBlog.tag} onChange={e=>setCurrentBlog({...currentBlog, tag:e.target.value})} placeholder="Category" className="flex-1 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                            <input required value={currentBlog.time_to_read} onChange={e=>setCurrentBlog({...currentBlog, time_to_read:e.target.value})} placeholder="Min" className="w-32 bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        </div>
                                        <input required value={currentBlog.image} onChange={e=>setCurrentBlog({...currentBlog, image:e.target.value})} placeholder="Image Path (/blog.png)" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <textarea required rows="8" value={currentBlog.content} onChange={e=>setCurrentBlog({...currentBlog, content:e.target.value})} placeholder="Markdown Content" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none resize-none" />
                                        <button type="submit" className="w-full bg-[#007cc3] py-5 rounded-2xl font-black uppercase text-[12px] tracking-widest shadow-blue-500/20 shadow-xl hover:bg-[#0088d8] transition-all flex items-center justify-center gap-3"><Send size={20} /> Finalize Post</button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'solutions' && (
                        <motion.div key="solutions" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                             <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tight">Portfolio Nexus</h2>
                                <button onClick={() => { setIsEditingSolution(false); setCurrentSolution({ category: 'itservices', title: '', shortDesc: '', desc: '', img: '', features: '' }); }} className="bg-[#007cc3] text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 transition-all"><Plus size={18} /> New Discovery</button>
                             </div>
                             <div className="grid lg:grid-cols-[1fr_450px] gap-12">
                                <div className="space-y-10">
                                    {Object.keys(solutions).map(cat => (
                                        <div key={cat} className="bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-xl">
                                            <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 tracking-widest flex items-center gap-3"><Briefcase size={16} /> {cat} Projects</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {solutions[cat].map(proj => (
                                                    <div key={proj.id} className="bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 group relative shadow-2xl">
                                                        <div className="h-40 relative overflow-hidden"><img src={proj.displayImg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70" /><div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div></div>
                                                        <div className="p-5 flex items-center justify-between"><span className="font-bold text-sm truncate">{proj.title}</span><div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"><button onClick={() => { setIsEditingSolution(true); setCurrentSolution({ ...proj, category: cat, features: Array.isArray(proj.features) ? proj.features.join(', ') : proj.features }); }} className="p-2 hover:text-[#007cc3] text-white/40"><Edit2 size={16} /></button><button onClick={() => handleDeleteSolution(proj.id)} className="p-2 hover:text-red-400 text-white/40"><Trash2 size={16} /></button></div></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSaveSolution} className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit sticky top-40 shadow-2xl overflow-hidden">
                                    <h3 className="uppercase text-[10px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 flex items-center gap-3"><ImageIcon size={16} /> Registry Entry</h3>
                                    <div className="space-y-4">
                                        <select value={currentSolution.category} onChange={e=>setCurrentSolution({...currentSolution, category:e.target.value})} className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none">
                                            <option value="itservices">IT Services</option>
                                            <option value="digitalmarketing">Digital Marketing</option>
                                            <option value="videoproduction">Video Production</option>
                                            <option value="branding">Branding & Design</option>
                                        </select>
                                        <input required value={currentSolution.title} onChange={e=>setCurrentSolution({...currentSolution, title:e.target.value})} placeholder="Project Title" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <input required value={currentSolution.img} onChange={e=>setCurrentSolution({...currentSolution, img:e.target.value})} placeholder="Asset Path (/img.jpg)" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <textarea required rows="5" value={currentSolution.desc} onChange={e=>setCurrentSolution({...currentSolution, desc:e.target.value})} placeholder="Briefing" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none resize-none" />
                                        <button type="submit" className="w-full bg-[#007cc3] py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl flex items-center justify-center gap-3 mt-4 transition-all"><Send size={18} /> Update Nexus</button>
                                    </div>
                                </form>
                             </div>
                        </motion.div>
                    )}

                     {activeTab === 'jobs' && (
                        <motion.div key="jobs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                             <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-black uppercase italic italic font-infosys-heading tracking-tight mb-2">Talent Acquisition</h2>
                                <button onClick={() => { setIsEditingJob(false); setCurrentJob({ title: '', location: '', type: 'Full-time', stack: '', salary: '', description: '' }); }} className="bg-[#007cc3] text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 transition-all shadow-xl"><Plus size={18} /> Add Vacancy</button>
                             </div>
                             <div className="grid lg:grid-cols-[1fr_450px] gap-12">
                                <div className="space-y-4">
                                     {jobs.map(job => (
                                        <div key={job.id} className="bg-white/5 border border-white/5 p-6 rounded-3xl flex items-center justify-between group hover:border-[#007cc3]/30 transition-all shadow-xl">
                                            <div>
                                                <h4 className="font-bold text-xl mb-1">{job.title}</h4>
                                                <div className="flex items-center gap-4 text-[10px] font-black text-white/30 uppercase tracking-[0.2em]"><span className="flex items-center gap-1"><MapPin size={12} /> {job.location}</span><span className="flex items-center gap-1"><Clock size={12} /> {job.type}</span></div>
                                            </div>
                                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => { setIsEditingJob(true); setCurrentJob(job); }} className="p-3 bg-white/5 rounded-xl hover:text-white"><Edit2 size={20} /></button>
                                                <button onClick={() => handleDeleteJob(job.id)} className="p-3 bg-red-500/5 rounded-xl hover:text-red-400"><Trash2 size={20} /></button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSaveJob} className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit sticky top-40 shadow-2xl">
                                    <h3 className="uppercase text-[10px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 flex items-center gap-3"><Briefcase size={16} /> Job Registry</h3>
                                    <div className="space-y-5">
                                        <input required value={currentJob.title} onChange={e=>setCurrentJob({...currentJob, title:e.target.value})} placeholder="Position Name" className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm outline-none" />
                                        <input required value={currentJob.location} onChange={e=>setCurrentJob({...currentJob, location:e.target.value})} placeholder="Location" className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm outline-none" />
                                        <select value={currentJob.type} onChange={e=>setCurrentJob({...currentJob, type:e.target.value})} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 text-sm outline-none">
                                            <option value="Full-time">Full-time</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                        <textarea rows="4" value={currentJob.description} onChange={e=>setCurrentJob({...currentJob, description:e.target.value})} placeholder="Description" className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm outline-none resize-none" />
                                        <button type="submit" className="w-full bg-[#007cc3] py-5 rounded-xl font-black uppercase text-[11px] tracking-widest shadow-xl flex items-center justify-center gap-3 mt-4 hover:bg-[#0088d8] transition-all"><Send size={18} /> Update Careers</button>
                                    </div>
                                </form>
                             </div>
                        </motion.div>
                    )}

                    {activeTab === 'highlights' && (
                        <motion.div key="highlights" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                             <h2 className="text-3xl font-black uppercase italic mb-8">High-Impact Highlights</h2>
                             <div className="grid lg:grid-cols-[1fr_400px] gap-10">
                                <div className="space-y-8">
                                    {['left', 'right'].map(side => (
                                        <div key={side} className="bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-xl">
                                            <h3 className="uppercase text-[10px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 tracking-widest">{side} Track</h3>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {(highlights[side] || []).map(card => (
                                                    <div key={card.id} className="bg-[#0f172a] rounded-3xl overflow-hidden border border-white/5 group relative shadow-2xl">
                                                        <div className="h-32 bg-black/60 relative"><img src={card.displayImg} className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-110" /><div className="absolute inset-0 bg-black/40"></div></div>
                                                        <div className="p-4 flex items-center justify-between"><h4 className="font-bold text-sm truncate">{card.title}</h4><div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all"><button onClick={() => { setIsEditingHighlight(true); setCurrentHighlight(card); }} className="p-2 bg-white/5 rounded-lg hover:text-[#007cc3]"><Edit2 size={14} /></button><button onClick={() => handleDeleteHighlight(card.id)} className="p-2 bg-red-500/5 rounded-lg hover:text-red-400"><Trash2 size={14} /></button></div></div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <form onSubmit={handleSaveHighlight} className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit sticky top-40 shadow-2xl">
                                    <h3 className="uppercase text-[10px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4">Highlight Registry</h3>
                                    <div className="space-y-4">
                                        <select value={currentHighlight.column_side} onChange={e=>setCurrentHighlight({...currentHighlight, column_side:e.target.value})} className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none">
                                            <option value="left">Left Column</option>
                                            <option value="right">Right Column</option>
                                        </select>
                                        <input required value={currentHighlight.title} onChange={e=>setCurrentHighlight({...currentHighlight, title:e.target.value})} placeholder="Card Title" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <input required value={currentHighlight.image_url} onChange={e=>setCurrentHighlight({...currentHighlight, image_url:e.target.value})} placeholder="Asset Path" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <input type="number" required value={currentHighlight.sort_order} onChange={e=>setCurrentHighlight({...currentHighlight, sort_order:parseInt(e.target.value)})} placeholder="Priority" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <button type="submit" className="w-full bg-[#007cc3] py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl flex items-center justify-center gap-3 mt-4 transition-all hover:bg-[#0088d8]"><Send size={18} /> Sync Highlight</button>
                                    </div>
                                </form>
                             </div>
                        </motion.div>
                    )}

                    {activeTab === 'applications' && (
                        <motion.div key="apps" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                             <div className="flex justify-between items-end mb-12">
                                <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tight">Deterministic Candidates</h2>
                                <div className="bg-white/5 px-8 py-5 rounded-2xl border border-white/10 text-center shadow-lg"><span className="block text-[10px] uppercase font-black text-[#007cc3] mb-1">Total Intelligence</span><span className="text-3xl font-black tracking-tighter">{applications.length}</span></div>
                             </div>
                             <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-3xl">
                                <table className="w-full text-left">
                                    <thead className="bg-white/5 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 border-b border-white/5">
                                        <tr><th className="px-10 py-8">Identity</th><th className="px-10 py-8">Target Project</th><th className="px-10 py-8 text-right">Archived CV</th></tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {applications.map(app => (
                                            <tr key={app.id} className="hover:bg-white/[0.02] transition-all group">
                                                <td className="px-10 py-8"><div className="font-bold text-lg mb-1">{app.name}</div><div className="text-[10px] font-black uppercase tracking-widest text-white/30">{app.email}</div></td>
                                                <td className="px-10 py-8"><span className="px-4 py-2 bg-[#007cc3]/10 text-[#007cc3] text-[9px] font-black uppercase tracking-widest rounded-full border border-[#007cc3]/20">{app.job_title || 'General Entry'}</span></td>
                                                <td className="px-10 py-8 text-right"><a href={`https://new.nsgsolutions.in/api/${app.resume_path}`} target="_blank" className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-[#007cc3] text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl"><Download size={14} /> Analyze CV</a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </motion.div>
                    )}

                     {activeTab === 'inquiries' && (
                        <motion.div key="leads" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                             <div className="flex justify-between items-center mb-12">
                                <h2 className="text-3xl font-black uppercase italic mb-2 tracking-tight">Intelligence Inbound</h2>
                                <div className="bg-[#007cc3] px-8 py-5 rounded-2xl shadow-xl shadow-blue-500/20 text-center border border-white/10"><span className="block text-[10px] uppercase font-black text-white/50 mb-1">Global Intelligence</span><span className="text-3xl font-black tracking-tighter">{inquiries.length}</span></div>
                             </div>
                             <div className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden shadow-2xl backdrop-blur-3xl">
                                <table className="w-full text-left">
                                    <thead className="bg-[#0f172a] text-[9px] font-black uppercase tracking-[0.2em] text-white/10 border-b border-white/5">
                                        <tr>
                                            <th className="px-10 py-10">Client Identity</th>
                                            <th className="px-10 py-10">Project Scope</th>
                                            <th className="px-10 py-10">Intelligence Detail</th>
                                            <th className="px-10 py-10 text-right">Archival Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {inquiries.map(lead => (
                                            <tr key={lead.id} className="hover:bg-white/[0.03] transition-all group border-b border-white/[0.02] last:border-0">
                                                <td className="px-10 py-10">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#007cc3] to-[#1baade] flex items-center justify-center text-white font-black text-lg shadow-lg shadow-blue-500/10 uppercase italic">
                                                            {lead.first_name?.[0] || 'U'}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-xl text-white tracking-tighter mb-0.5">{lead.first_name} {lead.last_name}</div>
                                                            <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.1em] flex items-center gap-2">
                                                                <span className="text-[#007cc3] tracking-normal lowercase">{lead.email}</span>
                                                                <span className="w-1 h-1 rounded-full bg-white/10"></span>
                                                                <span>{lead.phone}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-10">
                                                    <div className="inline-block px-4 py-2 bg-[#007cc3]/10 border border-[#007cc3]/30 rounded-xl text-[#1baade] text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm italic">
                                                        {lead.project_name}
                                                    </div>
                                                    <div className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 flex items-center gap-2">
                                                        <Briefcase size={10} className="text-white/10" /> {lead.company} <span className="text-white/5 mx-1">/</span> {lead.role}
                                                    </div>
                                                </td>
                                                <td className="px-10 py-10 max-w-[400px]">
                                                    <div className="relative group/msg">
                                                        <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5 text-[11px] font-medium text-white/80 italic leading-relaxed mb-3 group-hover:bg-white/[0.05] transition-colors relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-1 h-full bg-[#007cc3]/50"></div>
                                                            "{lead.message}"
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-[9px] font-black uppercase text-[#1baade] tracking-[0.2em] flex items-center gap-2 bg-[#1baade]/10 px-3 py-1.5 rounded-full border border-[#1baade]/20">
                                                                <MapPin size={10} /> {lead.country || 'Global'}
                                                            </div>
                                                            {lead.website && (
                                                                <a href={lead.website} target="_blank" rel="noopener noreferrer" className="text-[9px] font-black uppercase text-white/30 tracking-[0.2em] hover:text-[#007cc3] transition-colors flex items-center gap-2">
                                                                    <Globe size={10} /> {lead.website.replace(/^https?:\/\//, '')}
                                                                </a>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-10 py-10 text-right">
                                                    <div className="flex flex-col items-end gap-6">
                                                        <div className="flex flex-col items-end">
                                                            <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1 italic">Logged Entry</div>
                                                            <div className="text-sm font-black text-white/60 tracking-tighter">{new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                        </div>
                                                        <button 
                                                            onClick={() => handleDeleteInquiry(lead.id)}
                                                            className="flex items-center gap-5 px-6 py-3 bg-red-500/5 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all border border-red-500/10 hover:border-red-500 shadow-lg group-hover:translate-x-0 translate-x-4 opacity-0 group-hover:opacity-100"
                                                            title="Purge Entry"
                                                        >
                                                            <span className="text-[9px] font-black uppercase tracking-widest">Purge Registry</span>
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Premium Confirm Modal Replacement for window.confirm */}
            <AnimatePresence>
                {confirm.isOpen && (
                    <div className="fixed inset-0 z-[999] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} 
                            animate={{ opacity: 1 }} 
                            exit={{ opacity: 0 }}
                            onClick={() => setConfirm({ ...confirm, isOpen: false })}
                            className="absolute inset-0 bg-[#0a0e27]/80 backdrop-blur-xl"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-lg bg-[#0f172a] border border-white/10 rounded-[40px] p-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-[#007cc3] to-red-500"></div>
                            
                            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mb-8 mx-auto">
                                <AlertTriangle size={40} />
                            </div>

                            <h3 className="text-2xl font-black text-center text-white mb-4 italic tracking-tight">Security Verification</h3>
                            <p className="text-white/40 text-center text-sm font-medium leading-relaxed mb-10 px-4">
                                {confirm.title} <br/> 
                                <span className="text-red-500/50 uppercase text-[10px] font-black tracking-widest mt-4 block">This action is permanent and deterministic.</span>
                            </p>

                            <div className="flex gap-4">
                                <button 
                                    onClick={() => setConfirm({ ...confirm, isOpen: false })}
                                    className="flex-1 py-5 rounded-2xl bg-white/5 hover:bg-white/10 text-white font-black uppercase text-[11px] tracking-widest transition-all border border-white/5"
                                >
                                    Cancel
                                </button>
                                <button 
                                    onClick={() => {
                                        confirm.onConfirm();
                                        setConfirm({ ...confirm, isOpen: false });
                                    }}
                                    className="flex-1 py-5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-black uppercase text-[11px] tracking-widest transition-all shadow-xl shadow-red-500/20"
                                >
                                    Purge Data
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
const Menu = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>;
