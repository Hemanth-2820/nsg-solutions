import React from 'react';
import { motion } from 'framer-motion';
import Meetingroom from "./Meetingroom.jpg";
import Workingarea from "./Workingarea.jpg";
import goal from "./goal.jpg";

const images = [Meetingroom, Workingarea, goal];

const OfficeGallery = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-black to-[#0f172a] text-white">

      <div className="max-w-[1500px] mx-auto px-6 lg:px-12">

        <div className="mb-16">
          <p className="text-blue-400 text-xs uppercase tracking-[0.3em] mb-4">
            Inside NSG
          </p>

          <h2 className="text-4xl font-semibold">
            Life at <span className="text-blue-400">NSG Solutions</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {images.map((img, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <img
                src={img}
                alt="Office"
                className="w-full h-[300px] object-cover 
                group-hover:scale-110 transition duration-[1.5s]"
              />
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default OfficeGallery;