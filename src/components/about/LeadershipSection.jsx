import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Linkedin, Mail } from 'lucide-react';

const LeadershipSection = () => {
    const leadership = [
        {
            name: "SHANKAR MUNI",
            role: "Founder and Managing Director",
            quote: "Our Founder is a visionary leader guided by innovation, integrity, and excellence.",
            bio: [
                "He architects scalable solutions that generate real business value while leading the company toward digital excellence. With a strong emphasis on precision and strategic thinking, he enables organizations to navigate complexity and evolve securely into the future.",
                "With over 20 years of experience in the creative industry, he has been instrumental in shaping impactful design and storytelling. His expertise spans branding, animation, video production, and web design—consistently helping organizations achieve growth through high-quality, results-driven creative solutions."
            ],
            image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1000&q=80", // Placeholder
            color: "#007cc3"
        },
        {
            name: "SANTHOSH A",
            role: "CEO",
            quote: "Our CEO is a forward-thinking leader driven by innovation, intelligence, and strategic vision.",
            bio: [
                "He architects technology-driven solutions that create measurable business impact while steering the organization toward digital transformation. With a strong emphasis on precision and future-readiness, he enables businesses to navigate complexity and evolve in an ever-changing technological landscape.",
                "With deep expertise in Artificial Intelligence (AI), Machine Learning (ML), and the Internet of Things (IoT), he plays a pivotal role in building intelligent, scalable, and future-ready solutions—empowering organizations to unlock new opportunities and achieve sustainable growth."
            ],
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1000&q=80", // Placeholder
            color: "#4f46e5"
        }
    ];

    return (
        <section className="py-32 bg-[#f8fafc] overflow-hidden">
            <div className="max-w-[1400px] mx-auto px-6">
                
                {/* Header Staggered */}
                <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-3xl">
                        <div className="inline-block px-4 py-1 bg-[#007cc3]/10 text-[#007cc3] text-[11px] font-black uppercase tracking-[0.4em] rounded-full mb-6">
                            Leadership Core
                        </div>
                        <h2 className="text-[3.5rem] md:text-[5rem] font-infosys-heading leading-[0.95] tracking-tighter text-[#0f172a]">
                            Visionaries Behind <span className="text-[#007cc3]">Digital Evolution.</span>
                        </h2>
                    </div>
                    <p className="text-[#64748b] text-xl font-light leading-relaxed max-w-sm border-l-2 border-[#e2e8f0] pl-8">
                        Architecting the future of enterprise technology with precision and purpose.
                    </p>
                </div>

                {/* Leadership Grid */}
                <div className="space-y-40">
                    {leadership.map((leader, index) => (
                        <div 
                            key={index} 
                            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-16 md:gap-32 items-center`}
                        >
                            {/* Image Composition */}
                            <motion.div 
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 1 }}
                                className="w-full md:w-1/2 relative group"
                            >
                                <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-[4/5] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
                                    <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center text-gray-400">
                                        <p className="font-bold uppercase tracking-widest text-xs">Image Placeholder</p>
                                    </div>
                                    {/* Subtitle Badge overlapping image */}
                                    <div className="absolute top-10 right-10 z-20 bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-3xl group-hover:bg-white/20 transition-all duration-700">
                                        <p className="text-white font-black uppercase tracking-widest text-[10px] mb-1">Executive Tenure</p>
                                        <p className="text-white text-3xl font-infosys-heading">20+</p>
                                    </div>
                                </div>
                                <div 
                                    className="absolute -inset-4 rounded-[4rem] border-2 border-dashed border-[#e2e8f0] -z-10 group-hover:scale-110 transition-transform duration-1000"
                                    style={{ borderColor: `${leader.color}20` }}
                                ></div>
                                <div 
                                    className="absolute -bottom-10 -right-10 w-64 h-64 blur-[100px] opacity-10 rounded-full"
                                    style={{ background: leader.color }}
                                ></div>
                            </motion.div>

                            {/* Content Composition */}
                            <div className="w-full md:w-1/2 space-y-12">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                >
                                    <h3 className="text-[#0f172a] text-6xl font-infosys-heading tracking-tighter mb-2">{leader.name}</h3>
                                    <p className="text-[12px] font-black uppercase tracking-[0.5em] text-[#007cc3] mb-10">{leader.role}</p>
                                    
                                    <div className="relative">
                                        <Quote size={60} className="absolute -top-10 -left-10 text-[#e2e8f0] -z-10 opacity-50" />
                                        <p className="text-3xl text-[#0f172a] font-light leading-tight italic tracking-tight border-l-[6px] border-[#007cc3] pl-10 mb-10">
                                            "{leader.quote}"
                                        </p>
                                    </div>

                                    <div className="space-y-6">
                                        {leader.bio.map((para, i) => (
                                            <p key={i} className="text-[#64748b] text-xl font-light leading-relaxed">
                                                {para}
                                            </p>
                                        ))}
                                    </div>

                                    <div className="flex gap-6 pt-10">
                                        <button className="flex items-center gap-3 text-[#0f172a] hover:text-[#007cc3] transition-colors font-bold uppercase tracking-widest text-[10px]">
                                            <Linkedin size={18} /> Professional Profile
                                        </button>
                                        <button className="flex items-center gap-3 text-[#0f172a] hover:text-[#007cc3] transition-colors font-bold uppercase tracking-widest text-[10px]">
                                            <Mail size={18} /> Direct Line
                                        </button>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default LeadershipSection;
