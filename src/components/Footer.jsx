import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-infosys-gray text-infosys-dark pt-24 pb-12 snap-section flex flex-col justify-end">
      <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 border-b border-gray-300 pb-16">
          
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-6 group">
              <img src={logo} alt="NSG Solutions Logo" className="h-[46px] w-auto group-hover:scale-105 transition-transform duration-300" />
            </Link>
            <p className="text-gray-600 font-light text-lg leading-relaxed max-w-sm mb-6">
              Navigate your next in enterprise digital transformation globally.
            </p>
            <div className="flex space-x-6 text-infosys-blue">
              <a href="#" className="hover:text-black transition-colors duration-300"><Linkedin size={24} /></a>
              <a href="#" className="hover:text-black transition-colors duration-300"><Twitter size={24} /></a>
              <a href="#" className="hover:text-black transition-colors duration-300"><Facebook size={24} /></a>
              <a href="#" className="hover:text-black transition-colors duration-300"><Instagram size={24} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 text-gray-500 uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 font-bold text-sm">
              {['Navigate your next', 'About Us', 'Careers', 'Investors'].map((link) => (
                <li key={link} className="flex items-center gap-2 text-infosys-dark hover:text-infosys-blue cursor-pointer transition-colors duration-300">
                  <ArrowRight size={14} className="opacity-0 -ml-4 transition-all duration-300" />
                  <Link to={link === 'About Us' ? '/about' : '#'}>{link}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 text-gray-500 uppercase tracking-widest">Subsidiaries</h4>
            <ul className="space-y-4 font-bold text-sm">
              {['EdgeVerve Systems', 'Infosys BPM', 'Infosys Consulting', 'Infosys Public Services'].map((link) => (
                <li key={link} className="text-infosys-dark hover:text-infosys-blue cursor-pointer transition-colors duration-300">
                  {link.replace('Infosys', 'NSG')}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold mb-6 text-gray-500 uppercase tracking-widest">Programs</h4>
            <ul className="space-y-4 font-bold text-sm">
              {['Innovation Fund', 'Knowledge Institute', 'Springboard'].map((link) => (
                <li key={link} className="text-infosys-dark hover:text-infosys-blue cursor-pointer transition-colors duration-300">
                  {link}
                </li>
              ))}
            </ul>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs font-bold text-gray-500 tracking-widest uppercase">
          <p>Copyright &copy; {new Date().getFullYear()} NSG Solutions Ltd.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
             <span className="hover:text-infosys-blue cursor-pointer">Terms of Use</span>
             <span className="hover:text-infosys-blue cursor-pointer">Privacy Statement</span>
             <span className="hover:text-infosys-blue cursor-pointer">Cookie Policy</span>
             <span className="hover:text-infosys-blue cursor-pointer">Safe Harbour Provision</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
