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
    <section className="py-24 bg-gradient-to-br from-[#0f172a] to-black text-white">

      <div className="max-w-[1400px] mx-auto px-6">

        {/* HEADER */}
        <div className="text-center mb-16">
          <p className="text-blue-400 text-xs uppercase tracking-[0.3em] mb-4">
            Our Team
          </p>

          <h2 className="text-4xl font-semibold">
            The Minds Behind <span className="text-blue-400">NSG</span>
          </h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {teamData.map((member, index) => (
            <motion.div
              key={index}
              whileHover={{
                rotateX: 10,
                rotateY: -10,
                scale: 1.05
              }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="
                group rounded-2xl overflow-hidden
                bg-white/5 backdrop-blur-xl border border-white/10
                transition-all duration-500
                hover:shadow-[0_20px_80px_rgba(0,150,255,0.4)]
              "
            >

              <div className="relative h-[320px]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-[1.5s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-white text-lg font-semibold">
                    {member.name}
                  </h3>
                </div>
              </div>

              <p className="text-gray-400 text-xs uppercase tracking-wider text-center py-4">
                {member.role}
              </p>

            </motion.div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default TeamSection;