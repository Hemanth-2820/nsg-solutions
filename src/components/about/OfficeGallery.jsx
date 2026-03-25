import React from 'react';

const OfficeGallery = () => {
  return (
    <section className="py-24 bg-[#0a0f16]">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-8 h-[2px] bg-[#5bb8e4]"></div>
              <span className="text-[#5bb8e4] font-bold tracking-[0.2em] text-[12px] uppercase">Inside NSG</span>
            </div>
            <h2 className="text-[3rem] font-infosys-heading text-white leading-tight">
              Life at <span className="text-[#5bb8e4]">NSG Solutions</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="w-full h-[300px] bg-white/5 rounded-2xl flex items-center justify-center border border-dashed border-white/20 hover:bg-white/10 hover:border-[#5bb8e4] hover:-translate-y-2 transition-all duration-500 cursor-pointer overflow-hidden">
               <span className="text-[#cbd5e1] font-bold tracking-widest text-[11px] uppercase">[ OFFICE / WORK ENVIRONMENT ]</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeGallery;
