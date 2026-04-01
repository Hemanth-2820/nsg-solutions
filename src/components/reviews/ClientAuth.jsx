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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    try {
      const res = await fetch('/api/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role: 'client' })
      });

      const data = await res.json();

      if (data.status === 'success') {
        localStorage.setItem('nsg_client_user', JSON.stringify(data.user));
        navigate('/submit-review');
      } else {
        setMessage({ type: 'error', text: data.message || 'Invalid credentials' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Server error' });
    }
  };

  const toggleMode = (mode) => {
    setIsLogin(mode);
    setMessage({ type: '', text: '' });
    setPassword('');
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 pt-28">

      {/* 🔥 FULL BACKGROUND */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#E0F2FE] via-white to-[#F8FAFC] -z-10"></div>

      {/* 🔥 CARD */}
      <motion.div
        className="
          w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2
          bg-white/80 backdrop-blur-xl
          rounded-3xl overflow-hidden
          shadow-[0_40px_120px_rgba(0,0,0,0.08)]
          border border-gray-200
        "
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >

        {/* LEFT SIDE */}
        <div className="relative hidden lg:block bg-black">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0"
            className="absolute inset-0 w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/40"></div>

          <div className="relative z-10 h-full flex flex-col justify-end p-12">
            <div className="flex gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="text-[#007cc3] fill-[#007cc3]" />
              ))}
            </div>

            <h2 className="text-4xl text-white font-bold mb-4">
              Premium IT <br />
              Solutions that <br />
              Transform <span className="text-[#5bb8e4]">Business.</span>
            </h2>

            <p className="text-white/70">
              Access your portal to manage projects and services.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="p-8 md:p-12 flex flex-col justify-center">

          <div className="max-w-md mx-auto w-full">

            <h4 className="text-xs uppercase font-bold text-[#007cc3] mb-3 flex items-center gap-2">
              <ShieldCheck size={16} /> Secure Client Portal
            </h4>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <motion.div key="login">
                  <h1 className="text-2xl font-bold mb-2">Welcome Back</h1>
                  <p className="text-gray-500 mb-6">Login to your dashboard</p>

                  <form onSubmit={handleLoginSubmit} className="space-y-4">

                    {/* EMAIL */}
                    <div className="relative">
                      <Mail className="absolute left-3 top-4 text-gray-400" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Corporate Email"
                        className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#007cc3]/20 outline-none"
                      />
                    </div>

                    {/* PASSWORD */}
                    <div className="relative">
                      <Lock className="absolute left-3 top-4 text-gray-400" />
                      <input
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="w-full pl-10 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#007cc3]/20 outline-none"
                      />
                    </div>

                    {message.text && (
                      <p className="text-sm text-center text-red-500">
                        {message.text}
                      </p>
                    )}

                    <button className="
                      w-full py-3 rounded-full text-white font-bold
                      bg-gradient-to-r from-[#007cc3] to-[#0ea5e9]
                      hover:scale-105 transition
                    ">
                      Sign In <ArrowRight className="inline ml-2" size={16} />
                    </button>
                  </form>

                  <p className="mt-6 text-sm text-center">
                    Don't have account?{" "}
                    <button onClick={() => toggleMode(false)} className="text-[#007cc3] font-bold">
                      Signup
                    </button>
                  </p>
                </motion.div>
              ) : (
                <motion.div key="signup">
                  <h1 className="text-2xl font-bold mb-2">Create Account</h1>

                  <form className="space-y-4">

                    <div className="relative">
                      <User className="absolute left-3 top-4 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-10 py-3 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Email"
                        className="w-full pl-10 py-3 rounded-xl border border-gray-200"
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-3 top-4 text-gray-400" />
                      <input
                        type="password"
                        placeholder="Password"
                        className="w-full pl-10 py-3 rounded-xl border border-gray-200"
                      />
                    </div>

                    <button className="
                      w-full py-3 rounded-full text-white font-bold
                      bg-gradient-to-r from-[#007cc3] to-[#0ea5e9]
                    ">
                      Create Account
                    </button>
                  </form>

                  <p className="mt-6 text-sm text-center">
                    Already have account?{" "}
                    <button onClick={() => toggleMode(true)} className="text-[#007cc3] font-bold">
                      Login
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