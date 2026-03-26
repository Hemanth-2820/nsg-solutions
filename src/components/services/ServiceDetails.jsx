import React, { useState } from "react";
import { motion } from "framer-motion";

const ServiceDetails = ({ service, onBack }) => {
  const [activeSubService, setActiveSubService] = useState(null);

  if (!service) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-20 bg-white rounded-3xl p-10 shadow-xl"
    >
      {/* BACK BUTTON */}
      <button
        onClick={onBack}
        className="mb-6 text-[#007cc3] text-[12px] uppercase font-bold tracking-[0.2em]"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h3 className="text-[2rem] md:text-[3rem] font-infosys-heading mb-10 text-[#111]">
        {service.title}
      </h3>

      {/* SUB SERVICES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {service.subServices?.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveSubService(item)}
            className="p-6 bg-[#f5f7fa] rounded-xl cursor-pointer 
            hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
          >
            <h4 className="text-[1.1rem] font-semibold text-[#111]">
              {item.name}
            </h4>

            <p className="text-[#64748b] text-[13px] mt-2">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* 🔥 SUB-SERVICE DETAILS PANEL */}
      {activeSubService && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-[#0a0f16] text-white rounded-3xl p-10"
        >
          <button
            onClick={() => setActiveSubService(null)}
            className="mb-6 text-[#5bb8e4] text-[12px] uppercase font-bold tracking-[0.2em]"
          >
            ← Back
          </button>

          <h3 className="text-[2rem] md:text-[3rem] font-infosys-heading mb-6">
            {activeSubService.name}
          </h3>

          <p className="text-gray-300 leading-[1.8] max-w-[800px]">
            {activeSubService.desc}
          </p>

          {/* FEATURES */}
          <div className="mt-8 grid md:grid-cols-2 gap-6">

            <div className="bg-white/5 p-6 rounded-xl">
              <h4 className="text-[#5bb8e4] font-bold mb-3">
                Key Features
              </h4>
              <ul className="space-y-2 text-sm">
                {activeSubService.details?.map((d, i) => (
                  <li key={i}>✔ {d}</li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 p-6 rounded-xl">
              <h4 className="text-[#5bb8e4] font-bold mb-3">
                Business Impact
              </h4>
              <ul className="space-y-2 text-sm">
                <li>✔ Faster Delivery</li>
                <li>✔ Better Scalability</li>
                <li>✔ Cost Optimization</li>
              </ul>
            </div>

          </div>
        </motion.div>
      )}

    </motion.div>
  );
};

export default ServiceDetails;