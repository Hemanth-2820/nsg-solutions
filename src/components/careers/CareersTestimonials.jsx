import React from 'react';
import { motion } from 'framer-motion';

// Using absolute paths for generated avatars
import avatar1 from '../../assets/generated/testimonial_avatar_1_1774529449165.png';
import avatar2 from '../../assets/generated/testimonial_avatar_2_1774529467420.png';
import avatar3 from '../../assets/generated/testimonial_avatar_3_1774529482337.png';

const testimonials = [
  {
    quote: "At NSG, we've solved concurrency issues that would stop most teams in their tracks. It's a sanctuary for those who value deterministic results over 'just making it work'.",
    name: 'Priya Shankar',
    role: 'Principal Systems Lead',
    img: avatar1
  },
  {
    quote: "The computational resources and the sheer engineering pedigree here are unmatched. We're not just implementing AI; we're redefining its enterprise utility.",
    name: 'Rohan Mehta',
    role: 'Senior AI Architect',
    img: avatar2
  },
  {
    quote: "Ownership isn't a buzzword here; it's the core. I've had the autonomy to architect cloud infrastructures that power massive global transformations.",
    name: 'Aisha Morten',
    role: 'Cloud Engineering Head',
    img: avatar3
  }
];

const CareersTestimonials = () => {
  return (
    <section className="py-32 px-6 bg-[#fdfaf6] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[#007cc3] font-bold uppercase tracking-[0.3em] text-[11px] mb-4 block"
          >
            Voice of the Team
          </motion.span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 font-infosys-heading italic">Direct From The <span className="text-[#007cc3]">Core</span></h2>
          <p className="text-black/50 text-xl font-medium max-w-2xl mx-auto italic">"We are defined by the quality of our people and the depth of our puzzles."</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-12">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
              whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="bg-white border border-black/5 rounded-[3rem] p-10 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group"
            >
              <div>
                <div className="text-[#007cc3] text-6xl font-serif mb-6 opacity-20">"</div>
                <p className="text-gray-900 font-medium italic mb-12 leading-relaxed text-lg">
                  {t.quote}
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#007cc3]/10">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 font-infosys-heading text-lg">{t.name}</p>
                  <p className="text-[#007cc3] text-[10px] font-bold uppercase tracking-widest mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CareersTestimonials;
