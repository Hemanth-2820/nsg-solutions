import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const ServicesCTA = () => {
   return (
      <section className="relative overflow-hidden py-32 bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE] flex items-center">

         {/* Top Separator */}
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

         <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-[1500px] mx-auto w-full 
        bg-white/70 backdrop-blur-md 
        border border-white/50 
        rounded-[3rem] 
        p-16 md:p-24 
        relative z-10 
        flex flex-col lg:flex-row 
        justify-between items-center 
        gap-16 
        shadow-[0_30px_80px_rgba(0,0,0,0.08)] 
        mx-6 lg:mx-12 overflow-hidden"
         >

            {/* Subtle Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#e0f2fe_0%,transparent_70%)] opacity-70 pointer-events-none"></div>

            {/* TEXT */}
            <h2 className="text-[3rem] lg:text-[4.5rem] font-extrabold text-[#0f172a] tracking-tight leading-[1.05] z-10 w-full lg:w-2/3">
               Ready to elevate your <br />
               <span className="text-[#007cc3]">digital maturity?</span>
            </h2>

            {/* BUTTON */}
            <div className="z-10 w-full lg:w-auto">
               <button className="bg-gradient-to-r from-[#007cc3] to-[#00a3ff] text-white px-12 py-5 rounded-full font-black tracking-[0.2em] uppercase text-[13px] shadow-lg hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,124,195,0.3)] transition-all duration-500 flex items-center gap-4 group">
                  Consult an Expert
                  <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
               </button>
            </div>

         </motion.div>
      </section>
   );
};

export default ServicesCTA;