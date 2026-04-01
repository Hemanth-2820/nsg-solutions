import React, { useState } from "react";
import { motion } from "framer-motion";

const ServiceDetails = ({ service, onBack }) => {
  const [activeSub, setActiveSub] = useState(null);

  if (!service) return null;

  return (
    <div className="mt-0 bg-gradient-to-br from-[#F8FAFC] to-[#E0F2FE] px-6 py-20">

      <div className="max-w-[1400px] mx-auto">

        {/* BACK */}
        <button
          onClick={onBack}
          className="mb-8 text-[#007cc3] text-[12px] uppercase font-bold tracking-[0.2em] hover:underline"
        >
          ← Back
        </button>

        {/* TITLE */}
        <h2 className="text-[2.5rem] md:text-[3rem] font-extrabold text-[#0f172a] mb-12 tracking-tight">
          {service.title}
        </h2>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {service.subServices?.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeSub?.name === item.name;

            return (
              <motion.div
                key={index}
                onClick={() => setActiveSub(item)}
                whileHover={{ y: -10, scale: 1.03 }}
                className={`
                  cursor-pointer rounded-2xl p-8 bg-white 
                  border transition-all duration-300 group
                  ${isActive
                    ? "border-[#007cc3] shadow-[0_20px_50px_rgba(0,124,195,0.25)]"
                    : "border-gray-200 shadow-sm hover:shadow-[0_15px_40px_rgba(0,124,195,0.15)]"}
                `}
              >

                {/* ICON */}
                {Icon && (
                  <div className="mb-5 text-[#007cc3] group-hover:scale-110 transition">
                    <Icon size={28} />
                  </div>
                )}

                {/* NAME */}
                <h4 className="text-[1.2rem] font-bold text-[#0f172a] group-hover:text-[#007cc3] transition">
                  {item.name}
                </h4>

              </motion.div>
            );
          })}

        </div>

        {/* DETAILS PANEL */}
        {activeSub && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-20 bg-white/80 backdrop-blur-md border border-gray-200 rounded-[2rem] p-10 md:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.06)]"
          >

            {/* BACK */}
            <button
              onClick={() => setActiveSub(null)}
              className="mb-6 text-[#007cc3] text-[12px] uppercase font-bold tracking-[0.2em] hover:underline"
            >
              ← Back
            </button>

            {/* TITLE */}
            <h3 className="text-[2rem] md:text-[2.3rem] font-extrabold text-[#0f172a] mb-6">
              {activeSub.name}
            </h3>

            {/* CONTENT */}
            <ul className="space-y-4 text-[#475569] text-[1.05rem] leading-relaxed">
              <li>✔ High quality development</li>
              <li>✔ Scalable architecture</li>
              <li>✔ Enterprise level performance</li>
              <li>✔ Secure & optimized</li>
            </ul>

          </motion.div>
        )}

      </div>
    </div>
  );
};

export default ServiceDetails;