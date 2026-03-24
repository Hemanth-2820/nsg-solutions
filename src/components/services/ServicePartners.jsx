import React from 'react';
import { motion } from 'framer-motion';

const partnersData = [
  {
    id: 1,
    color: "bg-[#0041f0]", // Vibrant Blue
    text: "Gartner Inaugural Emerging Tech: Talentscape for AI Services Leaders"
  },
  {
    id: 2,
    color: "bg-[#e5002b]", // Bold Red
    text: "Everest Group Leader and Star Performer in data & analytics and AI & gen AI"
  },
  {
    id: 3,
    color: "bg-[#0041f0]", // Vibrant Blue
    text: "Databricks partner of the year - 6th year in a row"
  },
  {
    id: 4,
    color: "bg-[#610082]", // Deep Purple
    text: "Snowflake partner of the year - 2nd year in a row"
  }
];

// Abstract geometric line overlay perfectly matching the Accenture aesthetic
const AbstractLines = () => (
  <svg 
    className="absolute inset-0 w-full h-full opacity-30 pointer-events-none transition-transform duration-[1.5s] ease-out group-hover:scale-105" 
    viewBox="0 0 600 400" 
    preserveAspectRatio="xMidYMid slice" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="450" cy="-50" r="300" stroke="white" strokeWidth="1.5" />
    <circle cx="-50" cy="400" r="280" stroke="white" strokeWidth="1.5" />
    <circle cx="300" cy="200" r="150" stroke="white" strokeWidth="1" />
    <path d="M-100 150 Q 200 -50 600 250" stroke="white" strokeWidth="1.5" />
    <path d="M0 350 Q 300 450 700 150" stroke="white" strokeWidth="1" />
  </svg>
);

const ServicePartners = () => {
  return (
    <section className="bg-black py-28 relative">
      <div className="max-w-[1500px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-14">
            <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-white text-[2rem] md:text-[2.5rem] font-infosys-heading mb-4 tracking-tight"
            >
                Our Global Partners & Recognitions
            </motion.h2>
            <motion.div 
                initial={{ opacity: 0, scaleX: 0 }}
                whileInView={{ opacity: 1, scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="h-[2px] w-[60px] bg-[#5bb8e4] origin-left"
            ></motion.div>
        </div>

        {/* Dynamic Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnersData.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className={`relative overflow-hidden h-[340px] ${item.color} group cursor-pointer shadow-lg`}
            >
                {/* Geometric Overlay */}
                <AbstractLines />

                {/* Card Content */}
                <div className="absolute inset-0 p-10 flex flex-col justify-end bg-gradient-to-t from-black/20 to-transparent">
                    <h3 className="text-white text-[1.4rem] md:text-[1.6rem] font-sans font-medium leading-[1.3] transform group-hover:-translate-y-2 transition-transform duration-500 ease-out">
                        {item.text}
                    </h3>
                </div>
                
                {/* Subtle bottom border highlight on hover */}
                <div className="absolute bottom-0 left-0 w-0 h-[4px] bg-white group-hover:w-full transition-all duration-700 ease-out"></div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicePartners;
