import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, ShieldCheck, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function ClientAuth() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  const navigate = useNavigate();

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Check against localStorage or a demo credential
    const savedUser = JSON.parse(localStorage.getItem('nsg_client_user'));

    if ((savedUser && email === savedUser.email && password === savedUser.password) ||
      (email === 'demo@nsg.com' && password === 'demo123')) {
      navigate('/submit-review');
    } else {
      setMessage({ type: 'error', text: 'Invalid email or password. Please try again.' });
    }
  };

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Save to localStorage
    const newUser = { fullName, email, password };
    localStorage.setItem('nsg_client_user', JSON.stringify(newUser));

    // Switch to login 
    setIsLogin(true);
    setPassword('');
    setMessage({ type: 'success', text: 'Account created successfully! Please sign in.' });
  };

  const toggleMode = (mode) => {
    setIsLogin(mode);
    setMessage({ type: '', text: '' });
    setPassword('');
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? -20 : 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, x: isLogin ? 20 : -20, transition: { duration: 0.3 } }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4 sm:p-8 font-sans">
      <motion.div
        className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 bg-[#FFE5D9] rounded-3xl overflow-hidden shadow-2xl border border-gray-200"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Side: Visual / Brand Area */}
        <div className="relative hidden lg:block group overflow-hidden bg-black">
          {/* We use a placeholder premium abstract image or gradient block. In a real scenario, this would be an actual HD image src */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#007cc3]/20 via-[#111] to-[#813388]/20 z-0"></div>

          <div className="absolute inset-0 group-hover:scale-110 transition-transform duration-[1.5s] ease-out z-0">
            <img
              src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
              alt="Corporate Architecture"
              className="w-full h-full object-cover opacity-40 mix-blend-overlay"
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10"></div>

          <div className="relative z-20 h-full flex flex-col justify-end p-12 md:p-16">
            <div className="flex items-center gap-3 mb-6 mix-blend-screen text-white/50">
              <Star className="w-6 h-6 fill-[#007cc3] text-[#007cc3]" />
              <Star className="w-6 h-6 fill-[#007cc3] text-[#007cc3]" />
              <Star className="w-6 h-6 fill-[#007cc3] text-[#007cc3]" />
              <Star className="w-6 h-6 fill-[#007cc3] text-[#007cc3]" />
              <Star className="w-6 h-6 fill-[#007cc3] text-[#007cc3]" />
            </div>
            <h2 className="font-infosys-heading text-[2.5rem] lg:text-[3rem] text-white leading-tight mb-4">
              Premium IT <br /> Solutions that <br /> Transform <span className="text-[#5bb8e4]">Business.</span>
            </h2>
            <p className="text-white/70 max-w-md leading-[1.6]">
              Access your corporate portal to review services, manage active projects, and unlock new potential for your enterprise.
            </p>
          </div>
        </div>

        {/* Right Side: Form Area */}
        <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center relative bg-transparent">
          {/* decorative element */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#007cc3]/5 rounded-full blur-3xl rounded-tl-none pointer-events-none"></div>

          <div className="w-full max-w-md mx-auto relative z-10">
            <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#007cc3] mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" /> Secure Client Portal
            </h4>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div key="login" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                  <h1 className="font-infosys-heading text-[2rem] text-gray-900 mb-2">Welcome Back.</h1>
                  <p className="text-gray-600 text-sm mb-8 leading-[1.6]">Enter your corporate credentials to access your dashboard.</p>

                  <form className="space-y-5" onSubmit={handleLoginSubmit}>
                    <div className="space-y-4">
                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007cc3] transition-colors w-5 h-5" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Corporate Email"
                          className="w-full bg-white/60 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:border-[#007cc3] focus:ring-1 focus:ring-[#007cc3] outline-none transition-all hover:bg-white"
                        />
                      </div>

                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007cc3] transition-colors w-5 h-5" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Password"
                          className="w-full bg-white/60 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:border-[#007cc3] focus:ring-1 focus:ring-[#007cc3] outline-none transition-all hover:bg-white"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm py-2">
                      <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 transition-colors">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 bg-white text-[#007cc3] focus:ring-[#007cc3]" />
                        <span>Remember me</span>
                      </label>
                      <button type="button" className="text-[#007cc3] hover:text-[#005a8f] transition-colors font-semibold">Forgot Password?</button>
                    </div>

                    {message.text && (
                      <div className={`text-sm text-center py-2 font-semibold ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                        {message.text}
                      </div>
                    )}

                    <button className="w-full bg-[#007cc3] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-[#005a8f] transition-all flex items-center justify-center gap-3">
                      Sign In to Review Portal <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>

                  <p className="mt-8 text-center text-sm text-gray-600">
                    Don't have a client account?{' '}
                    <button onClick={() => toggleMode(false)} className="text-[#007cc3] hover:text-[#005a8f] transition-colors font-bold">
                      Request Access
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div key="signup" variants={formVariants} initial="hidden" animate="visible" exit="exit">
                  <h1 className="font-infosys-heading text-[2rem] text-gray-900 mb-2">Create Account.</h1>
                  <p className="text-gray-600 text-sm mb-8 leading-[1.6]">Partner with us and gain access to our premium suite of solutions.</p>

                  <form className="space-y-5" onSubmit={handleSignupSubmit}>
                    <div className="space-y-4">

                      <div className="relative group">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007cc3] transition-colors w-5 h-5" />
                        <input
                          type="text"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="Full Name"
                          className="w-full bg-white/60 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:border-[#007cc3] focus:ring-1 focus:ring-[#007cc3] outline-none transition-all hover:bg-white"
                        />
                      </div>

                      <div className="relative group">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007cc3] transition-colors w-5 h-5" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Corporate Email"
                          className="w-full bg-white/60 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:border-[#007cc3] focus:ring-1 focus:ring-[#007cc3] outline-none transition-all hover:bg-white"
                        />
                      </div>

                      <div className="relative group">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#007cc3] transition-colors w-5 h-5" />
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Create Password"
                          className="w-full bg-white/60 border border-gray-300 rounded-xl pl-12 pr-4 py-4 text-gray-900 placeholder-gray-500 focus:border-[#007cc3] focus:ring-1 focus:ring-[#007cc3] outline-none transition-all hover:bg-white"
                        />
                      </div>
                    </div>

                    {message.text && (
                      <div className={`text-sm text-center py-2 font-semibold ${message.type === 'error' ? 'text-red-500' : 'text-green-600'}`}>
                        {message.text}
                      </div>
                    )}

                    <button className="w-full bg-[#007cc3] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[12px] hover:bg-[#005a8f] transition-all flex items-center justify-center gap-3 mt-6">
                      Create Client Account <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-gray-500 text-xs text-center mt-4">
                      By registering, you agree to our corporate Terms of Service and Privacy Policy.
                    </p>
                  </form>

                  <p className="mt-8 text-center text-sm text-gray-600">
                    Already a registered client?{' '}
                    <button onClick={() => toggleMode(true)} className="text-[#007cc3] hover:text-[#005a8f] transition-colors font-bold">
                      Sign In
                    </button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
