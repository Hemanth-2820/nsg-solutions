import React, { useState, useEffect } from 'react';
import logonavbar from "../../assets/logonavbar.png";
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Layout, 
    Users, 
    Briefcase, 
    MessageSquare, 
    TrendingUp, 
    ChevronRight, 
    Plus, 
    Edit2, 
    Trash2, 
    Send, 
    LogOut, 
    FileText, 
    Globe, 
    Package, 
    Clock, 
    Image as ImageIcon,
    FileUp,
    MapPin,
    AlertCircle,
    XCircle,
    CheckCircle2,
    Settings,
    Search,
    Download,
    Eye,
    Save,
    Shield,
    ArrowRight,
    ShieldCheck,
    Mail,
    Phone,
    Tag,
    ExternalLink,
    Zap,
    AlertTriangle,
    BookOpen,
    CheckCircle
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';
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
    const [services, setServices] = useState({ main: [], sub: {}, all_sub: [] });
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
    const [solutionImageFile, setSolutionImageFile] = useState(null);
    const [highlightImageFile, setHighlightImageFile] = useState(null);
    const [confirm, setConfirm] = useState({ isOpen: false, title: '', onConfirm: null });
    const [isEditingTestimonial, setIsEditingTestimonial] = useState(false);
    const [blogImageFile, setBlogImageFile] = useState(null);
    const [currentTestimonial, setCurrentTestimonial] = useState({ client_name: '', service_name: '', content: '', rating: 5 });
    const [isEditingService, setIsEditingService] = useState(false);
    const [currentService, setCurrentService] = useState({ parent_id: '', category_key: 'itservices', title: '', icon: 'Briefcase', description: '', sort_order: 0 });

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
            else if (activeTab === 'services') await fetchServices();
        } catch (err) { 
            console.error(err); 
            showToast('Logic Error: Failed to synchronize matrix', 'error');
        }
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

    const fetchServices = async () => {
        try {
            const res = await fetch(`/api/get_services.php?t=${Date.now()}`);
            const result = await res.json();
            if (result.status === 'success') {
                console.log("Services Data Synchronized:", result.data);
                setServices(result.data);
            }
        } catch (err) {
            console.error("Fetch Services Error:", err);
        }
    };

    const handleDeleteApplication = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Permanently purge this candidate from the hiring registry?',
            onConfirm: async () => {
                try {
                    const res = await fetch('/api/manage_applications.php?action=delete', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id })
                    });
                    const data = await res.json();
                    if (data.status === 'success') {
                        showToast('Candidate record purged', 'success');
                        fetchApplications();
                    } else {
                        showToast(data.message || 'Purge failed', 'error');
                    }
                } catch (err) { 
                    showToast('Sync Fail', 'error'); 
                }
            }
        });
    };

    // BLOG ACTIONS
    const handleSaveBlog = async (e) => {
        e.preventDefault();
        const endpoint = isEditingBlog ? '/api/admin/update_blog.php' : '/api/admin/create_blog.php';

        try {
            const formData = new FormData();

            // Append current blog fields
            Object.keys(currentBlog).forEach(key => {
                formData.append(key, currentBlog[key]);
            });

            // Append binary file if selected
            if (blogImageFile) {
                formData.append('imageFile', blogImageFile);
            }

            const res = await fetch(endpoint, {
                method: 'POST',
                body: formData
            });

            const result = await res.json();
            if (result.status === 'success') {
                showToast(isEditingBlog ? 'Insight Updated!' : 'Insight Published!', 'success');
                setIsEditingBlog(false);
                setBlogImageFile(null);
                setCurrentBlog({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' });
                fetchBlogs();
            } else {
                showToast(result.message || 'Action failed', 'error');
            }
        } catch (err) {
            showToast('Sync error with server', 'error');
        }
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
                    if (data.status === 'success') { 
                        showToast('Deleted!', 'success'); 
                        fetchBlogs(); 
                    } else { 
                        showToast(data.message || 'Purge failed', 'error'); 
                    }
                } catch (err) { 
                    showToast('Server communication error', 'error'); 
                }
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

    const getDynamicIcon = (iconName) => {
        if (!iconName) return <LucideIcons.Zap size={20} />;
        const pascalName = iconName.split(/[-_\s]+/).map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join('');
        const Icon = LucideIcons[pascalName] || LucideIcons[iconName] || LucideIcons.Zap;
        return <Icon size={20} />;
    };

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
        try {
            const formData = new FormData();

            // Append current solution fields
            Object.keys(currentSolution).forEach(key => {
                // Normalize features (expecting array or string)
                if (key === 'features' && typeof currentSolution[key] === 'string') {
                    formData.append(key, JSON.stringify(currentSolution[key].split(',').map(s => s.trim())));
                } else {
                    formData.append(key, currentSolution[key]);
                }
            });

            // Append binary file if selected
            if (solutionImageFile) {
                formData.append('imageFile', solutionImageFile);
            }

            const res = await fetch('/api/manage_solutions.php', {
                method: 'POST',
                body: formData
            });

            const result = await res.json();
            if (result.status === 'success') {
                showToast(isEditingSolution ? 'Nexus Registry Updated!' : 'Project Discovered!', 'success');
                setIsEditingSolution(false);
                setSolutionImageFile(null);
                setCurrentSolution({ category: 'itservices', title: '', shortDesc: '', desc: '', img: '', features: '' });
                fetchSolutions();
            } else {
                showToast(result.message || 'Action failed', 'error');
            }
        } catch (err) {
            showToast('Sync fail with Nexus server', 'error');
        }
    }

    const handleDeleteSolution = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Purge this Solution Portfolio entry?',
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/manage_solutions.php?id=${id}`, { method: 'DELETE' });
                    const data = await res.json();
                    if (data.status === 'success') { 
                        showToast('Deleted!', 'success'); 
                        fetchSolutions(); 
                    } else { 
                        showToast(data.message || 'Purge failed', 'error'); 
                    }
                } catch (err) { 
                    showToast('Server communication error', 'error'); 
                }
            }
        });
    }

    // HIGHLIGHT ACTIONS
    const handleSaveHighlight = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();

            // Append current highlight fields
            Object.keys(currentHighlight).forEach(key => {
                formData.append(key, currentHighlight[key]);
            });

            // Append binary file if selected
            if (highlightImageFile) {
                formData.append('imageFile', highlightImageFile);
            }

            const res = await fetch('/api/manage_highlights.php', {
                method: 'POST',
                body: formData
            });

            const result = await res.json();
            if (result.status === 'success') {
                showToast(isEditingHighlight ? 'Highlight Revitalized!' : 'Focus Added!', 'success');
                setIsEditingHighlight(false);
                setHighlightImageFile(null);
                setCurrentHighlight({ id: null, title: '', image_url: '', column_side: 'left', sort_order: 0 });
                fetchHighlights();
            } else {
                showToast(result.message || 'Action failed', 'error');
            }
        } catch (err) {
            showToast('Sync error with Highlight engine', 'error');
        }
    }

    const handleDeleteHighlight = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Delete this highlight?',
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/manage_highlights.php?id=${id}`, { 
                        method: 'DELETE' 
                    });
                    const data = await res.json();
                    if (data.status === 'success') { 
                        showToast('Deleted!', 'success'); 
                        fetchHighlights(); 
                    } else {
                        showToast(data.message || 'Purge failed', 'error');
                    }
                } catch (err) { 
                    showToast('Fails', 'error'); 
                }
            }
        });
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
                    const data = await res.json();
                    if (data.status === 'success') {
                        showToast('Purged Admin Registry', 'success');
                        fetchTestimonials();
                    } else {
                        showToast(data.message || 'Purge Fail', 'error');
                    }
                } catch (err) { 
                    showToast('Purge Fail', 'error'); 
                }
            }
        });
    }

    const handleSaveService = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                id: currentService.id,
                parentId: currentService.parent_id || null,
                categoryKey: currentService.category_key,
                title: currentService.title,
                tag: currentService.tag,
                icon: currentService.icon,
                description: currentService.description,
                image_url: currentService.image_url,
                sortOrder: currentService.sort_order
            };
            const res = await fetch('/api/manage_services.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (data.status === 'success') {
                showToast(currentService.id ? 'Service Reconfigured' : 'New Service Engaged', 'success');
                setIsEditingService(false);
                setCurrentService({ parent_id: '', category_key: 'itservices', title: '', tag: '', icon: 'Briefcase', description: '', image_url: '', sort_order: 0 });
                fetchServices();
            }
        } catch (err) { showToast('Sync Fail', 'error'); }
    };

    const handleDeleteService = async (id) => {
        setConfirm({
            isOpen: true,
            title: 'Decommission this service and all sub-offerings?',
            onConfirm: async () => {
                try {
                    const res = await fetch(`/api/manage_services.php?action=delete`, { 
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id, action: 'delete' })
                    });
                    const data = await res.json();
                    if (data.status === 'success') {
                        showToast('Service Decommissioned', 'success');
                        fetchServices();
                    } else {
                        showToast(data.message || 'Purge failed', 'error');
                    }
                } catch (err) { 
                    showToast('Purge Fail', 'error'); 
                }
            }
        });
    };

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
        { id: 'services', label: 'Services', icon: <Globe size={18} /> },
        { id: 'solutions', label: 'Solutions', icon: <Briefcase size={18} /> },
        { id: 'highlights', label: 'Highlights', icon: <Zap size={18} /> },
        { id: 'inquiries', label: 'Inquiries', icon: <Send size={18} /> },
        { id: 'blogs', label: 'Blogs', icon: <BookOpen size={18} /> },
        { id: 'jobs', label: 'Careers', icon: <Zap size={18} /> },
        { id: 'applications', label: 'Apps', icon: <Users size={18} /> }
    ];

    return (
        <div className="min-h-screen bg-[#0f172a] text-white pt-20 md:pt-28">
            <header className="fixed top-0 left-0 w-full border-b border-white/10 bg-[#0f172a] z-[300] shadow-2xl h-20 md:h-28">
                <div className="max-w-[1400px] mx-auto px-6 h-full flex items-center justify-between relative">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="flex items-center gap-3 md:gap-4">
                            <img src={logonavbar} alt="Logo" className="h-8 md:h-10 w-auto" />
                            <div className="flex flex-col">
                                <span className="text-[12px] md:text-sm font-black uppercase text-[#007cc3]">NSG Command</span>
                                <span className="text-[8px] md:text-[10px] text-white/30 font-bold uppercase tracking-widest leading-none">Control Panel</span>
                            </div>
                        </Link>
                    </div>
 
                    <nav className="hidden lg:flex items-center gap-2">
                        {adminTabs.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white/10 text-[#007cc3]' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>{tab.label}</button>
                        ))}
                    </nav>
 
                    <div className="flex items-center gap-3 md:gap-4 relative z-[320]">
                        <button onClick={handleLogout} className="text-white/40 hover:text-red-400 font-bold hidden lg:flex items-center gap-2 text-[10px] uppercase tracking-widest transition-all"><LogOut size={16} /> Logout</button>
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="lg:hidden w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-xl flex items-center justify-center text-white border border-white/10 shadow-xl">{isMenuOpen ? <XCircle size={20} /> : <Layout size={20} />}</button>
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
                    {activeTab === 'services' && (
                        <motion.div key="services" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                            <div className="flex justify-between items-center mb-10">
                                <h2 className="text-3xl font-black uppercase italic tracking-tight">Services Matrix</h2>
                                <button onClick={() => { 
                                    setIsEditingService(false); 
                                    setCurrentService({ parent_id: '', category_key: 'itservices', title: '', tag: '', icon: 'Briefcase', description: '', image_url: '', sort_order: 0 }); 
                                }} className="bg-[#007cc3] text-white px-8 py-4 rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-3 transition-all"><Plus size={18} /> Add Entry</button>
                            </div>

                            <div className="grid lg:grid-cols-[1fr_450px] gap-12">
                                <div className="space-y-12">
                                    {/* Main Services */}
                                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 shadow-2xl">
                                        <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 tracking-widest flex items-center gap-3"><Globe size={16} /> Main Categories</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {services.main.map(main => (
                                                <div key={main.id} className="bg-[#0f172a] p-6 rounded-3xl border border-white/5 group relative shadow-xl overflow-hidden hover:border-[#007cc3]/30 transition-all">
                                                    <div className="flex justify-between items-start mb-4">
                                                        <div className="bg-white/5 p-3 rounded-xl text-[#007cc3]">
                                                            {getDynamicIcon(main.icon)}
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button onClick={() => { setIsEditingService(true); setCurrentService(main); }} className="p-2 hover:text-white text-white/30"><Edit2 size={16} /></button>
                                                            <button onClick={() => handleDeleteService(main.id)} className="p-2 hover:text-red-400 text-white/30"><Trash2 size={16} /></button>
                                                        </div>
                                                    </div>
                                                    <h4 className="font-black uppercase text-sm mb-6">{main.title}</h4>
                                                    
                                                    {/* Child List */}
                                                    <div className="space-y-2 mb-4">
                                                        <span className="text-[8px] font-black text-[#007cc3] uppercase tracking-widest">Offerings</span>
                                                        {(services.sub[main.id] || []).map(sub => (
                                                            <div key={sub.id} className="flex justify-between items-center bg-white/5 px-4 py-2 rounded-xl border border-white/5 group/sub">
                                                                <span className="text-xs font-bold text-white/60">{sub.title}</span>
                                                                <div className="flex gap-2 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                                                                    <button onClick={() => { setIsEditingService(true); setCurrentService(sub); }} className="p-1 hover:text-[#007cc3]"><Edit2 size={12} /></button>
                                                                    <button onClick={() => handleDeleteService(sub.id)} className="p-1 hover:text-red-400"><Trash2 size={12} /></button>
                                                                </div>
                                                            </div>
                                                        ))}
                                                        {(!services.sub[main.id] || services.sub[main.id].length === 0) && (
                                                            <p className="text-[10px] text-white/20 italic">No sub-offerings managed.</p>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* FORM SIDEBAR */}
                                <form onSubmit={handleSaveService} className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit sticky top-40 shadow-2xl overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#007cc3]/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                                    <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 tracking-[0.2em] flex items-center gap-3">
                                        {isEditingService ? <Edit2 size={16} /> : <Plus size={16} />} {isEditingService ? 'Service Modification' : 'Manual Registry'}
                                    </h3>
                                    
                                        <div className="space-y-4 relative z-10">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Entry Hierarchy</label>
                                                <select 
                                                    value={currentService.parent_id || ''} 
                                                    onChange={e => setCurrentService({ ...currentService, parent_id: e.target.value })} 
                                                    className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all"
                                                >
                                                    <option value="">Main Category (Top Level)</option>
                                                    {services.main.map(m => (
                                                        <option key={m.id} value={m.id}>Sub-Service for: {m.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            {/* Category/Tag Row */}
                                            <div className={`grid ${!currentService.parent_id ? 'grid-cols-2' : 'grid-cols-1'} gap-4`}>
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Internal Category Key</label>
                                                    <input 
                                                        required 
                                                        value={currentService.category_key} 
                                                        onChange={e => setCurrentService({ ...currentService, category_key: e.target.value })} 
                                                        placeholder="e.g. itservices" 
                                                        className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all"
                                                    />
                                                </div>
                                                {!currentService.parent_id && (
                                                    <div className="space-y-1">
                                                        <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Display Tag (Grid)</label>
                                                        <input 
                                                            value={currentService.tag || ''} 
                                                            onChange={e => setCurrentService({ ...currentService, tag: e.target.value })} 
                                                            placeholder="e.g. CORE" 
                                                            className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all"
                                                        />
                                                    </div>
                                                )}
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Service Title</label>
                                                <input 
                                                    required 
                                                    value={currentService.title} 
                                                    onChange={e => setCurrentService({ ...currentService, title: e.target.value })} 
                                                    placeholder="e.g. Cloud Architecture" 
                                                    className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Icon Identifier (Lucide)</label>
                                                <input 
                                                    required 
                                                    value={currentService.icon} 
                                                    onChange={e => setCurrentService({ ...currentService, icon: e.target.value })} 
                                                    placeholder="e.g. Shield" 
                                                    className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all"
                                                />
                                            </div>

                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Brief Narrative</label>
                                                <textarea 
                                                    rows="3" 
                                                    value={currentService.description} 
                                                    onChange={e => setCurrentService({ ...currentService, description: e.target.value })} 
                                                    placeholder="Brief overview..." 
                                                    className="w-full bg-[#0f172a] border border-white/10 rounded-3xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all resize-none"
                                                />
                                            </div>

                                            {!currentService.parent_id && (
                                                <div className="space-y-1">
                                                    <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Main Card Image (Grid Asset)</label>
                                                    <input 
                                                        value={currentService.image_url || ''} 
                                                        onChange={e => setCurrentService({ ...currentService, image_url: e.target.value })} 
                                                        placeholder="Image URL..." 
                                                        className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all"
                                                    />
                                                </div>
                                            )}

                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Execution Priority / Sort Order</label>
                                            <input 
                                                type="number"
                                                value={currentService.sort_order} 
                                                onChange={e => setCurrentService({ ...currentService, sort_order: parseInt(e.target.value) })} 
                                                className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all"
                                            />
                                        </div>

                                        <button type="submit" className="w-full bg-[#007cc3] py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl flex items-center justify-center gap-3 mt-4 transition-all">
                                            <Send size={18} /> {isEditingService ? 'Synchronize Registry' : 'Inject Command'}
                                        </button>
                                        
                                        {isEditingService && (
                                            <button 
                                                type="button" 
                                                onClick={() => setIsEditingService(false)} 
                                                className="w-full text-[9px] font-black uppercase tracking-[0.2em] text-white/20 hover:text-white transition-all pt-4"
                                            >
                                                Cancel Operation
                                            </button>
                                        )}
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

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
                                <div className="space-y-6 order-1 lg:order-2">
                                    <div className="bg-white/5 p-8 rounded-[40px] border border-white/10 h-fit sticky top-40 shadow-2xl animate-fade-in shadow-blue-900/10 overflow-hidden">
                                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#007cc3]/5 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
                                        <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/5 pb-4 tracking-[0.2em] flex items-center gap-3">
                                            {isEditingTestimonial ? <Edit2 size={16} /> : <Plus size={16} />} {isEditingTestimonial ? 'Intelligence Refactoring' : 'Manual Entry'}
                                        </h3>
                                        <form onSubmit={handleSaveTestimonial} className="space-y-6 relative z-10">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Client Identity</label>
                                                <input required value={currentTestimonial.client_name} onChange={e => setCurrentTestimonial({ ...currentTestimonial, client_name: e.target.value })} placeholder="Full Name" className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] transition-all" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Service Title (Card Header)</label>
                                                <input required value={currentTestimonial.service_name} onChange={e => setCurrentTestimonial({ ...currentTestimonial, service_name: e.target.value })} placeholder="e.g. Cloud Migration" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none" />
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Performance Rating</label>
                                                <select value={currentTestimonial.rating} onChange={e => setCurrentTestimonial({ ...currentTestimonial, rating: parseInt(e.target.value) })} className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none appearance-none">
                                                    {[1, 2, 3, 4, 5].map(v => <option key={v} value={v} className="bg-[#0f172a]">{v} Star Intelligence</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-widest">Quote Contents</label>
                                                <textarea required rows="6" value={currentTestimonial.content} onChange={e => setCurrentTestimonial({ ...currentTestimonial, content: e.target.value })} placeholder="Feedback data..." className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none resize-none" />
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
                        <motion.div key="blogs" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-full overflow-hidden">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10 px-4 sm:px-0">
                                <h2 className="text-3xl font-black uppercase italic tracking-tighter">Insight Flow</h2>
                                <button onClick={() => {
                                    setIsEditingBlog(false);
                                    setCurrentBlog({ title: '', tag: '', description: '', content: '', image: '', time_to_read: '' });
                                    document.getElementById('blog-form')?.scrollIntoView({ behavior: 'smooth' });
                                }} className="w-full sm:w-auto bg-[#007cc3] text-white px-8 py-5 rounded-2xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 shadow-blue-500/10"><Plus size={18} /> New Publication</button>
                            </div>
                            <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12 sm:gap-10">
                                <div className="space-y-6 order-1 lg:order-1 px-4 sm:px-0">
                                    <div className="border-b border-white/5 pb-4 mb-8">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#007cc3]">Registry Entries</h3>
                                    </div>
                                    {blogs.map(blog => (
                                        <div key={blog.id} className="bg-[#1e293b]/90 border border-white/10 p-6 rounded-[2.5rem] relative overflow-hidden group hover:border-[#007cc3]/50 transition-all shadow-2xl backdrop-blur-3xl mb-4">
                                            <div className="relative z-10 space-y-6">
                                                <div className="flex items-start gap-5">
                                                    <div className="w-16 h-16 bg-black rounded-2xl overflow-hidden border border-white/10 flex-shrink-0 shadow-2xl">
                                                        <img src={blog.displayImg} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-bold text-base text-white mb-2 leading-snug line-clamp-2">{blog.title}</h4>
                                                        <div className="flex flex-wrap items-center gap-3">
                                                            <span className="px-2.5 py-1 bg-[#007cc3]/10 text-[#007cc3] text-[8px] font-black uppercase tracking-widest rounded-md border border-[#007cc3]/20">{blog.tag}</span>
                                                            <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest flex items-center gap-1.5"><Clock size={11} className="text-[#007cc3]" /> {blog.time_to_read?.replace(/min read/gi, '') || '5'} MIN READ</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
                                                    <button onClick={() => { setIsEditingBlog(true); setCurrentBlog(blog); }} className="h-14 flex items-center justify-center gap-3 bg-white/5 hover:bg-[#007cc3] text-white/60 hover:text-white rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest shadow-xl border border-white/5">
                                                        <Edit2 size={16} /> Edit
                                                    </button>
                                                    <button onClick={() => handleDeleteBlog(blog.id)} className="h-14 flex items-center justify-center gap-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all font-black uppercase text-[10px] tracking-widest shadow-xl">
                                                        <Trash2 size={16} /> Purge
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {blogs.length === 0 && <div className="py-20 text-center opacity-20 text-[10px] font-black uppercase tracking-widest italic">The Insight Repository is empty.</div>}
                                </div>

                                <div id="blog-form" className="order-2 lg:order-2 lg:sticky lg:top-40 h-fit pb-12">
                                    <form onSubmit={handleSaveBlog} className="bg-[#1e293b]/95 p-8 sm:p-10 rounded-[3rem] border border-white/20 shadow-2xl relative mx-4 sm:mx-0 overflow-visible">
                                        <div className="absolute top-0 right-0 w-40 h-40 bg-[#007cc3]/10 rounded-full -translate-y-20 translate-x-20 blur-[80px] pointer-events-none"></div>
                                        <h3 className="uppercase text-[11px] font-black text-[#007cc3] mb-8 border-b border-white/10 pb-5 flex items-center gap-3">{isEditingBlog ? <Edit2 size={16} /> : <Plus size={16} />} {isEditingBlog ? 'Revise Article' : 'New Publication'}</h3>
                                        <div className="space-y-6">
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-[0.2em]">Headline</label>
                                                <input required value={currentBlog.title} onChange={e => setCurrentBlog({ ...currentBlog, title: e.target.value })} placeholder="Title" className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:border-[#007cc3] outline-none transition-all text-white placeholder:text-white/10" />
                                            </div>
                                            <div className="flex gap-4">
                                                <div className="flex-1 space-y-1">
                                                    <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-[0.2em]">Tag</label>
                                                    <input required value={currentBlog.tag} onChange={e => setCurrentBlog({ ...currentBlog, tag: e.target.value })} placeholder="Category" className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] text-white" />
                                                </div>
                                                <div className="w-32 space-y-1">
                                                    <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-[0.2em]">Read</label>
                                                    <input required value={currentBlog.time_to_read} onChange={e => setCurrentBlog({ ...currentBlog, time_to_read: e.target.value })} placeholder="Min" className="w-full bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none focus:border-[#007cc3] text-white" />
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-[0.2em]">Visual Asset (Image File)</label>
                                                <div className="relative group/upload">
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={e => setBlogImageFile(e.target.files[0])}
                                                        className="hidden"
                                                        id="blog-image-upload"
                                                    />
                                                    <label
                                                        htmlFor="blog-image-upload"
                                                        className={`w-full flex items-center gap-4 bg-black/20 border border-white/10 rounded-2xl px-6 py-4 text-sm cursor-pointer hover:border-[#007cc3] transition-all ${blogImageFile ? 'bg-[#007cc3]/10 border-[#007cc3]' : ''}`}
                                                    >
                                                        {blogImageFile ? (
                                                            <>
                                                                <ImageIcon size={16} className="text-[#007cc3]" />
                                                                <span className="text-white text-xs truncate max-w-[200px]">{blogImageFile.name}</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <FileUp size={16} className="text-white/20 group-hover/upload:text-[#007cc3]" />
                                                                <span className="text-white/30 text-xs">Browse Device for Image</span>
                                                            </>
                                                        )}
                                                    </label>
                                                    {isEditingBlog && !blogImageFile && (
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase text-[#007cc3]">Using Current</div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="space-y-1">
                                                <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-[0.2em]">Body Content</label>
                                                <textarea required rows="8" value={currentBlog.content} onChange={e => setCurrentBlog({ ...currentBlog, content: e.target.value })} placeholder="Markdown Content" className="w-full bg-black/20 border border-white/10 rounded-3xl px-6 py-4 text-sm outline-none resize-none focus:border-[#007cc3] text-white" />
                                            </div>
                                            <button type="submit" className="w-full bg-[#007cc3] py-5 rounded-2xl font-black uppercase text-[12px] tracking-[0.2em] shadow-xl hover:bg-[#0088d8] transition-all flex items-center justify-center gap-3 text-white border border-white/10 active:scale-95">
                                                <Send size={20} /> Finalize Post
                                            </button>
                                        </div>
                                    </form>
                                </div>
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
                                        <select value={currentSolution.category} onChange={e => setCurrentSolution({ ...currentSolution, category: e.target.value })} className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none">
                                            <option value="itservices">IT Services</option>
                                            <option value="digitalmarketing">Digital Marketing</option>
                                            <option value="videoproduction">Video Production</option>
                                            <option value="branding">Branding & Design</option>
                                        </select>
                                        <input required value={currentSolution.title} onChange={e => setCurrentSolution({ ...currentSolution, title: e.target.value })} placeholder="Project Title" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-[0.2em]">Project Thumbnail (Image)</label>
                                            <div className="relative group/solution">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => setSolutionImageFile(e.target.files[0])}
                                                    className="hidden"
                                                    id="solution-image-upload"
                                                />
                                                <label
                                                    htmlFor="solution-image-upload"
                                                    className={`w-full flex items-center gap-4 bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm cursor-pointer hover:border-[#007cc3] transition-all ${solutionImageFile ? 'bg-[#007cc3]/10 border-[#007cc3]' : ''}`}
                                                >
                                                    {solutionImageFile ? (
                                                        <>
                                                            <ImageIcon size={16} className="text-[#007cc3]" />
                                                            <span className="text-white text-xs truncate max-w-[200px]">{solutionImageFile.name}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FileUp size={16} className="text-white/20 group-hover/solution:text-[#007cc3]" />
                                                            <span className="text-white/30 text-xs">Browse Device for Asset</span>
                                                        </>
                                                    )}
                                                </label>
                                                {isEditingSolution && !solutionImageFile && (
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase text-[#007cc3]">Using Current</div>
                                                )}
                                            </div>
                                        </div>
                                        <textarea required rows="5" value={currentSolution.desc} onChange={e => setCurrentSolution({ ...currentSolution, desc: e.target.value })} placeholder="Briefing" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none resize-none" />
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
                                        <input required value={currentJob.title} onChange={e => setCurrentJob({ ...currentJob, title: e.target.value })} placeholder="Position Name" className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm outline-none" />
                                        <input required value={currentJob.location} onChange={e => setCurrentJob({ ...currentJob, location: e.target.value })} placeholder="Location" className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm outline-none" />
                                        <select value={currentJob.type} onChange={e => setCurrentJob({ ...currentJob, type: e.target.value })} className="w-full bg-[#0f172a] border border-white/10 rounded-xl px-5 py-4 text-sm outline-none">
                                            <option value="Full-time">Full-time</option>
                                            <option value="Contract">Contract</option>
                                        </select>
                                        <textarea rows="4" value={currentJob.description} onChange={e => setCurrentJob({ ...currentJob, description: e.target.value })} placeholder="Description" className="w-full bg-white/5 border border-white/5 rounded-xl px-5 py-4 text-sm outline-none resize-none" />
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
                                        <select value={currentHighlight.column_side} onChange={e => setCurrentHighlight({ ...currentHighlight, column_side: e.target.value })} className="w-full bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm outline-none">
                                            <option value="left">Left Column</option>
                                            <option value="right">Right Column</option>
                                        </select>
                                        <input required value={currentHighlight.title} onChange={e => setCurrentHighlight({ ...currentHighlight, title: e.target.value })} placeholder="Card Title" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <div className="space-y-1">
                                            <label className="text-[9px] font-black uppercase text-white/30 ml-4 tracking-[0.2em]">Cover Asset (Image)</label>
                                            <div className="relative group/highlight">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={e => setHighlightImageFile(e.target.files[0])}
                                                    className="hidden"
                                                    id="highlight-image-upload"
                                                />
                                                <label
                                                    htmlFor="highlight-image-upload"
                                                    className={`w-full flex items-center gap-4 bg-[#0f172a] border border-white/10 rounded-2xl px-6 py-4 text-sm cursor-pointer hover:border-[#007cc3] transition-all ${highlightImageFile ? 'bg-[#007cc3]/10 border-[#007cc3]' : ''}`}
                                                >
                                                    {highlightImageFile ? (
                                                        <>
                                                            <ImageIcon size={16} className="text-[#007cc3]" />
                                                            <span className="text-white text-xs truncate max-w-[200px]">{highlightImageFile.name}</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FileUp size={16} className="text-white/20 group-hover/highlight:text-[#007cc3]" />
                                                            <span className="text-white/30 text-xs">Browse Device for Cover</span>
                                                        </>
                                                    )}
                                                </label>
                                                {isEditingHighlight && !highlightImageFile && (
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase text-[#007cc3]">Using Current</div>
                                                )}
                                            </div>
                                        </div>
                                        <input type="number" required value={currentHighlight.sort_order} onChange={e => setCurrentHighlight({ ...currentHighlight, sort_order: parseInt(e.target.value) })} placeholder="Priority" className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm outline-none" />
                                        <button type="submit" className="w-full bg-[#007cc3] py-5 rounded-2xl font-black uppercase text-[11px] tracking-widest shadow-xl flex items-center justify-center gap-3 mt-4 transition-all hover:bg-[#0088d8]"><Send size={18} /> Sync Highlight</button>
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'applications' && (
                        <motion.div key="apps" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                                <h2 className="text-[2rem] md:text-3xl font-black uppercase italic tracking-tight leading-tight">Deterministic Candidates</h2>
                                <div className="bg-white/5 px-8 py-5 rounded-2xl border border-white/10 text-center shadow-lg w-full md:w-auto"><span className="block text-[10px] uppercase font-black text-[#007cc3] mb-1">Total Intelligence</span><span className="text-3xl font-black tracking-tighter">{applications.length}</span></div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {applications.map(app => (
                                    <div key={app.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl backdrop-blur-3xl hover:bg-white/[0.08] transition-all group relative overflow-hidden">
                                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                                            {/* Left Section: Identity */}
                                            <div className="flex-1">
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#007cc3] to-blue-600 flex items-center justify-center text-white font-black text-2xl shadow-lg uppercase italic shrink-0">
                                                        {app.name?.[0]}
                                                    </div>
                                                    <div>
                                                        <h3 className="text-2xl font-black text-white tracking-tighter mb-1 uppercase">{app.name}</h3>
                                                        <div className="flex flex-wrap gap-4">
                                                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#007cc3] flex items-center gap-2"><Mail size={12} /> {app.email}</span>
                                                            <span className="text-[11px] font-bold uppercase tracking-wider text-white/40 flex items-center gap-2"><Phone size={12} /> {app.phone || 'N/A'}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-8 border-t border-white/5">
                                                    <div>
                                                        <span className="text-[10px] font-black text-[#007cc3] uppercase tracking-widest block mb-2">Target Role</span>
                                                        <div className="inline-flex px-4 py-2 bg-white/5 text-white/80 text-[11px] font-bold uppercase tracking-widest rounded-xl border border-white/10 italic">
                                                            {app.job_title || 'General Pipeline'}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-black text-[#007cc3] uppercase tracking-widest block mb-2">Digital Presence</span>
                                                        {app.portfolio_url ? (
                                                            <a href={app.portfolio_url} target="_blank" className="inline-flex items-center gap-2 text-[11px] font-black uppercase text-white/60 hover:text-white transition-all underline decoration-[#007cc3] decoration-2 underline-offset-4">
                                                                <Globe size={14} /> View Portfolio
                                                            </a>
                                                        ) : (
                                                            <span className="text-[11px] font-bold text-white/10 uppercase tracking-widest">No Link Provided</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Middle Section: Message */}
                                            <div className="lg:w-1/3 lg:border-l lg:border-white/5 lg:pl-8">
                                                <span className="text-[10px] font-black text-[#007cc3] uppercase tracking-widest block mb-4">Professional Narrative</span>
                                                <p className="text-[13px] text-white/60 leading-relaxed font-medium italic border-l-2 border-[#007cc3]/30 pl-4 py-1">
                                                    {app.message ? `"${app.message}"` : 'No mission statement provided.'}
                                                </p>
                                            </div>

                                            {/* Right Section: Actions */}
                                            <div className="flex flex-row lg:flex-col justify-end lg:justify-center items-center gap-4 lg:border-l lg:border-white/5 lg:pl-8">
                                                <a href={`https://new.nsgsolutions.in/${app.resume_path}`} target="_blank" className="h-14 px-8 bg-[#007cc3] hover:bg-[#0088d8] text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shadow-xl flex items-center gap-3 shrink-0">
                                                    <Download size={16} /> Download CV
                                                </a>
                                                <button
                                                    onClick={() => handleDeleteApplication(app.id)}
                                                    className="w-14 h-14 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all shadow-lg shrink-0 border border-red-500/10"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {applications.length === 0 && (
                                    <div className="py-20 text-center bg-white/5 rounded-[40px] border border-white/5 opacity-30 text-[12px] font-black tracking-widest uppercase italic">No managed applications found in the matrix.</div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'inquiries' && (
                        <motion.div key="leads" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
                                <h2 className="text-[2rem] md:text-3xl font-black uppercase italic mb-2 tracking-tight leading-tight">Intelligence Inbound</h2>
                                <div className="bg-[#007cc3] px-8 py-5 rounded-2xl shadow-xl shadow-blue-500/20 text-center border border-white/10 w-full md:w-auto"><span className="block text-[10px] uppercase font-black text-white/50 mb-1">Global Intelligence</span><span className="text-3xl font-black tracking-tighter">{inquiries.length}</span></div>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                {inquiries.map(lead => (
                                    <div key={lead.id} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl backdrop-blur-3xl hover:bg-white/[0.08] transition-all group relative overflow-hidden">
                                        <div className="flex flex-col lg:flex-row justify-between gap-8">
                                            {/* Client Identity */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-5 mb-6">
                                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#007cc3] to-[#1baade] flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-500/10 uppercase italic shrink-0">
                                                        {lead.first_name?.[0] || 'U'}
                                                    </div>
                                                    <div>
                                                        <div className="font-black text-2xl text-white tracking-tighter mb-1 uppercase italic">{lead.first_name} {lead.last_name}</div>
                                                        <div className="flex flex-wrap gap-3">
                                                            <span className="text-[10px] font-bold text-[#1baade] uppercase tracking-wider">{lead.email}</span>
                                                            <span className="w-1 h-1 rounded-full bg-white/10 self-center"></span>
                                                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{lead.phone}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                                                    <div>
                                                        <span className="text-[10px] font-black text-[#007cc3] uppercase tracking-widest block mb-2">Project Scope</span>
                                                        <div className="inline-block px-4 py-2 bg-[#007cc3]/10 border border-[#007cc3]/30 rounded-xl text-[#1baade] text-[10px] font-black uppercase tracking-widest mb-2 shadow-sm italic">
                                                            {lead.project_name}
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <span className="text-[10px] font-black text-[#007cc3] uppercase tracking-widest block mb-2">Corporate Context</span>
                                                        <div className="text-[11px] font-black uppercase tracking-[0.1em] text-white/60">
                                                            {lead.company} <span className="text-white/20 mx-1">/</span> {lead.role}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Intelligence Detail */}
                                            <div className="lg:w-1/3 lg:border-l lg:border-white/5 lg:pl-8">
                                                <span className="text-[10px] font-black text-[#007cc3] uppercase tracking-widest block mb-4">Intelligence Detail</span>
                                                <div className="bg-white/[0.03] p-5 rounded-3xl border border-white/5 text-[12px] font-medium text-white/80 italic leading-relaxed mb-4 relative overflow-hidden">
                                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#007cc3]/50"></div>
                                                    "{lead.message}"
                                                </div>
                                                <div className="flex flex-wrap items-center gap-4">
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

                                            {/* Timestamp & Actions */}
                                            <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center gap-6 lg:border-l lg:border-white/5 lg:pl-8 lg:min-w-[150px]">
                                                <div className="text-right lg:text-center">
                                                    <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1 italic">Logged Entry</div>
                                                    <div className="text-[13px] font-black text-white/60 tracking-tighter">{new Date(lead.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                                                </div>
                                                <button
                                                    onClick={() => handleDeleteInquiry(lead.id)}
                                                    className="w-14 h-14 flex items-center justify-center bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-2xl transition-all border border-red-500/10 hover:border-red-500 shadow-lg shrink-0"
                                                    title="Purge Entry"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {inquiries.length === 0 && (
                                    <div className="py-20 text-center bg-white/5 rounded-[40px] border border-white/5 opacity-30 text-[12px] font-black tracking-widest uppercase italic">No managed inquiries found in the database.</div>
                                )}
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
                                {confirm.title} <br />
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
                                    onClick={async () => {
                                        const action = confirm.onConfirm;
                                        setConfirm({ ...confirm, isOpen: false });
                                        if (action) await action();
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
