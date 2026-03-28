import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Mail, ArrowRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminLoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/login.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, role: 'admin' })
            });

            const data = await response.json();

            if (data.status === 'success') {
                localStorage.setItem('nsg_admin_user', JSON.stringify(data.user));
                navigate('/admin-portal');
            } else {
                setError(data.message || 'Access Denied');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Server connection failed. If you moved the backend to cPanel, please check your database connection strings.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-6 font-sans overflow-hidden relative">
            
            {/* Ambient Background Elements */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-[#38bdf8]/5 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#818cf8]/5 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="p-4 bg-gradient-to-br from-[#38bdf8] to-[#818cf8] rounded-2xl text-[#0f172a] shadow-2xl shadow-blue-500/20 mb-6">
                        <Shield size={32} />
                    </div>
                    <h1 className="text-2xl font-bold uppercase tracking-[0.3em] text-white">Command Center</h1>
                    <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                         <Activity size={12} className="text-[#38bdf8]" /> Secure Admin Protocol Enabled
                    </p>
                </div>

                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-white/60 font-bold uppercase tracking-widest text-[10px] pl-2">Admin Email</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38bdf8] transition-colors" size={20} />
                                <input 
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-14 pr-4 outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all text-white placeholder:text-white/10"
                                    placeholder="admin@nsgsolutions.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-white/60 font-bold uppercase tracking-widest text-[10px] pl-2">Security Credential</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#38bdf8] transition-colors" size={20} />
                                <input 
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/[0.03] border border-white/10 rounded-xl py-4 pl-14 pr-4 outline-none focus:border-[#38bdf8] focus:ring-1 focus:ring-[#38bdf8] transition-all text-white placeholder:text-white/10"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-xs font-bold uppercase tracking-widest text-center"
                            >
                                {error}
                            </motion.div>
                        )}

                        <button 
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-[#38bdf8] to-[#818cf8] text-[#0f172a] font-black uppercase tracking-[0.15em] py-5 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-blue-500/10 flex items-center justify-center gap-3"
                        >
                            {loading ? 'Authenticating...' : 'Enter Dashboard'} <ArrowRight size={20} />
                        </button>
                    </form>

                    <div className="mt-10 pt-8 border-t border-white/5 text-center">
                        <button 
                            onClick={() => navigate('/')} 
                            className="text-white/30 hover:text-white text-[10px] font-bold uppercase tracking-widest transition-colors"
                        >
                            ← Return to Public Terminal
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default AdminLoginPage;
