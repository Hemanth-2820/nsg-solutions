import React from 'react';
import { motion } from 'framer-motion';
import Meetingroom from "./Meetingroom.jpg";
import Workingarea from "./Workingarea.jpg";
import goal from "./goal.jpg";

const images = [Meetingroom, Workingarea, goal];

const OfficeGallery = () => {
  return (
    <section className="py-24 bg-white text-[#0f172a]">
      <div className="max-w-[1500px] mx-auto px-6 lg:px-12 text-center">

        <div className="mb-20">
          <div className="inline-block px-4 py-1 bg-blue-50 text-[#007cc3] text-[11px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
            Inside NSG
          </div>

          <h2 className="text-[3rem] font-medium leading-tight font-infosys-heading">
            Life at <span className="text-[#007cc3]">NSG Solutions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="group overflow-hidden rounded-[2.5rem] bg-white shadow-xl shadow-blue-900/10 border border-gray-100 hover:border-[#007cc3]/30 transition-all duration-500"
            >
              <div className="relative overflow-hidden">
                <img
                  src={img}
                  alt="Office"
                  className="w-full h-[350px] object-cover 
                  group-hover:scale-105 transition duration-[2s] ease-out"
                />
                <div className="absolute inset-0 bg-[#007cc3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default OfficeGallery;