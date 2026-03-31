import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Zap } from 'lucide-react';
import ApplicationFormModal from './ApplicationFormModal';

const roles = [
  { title: 'Principal Systems Architect', loc: 'Hyderabad / Hybrid', type: 'Full-time', stack: ['Go', 'Kubernetes', 'gRPC'], salary: '$120k - $180k' },
  { title: 'Senior AI Research Engineer', loc: 'Bengaluru / Remote', type: 'Full-time', stack: ['PyTorch', 'CUDA', 'Python'], salary: '$140k - $200k' },
  { title: 'Lead Frontend Engineer', loc: 'Remote', type: 'Full-time', stack: ['React', 'Three.js', 'Framer'], salary: '$110k - $160k' },
  { title: 'Cloud Infrastructure Lead', loc: 'Hyderabad', type: 'Full-time', stack: ['AWS', 'Terraform', 'Ansible'], salary: '$130k - $190k' },
  { title: 'Security Operations Head', loc: 'Remote', type: 'Full-time', stack: ['PenTesting', 'SIEM', 'CloudSec'], salary: '$150k - $220k' },
  { title: 'Data Engineering Lead', loc: 'Mumbai', type: 'Full-time', stack: ['Spark', 'Kafka', 'Scala'], salary: '$125k - $175k' },
];

const RoleCard = ({ role, index, onApply }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    whileHover={{ y: -10 }}
    className="bg-white border border-black/5 rounded-[2rem] p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
      <Zap size={20} className="text-[#007cc3]" />
    </div>

    <div>
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {role.stack.map((s, i) => (
          <span key={i} className="px-3 py-1 bg-[#f5f7fa] text-[#007cc3] text-[9px] font-bold uppercase tracking-widest rounded-full">
            {s}
          </span>
        ))}
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-infosys-heading group-hover:text-[#007cc3] transition-colors duration-500">
        {role.title}
      </h3>

      <div className="flex items-center gap-6 text-black/40 text-[11px] font-bold uppercase tracking-widest mb-8 flex-wrap">
        <span className="flex items-center gap-2"><MapPin size={12} /> {role.loc}</span>
        <span className="flex items-center gap-2"><Clock size={12} /> {role.type}</span>
      </div>
    </div>

    <div className="pt-8 border-t border-black/5 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="text-[9px] text-black/30 font-bold uppercase tracking-widest mb-1">Estimated Base</span>
        <span className="text-sm font-bold text-gray-900">{role.salary}</span>
      </div>
      <motion.button
        whileHover={{ x: 5 }}
        onClick={() => onApply(role.title)}
        className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-[#007cc3] transition-colors duration-500"
      >
        <ArrowRight size={20} />
      </motion.button>
    </div>
  </motion.div>
);

const CareersRoles = () => {
  const [formOpen, setFormOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');

  const openForm = (roleTitle) => {
    setSelectedRole(roleTitle);
    setFormOpen(true);
  };

  return (
    <>
      <ApplicationFormModal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        prefilledRole={selectedRole}
      />

      <section id="careers-roles" className="py-24 px-6 bg-[#f5f7fa]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl text-left">
              <motion.span
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block"
              >
                Current Openings
              </motion.span>
              <h2 className="text-4xl md:text-6xl font-bold text-gray-900 font-infosys-heading italic">
                Open <span className="text-[#007cc3]">Positions</span>
              </h2>
            </div>
            <p className="text-black/50 font-medium max-w-sm text-lg leading-relaxed">
              We're hiring talented engineers across all levels. Find a role that fits you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {roles.map((role, i) => (
              <RoleCard key={i} role={role} index={i} onApply={openForm} />
            ))}
          </div>

          <div className="mt-20 text-center">
            <p className="text-black/40 text-[11px] font-bold uppercase tracking-widest">
              Don't see your role?{' '}
              <span
                className="text-[#007cc3] cursor-pointer hover:underline underline-offset-4"
                onClick={() => openForm('Other / Open Application')}
              >
                Send an Open Application
              </span>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default CareersRoles;
