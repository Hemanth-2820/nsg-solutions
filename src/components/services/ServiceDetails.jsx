import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Code,
  Cloud,
  Brain,
  Briefcase,
  ShoppingCart
} from "lucide-react";

const ServiceDetails = ({ service, onBack }) => {
  const [activeSub, setActiveSub] = useState(null);

  if (!service) return null;

  return (
    <div className="mt-20 bg-white rounded-3xl p-10 shadow-xl">

      {/* BACK */}
      <button
        onClick={onBack}
        className="mb-6 text-[#007cc3] text-[12px] uppercase font-bold"
      >
        ← Back
      </button>

      {/* TITLE */}
      <h2 className="text-[2.5rem] font-infosys-heading mb-10">
        {service.title}
      </h2>

      {/* GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {service.subServices?.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={index}
              onClick={() => setActiveSub(item)}
              className="cursor-pointer rounded-2xl p-10 text-white
              bg-gradient-to-br from-[#007cc3] to-[#00c6ff]
              hover:scale-[1.05] transition-all duration-300"
            >

              {Icon && <Icon size={28} className="mb-4" />}

              <h4 className="text-[1.3rem] font-semibold">
                {item.name}
              </h4>

            </motion.div>
          );
        })}

      </div>

      {/* 🔥 SHOW CONTENT WHEN CLICKED */}
      {activeSub && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-16 bg-[#0a0f16] text-white rounded-3xl p-10"
        >

          <button
            onClick={() => setActiveSub(null)}
            className="mb-6 text-[#5bb8e4] text-[12px] uppercase font-bold"
          >
            ← Back
          </button>

          <h3 className="text-[2rem] mb-6">
            {activeSub.name}
          </h3>

          {/* 🔥 CONTENT (YOUR DATA) */}
          <ul className="space-y-3 text-gray-300">
            <li>✔ High quality development</li>
            <li>✔ Scalable architecture</li>
            <li>✔ Enterprise level performance</li>
            <li>✔ Secure & optimized</li>
          </ul>

        </motion.div>
      )}

    </div>
  );
};

export default ServiceDetails;