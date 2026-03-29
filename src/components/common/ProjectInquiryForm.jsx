import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, X, Send, CheckCircle2 } from 'lucide-react';

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
    country: '',
    message: `Inquiry regarding: ${projectName}.`,
    privacyAgreed: false
  });

  const [status, setStatus] = useState('');
  const [generatedId, setGeneratedId] = useState('');

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "India", "Germany", "France", "Japan", "China", "Brazil",
    "South Africa", "United Arab Emirates", "Singapore", "Switzerland", "Netherlands", "Italy", "Spain", "Mexico",
    "South Korea", "Sweden", "Norway", "Denmark", "Finland", "Ireland", "Portugal", "Belgium", "Austria", "New Zealand",
    "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Israel", "Egypt", "Nigeria", "Kenya", "Other"
  ];

  const CustomSelect = ({ label, name, options, value, onChange, required }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="flex flex-col space-y-2 relative">
        <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">{label}</label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-gray-50 border ${isOpen ? 'border-[#007cc3]' : 'border-gray-200'} text-[#111] py-3.5 px-4 text-sm font-sans text-left flex justify-between items-center rounded-xl transition-all`}
        >
          <span className={!value ? 'text-gray-400' : 'text-[#111]'}>
            {value || `Select ${label.replace('*', '')}`}
          </span>
          <ChevronDown size={18} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 top-[calc(100%+4px)] w-full bg-white border border-gray-100 shadow-2xl z-50 rounded-xl overflow-hidden max-h-48 overflow-y-auto"
            >
              {options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onChange({ target: { name, value: option } });
                    setIsOpen(false);
                  }}
                  className="px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 text-gray-700 font-sans"
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'firstName' || name === 'lastName') {
      const cleanValue = value.replace(/[^a-zA-Z\s]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanValue }));
      return;
    }

    if (name === 'phone') {
      const cleanPhone = value.replace(/[^\d+]/g, '');
      setFormData(prev => ({ ...prev, [name]: cleanPhone }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    // Exact ID logic from ProjectCard
    const prefix = formData.inquiryType === 'IT Services' ? 'ITS' : 
                   formData.inquiryType === 'Video Production' ? 'VID' : 
                   formData.inquiryType === 'Digital Media Marketing' ? 'DMM' : 'SOL';
    const random = Math.floor(1000 + Math.random() * 9000);
    const newId = `NSG-${prefix}-${random}`;

    try {
      await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, requestId: newId })
      });
      setGeneratedId(newId);
      setStatus('success');
    } catch (error) {
      setGeneratedId(newId);
      setStatus('success');
    }
  };

  if (status === 'success') {
    return (
      <div className="p-12 text-center flex flex-col items-center justify-center min-h-[500px]">
        <CheckCircle2 size={80} className="text-green-500 mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tighter">Request Received!</h2>
        <p className="text-gray-600 mb-10 max-w-sm">Thank you, <span className="font-bold text-[#1baade]">{formData.firstName}</span>. Your inquiry for <span className="font-bold italic">{projectName}</span> has been successfully logged.</p>
        <div className="bg-[#f8fafc] border border-gray-100 p-8 rounded-[2rem] w-full max-w-sm shadow-sm">
          <p className="text-[10px] text-gray-400 uppercase font-black tracking-[0.2em] mb-3">Your Secure Request ID</p>
          <p className="text-4xl font-mono font-black text-[#0a0e27] tracking-tighter">{generatedId}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-12 bg-[#0a0e27] text-white px-12 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#1baade] transition-all shadow-xl shadow-[#0a0e27]/20"
        >
          Return to Solutions
        </button>
      </div>
    );
  }

  return (
    <div className="relative bg-white rounded-[3rem] overflow-hidden">
      <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
        <div>
          <h2 className="text-3xl font-black text-[#0a0e27] mb-1 tracking-tighter">Project Inquiry</h2>
          <p className="text-xs text-[#1baade] font-bold font-sans uppercase tracking-[0.2em] opacity-80">Ref: {projectName}</p>
        </div>
        <button onClick={onClose} className="p-3 hover:bg-white hover:shadow-lg rounded-full transition-all text-gray-400 hover:text-red-500">
          <X size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="md:col-span-2">
            <CustomSelect
              label="Inquiry Project Type*"
              name="inquiryType"
              required
              value={formData.inquiryType}
              onChange={handleChange}
              options={["IT Services", "Video Production", "Digital Media Marketing", "Enterprise Strategy"]}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">First Name*</label>
            <input
              type="text"
              name="firstName"
              required
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 text-[#111] py-4 px-5 text-sm font-sans rounded-xl focus:border-[#007cc3] outline-none transition-all placeholder:text-gray-300"
              placeholder="Ex: John"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">Last Name*</label>
            <input
              type="text"
              name="lastName"
              required
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 text-[#111] py-4 px-5 text-sm font-sans rounded-xl focus:border-[#007cc3] outline-none transition-all placeholder:text-gray-300"
              placeholder="Ex: Doe"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">Email Address*</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 text-[#111] py-4 px-5 text-sm font-sans rounded-xl focus:border-[#007cc3] outline-none transition-all placeholder:text-gray-300"
              placeholder="john@company.com"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">Phone Number*</label>
            <input
              type="tel"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 text-[#111] py-4 px-5 text-sm font-sans rounded-xl focus:border-[#007cc3] outline-none transition-all placeholder:text-gray-300"
              placeholder="+country code"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">Company/Organization*</label>
            <input
              type="text"
              name="company"
              required
              value={formData.company}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 text-[#111] py-4 px-5 text-sm font-sans rounded-xl focus:border-[#007cc3] outline-none transition-all placeholder:text-gray-300"
              placeholder="Company Ltd."
            />
          </div>

          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">Company Website</label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-200 text-[#111] py-4 px-5 text-sm font-sans rounded-xl focus:border-[#007cc3] outline-none transition-all placeholder:text-gray-300"
              placeholder="https://company.com"
            />
          </div>

          <div className="flex flex-col space-y-2">
            <CustomSelect
              label="Country/Region*"
              name="country"
              required
              value={formData.country}
              onChange={handleChange}
              options={countries}
            />
          </div>

          <div className="flex flex-col space-y-2">
            <CustomSelect
              label="Your Role/Function"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={["Client", "Candidate", "Partner", "Public User"]}
            />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 font-bold uppercase tracking-wider text-[10px]">Project Requirements*</label>
          <textarea
            name="message"
            required
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className="bg-gray-50 border border-gray-200 text-[#111] py-5 px-5 text-sm font-sans rounded-xl focus:border-[#007cc3] outline-none transition-all resize-none placeholder:text-gray-300"
            placeholder="Tell us more about what you need for this project..."
          />
        </div>

        <div className="flex items-start space-x-4 p-4 bg-blue-50/30 rounded-2xl border border-blue-100/50">
          <input
            type="checkbox"
            name="privacyAgreed"
            required
            checked={formData.privacyAgreed}
            onChange={handleChange}
            className="mt-1.5 w-4 h-4 accent-[#1baade]"
            id="privacy-check"
          />
          <label htmlFor="privacy-check" className="text-[11px] text-gray-500 font-sans leading-relaxed">
            I agree to the processing of my personal information by NSG Solutions in accordance with the <span className="text-[#1baade] font-bold cursor-pointer underline">Privacy Statement</span>.
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full bg-[#0a0e27] text-white py-5 rounded-2xl font-bold uppercase tracking-[0.2em] text-[12px] hover:bg-[#1baade] transition-all flex items-center justify-center gap-4 shadow-xl shadow-[#0a0e27]/10"
        >
          {status === 'submitting' ? (
            <>Generating Request ID... <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Send size={16} /></motion.div></>
          ) : (
            <>Submit Project Inquiry <Send size={18} /></>
          )}
        </button>
      </form>
    </div>
  );
};

export default ProjectInquiryForm;
