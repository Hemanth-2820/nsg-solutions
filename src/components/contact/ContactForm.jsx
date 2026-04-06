import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, MapPin, CheckCircle, Linkedin, Youtube, Facebook, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-[#f8fafc] py-24 relative overflow-hidden">
      {/* Very subtle grid texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col lg:flex-row gap-0 rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.08)] border border-gray-100">

          {/* ── LEFT PANEL: Contact Info ── */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="lg:w-[38%] bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] text-white p-12 md:p-16 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Background accents */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen pointer-events-none"></div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#5bb8e4] blur-[120px] opacity-20 rounded-full pointer-events-none"></div>

            <div className="relative z-10">
              <h3 className="text-[2rem] font-infosys-heading mb-2 text-white">Strategic Node</h3>
              <div className="w-12 h-[3px] bg-[#5bb8e4] mb-10 mt-3"></div>

              <div className="space-y-10">
                <div className="flex items-start gap-5">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0 mt-1">
                    <MapPin size={18} className="text-[#5bb8e4]" />
                  </div>
                  <p className="font-light text-[#cbd5e1] leading-relaxed">
                    Bengaluru, India 
                  </p>
                </div>

                <div className="flex items-center gap-5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#5bb8e4]" />
                  </div>
                  <p className="font-light text-[#cbd5e1]">+91 7349525471, +91 8688009269</p>
                </div>

                <div className="flex items-center gap-5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#5bb8e4]" />
                  </div>
                  <p className="font-light text-[#cbd5e1]">shankar@nsgsolutions.in</p>
                </div>

                {/* Embedded Map Section */}
                <div className="mt-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl h-[250px]">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15555.22818958226!2d77.63666065541991!3d12.913702200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae148d390a183f%3A0x67340cf3534d4077!2sHSR%20Layout%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1711728100000!5m2!1sen!2sin" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>

                <div className="flex items-center gap-5 pt-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#5bb8e4]" />
                  </div>
                  <p className="font-light text-[#cbd5e1]">connect@nsgsolutions.in</p>
                </div>
              </div>
            </div>

            <div className="relative z-10 mt-16 pt-10 border-t border-white/10">
              <p className="text-xs font-bold tracking-[0.2em] text-white/40 uppercase mb-6">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { icon: <Linkedin size={18} />, link: 'https://www.linkedin.com/company/nsg-solutions/' },
                  { icon: <Youtube size={18} />, link: 'https://www.youtube.com/@santhosh_official2' },
                  { icon: <Facebook size={18} />, link: 'https://www.facebook.com/people/NSG-Solutions/61575743870267/' },
                  { icon: <Instagram size={18} />, link: 'https://www.instagram.com/nsgsolutions?utm_source=qr&igsh=MTBuN21xdW96d3VieQ%3D%3D' },
                ].map((s, idx) => (
                  <a
                    key={idx}
                    href={s.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-[#5bb8e4] hover:border-[#5bb8e4] hover:text-white cursor-pointer transition-all duration-300"
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT PANEL: Form ── */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
            className="lg:w-[62%] bg-white p-12 md:p-16 xl:p-20"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-24 h-24 rounded-full bg-[#ebf8ff] flex items-center justify-center mb-8 shadow-[0_0_40px_rgba(0,124,195,0.15)]"
                >
                  <CheckCircle size={48} className="text-[#007cc3]" strokeWidth={1.5} />
                </motion.div>
                <h3 className="text-[2.5rem] font-infosys-heading text-[#111] mb-4">Message Sent!</h3>
                <p className="text-[#475569] font-light text-lg leading-relaxed max-w-md">
                  Thank you for reaching out. A strategy consultant will be in touch within 1–2 business days.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-[2.5rem] md:text-[3rem] font-infosys-heading text-[#111] mb-2 tracking-tight">Drop us a message</h2>
                <p className="text-[#64748b] mb-12 font-light text-lg">We typically respond within 1–2 business days.</p>

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {[
                      { id: 'firstName', label: 'First Name', type: 'text' },
                      { id: 'lastName',  label: 'Last Name',  type: 'text' },
                    ].map(({ id, label, type }) => (
                      <div key={id} className="relative">
                        <input
                          type={type} id={id} required
                          className="w-full bg-transparent border-b-[2px] border-gray-200 py-3 focus:outline-none focus:border-[#007cc3] transition-colors peer text-[#111] font-light placeholder-transparent"
                          placeholder={label}
                        />
                        <label
                          htmlFor={id}
                          className="absolute left-0 top-3 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#007cc3] peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400 uppercase tracking-wider"
                        >
                          {label}
                        </label>
                      </div>
                    ))}
                  </div>

                  {[
                    { id: 'email',   label: 'Business Email',        type: 'email' },
                    { id: 'company', label: 'Company / Organization', type: 'text', required: false },
                  ].map(({ id, label, type, required = true }) => (
                    <div key={id} className="relative">
                      <input
                        type={type} id={id} required={required}
                        className="w-full bg-transparent border-b-[2px] border-gray-200 py-3 focus:outline-none focus:border-[#007cc3] transition-colors peer text-[#111] font-light placeholder-transparent"
                        placeholder={label}
                      />
                      <label
                        htmlFor={id}
                        className="absolute left-0 top-3 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#007cc3] peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400 uppercase tracking-wider"
                      >
                        {label}
                      </label>
                    </div>
                  ))}

                  <div className="relative">
                    <textarea
                      id="message" rows={4} required
                      className="w-full bg-transparent border-b-[2px] border-gray-200 py-3 focus:outline-none focus:border-[#007cc3] transition-colors peer text-[#111] font-light placeholder-transparent resize-none"
                      placeholder="How can we help?"
                    />
                    <label
                      htmlFor="message"
                      className="absolute left-0 top-3 text-gray-400 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#007cc3] peer-focus:font-bold peer-valid:-top-4 peer-valid:text-xs peer-valid:text-gray-400 uppercase tracking-wider"
                    >
                      How can we propel your business?
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-4 bg-[#1e3a8a] text-white px-10 py-4 rounded-full font-bold tracking-widest uppercase text-[12px] hover:bg-[#007cc3] hover:shadow-[0_0_30px_rgba(0,124,195,0.4)] hover:scale-105 transition-all duration-300"
                  >
                    Send Message <ArrowRight size={18} strokeWidth={3} />
                  </button>
                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
