import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, ShieldCheck, Zap, Briefcase, MapPin, Clock, Loader2, CheckCircle2, FileUp } from 'lucide-react';

const CareersApplyPage = () => {
    const { role: jobId } = useParams();
    const [job, setJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    
    // Form States
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        portfolio_url: '',
        message: ''
    });
    const [resume, setResume] = useState(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        // Fetch specific job details
        const fetchJob = async () => {
            try {
                const res = await fetch('/api/get_jobs.php');
                const data = await res.json();
                const currentJob = data.find(j => j.id.toString() === jobId.toString());
                if (currentJob) {
                    setJob(currentJob);
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching job:", err);
                setLoading(false);
            }
        };

        if (jobId) fetchJob();
        else setLoading(false);
    }, [jobId]);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === 'application/pdf') {
            if (file.size <= 5 * 1024 * 1024) { // 5MB
                setResume(file);
                setError('');
            } else {
                setError('File size exceeds 5MB limit.');
            }
        } else {
            setError('Please upload a PDF file.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!resume) {
            setError('Please upload your resume.');
            return;
        }
        if (!formData.name || !formData.email) {
            setError('Name and Email are required.');
            return;
        }

        setSubmitting(true);
        setError('');

        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('phone', formData.phone);
        data.append('job_id', jobId);
        data.append('portfolio_url', formData.portfolio_url);
        data.append('message', formData.message);
        data.append('resume', resume);

        try {
            const res = await fetch('/api/submit_application.php', {
                method: 'POST',
                body: data
            });
            const result = await res.json();
            
            if (result.status === 'success') {
                setSubmitted(true);
            } else {
                setError(result.message || 'Submission failed. Please try again.');
            }
        } catch (err) {
            console.error("Submission error:", err);
            setError('Network error. Check your connection.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f5f7fa]">
                <Loader2 size={48} className="animate-spin text-[#007cc3]" />
            </div>
        );
    }

    if (submitted) {
        return (
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="min-h-screen flex items-center justify-center bg-[#f5f7fa] p-6"
            >
                <div className="bg-white rounded-[3rem] p-12 text-center max-w-xl shadow-2xl border border-emerald-100">
                    <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 border border-emerald-200">
                        <CheckCircle2 size={48} className="text-emerald-500" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-4 italic font-infosys-heading tracking-tighter">Application Received</h2>
                    <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                        Our talent acquisition team has received your deterministic credentials. We'll reach out shortly.
                    </p>
                    <Link to="/about" className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-[#007cc3] transition-all">
                        Back to Corporate
                    </Link>
                </div>
            </motion.div>
        );
    }

  return (
    <div className="min-h-screen bg-[#f5f7fa] font-sans pb-32 pt-40">
      <div className="max-w-4xl mx-auto px-6">
        <Link 
          to="/careers" 
          className="group inline-flex items-center gap-2 text-[#007cc3] font-black text-xs uppercase tracking-widest mb-12 hover:-translate-x-2 transition-transform duration-300"
        >
          <ArrowLeft size={14} /> Back to Careers
        </Link>

        <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_30px_80px_rgba(0,0,0,0.05)] border border-black/5">
          <div className="mb-12">
            <span className="inline-block px-4 py-1.5 bg-[#007cc3]/10 text-[#007cc3] text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
              Application Portal
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight font-infosys-heading italic">
              Applying for <span className="text-[#007cc3]">{job ? job.title : 'Speculative Hub'}</span>
            </h1>
            
            {job && (
                <div className="flex flex-wrap gap-6 text-black/40 text-[11px] font-bold uppercase tracking-widest mt-8 border-t border-black/5 pt-8">
                <div className="flex items-center gap-2"><Briefcase size={14} className="text-[#007cc3]" /> {job.location}</div>
                <div className="flex items-center gap-2"><MapPin size={14} className="text-[#007cc3]" /> NSG Unit</div>
                <div className="flex items-center gap-2"><Clock size={14} className="text-[#007cc3]" /> {job.type}</div>
                </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name *</label>
                <input 
                    type="text" 
                    name="name" 
                    required 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Candidate Name" 
                    className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address *</label>
                <input 
                    type="email" 
                    name="email" 
                    required 
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="candidate@enterprise.com" 
                    className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium" 
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Phone Number</label>
                <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX" 
                    className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium" 
                />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">GitHub / Portfolio URL</label>
                <input 
                    type="url" 
                    name="portfolio_url"
                    value={formData.portfolio_url}
                    onChange={handleInputChange}
                    placeholder="https://github.com/your-profile" 
                    className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium" 
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Narrative (Cover Letter)</label>
              <textarea 
                rows={6} 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us why you are a perfect fit..." 
                className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium resize-none" 
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Resume / CV (PDF Only) *</label>
              <input 
                type="file" 
                hidden 
                accept=".pdf" 
                ref={fileInputRef} 
                onChange={handleFileChange}
              />
              <div 
                onClick={() => fileInputRef.current.click()}
                className={`w-full border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer group ${resume ? 'border-emerald-400 bg-emerald-50' : 'border-gray-200 hover:border-[#007cc3]'}`}
              >
                <div className={`transition-colors mb-2 ${resume ? 'text-emerald-500' : 'text-gray-400 group-hover:text-[#007cc3]'}`}>
                  {resume ? <CheckCircle2 size={24} className="mx-auto" /> : <FileUp size={24} className="mx-auto" />}
                </div>
                <p className={`text-sm font-bold ${resume ? 'text-emerald-700' : 'text-gray-500'}`}>
                    {resume ? `Attached: ${resume.name}` : 'Drop your PDF here or click to upload'}
                </p>
                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-2">Maximum file size: 5MB</p>
              </div>
            </div>

            {error && (
                <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-[11px] font-bold uppercase tracking-widest text-center px-4 py-2 bg-red-50 rounded-lg">
                    {error}
                </motion.p>
            )}

            <div className="pt-8 flex flex-col items-center gap-6">
              <button 
                type="submit"
                disabled={submitting}
                className="w-full md:w-auto px-12 py-5 bg-[#007cc3] text-white rounded-2xl font-black uppercase tracking-widest text-[12px] hover:shadow-[0_20px_40px_rgba(0,124,195,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:translate-y-0"
              >
                 {submitting ? (
                     <>SUBMITTING... <Loader2 size={16} className="animate-spin" /></>
                 ) : (
                     <>SUBMIT APPLICATION <Send size={16} /></>
                 )}
              </button>
              
              <div className="flex items-center gap-2 text-black/20 text-[10px] font-bold uppercase tracking-[0.2em]">
                <ShieldCheck size={14} /> Encrypted Submission Protected by NSG Shield
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CareersApplyPage;
