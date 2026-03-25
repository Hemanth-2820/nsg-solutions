import React from 'react';

const TeamSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-6 h-[2px] bg-[#1e3a8a]"></div>
            <span className="text-[#1e3a8a] font-bold tracking-[0.2em] text-[12px] uppercase">The Minds Behind NSG</span>
            <div className="w-6 h-[2px] bg-[#1e3a8a]"></div>
          </div>
          <h2 className="text-[3rem] font-infosys-heading text-[#111] leading-tight text-center">
            Our Core <span className="text-[#007cc3]">Team</span>
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="flex flex-col items-center group cursor-pointer">
              <div className="w-full h-[350px] bg-gray-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-gray-300 mb-6 group-hover:border-[#007cc3] group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden relative">
                <span className="text-gray-400 font-bold tracking-widest text-[11px] uppercase group-hover:scale-110 transition-transform duration-500">[ TEAM PHOTO ]</span>
              </div>
              <h3 className="text-[1.25rem] font-infosys-heading font-bold text-[#111] mb-2 group-hover:text-[#007cc3] transition-colors">[ Team Member ]</h3>
              <p className="text-[#64748b] tracking-[0.2em] uppercase text-[10px] font-bold">[ Position Title ]</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
