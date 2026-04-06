import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Linkedin, Instagram, ArrowRight } from 'lucide-react';
import logo from '../assets/logo.png';

const Footer = () => {
  return (
    <footer className="bg-infosys-gray text-infosys-dark pt-28 pb-12 snap-section flex flex-col justify-end border-t border-gray-200">
      <div className="max-w-[1600px] w-full mx-auto px-6 lg:px-12">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 border-b border-gray-300 pb-20">
          
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block mb-8 group">
              <img src={logo} alt="NSG Solutions Logo" className="h-[140px] md:h-[180px] w-auto group-hover:scale-105 transition-transform duration-300 brightness-[0.95]" />
            </Link>
            <p className="text-gray-600 font-light text-[1.1rem] leading-relaxed max-w-sm mb-8">
              Driving digital transformation and high-end creative solutions for enterprises globally. Engineered for scale, secured for the future.
            </p>
            <div className="flex space-x-6 text-[#007cc3]">
              <a href="https://www.linkedin.com/company/nsg-solutions/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-all duration-300 hover:-translate-y-1"><Linkedin size={26} /></a>
              <a href="https://www.youtube.com/@santhosh_official2" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-all duration-300 hover:-translate-y-1"><Youtube size={26} /></a>
              <a href="https://www.facebook.com/people/NSG-Solutions/61575743870267/" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-all duration-300 hover:-translate-y-1"><Facebook size={26} /></a>
              <a href="https://www.instagram.com/nsgsolutions?utm_source=qr&igsh=MTBuN21xdW96d3VieQ%3D%3D" target="_blank" rel="noopener noreferrer" className="hover:text-black transition-all duration-300 hover:-translate-y-1"><Instagram size={26} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-[12px] font-black mb-8 text-gray-500 uppercase tracking-[0.2em]">Explore</h4>
            <ul className="space-y-4 font-bold text-sm">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '/about' },
                { name: 'Blog', path: '/blog' },
                { name: 'Careers', path: '/careers' },
                { name: 'Contact Us', path: '/contact' }
              ].map((link) => (
                <li key={link.name} className="flex items-center text-infosys-dark hover:text-[#007cc3] cursor-pointer transition-all duration-300">
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-black mb-8 text-gray-500 uppercase tracking-[0.2em]">Our Services</h4>
            <ul className="space-y-4 font-bold text-sm">
              {[
                { name: 'IT Services', path: '/services/it' },
                { name: 'Video Production', path: '/services/creative' },
                { name: 'Digital Marketing', path: '/services/marketing' },
                { name: 'Branding & Design', path: '/services/branding' },
                { name: 'Publishing Solutions', path: 'https://nsgpublishers.com', external: true },
                { name: 'Enterprise Strategy', path: '/services/enterprise' }
              ].map((service) => (
                <li key={service.name} className="flex items-center text-infosys-dark hover:text-[#007cc3] cursor-pointer transition-all duration-300">
                  {service.external ? (
                    <a href={service.path} target="_blank" rel="noopener noreferrer">{service.name}</a>
                  ) : (
                    <Link to={service.path}>{service.name}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[12px] font-black mb-8 text-gray-500 uppercase tracking-[0.2em]">Quick Links</h4>
            <ul className="space-y-4 font-bold text-sm">
              {[
                { name: 'Client Login', path: '/client-login' },
                { name: 'Privacy Policy', path: '#' },
                { name: 'Support', path: '/contact' }
              ].map((item) => (
                <li key={item.name} className="text-infosys-dark hover:text-[#007cc3] cursor-pointer transition-all duration-300">
                  <Link to={item.path}>{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-[10px] font-black text-gray-400 tracking-[0.1em] uppercase">
          <p>Copyright &copy; {new Date().getFullYear()} NSG Solutions Ltd. All Rights Reserved.</p>
          <div className="flex gap-8 mt-6 md:mt-0">
             <span className="hover:text-[#007cc3] cursor-pointer transition-colors">Terms of Use</span>
             <span className="hover:text-[#007cc3] cursor-pointer transition-colors">Privacy Policy</span>
             <span className="hover:text-[#007cc3] cursor-pointer transition-colors">Cookie Policy</span>
             <span className="hover:text-[#007cc3] cursor-pointer transition-colors">Safe Harbour</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
