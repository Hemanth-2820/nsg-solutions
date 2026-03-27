import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServicesCTA = () => {
  return (
    <section className="bg-white relative overflow-hidden flex items-center pb-32">
       {/* High-tech separator */}
       <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
       
       <motion.div 
         initial={{ opacity: 0, y: 50 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 1, ease: "easeOut" }}
         className="max-w-[1500px] mx-auto w-full bg-[#f8fafc] border border-gray-100 rounded-[3.5rem] p-16 md:p-24 relative z-10 flex flex-col lg:flex-row justify-between items-center gap-16 shadow-[0_40px_120px_rgba(0,0,0,0.06)] mx-6 lg:mx-12 overflow-hidden"
       >
          {/* Subtle bg texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#f1f5f9_0%,transparent_70%)] opacity-100 pointer-events-none"></div>

          <h2 className="text-[3rem] lg:text-[4.8rem] font-bold text-[#0f172a] tracking-tight leading-[1] z-10 w-full lg:w-2/3">
             Ready to elevate your <br /> <span className="text-[#007cc3]">digital maturity?</span>
          </h2>
          
          <div className="z-10 w-full lg:w-auto">
             <button className="bg-[#007cc3] text-white px-14 py-6 rounded-full font-black tracking-[0.2em] uppercase text-[14px] shadow-2xl shadow-blue-900/20 hover:bg-[#0f172a] hover:shadow-blue-900/40 hover:scale-105 transition-all duration-500 flex items-center gap-4 group">
                Consult an Expert <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
             </button>
          </div>
       </motion.div>
    </section>
  );
};

export default ServicesCTA;
