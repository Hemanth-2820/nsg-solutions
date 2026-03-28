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
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setIsOpen(false), [location]);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'Blog', path: '/blog' },
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  const serviceSubLinks = [
    { name: 'IT Services', path: '/services/it' },
    { name: 'Video Production', path: '/services/creative' },
    { name: 'Digital Marketing', path: '/services/marketing' },
    { name: 'Publishing Solutions', path: 'https://nsgpublishers.com', external: true },
    { name: 'Enterprise Strategy', path: '/services/enterprise' }
  ];

  const forceDarkNav = ['/portfolio', '/client-login'].includes(location.pathname);

  return (
    <nav
      className={`fixed w-full z-[99999] transition-all duration-500 ${scrolled ? 'bg-[#0A0E27] shadow-[0_15px_40px_rgba(0,0,0,0.8)]' : location.pathname === '/' ? 'bg-black/20 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}
      style={scrolled ? {
        background: 'linear-gradient(135deg, #0B0F2F, #1A1F5A, #2C1983)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 15s ease infinite alternate'
      } : {}}
    >
      <div className="max-w-[1550px] mx-auto px-6 h-32 flex items-center justify-between relative">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0 z-[110] relative group block">
          <img src={logonavbar} alt="NSG Solutions Logo" className="h-[95px] md:h-[110px] w-auto transition-transform duration-300 group-hover:scale-105" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden xl:flex items-center h-full">
          <div className="flex items-center space-x-8 h-full">
            {mainLinks.map((link, idx) => (
              <div
                key={idx}
                className="relative h-full flex items-center"
                onMouseEnter={() => link.hasDropdown && setIsServicesHovered(true)}
                onMouseLeave={() => link.hasDropdown && setIsServicesHovered(false)}
              >
                <Link
                  to={link.path}
                  className="text-white font-bold tracking-[0.2em] uppercase text-[12px] hover:text-[#38bdf8] transition-colors flex items-center gap-1.5 py-10"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className={`transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />}
                </Link>

                {link.hasDropdown && (
                  <AnimatePresence>
                    {isServicesHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] bg-[#0A0E27] border border-white/10 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] p-4 z-[5001]"
                      >
                        <div className="space-y-1">
                          {serviceSubLinks.map((sub, i) => (
                            sub.external ? (
                              <a key={i} href={sub.path} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-5 py-4 text-[13px] text-white/70 hover:text-white hover:bg-white/5 transition-all rounded-xl">
                                <span className="font-bold">{sub.name}</span>
                                <ArrowRight size={14} className="text-[#38bdf8]" />
                              </a>
                            ) : (
                              <Link key={i} to={sub.path} className="flex items-center justify-between px-5 py-4 text-[13px] text-white/70 hover:text-white hover:bg-white/5 transition-all rounded-xl">
                                <span className="font-bold">{sub.name}</span>
                                <ArrowRight size={14} className="text-[#38bdf8]" />
                              </Link>
                            )
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}

            <div className="h-6 w-[1px] bg-white/20 mx-2"></div>

            <div className="flex items-center gap-6">
              <button className="text-white hover:text-[#38bdf8] transition-transform hover:scale-110">
                <Search size={20} />
              </button>
              <Link to="/client-login" className="px-8 py-3 bg-[#007cc3] text-white rounded-full text-[12px] font-black tracking-widest uppercase hover:bg-white hover:text-[#007cc3] transition-all flex items-center gap-2 group shadow-lg">
                Login <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="xl:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center text-white z-[110] relative border border-white/20">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-[#0A0E27] z-[105] flex flex-col p-10 pt-32">
            <div className="flex flex-col gap-6 overflow-y-auto">
              {mainLinks.map((link) => (
                <div key={link.name} className="border-b border-white/10 pb-4">
                  <Link to={link.path} className="text-[2.2rem] font-black text-white">{link.name}</Link>
                </div>
              ))}
              <Link to="/client-login" className="mt-8 p-6 bg-[#007cc3] rounded-2xl text-white text-center font-bold tracking-widest uppercase">Login</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
