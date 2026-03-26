import React from 'react';

const ServicePartners = () => {
  return (
    <section className="bg-[#0a0f16] py-24">
      <div className="max-w-[1500px] mx-auto px-6">

        <h2 className="text-white text-[2.5rem] font-infosys-heading mb-12">
          Our Global Partners & Recognitions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <div className="bg-[#1e3a8a] p-10 text-white">
            Gartner Emerging Tech Leaders
          </div>

          <div className="bg-[#e5002b] p-10 text-white">
            Everest Group Leader
          </div>

          <div className="bg-[#610082] p-10 text-white">
            Snowflake Partner Award
          </div>

        </div>
      </div>
    </section>
  );
};

export default ServicePartners;