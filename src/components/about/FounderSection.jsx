import React from 'react';

const FounderSection = () => {
  return (
    <section className="py-24 bg-[#f5f7fa]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2 relative group">
            <div className="w-full h-[550px] bg-gray-300 rounded-3xl flex items-center justify-center border-[3px] border-dashed border-gray-400 overflow-hidden shadow-lg">
               <span className="text-gray-500 font-bold tracking-[0.2em] font-sans">[ FOUNDER & CEO IMAGE PLACEHOLDER ]</span>
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#007cc3] rounded-full blur-[50px] opacity-30 pointer-events-none"></div>
          </div>
          <div className="md:w-1/2">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[2px] bg-[#007cc3]"></div>
              <span className="text-[#007cc3] font-bold tracking-[0.2em] text-[12px] uppercase">Leadership</span>
            </div>
            <h2 className="text-[3rem] lg:text-[4rem] font-infosys-heading text-[#111] leading-[1.1] tracking-tight mb-8 drop-shadow-sm">
              Visionary <br/><span className="text-[#007cc3]">Leadership</span>
            </h2>
            <p className="text-[#64748b] text-[1.1rem] font-light leading-[1.8] mb-8 border-l-[3px] border-[#007cc3] pl-6">
              [ Placeholder Text: Add information about the founder, their vision for NSG Solutions, and their commitment to delivering innovative, high-quality digital solutions to clients globally. ]
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FounderSection;
