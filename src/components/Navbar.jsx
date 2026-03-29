import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, X, ChevronDown, ArrowRight, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logonavbar from "../assets/logonavbar.png";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isServicesHovered, setIsServicesHovered] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => setIsOpen(false), [location]);

    const mainLinks = [
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: 'Services', path: '/services', hasDropdown: true },
        { name: 'Solutions', path: '/solutions' },
        { name: 'Blog', path: '/blog' },
        { name: 'Careers', path: '/careers' },
        { name: 'Contact', path: '/contact' }
    ];

    const serviceSubLinks = [
        { name: 'IT Services', path: '/services/it' },
        { name: 'Video Production', path: '/services/creative' },
        { name: 'Digital Marketing', path: '/services/marketing' },
        { name: 'Publishing Solutions', path: 'https://nsgpublishers.com', external: true },
        { name: 'Branding & Design', path: '/solutions/branding' },
        { name: 'Enterprise Strategy', path: '/services/enterprise' }
    ];

    return (
        <nav
            className={`fixed w-full z-[1000] transition-all duration-500 ${scrolled ? 'bg-[#0A0E27] shadow-2xl' : 'bg-transparent'}`}
        >
            <div className="max-w-[1550px] mx-auto px-6 h-28 md:h-32 flex items-center justify-between relative">
                
                {/* Logo */}
                <Link to="/" className="flex-shrink-0 z-[1002] relative">
                    <img src={logonavbar} alt="NSG Solutions" className="h-[85px] md:h-[110px] w-auto transition-transform hover:scale-105" />
                </Link>

                {/* Desktop Nav */}
                <div className="hidden xl:flex items-center space-x-10">
                    {mainLinks.map((link, idx) => (
                        <div 
                            key={idx} 
                            className="relative group py-10"
                            onMouseEnter={() => link.hasDropdown && setIsServicesHovered(true)}
                            onMouseLeave={() => link.hasDropdown && setIsServicesHovered(false)}
                        >
                            <Link to={link.path} className="text-white font-bold uppercase text-[12px] tracking-[0.2em] flex items-center gap-2 hover:text-blue-400 transition-colors">
                                {link.name}
                                {link.hasDropdown && <ChevronDown size={14} />}
                            </Link>

                            {link.hasDropdown && isServicesHovered && (
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#0A0E27] border border-white/10 p-4 rounded-xl shadow-2xl"
                                >
                                    {serviceSubLinks.map((sub, i) => (
                                        <Link key={i} to={sub.external ? { pathname: sub.path } : sub.path} target={sub.external ? "_blank" : "_self"} className="block p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg text-xs font-bold transition-all">
                                            {sub.name}
                                        </Link>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    ))}
                    <Link to="/client-login" className="bg-[#007cc3] text-white px-8 py-3 rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-[#007cc3] transition-all">Login</Link>
                </div>

                {/* Mobile Toggle */}
                <button 
                    onClick={() => setIsOpen(!isOpen)} 
                    className="xl:hidden z-[1002] w-10 h-10 flex items-center justify-center text-white relative"
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 200 }}
                        className="fixed inset-0 bg-[#0A0E27] z-[1001] flex flex-col p-8 pt-32"
                    >
                        <div className="flex flex-col gap-6 overflow-y-auto">
                            {mainLinks.map((link) => (
                                <div key={link.name}>
                                    <Link to={link.path} className="text-4xl font-black text-white">{link.name}</Link>
                                    {link.hasDropdown && (
                                        <div className="mt-4 grid grid-cols-1 gap-3 pl-4 border-l border-white/10">
                                            {serviceSubLinks.map((sub, i) => (
                                                <Link key={i} to={sub.path} className="text-white/50 font-bold text-lg">{sub.name}</Link>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                            <Link to="/client-login" className="mt-10 p-5 bg-[#007cc3] text-white text-center font-bold tracking-widest uppercase rounded-xl">Client Login</Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
