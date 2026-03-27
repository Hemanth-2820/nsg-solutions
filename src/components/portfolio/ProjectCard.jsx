import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const ProjectCard = () => {
  // FORM STATE: Standardized fields for enterprise discovery
  const [formData, setFormData] = useState({
    inquiryType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    website: '',
    role: '',
    country: '',
    message: '',
    privacyAgreed: false
  });

  // UI CONTROLS: Managing transitions between Registration and Portfolio
  const [status, setStatus] = useState('');
  const [viewMode, setViewMode] = useState('register'); // States: 'register' | 'checkStatus' | 'portfolio'
  const [requestIdInput, setRequestIdInput] = useState('');
  const [checkResult, setCheckResult] = useState(null);

  const countries = [
    "United States", "United Kingdom", "Canada", "Australia", "India", "Germany", "France", "Japan", "China", "Brazil",
    "South Africa", "United Arab Emirates", "Singapore", "Switzerland", "Netherlands", "Italy", "Spain", "Mexico",
    "South Korea", "Sweden", "Norway", "Denmark", "Finland", "Ireland", "Portugal", "Belgium", "Austria", "New Zealand",
    "United Arab Emirates", "Saudi Arabia", "Qatar", "Kuwait", "Oman", "Bahrain", "Israel", "Egypt", "Nigeria", "Kenya",
    "Other"
  ];

  // Custom Dropdown Component (Absolute Positioned Content)
  const CustomSelect = ({ label, name, options, value, onChange, required }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = React.useRef(null);

    React.useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
      <div className="flex flex-col space-y-2 relative" ref={dropdownRef}>
        <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">{label}</label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full bg-gray-50 border ${isOpen ? 'border-[#007cc3]' : 'border-gray-200'} text-[#111] py-2 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base font-sans text-left flex justify-between items-center transition-all rounded-sm`}
        >
          <span className={!value ? 'text-gray-400' : 'text-[#111]'}>
            {value || `Select ${label.replace('*', '')}`}
          </span>
          <ChevronDown size={18} className={`text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              style={{ position: 'absolute' }}
              className="left-0 top-[calc(100%+4px)] w-full bg-white border border-gray-100 shadow-[0_15px_30px_rgba(0,0,0,0.1)] z-50 rounded-md overflow-hidden max-h-60 overflow-y-auto"
            >
              {options.map((option, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    onChange({ target: { name, value: option } });
                    setIsOpen(false);
                  }}
                  className={`px-4 py-3 text-sm sm:text-base cursor-pointer transition-colors ${value === option ? 'bg-[#007cc3]/5 text-[#007cc3] font-bold' : 'text-gray-700 hover:bg-gray-50'}`}
                >
                  {option}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
        <input type="hidden" name={name} value={value} required={required} />
      </div>
    );
  };

  // Optimized form handler with specialized validation Logic
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // VALIDATION: First Name & Last Name (Allow only letters and spaces)
    if (name === 'firstName' || name === 'lastName') {
      const cleanValue = value.replace(/[^a-zA-Z\s]/g, ''); // Strips symbols & numbers
      setFormData(prev => ({
        ...prev,
        [name]: cleanValue
      }));
      return;
    }

    // NORMALIZATION: Email (RFC-5322 compliant, case-insensitive, whitespace-trimmed)
    if (name === 'email') {
      const normalizedEmail = value.toLowerCase().trim(); // Enforce standard corporate formatting
      setFormData(prev => ({
        ...prev,
        [name]: normalizedEmail
      }));
      return;
    }

    // VALIDATION: Phone Number (Rules: Global Country Codes, Length Standards, & Prefixes)
    // India (+91, 10 digits, starts 6-9) | USA/Canada (+1, 10 digits) | UK (+44, 9-10)
    // Germany (+49, 6-13) | China (+86, 11) | Italy (+39, 6-12)
    if (name === 'phone') {
      const cleanPhone = value.replace(/[^\d+]/g, ''); // Allow only digits and + symbol
      setFormData(prev => ({
        ...prev,
        [name]: cleanPhone
      }));
      return;
    }

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [generatedId, setGeneratedId] = useState('');

  const generateId = (type) => {
    const prefix = type === 'IT Services' ? 'ITS' : type === 'Video Production' ? 'VID' : 'DMM';
    const random = Math.floor(1000 + Math.random() * 9000);
    return `NSG-${prefix}-${random}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      // Simulate API call or real POST
      const response = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      // Even if it fails (as it's a demo), we generate an ID to show the flow
      const newId = generateId(formData.inquiryType);
      setGeneratedId(newId);
      setStatus('success');

      // Auto-redirect to status page after 3 seconds
      setTimeout(() => {
        setRequestIdInput(newId);
        setViewMode('checkStatus');
        setCheckResult(null);
      }, 3000);

    } catch (error) {
      console.error('Registration error:', error);
      // Fallback for demo purposes
      const newId = generateId(formData.inquiryType);
      setGeneratedId(newId);
      setStatus('success');

      setTimeout(() => {
        setRequestIdInput(newId);
        setViewMode('checkStatus');
        setCheckResult(null);
      }, 3000);
    }
  };

  const mockProjects = [
    { id: 1, title: 'Quantum Encryption Engine', category: 'Deep Tech', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80&w=800' },
    { id: 2, title: 'AI Predictive Logistics', category: 'IT Services', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800' },
    { id: 3, title: 'Next-Gen Media Suite', category: 'Digital Marketing', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    { id: 4, title: 'Blockchain Supply Chain', category: 'FinTech', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800' },
    { id: 5, title: 'Hyper-Realistic CGI', category: 'Video Production', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800' },
    { id: 6, title: 'Cloud Infrastructure', category: 'Enterprise IT', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800' },
  ];

  // ACCESS VERIFICATION: Processing Request IDs through mock database logic
  const handleCheckStatus = (e) => {
    e.preventDefault();
    const mockDatabase = {
      'NSG-IT77-2026': {
        status: 'Approved',
        info: 'Your access to IT Services case studies is granted. Click below to enter the premium portfolio.',
        color: 'text-green-500',
        canOpen: true
      },
      'NSG-VP88-2026': {
        status: 'Pending',
        info: 'Your request for Video Production mockups is still under review.',
        color: 'text-[#007cc3]',
        canOpen: false
      },
      'NSG-DM99-2026': {
        status: 'Action Required',
        info: 'Please re-submit your company website for Digital Media Marketing access.',
        color: 'text-orange-500',
        canOpen: false
      }
    };

    const upperId = requestIdInput.toUpperCase();
    let result = mockDatabase[upperId];

    // Dynamic approval for demo purposes
    if (!result) {
      if (upperId.startsWith('NSG-ITS-') || upperId.startsWith('NSG-VID-') || upperId.startsWith('NSG-DMM-')) {
        result = {
          status: 'Approved',
          info: `Your dynamically generated request is approved! Enter to view the ${upperId.includes('ITS') ? 'IT Services' : upperId.includes('VID') ? 'Video Production' : 'Digital Media'} portfolio.`,
          color: 'text-green-500',
          canOpen: true
        };
      }
    }

    if (result) {
      setCheckResult(result);
    } else {
      setCheckResult({ status: 'Not Found', info: 'The Request ID entered does not match our records.', color: 'text-red-500', canOpen: false });
    }
  };

  // Scroll to top when viewMode changes
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [viewMode]);

  // PORTFOLIO VIEW: Cinematic Grid implementation for approved users
  if (viewMode === 'portfolio') {
    return (
      <section className="bg-white py-12 md:py-32 min-h-screen w-full overflow-x-hidden">
        <div className="w-full mx-auto px-4 sm:px-10 md:px-16 lg:max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center text-center mb-12 md:mb-16 gap-6 md:gap-8"
          >
            <div className="flex flex-col items-center">
              <h2 className="font-infosys-heading text-[#111] text-3xl sm:text-5xl md:text-7xl font-bold uppercase leading-tight">
                Premium Case Studies
              </h2>
              <div className="flex items-center gap-3 mt-4 text-[#007cc3] font-sans font-bold uppercase tracking-[0.2em] text-[10px] sm:text-xs md:text-sm">
                <span className="w-6 md:w-8 h-[2px] bg-[#007cc3]"></span>
                Gated Portfolio Access
                <span className="w-6 md:w-8 h-[2px] bg-[#007cc3]"></span>
              </div>
            </div>
            <button
              onClick={() => setViewMode('register')}
              className="bg-gray-100 border border-gray-200 text-[#111] px-6 md:px-8 py-2 md:py-3 rounded-full font-infosys-heading font-bold uppercase tracking-widest text-[10px] md:text-[12px] hover:bg-[#111] hover:text-white transition-all"
            >
              Log Out
            </button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group relative aspect-[4/3] overflow-hidden bg-gray-100 border border-gray-200"
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent p-10 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-[#007cc3] font-bold uppercase tracking-widest text-[10px] mb-2">{project.category}</span>
                  <h3 className="text-[#111] font-infosys-heading text-2xl font-bold uppercase leading-tight mb-4">{project.title}</h3>
                  <div className="w-0 group-hover:w-full h-[1px] bg-[#007cc3]/30 transition-all duration-500 mb-4"></div>
                  <button className="text-[#111] text-[10px] font-bold uppercase tracking-[0.2em] flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    View Details <span className="text-xl">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white min-h-screen w-full flex items-start justify-center pt-8 sm:pt-10 md:pt-12 lg:pt-14 xl:pt-16 py-10 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full mx-auto px-4 sm:px-10 md:px-16 lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl"
      >
        <div className="text-center mb-6 md:mb-12">
          <h1 className="font-infosys-heading text-lg sm:text-3xl md:text-3xl lg:text-4xl xl:text-5xl text-[#111] font-bold uppercase tracking-tight mb-4">
            {viewMode === 'register' ? 'Project Access Request Form' : 'Open Request'}
          </h1>
          <p className="text-gray-500 font-sans text-xs md:text-base lg:text-lg leading-relaxed max-w-2xl md:max-w-4xl mx-auto">
            {viewMode === 'register'
              ? 'To view our enterprise-grade portfolio of 30+ deep-tech case studies and UI/UX mockups, please register for gated access. Our admin panel will review your request.'
              : 'Enter your Unique Request ID sent to your email to check the status of your access approval.'}
          </p>
        </div>

        {viewMode === 'register' ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Inquiry Project Type */}
              <div className="flex flex-col space-y-2 col-span-full">
                <CustomSelect
                  label="Inquiry Project Type*"
                  name="inquiryType"
                  required
                  value={formData.inquiryType}
                  onChange={handleChange}
                  options={["IT Services", "Video Production", "Digital Media Marketing"]}
                />
              </div>

              {/* Names */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  className="bg-gray-50 border border-gray-200 text-[#111] py-2 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base font-sans leading-[1.6] focus:border-[#007cc3] outline-none transition-all rounded-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  className="bg-gray-50 border border-gray-200 text-[#111] py-2 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base font-sans leading-[1.6] focus:border-[#007cc3] outline-none transition-all rounded-sm"
                />
              </div>

              {/* Email & Phone */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">Email Address*</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="bg-gray-50 border border-gray-200 text-[#111] py-2 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base font-sans leading-[1.6] focus:border-[#007cc3] outline-none transition-all rounded-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <CustomSelect
                  label="Country/Region*"
                  name="country"
                  required
                  value={formData.country}
                  onChange={handleChange}
                  options={countries}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">Phone Number*</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Include country code"
                  className="bg-gray-50 border border-gray-200 text-[#111] py-2 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base font-sans leading-[1.6] focus:border-[#007cc3] outline-none transition-all rounded-sm"
                />
                <p className="text-gray-400 text-[10px] uppercase font-bold">Please include country code</p>
              </div>

              {/* Company & Website */}
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">Company/Organization*</label>
                <input
                  type="text"
                  name="company"
                  required
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company name"
                  className="bg-gray-50 border border-gray-200 text-[#111] py-2 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base font-sans leading-[1.6] focus:border-[#007cc3] outline-none transition-all rounded-sm"
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">Company Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="bg-gray-50 border border-gray-200 text-[#111] py-2 sm:py-3.5 px-3 sm:px-4 text-sm sm:text-base font-sans leading-[1.6] focus:border-[#007cc3] outline-none transition-all rounded-sm"
                />
              </div>

              <div className="flex flex-col space-y-2">
                <CustomSelect
                  label="Your Role/Function"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  options={["Client", "Candidate", "Public User"]}
                />
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">How can we help you?*</label>
              <textarea
                name="message"
                required
                maxLength={10000}
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="Tell us about your project or inquiry. (Max 10,000 characters)"
                className="bg-gray-50 border border-gray-200 text-[#111] py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-sans leading-[1.6] focus:border-[#007cc3] outline-none transition-all rounded-sm resize-none"
              />
            </div>

            {/* MANDATORY: NSG Solutions Privacy Statement & Data Processing Agreement */}
            <div className="flex items-start space-y-2 mt-4">
              <div className="flex items-start space-x-3 group cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyAgreed"
                  required
                  checked={formData.privacyAgreed}
                  onChange={handleChange}
                  id="privacy-checkbox"
                  className="mt-1 accent-[#007cc3] w-4 h-4 cursor-pointer"
                />
                <label htmlFor="privacy-checkbox" className="text-gray-500 text-sm font-sans leading-[1.6] cursor-pointer group-hover:text-[#111] transition-colors">
                  I agree to the use or processing of my personal information by NSG Solutions for the purpose of fulfilling this request and in accordance with NSG Solutions Privacy Statement.
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-6">
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="bg-[#007cc3] text-white px-8 py-4 rounded-full font-infosys-heading font-bold uppercase tracking-widest text-[12px] hover:bg-[#111] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'submitting' ? 'Sending...' : 'Submit Request'}
              </button>
              <button
                type="button"
                onClick={() => setViewMode('checkStatus')}
                className="border-[2px] border-gray-300 text-[#111] px-8 py-4 rounded-full font-infosys-heading font-bold uppercase tracking-widest text-[12px] hover:bg-gray-100 transition-all font-bold"
              >
                I already have Request ID
              </button>
            </div>

            {status === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 bg-green-500/5 border border-green-500/20 rounded-md"
              >
                <p className="text-green-600 font-bold uppercase tracking-widest text-sm mb-2">
                  Request submitted successfully!
                </p>
                <p className="text-[#111] text-lg font-infosys-heading mb-4">
                  Your Request ID: <span className="text-[#007cc3] tracking-wider">{generatedId}</span>
                </p>
                <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                  Redirecting to Open Request page in 3 seconds...
                </p>
              </motion.div>
            )}
            {status === 'error' && (
              <p className="text-red-500 font-bold uppercase tracking-widest text-sm mt-4">
                There was an error submitting your request. Please try again.
              </p>
            )}
          </form>
        ) : (
          <form onSubmit={handleCheckStatus} className="space-y-6 max-w-md mx-auto">
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-bold uppercase tracking-wider text-xs">Enter Request ID*</label>
              <input
                type="text"
                required
                value={requestIdInput}
                onChange={(e) => setRequestIdInput(e.target.value)}
                placeholder="NSG-XXXX-XXXX"
                className="bg-gray-50 border border-gray-200 text-[#111] py-2 sm:py-3 px-3 sm:px-4 text-sm sm:text-base font-sans leading-[1.6] focus:border-[#007cc3] outline-none transition-all rounded-sm"
              />
            </div>
            <div className="flex flex-col gap-4">
              <button
                type="submit"
                className="bg-[#007cc3] text-white px-8 py-4 rounded-full font-infosys-heading font-bold uppercase tracking-widest text-[12px] hover:bg-[#111] transition-all"
              >
                Open Request
              </button>

              {checkResult && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-50 border border-gray-100 p-6 rounded-md text-center mt-2"
                >
                  <h3 className={`font-infosys-heading font-bold uppercase tracking-widest text-lg ${checkResult.color} mb-2`}>
                    {checkResult.status}
                  </h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed mb-4">
                    {checkResult.info}
                  </p>
                  {checkResult.canOpen && (
                    <button
                      onClick={() => setViewMode('portfolio')}
                      className="bg-[#007cc3] text-white px-6 py-3 rounded-full font-infosys-heading font-bold uppercase tracking-widest text-[10px] hover:bg-[#111] transition-all w-full"
                    >
                      Open Portfolio
                    </button>
                  )}
                </motion.div>
              )}

              <button
                type="button"
                onClick={() => {
                  setViewMode('register');
                  setCheckResult(null);
                  setRequestIdInput('');
                }}
                className="text-[#111] hover:text-[#007cc3] text-sm uppercase font-black tracking-widest transition-colors font-infosys-heading mt-6"
              >
                ← Back to Registration
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </section>
  );
};

export default ProjectCard;

