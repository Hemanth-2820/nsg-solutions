import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Send, ShieldCheck, Zap, Briefcase, MapPin, Clock } from 'lucide-react';

const CareersApplyPage = () => {
  const { role } = useParams();
  const decodedRole = decodeURIComponent(role || 'Speculative Application');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
              Applying for <span className="text-[#007cc3]">{decodedRole}</span>
            </h1>
            
            <div className="flex flex-wrap gap-6 text-black/40 text-[11px] font-bold uppercase tracking-widest mt-8 border-t border-black/5 pt-8">
              <div className="flex items-center gap-2"><Briefcase size={14} className="text-[#007cc3]" /> Hyderabad / Hybrid</div>
              <div className="flex items-center gap-2"><MapPin size={14} className="text-[#007cc3]" /> India Office</div>
              <div className="flex items-center gap-2"><Clock size={14} className="text-[#007cc3]" /> Full-time</div>
            </div>
          </div>

          <form className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Full Name</label>
                <input type="text" placeholder="Engineering Candidate" className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Email Address</label>
                <input type="email" placeholder="candidate@enterprise.com" className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium" />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">GitHub / Portfolio URL</label>
              <input type="url" placeholder="https://github.com/your-profile" className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Your Professional Narrative</label>
              <textarea rows={6} placeholder="Tell us how you achieve deterministic engineering excellence..." className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#007cc3]/20 transition-all font-medium resize-none" />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-4">Resume / CV (PDF Only)</label>
              <div className="w-full border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:border-[#007cc3] transition-colors cursor-pointer group">
                <div className="text-gray-400 group-hover:text-[#007cc3] transition-colors mb-2">
                  <Zap size={24} className="mx-auto" />
                </div>
                <p className="text-sm font-bold text-gray-500">Drop your file here or click to upload</p>
                <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mt-2">Maximum file size: 5MB</p>
              </div>
            </div>

            <div className="pt-8 flex flex-col items-center gap-6">
              <button 
                type="button"
                className="w-full md:w-auto px-12 py-5 bg-[#007cc3] text-white rounded-2xl font-black uppercase tracking-widest text-[12px] hover:shadow-[0_20px_40px_rgba(0,124,195,0.3)] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3"
              >
                 SUBMIT APPLICATION <Send size={16} />
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
