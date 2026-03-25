import React from 'react';
import { motion } from 'framer-motion';

// Images
import team from './team.jpg';
import team2 from './team2.jpg';
import team3 from './team3.jpg';
import team4 from './team4.jpg';

const TeamSection = () => {

  const teamData = [
    {
      img: team,
      name: "John Doe",
      role: "Software Engineer"
    },
    {
      img: team2,
      name: "Jane Smith",
      role: "UI/UX Designer"
    },
    {
      img: team3,
      name: "Michael Lee",
      role: "Project Manager"
    },
    {
      img: team4,
      name: "Sara Khan",
      role: "Marketing Lead"
    }
  ];

  return (
    <section className="py-24 bg-[#f5f7fa]">
      <div className="max-w-[1400px] mx-auto px-6">

        {/* Animation Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >

          {/* Header */}
          <div className="flex flex-col items-center mb-16 text-center">

            <div className="flex items-center gap-4 mb-4">
              <div className="w-6 h-[2px] bg-[#1e3a8a]"></div>
              <span className="text-[#1e3a8a] text-[10px] uppercase font-bold tracking-[0.2em]">
                The Minds Behind NSG
              </span>
              <div className="w-6 h-[2px] bg-[#1e3a8a]"></div>
            </div>

            <h2 className="font-infosys-heading text-[#111] leading-tight 
              text-[2rem] md:text-[3rem] lg:text-[4rem]">
              Our Core <span className="text-[#007cc3]">Team</span>
            </h2>

            <p className="font-sans text-[#64748b] leading-[1.6] mt-4 max-w-[600px]">
              Meet the professionals driving innovation, collaboration, and excellence at NSG Solutions.
            </p>

          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {teamData.map((member, index) => (
              <div
                key={index}
                className="group cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >

                {/* Image Card */}
                <div className="relative overflow-hidden rounded-2xl h-[320px] mb-6">

                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>

                  {/* Name on Image */}
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white font-infosys-heading text-lg">
                      {member.name}
                    </h3>
                  </div>

                </div>

                {/* Role */}
                <p className="text-[#64748b] text-[10px] uppercase font-bold tracking-[0.2em] text-center">
                  {member.role}
                </p>

              </div>
            ))}

          </div>

        </motion.div>

      </div>
    </section>
  );
};

export default TeamSection;