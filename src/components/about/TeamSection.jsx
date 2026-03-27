import React from 'react';
import { motion } from 'framer-motion';

import team from './team.jpg';
import team2 from './team2.jpg';
import team3 from './team3.jpg';
import team4 from './team4.jpg';

const TeamSection = () => {

  const teamData = [
    { img: team, name: "John Doe", role: "Software Engineer" },
    { img: team2, name: "Jane Smith", role: "UI/UX Designer" },
    { img: team3, name: "Michael Lee", role: "Project Manager" },
    { img: team4, name: "Sara Khan", role: "Marketing Lead" }
  ];

  return (
    <section className="py-24 bg-white text-[#0f172a]">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-20">
          <div className="inline-block px-4 py-1 bg-blue-50 text-[#007cc3] text-[11px] font-bold uppercase tracking-[0.3em] rounded-full mb-6">
            Our Talent
          </div>

          <h2 className="text-[3rem] font-medium leading-tight font-infosys-heading">
            The Minds Behind <span className="text-[#007cc3]">NSG Solutions</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {teamData.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-[#f8fafc] rounded-[2rem] overflow-hidden border border-[#e2e8f0] hover:border-[#007cc3]/30 transition-all duration-500 hover:shadow-[0_25px_60px_-15px_rgba(0,124,195,0.15)]"
            >
              <div className="relative h-[380px] overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                />
                
                {/* Modern Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                {/* Name Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                  <h3 className="text-white text-xl font-bold font-infosys-heading tracking-tight mb-1">
                    {member.name}
                  </h3>
                  <p className="text-blue-300 text-[11px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Bottom Label (Desktop context) */}
              <div className="p-5 text-center bg-white border-t border-[#e2e8f0]">
                <p className="text-[#64748b] text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  {member.role}
                </p>
              </div>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default TeamSection;