import joinUsImg from '../../assets/external/careers_collaboration_hero.jpg';

const CareersJoinUs = () => (
  <section id="join-us" className="bg-white py-0 overflow-hidden">
    <div className="max-w-[1500px] mx-auto px-6 lg:px-12 py-28">
      <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

        {/* Left: Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:w-1/2 relative"
        >
          <div className="rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.1)]">
            <img
              src={joinUsImg}
              alt="NSG Team collaboration"
              className="w-full h-[480px] object-cover hover:scale-105 transition-transform duration-[2s]"
            />
          </div>
          {/* Accent line */}
          <div className="absolute -bottom-4 -left-4 w-24 h-24 border-[3px] border-[#2dd4bf] rounded-2xl pointer-events-none"></div>
        </motion.div>

        {/* Right: Text */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut', delay: 0.1 }}
          className="lg:w-1/2"
        >
          <h2 className="text-[3.5rem] md:text-[4.5rem] font-infosys-heading text-[#111] leading-[1.05] tracking-tight mb-8">
            Join us
          </h2>
          <p className="text-[#475569] text-[1.2rem] font-light leading-[1.8] mb-10 max-w-lg">
            Deciding the career for you is more than simply "landing the job." It's finding a place where you know you make a difference each day, where you can be your most authentic self.
            <br /><br />
            Ready to be where you can <span className="font-semibold text-[#0d9488]">thrive?</span>
          </p>
          <a
            href="#reasons"
            className="inline-block bg-[#0d9488] text-white font-bold px-10 py-4 rounded-full uppercase tracking-widest text-[12px] hover:bg-[#0f172a] hover:shadow-[0_10px_30px_rgba(13,148,136,0.3)] hover:scale-105 transition-all duration-300"
          >
            Explore careers
          </a>
        </motion.div>

      </div>
    </div>
  </section>
);

export default CareersJoinUs;
