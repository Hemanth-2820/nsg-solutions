import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Mail, Phone, Linkedin, FileText, Send, CheckCircle2, ChevronDown } from 'lucide-react';

const roles = [
  'Principal Systems Architect',
  'Senior AI Research Engineer',
  'Lead Frontend Engineer',
  'Cloud Infrastructure Lead',
  'Security Operations Head',
  'Data Engineering Lead',
  'Other / Speculative Application',
];

const Field = ({ label, icon: Icon, error, children }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/40 flex items-center gap-2">
      <Icon size={11} className="text-[#007cc3]" /> {label}
    </label>
    {children}
    {error && <p className="text-red-400 text-[11px] font-semibold">{error}</p>}
  </div>
);

const inputCls = "w-full border border-black/10 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder:text-black/25 outline-none focus:border-[#007cc3] focus:ring-2 focus:ring-[#007cc3]/10 transition-all";

const ApplicationFormModal = ({ isOpen, onClose, prefilledRole = '' }) => {
  const [form, setForm] = useState({
    name: '', email: '', phone: '', linkedin: '', role: prefilledRole, message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Sync prefilled role when modal opens for a specific job
  useEffect(() => {
    if (isOpen) {
      setForm(f => ({ ...f, role: prefilledRole }));
      setErrors({});
      setSubmitted(false);
    }
  }, [isOpen, prefilledRole]);

  // Prevent body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Escape to close
  useEffect(() => {
    const h = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [onClose]);

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Phone number is required.';
    else if (!/^\+?[\d\s\-()]{7,15}$/.test(form.phone)) e.phone = 'Enter a valid phone number.';
    if (!form.role) e.role = 'Please select a role.';
    if (!form.message.trim()) e.message = 'Tell us about yourself.';
    else if (form.message.trim().length < 30) e.message = 'Please write at least 30 characters.';
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setSubmitted(true);
    setTimeout(() => { onClose(); setSubmitted(false); }, 3500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="app-backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[998] bg-black/70 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="app-modal"
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4"
            style={{ paddingTop: 'max(72px, env(safe-area-inset-top, 72px))' }}
          >
            <div
              className="relative w-full max-w-2xl max-h-[calc(100vh-80px)] overflow-y-auto rounded-3xl bg-white shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white px-8 pt-8 pb-5 border-b border-black/5 flex items-start justify-between">
                <div>
                  <span className="text-[#007cc3] text-[10px] font-extrabold uppercase tracking-[0.25em]">NSG Solutions</span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-1 font-infosys-heading italic">Application Form</h2>
                </div>
                <button
                  onClick={onClose}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-black/5 hover:bg-red-500 hover:text-white text-black/40 transition-all duration-200 flex-shrink-0"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Success State */}
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
                    <CheckCircle2 size={60} className="text-green-500 mb-6" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 font-infosys-heading italic">Application Submitted!</h3>
                  <p className="text-black/45 max-w-sm leading-relaxed">
                    Thank you, <strong className="text-gray-800">{form.name}</strong>! We've received your application and will be in touch within 3–5 business days.
                  </p>
                </div>
              ) : (
                <div className="px-8 py-7 flex flex-col gap-6">
                  {/* Name */}
                  <Field label="Full Name" icon={User} error={errors.name}>
                    <input className={inputCls} placeholder="Rahul Sharma" value={form.name}
                      onChange={e => { update('name', e.target.value); setErrors(v => ({ ...v, name: '' })); }} />
                  </Field>

                  {/* Email + Phone */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Email Address" icon={Mail} error={errors.email}>
                      <input type="email" className={inputCls} placeholder="you@example.com" value={form.email}
                        onChange={e => { update('email', e.target.value); setErrors(v => ({ ...v, email: '' })); }} />
                    </Field>
                    <Field label="Phone Number" icon={Phone} error={errors.phone}>
                      <input type="tel" className={inputCls} placeholder="+91 98765 43210" value={form.phone}
                        onChange={e => { update('phone', e.target.value); setErrors(v => ({ ...v, phone: '' })); }} />
                    </Field>
                  </div>

                  {/* LinkedIn */}
                  <Field label="LinkedIn Profile (optional)" icon={Linkedin} error={errors.linkedin}>
                    <input className={inputCls} placeholder="linkedin.com/in/yourname" value={form.linkedin}
                      onChange={e => update('linkedin', e.target.value)} />
                  </Field>

                  {/* Role */}
                  <Field label="Position Applying For" icon={ChevronDown} error={errors.role}>
                    <div className="relative">
                      <select
                        className={`${inputCls} appearance-none cursor-pointer`}
                        value={form.role}
                        onChange={e => { update('role', e.target.value); setErrors(v => ({ ...v, role: '' })); }}
                      >
                        <option value="">— Select a role —</option>
                        {roles.map(r => <option key={r} value={r}>{r}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none" />
                    </div>
                  </Field>

                  {/* Message */}
                  <Field label="About You / Cover Note" icon={FileText} error={errors.message}>
                    <textarea
                      rows={5}
                      className={`${inputCls} resize-none`}
                      placeholder="Tell us about your experience, what excites you about NSG, and why you're the right fit..."
                      value={form.message}
                      onChange={e => { update('message', e.target.value); setErrors(v => ({ ...v, message: '' })); }}
                    />
                    <p className="text-black/20 text-[11px] text-right">{form.message.length} chars</p>
                  </Field>

                  {/* Submit */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    className="w-full bg-[#007cc3] hover:bg-[#005fa3] text-white font-bold uppercase tracking-widest text-[12px] py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg shadow-[#007cc3]/20"
                  >
                    <Send size={16} /> Submit Application
                  </motion.button>

                  <p className="text-center text-black/25 text-[10px] uppercase tracking-widest">
                    Your data is encrypted and never shared with third parties.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ApplicationFormModal;
