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
      className={`fixed w-full z-[1000] transition-all duration-700 ${scrolled || forceDarkNav ? 'shadow-[0_15px_40px_rgba(0,0,0,0.6)] py-3' : 'bg-transparent py-6'}`}
      style={(scrolled || forceDarkNav) ? {
        background: 'linear-gradient(135deg, #0B0F2F, #1A1F5A, #2C1983)',
        backgroundSize: '200% 200%',
        animation: 'gradient-shift 15s ease infinite alternate'
      } : {}}
    >
      <div className="max-w-[1500px] mx-auto px-6 w-full relative">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 z-[110] relative group flex items-center">
            <img src={logonavbar} alt="NSG Solutions Logo" className="h-[75px] w-auto relative z-10 brightness-[1.1] drop-shadow-[0_2px_15px_rgba(255,255,255,0.15)] transition-transform duration-300 group-hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-6">
              {mainLinks.map((link, idx) => (
                <div
                  key={idx}
                  className="relative group/nav"
                  onMouseEnter={() => link.hasDropdown && setIsServicesHovered(true)}
                  onMouseLeave={() => link.hasDropdown && setIsServicesHovered(false)}
                >
                  <Link
                    to={link.path}
                    className="text-white/80 font-bold tracking-widest uppercase text-[12px] hover:text-[#38bdf8] transition-colors flex items-center gap-1.5"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown size={14} className={`group-hover/nav:rotate-180 transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />}
                  </Link>
                  <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#38bdf8] transition-all duration-300 group-hover/nav:w-full"></div>

                  {link.hasDropdown && (
                    <AnimatePresence>
                      {isServicesHovered && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95, y: 15 }}
                          transition={{ duration: 0.3 }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[280px] bg-[#0f172a] border border-white/20 rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] z-[999]"
                        >
                          <div className="p-3">
                            {serviceSubLinks.map((sub, i) => (
                              sub.external ? (
                                <a key={i} href={sub.path} target="_blank" rel="noopener noreferrer" className="group/sub relative flex items-center justify-between px-5 py-4 text-[13px] text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-xl">
                                  <span className="font-bold tracking-wide">{sub.name}</span>
                                  <ArrowRight size={14} className="opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all text-[#38bdf8]" />
                                </a>
                              ) : (
                                <Link key={i} to={sub.path} className="group/sub relative flex items-center justify-between px-5 py-4 text-[13px] text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 rounded-xl">
                                  <span className="font-bold tracking-wide">{sub.name}</span>
                                  <ArrowRight size={14} className="opacity-0 group-hover/sub:opacity-100 group-hover/sub:translate-x-1 transition-all text-[#38bdf8]" />
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
              <div className="h-6 w-[1px] bg-white/10 mx-2"></div>
              <div className="flex items-center gap-6">
                <button className="text-white/50 hover:text-[#38bdf8] transition-all duration-300 hover:scale-110"><Search size={18} strokeWidth={2} /></button>
                <Link to="/client-login" className="px-6 py-2 bg-white/5 border border-white/10 text-white rounded-full text-[12px] font-bold tracking-widest uppercase hover:bg-white hover:text-[#0f172a] transition-all duration-[400ms] flex items-center gap-2 group backdrop-blur-sm">
                  Login <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="flex items-center xl:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#0f172a] transition-all duration-300 shadow-sm z-[110]">
              {isOpen ? <X size={24} strokeWidth={2.5} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, x: '100%' }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: '100%' }} className="fixed inset-0 bg-[#0f172a] z-[105] flex flex-col p-10 pt-32">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-6 overflow-y-auto pb-20">
              {mainLinks.map((link) => (
                <div key={link.name} className="flex flex-col border-b border-white/10 pb-4">
                  <Link to={link.path} className="text-[2rem] font-bold text-white hover:text-[#38bdf8] transition-colors leading-tight">{link.name}</Link>
                  {link.hasDropdown && (
                    <div className="flex flex-col mt-4 gap-4 pl-4 border-l-2 border-[#38bdf8]/50">
                      {serviceSubLinks.map((sub, j) => (
                        sub.external ? (
                          <a key={j} href={sub.path} target="_blank" rel="noopener noreferrer" className="text-white/70 text-lg hover:text-white transition-colors">{sub.name}</a>
                        ) : (
                          <Link key={j} to={sub.path} className="text-white/70 text-lg hover:text-white transition-colors">{sub.name}</Link>
                        )
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="mt-8">
                <Link to="/client-login" className="w-full flex items-center justify-between p-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold tracking-widest uppercase">Login <ArrowRight size={20} className="text-[#38bdf8]" /></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
