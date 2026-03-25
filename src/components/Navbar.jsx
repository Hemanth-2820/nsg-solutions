import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20); // triggers faster for MNC sticky feel
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Closes mobile menu on route change
  useEffect(() => setIsOpen(false), [location]);

  const mainLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services', hasDropdown: true },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Insights', path: '/case-studies' }, // Insights usually map to Case Studies/Blogs
    { name: 'Careers', path: '/careers' },
    { name: 'Contact', path: '/contact' }
  ];

  const serviceSubLinks = [
    'Digital Engineering',
    'Software Development',
    'Cloud',
    'AI & Data',
    'Marketing',
    'Design',
    'E-commerce'
  ];

  return (
    <nav className={`fixed w-full z-[100] transition-all duration-500 ${scrolled ? 'bg-gradient-to-br from-[#1e3a8a]/95 to-[#0f172a]/95 backdrop-blur-[10px] shadow-[0_10px_30px_rgba(0,0,0,0.5)] py-3' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1500px] mx-auto px-6 w-full relative">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 z-[110] relative group flex items-center">
            <img src={logo} alt="NSG Solutions Logo" className="h-[46px] w-auto relative z-10 brightness-[1.1] drop-shadow-[0_2px_10px_rgba(255,255,255,0.1)]" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex flex-1 justify-center items-center space-x-10">
            {mainLinks.map((link) => (
              <div
                key={link.name}
                className="relative group h-full py-4 flex items-center"
                onMouseEnter={() => link.hasDropdown && setIsServicesHovered(true)}
                onMouseLeave={() => link.hasDropdown && setIsServicesHovered(false)}
              >
                <Link
                  to={link.path}
                  className="text-[14px] font-medium text-white/90 hover:text-white transition-colors duration-300 flex items-center gap-1 font-sans tracking-wide hover-underline pb-[2px]"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className={`transform transition-transform duration-300 ${isServicesHovered ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown Menu (GSAP/Framer style slide up/down) */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isServicesHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, rotateX: 15 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, y: 15, rotateX: 15 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-0 w-[240px] bg-white rounded-xl shadow-[0_20px_40px_rgba(0,0,0,0.3)] border border-gray-100 overflow-hidden"
                        style={{ transformOrigin: "top center" }}
                      >
                        <div className="py-2">
                          {serviceSubLinks.map((sub, i) => (
                            <Link
                              key={i}
                              to="/services"
                              className="block px-6 py-3 text-sm text-[#334155] font-medium hover:bg-[#f8fafc] hover:text-[#007cc3] hover:pl-8 transition-all duration-300 relative group/sub"
                            >
                              {sub}
                              <span className="absolute left-0 bottom-0 top-0 w-1 bg-[#007cc3] transform scale-y-0 group-hover/sub:scale-y-100 transition-transform origin-center duration-300 line-clamp-1 h-full"></span>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-6 z-[110]">
            <button className="text-white hover:text-[#5bb8e4] transition-colors hidden lg:block group">
              <Search size={22} strokeWidth={2.5} className="group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-[#1e3a8a] transition-all duration-300 shadow-sm"
            >
              {isOpen ? <X size={24} strokeWidth={2.5} /> : <div className="flex flex-col gap-[5px]">
                <span className="block w-5 h-[2px] bg-current"></span>
                <span className="block w-5 h-[2px] bg-current"></span>
                <span className="block w-5 h-[2px] bg-current"></span>
              </div>}
            </button>
          </div>

        </div>
      </div>

      {/* Fullscreen Mobile Navigation Overlay */}
      <div
        className={`fixed inset-0 bg-gradient-to-br from-[#1e3a8a] to-[#0f172a] z-[105] transform transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-screen pointer-events-none"></div>
        <div className="pt-32 px-10 flex flex-col gap-6 max-w-[1400px] mx-auto h-full overflow-y-auto pb-20 relative z-10">
          {mainLinks.map((link, i) => (
            <div key={link.name} className="flex flex-col border-b border-white/10 pb-4">
              <Link
                to={link.path}
                className={`text-[2.2rem] font-infosys-heading text-white hover:text-[#5bb8e4] transition-colors`}
              >
                {link.name}
              </Link>
              {link.hasDropdown && (
                <div className="flex flex-col mt-4 gap-3 pl-4 border-l-2 border-[#5bb8e4]/50">
                  {serviceSubLinks.map((sub, j) => (
                    <Link key={j} to="/services" className="text-white/70 text-lg hover:text-white transition-colors">{sub}</Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-8 flex items-center gap-6">
            <button className="text-[#1e3a8a] p-4 bg-white shadow-[0_0_20px_rgba(255,255,255,0.4)] rounded-full hover:scale-105 transition-transform"><Search size={28} strokeWidth={1.5} /></button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
