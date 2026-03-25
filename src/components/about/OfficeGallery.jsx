import React from 'react';
import Meetingroom from "./Meetingroom.jpg";
import Workingarea from "./Workingarea.jpg";
import goal from "./goal.jpg";

const images = [Meetingroom, Workingarea, goal];

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
          {images.map((img, index) => (
            <div key={index} className="group overflow-hidden rounded-2xl">
              <img
                src={img} 
                alt="Office"
                className="w-full h-[300px] object-cover 
                group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfficeGallery;
