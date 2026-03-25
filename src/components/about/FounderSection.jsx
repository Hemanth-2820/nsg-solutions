import React from 'react';
import founderImg from "./rahul-infosys.jpg";

const FounderSection = () => {
  return (
    <section className="py-24 bg-[#f5f7fa]">
  <div className="max-w-[1400px] mx-auto px-6">

    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

      {/* LEFT SIDE IMAGE */}
      <div className="group overflow-hidden rounded-2xl">
        <img
          src={founderImg}
          alt="Founder"
          className="w-full h-[450px] object-cover 
          group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />
      </div>

      {/* RIGHT SIDE CONTENT */}
      <div>

        <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#007cc3] mb-4">
          LEADERSHIP
        </p>

        <h2 className="font-infosys-heading text-[2rem] md:text-[3rem] lg:text-[4rem] text-[#111] mb-6">
          Visionary <span className="text-[#007cc3]">Leadership</span>
        </h2>

        <p className="font-sans leading-[1.6] text-gray-600 border-l-[3px] border-[#007cc3] pl-6">
         Our founder is a visionary leader inspired by Shankar Sir principles of innovation and integrity.  
        He believes in building scalable and reliable technology solutions that create real business value.  
        With a strong focus on quality and continuous learning, he drives the company toward excellence.  
        His leadership fosters innovation, teamwork, and long-term growth in the digital era.
        </p>
      </div>
    </div>
  </div>
</section>
  );
};

export default FounderSection;
