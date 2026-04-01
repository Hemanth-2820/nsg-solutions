import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { X, ChevronDown, Menu } from 'lucide-react';
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
      className={`fixed top-0 left-0 w-full z-[1000] transition-all duration-500 border-b border-white/10 ${scrolled
          ? "bg-[#0A0E27]/90 backdrop-blur-md shadow-2xl"
          : "bg-black/30 backdrop-blur-md"
        }`}
    >
      {/* NAVBAR HEIGHT FIXED HERE */}
      <div className="max-w-[1550px] mx-auto px-6 h-[100px] flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img
            src={logonavbar}
            alt="NSG Solutions"
            className="h-[70px] md:h-[85px] w-auto transition-transform hover:scale-105"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden xl:flex items-center space-x-10">
          {mainLinks.map((link, idx) => {
            const isActive = location.pathname === link.path;

            return (
              <div
                key={idx}
                className="relative group py-6"
                onMouseEnter={() => link.hasDropdown && setIsServicesHovered(true)}
                onMouseLeave={() => link.hasDropdown && setIsServicesHovered(false)}
              >
                <Link
                  to={link.path}
                  className={`text-white font-bold uppercase text-[12px] tracking-[0.2em] flex items-center gap-2 transition-colors
                  ${isActive ? "text-[#00a3ff]" : "hover:text-[#00a3ff]"}`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} />}
                </Link>

                {/* Dropdown */}
                {link.hasDropdown && isServicesHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-black/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl shadow-2xl"
                  >
                    {serviceSubLinks.map((sub, i) => (
                      <Link
                        key={i}
                        to={sub.external ? { pathname: sub.path } : sub.path}
                        target={sub.external ? "_blank" : "_self"}
                        className="block p-3 text-white/70 hover:text-white hover:bg-white/5 rounded-lg text-xs font-bold transition-all"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </div>
            );
          })}

          {/* Login Button */}
          <Link
            to="/client-login"
            className="bg-gradient-to-r from-[#007cc3] to-[#00a3ff] text-white px-6 py-2 rounded-full text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg"
          >
            Login
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="xl:hidden w-10 h-10 flex items-center justify-center text-white"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed inset-0 bg-[#0A0E27] z-[1001] flex flex-col p-8 pt-[120px]"
          >
            <div className="flex flex-col gap-6">
              {mainLinks.map((link) => (
                <div key={link.name}>
                  <Link
                    to={link.path}
                    className="text-3xl font-bold text-white"
                  >
                    {link.name}
                  </Link>

                  {link.hasDropdown && (
                    <div className="mt-3 pl-4 border-l border-white/10 space-y-2">
                      {serviceSubLinks.map((sub, i) => (
                        <Link
                          key={i}
                          to={sub.path}
                          className="block text-white/60 text-lg"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/client-login"
                className="mt-6 p-4 bg-[#007cc3] text-white text-center font-bold uppercase rounded-xl"
              >
                Client Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;