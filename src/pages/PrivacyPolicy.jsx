import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Eye, Cookie, Info } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-slate-50 pt-[180px] font-sans pb-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-12 rounded-[2.5rem] shadow-xl border border-slate-100 mb-10 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-8 shadow-inner">
            <Shield size={40} />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-500 font-medium uppercase tracking-[0.3em] text-xs">Ensuring Your Data Integrity</p>
        </motion.div>

        {/* Content */}
        <div className="space-y-8">

          {/* Section 1 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-6 text-blue-600">
              <Info size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Information Collection</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              We collect information you provide directly to us via contact forms, project inquiries, and career applications. This may include your name, email, phone number, and company details.
            </p>
          </motion.section>

          {/* Section 2 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-6 text-blue-600">
              <Eye size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Use of Information</h2>
            </div>
            <p className="text-slate-600 leading-relaxed mb-6 text-lg">
              We use the collected data to:
            </p>
            <ul className="space-y-4">
              {[
                'Deliver and improve our IT and Media services.',
                'Communicate project updates and respond to inquiries.',
                'Process job applications.'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-slate-700 font-medium group">
                  <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform"></div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.section>

          {/* Section 3 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-6 text-blue-600">
              <Lock size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>
          </motion.section>

          {/* Section 4 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-6 text-blue-600">
              <Shield size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Third-Party Sharing</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              We do not sell your personal data. We only share information with trusted partners necessary to fulfill our service obligations or as required by law.
            </p>
          </motion.section>

          {/* Section 5 */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white p-10 rounded-[2rem] shadow-sm border border-slate-100"
          >
            <div className="flex items-center gap-4 mb-6 text-blue-600">
              <Cookie size={24} />
              <h2 className="text-2xl font-bold text-slate-900">Cookies</h2>
            </div>
            <p className="text-slate-600 leading-relaxed text-lg">
              Our website may use cookies to enhance your browsing experience and analyze site traffic.
            </p>
          </motion.section>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-600 to-indigo-700 p-12 rounded-[2.5rem] shadow-2xl text-white text-center"
          >
            <div className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border border-white/30">
              <Mail size={32} />
            </div>
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-blue-100 mb-8 max-w-sm mx-auto">
              If you have any questions regarding this policy, please reach out to our team.
            </p>
            <a
              href="mailto:info@nsgsolutions.in"
              className="inline-block px-10 py-4 bg-white text-blue-600 rounded-full font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-xl"
            >
              info@nsgsolutions.in
            </a>
          </motion.div>

        </div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
