import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, ArrowRight, Zap, Loader2 } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const RoleCard = ({ role, index }) => {
  const navigate = useNavigate();
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="bg-white border border-black/5 rounded-[2rem] p-8 flex flex-col justify-between group transition-all duration-500 hover:shadow-2xl relative overflow-hidden h-full"
    >
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <Zap size={20} className="text-[#007cc3]" />
      </div>

      <div>
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          {(role.stack || []).map((s, i) => (
            <span key={i} className="px-3 py-1 bg-[#f5f7fa] text-[#007cc3] text-[9px] font-bold uppercase tracking-widest rounded-full">
              {s}
            </span>
          ))}
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4 font-infosys-heading group-hover:text-[#007cc3] transition-colors duration-500 line-clamp-2">
          {role.title}
        </h3>

        <div className="flex items-center gap-6 text-black/40 text-[11px] font-bold uppercase tracking-widest mb-8 flex-wrap">
          <span className="flex items-center gap-2"><MapPin size={12} /> {role.loc || role.location}</span>
          <span className="flex items-center gap-2"><Clock size={12} /> {role.type}</span>
        </div>
      </div>

      <div className="pt-8 border-t border-black/5 flex items-center justify-between mt-auto">
        <div className="flex flex-col">
          <span className="text-[9px] text-black/30 font-bold uppercase tracking-widest mb-1">Estimated Base</span>
          <span className="text-sm font-bold text-gray-900">{role.salary}</span>
        </div>
        <motion.button
          whileHover={{ x: 5 }}
          onClick={() => navigate(`/careers/apply/${role.id}`)}
          className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center group-hover:bg-[#007cc3] transition-colors duration-500"
        >
          <ArrowRight size={20} />
        </motion.button>
      </div>
    </motion.div>
  );
};

const CareersRoles = () => {
    const [roles, setRoles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/get_jobs.php')
            .then(res => res.json())
            .then(data => {
                setRoles(data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Failed to fetch jobs:", err);
                setLoading(false);
            });
    }, []);

  return (
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
              Join The <span className="text-[#007cc3]">Core Team</span>
            </h2>
          </div>
          <p className="text-black/50 font-medium max-w-sm text-lg leading-relaxed">
            We are looking for the 1% who thrive on complexity and deterministic engineering excellence.
          </p>
        </div>

        {loading ? (
            <div className="flex flex-col items-center justify-center py-20 grayscale opacity-40">
                <Loader2 size={48} className="animate-spin mb-4" />
                <p className="font-bold tracking-widest text-xs uppercase">Loading Dynamic Careers...</p>
            </div>
        ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {roles.length > 0 ? (
                    roles.map((role, i) => (
                        <RoleCard key={role.id || i} role={role} index={i} />
                    ))
                ) : (
                    <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No active positions currently.</p>
                    </div>
                )}
            </div>
        )}

        <div className="mt-20 text-center">
          <p className="text-black/40 text-[11px] font-bold uppercase tracking-widest">
            Don't see your role?{' '}
            <Link to="/contact" className="text-[#007cc3] hover:underline underline-offset-4">
              Send a Speculative Application
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CareersRoles;
