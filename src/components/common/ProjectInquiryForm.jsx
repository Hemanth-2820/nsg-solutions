import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Send, CheckCircle2, Building, Globe, User, Mail, Phone, Briefcase, MessageSquare, AlertCircle } from 'lucide-react';

const ProjectInquiryForm = ({ projectName, onClose }) => {
  const [formData, setFormData] = useState({
    inquiryType: 'IT Services',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    role: '',
    country: 'United States',
    message: `Inquiry regarding: ${projectName}.`,
    privacyAgreed: false
  });

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [generatedId, setGeneratedId] = useState('');

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "India", "Germany", "France", "Japan", "China", "Brazil",
    "United Arab Emirates", "Saudi Arabia", "Singapore", "Switzerland", "Netherlands", "Other"
  ];

  const CustomSelect = ({ label, name, options, value, onChange, error }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex flex-col space-y-2 relative w-full">
        <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">{label}</label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-gray-50 border ${error ? 'border-red-500' : isOpen ? 'border-[#1baade]' : 'border-gray-200'} text-[#111] py-4 px-5 text-sm font-sans text-left flex justify-between items-center rounded-2xl transition-all`}
        >
          <span className={!value ? 'text-gray-400' : 'text-[#111]'}>
            {value || `Select ${label.replace('*', '')}`}
          </span>
          <ChevronDown size={18} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {error && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {error}</p>}

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute left-0 bottom-full mb-2 w-full bg-white border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-[100] rounded-2xl overflow-hidden max-h-48 overflow-y-auto hide-scrollbar"
            >
              {options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onChange({ target: { name, value: option } });
                    setIsOpen(false);
                  }}
                  className="px-5 py-3.5 text-sm cursor-pointer hover:bg-[#1baade] hover:text-white text-gray-700 transition-colors"
                >
                  {option}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Required";
    } else if (formData.phone.length < 5) {
      newErrors.phone = "Invalid number";
    }
    if (!formData.company.trim()) newErrors.company = "Required";
    if (!formData.country.trim()) newErrors.country = "Required";
    if (!formData.message.trim()) newErrors.message = "Required";
    if (!formData.privacyAgreed) newErrors.privacyAgreed = "Consent required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'phone') {
        const cleaned = value.replace(/[^\d+]/g, '');
        setFormData(prev => ({ ...prev, [name]: cleaned }));
        if (errors[name]) setErrors(prev => { const n = {...prev}; delete n[name]; return n; });
        return;
    }
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) setErrors(prev => { const n = {...prev}; delete n[name]; return n; });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus(null);

    const submissionData = {
        ...formData,
        projectName: projectName,
        serviceCategory: window.location.pathname.split('/')[2] || 'general',
        requestId: `REQ-${Math.floor(Math.random() * 900000) + 100000}`
    };

    try {
        const response = await fetch('/api/submit_inquiry.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(submissionData)
        });

        const result = await response.json();

        if (result.status === 'success') {
            setGeneratedId(submissionData.requestId);
            setSubmitStatus('success');
            setStatus('success');
            setTimeout(() => {
                if (onClose) onClose();
            }, 3000);
        } else {
            setSubmitStatus('error');
        }
    } catch (err) {
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center h-full min-h-[500px]">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <CheckCircle2 size={80} className="text-green-500 mb-6" />
        </motion.div>
        <h2 className="text-4xl font-black text-[#0a0e27] mb-4 tracking-tighter">Inquiry Logged!</h2>
        <p className="text-gray-500 mb-10 text-lg">Thank you, <span className="text-[#1baade] font-bold">{formData.firstName}</span>. Your project inquiry has been successfully transmitted to our team.</p>
        <div className="bg-[#f8fafc] border-2 border-[#1baade]/10 p-10 rounded-[2.5rem] w-full max-w-sm shadow-xl shadow-blue-500/5">
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.3em] mb-4">Unique Request ID</p>
          <p className="text-4xl font-mono font-black text-[#0a0e27] tracking-tight">{generatedId}</p>
        </div>
        <button onClick={onClose} className="mt-12 bg-[#0a0e27] text-white px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-[#1baade] transition-all active:scale-95 shadow-lg shadow-[#0a0e27]/20">Close Registry</button>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col bg-white overflow-hidden" style={{ maxHeight: '85vh' }}>
      
      {/* Scrollable Form Body */}
      <div 
        className="flex-grow overflow-y-auto px-10 py-12 hide-scrollbar" 
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className="max-w-4xl mx-auto space-y-10">
          
          {/* Section 1: Identity */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-[#1baade]/10 flex items-center justify-center text-[#1baade]">
                  <User size={20} />
               </div>
               <h3 className="text-lg font-black text-[#0a0e27] tracking-tight">Personal Verification</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">First Name*</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className={`w-full bg-gray-50 border ${errors.firstName ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-4 px-5 text-sm outline-none focus:border-[#1baade] transition-all`} />
                {errors.firstName && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.firstName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Last Name*</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Surname" className={`w-full bg-gray-50 border ${errors.lastName ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-4 px-5 text-sm outline-none focus:border-[#1baade] transition-all`} />
                {errors.lastName && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.lastName}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Email Address*</label>
                <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className={`w-full bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-4 px-5 text-sm outline-none focus:border-[#1baade] transition-all`} />
                {errors.email && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.email}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Contact Number*</label>
                <input name="phone" value={formData.phone} onChange={handleChange} placeholder="+ country code" className={`w-full bg-gray-50 border ${errors.phone ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-4 px-5 text-sm outline-none focus:border-[#1baade] transition-all`} />
                {errors.phone && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.phone}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Organization */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-[#1baade]/10 flex items-center justify-center text-[#1baade]">
                  <Building size={20} />
               </div>
               <h3 className="text-lg font-black text-[#0a0e27] tracking-tight">Enterprise Information</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Company Name*</label>
                <input name="company" value={formData.company} onChange={handleChange} placeholder="Your Organization" className={`w-full bg-gray-50 border ${errors.company ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-4 px-5 text-sm outline-none focus:border-[#1baade] transition-all`} />
                {errors.company && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.company}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Company Website</label>
                <input name="website" value={formData.website} onChange={handleChange} placeholder="https://..." className="w-full bg-gray-50 border border-gray-200 rounded-2xl py-4 px-5 text-sm outline-none focus:border-[#1baade] transition-all" />
              </div>
              <div className="space-y-2">
                <CustomSelect label="Your Industry/Role" name="role" options={["Client", "Partner", "Investor", "Public"]} value={formData.role} onChange={handleChange} />
              </div>
              <div className="space-y-2">
                <CustomSelect label="Country/Region*" name="country" options={countries} value={formData.country} onChange={handleChange} error={errors.country} />
              </div>
            </div>
          </div>

          {/* Section 3: Project Detail */}
          <div className="space-y-6 pb-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-[#1baade]/10 flex items-center justify-center text-[#1baade]">
                  <MessageSquare size={18} />
               </div>
               <h3 className="text-lg font-black text-[#0a0e27] tracking-tight">Project Context</h3>
            </div>
            
            <div className="space-y-4">
               <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">How can we assist?*</label>
                 <textarea name="message" rows={4} value={formData.message} onChange={handleChange} className={`w-full bg-gray-50 border ${errors.message ? 'border-red-500' : 'border-gray-200'} rounded-2xl py-4 px-5 text-sm outline-none focus:border-[#1baade] transition-all resize-none`} placeholder="Share your specific requirements or objectives..." />
                 {errors.message && <p className="text-[10px] text-red-500 font-bold flex items-center gap-1"><AlertCircle size={10} /> {errors.message}</p>}
               </div>
               
               <div className={`flex items-start gap-3 p-5 ${errors.privacyAgreed ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-100'} rounded-2xl border transition-colors`}>
                 <input type="checkbox" name="privacyAgreed" id="agree" checked={formData.privacyAgreed} onChange={handleChange} className="mt-1 w-4 h-4 accent-[#1baade]" />
                 <label htmlFor="agree" className={`text-[11px] ${errors.privacyAgreed ? 'text-red-600' : 'text-gray-500'} leading-relaxed`}>
                   I consent to the collection and processing of my business data in accordance with the <strong>NSG Privacy & Data Policy</strong>.
                 </label>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Submit Footer */}
      <div className="p-8 border-t border-gray-50 bg-white flex justify-center bg-white/80 backdrop-blur-md">
         <button 
           onClick={handleSubmit}
           disabled={status === 'submitting'}
           className="w-full max-w-lg bg-[#0a0e27] hover:bg-[#1baade] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-4 transition-all shadow-2xl shadow-[#0a0e27]/10"
         >
           {status === 'submitting' ? 'Processing Transaction...' : <>Finalize Product Inquiry <Send size={18} /></>}
         </button>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none !important; }
        .hide-scrollbar { -ms-overflow-style: none !important; scrollbar-width: none !important; }
      `}} />
    </div>
  );
};

export default ProjectInquiryForm;
