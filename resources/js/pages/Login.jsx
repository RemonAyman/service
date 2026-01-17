import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, Loader2, AlertCircle, ArrowLeft, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Added showPassword
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            const response = await login({ email, password });
            if (response.data.user?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'فشل تسجيل الدخول. يرجى التحقق من بياناتك.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-cairo" dir="rtl">
            {/* Left Side - Visual */}
            <div className="hidden lg:flex w-1/2 bg-blue-600 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
                </div>
                
                <div className="relative z-10 text-white space-y-8 max-w-lg">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl font-black leading-tight"
                    >
                        أهلاً بك <br /> في عالم الخدمات الاحترافية
                    </motion.h2>
                    <p className="text-xl text-blue-100 font-medium">
                        سجل دخولك الآن واستمتع بأسهل طريقة لإدارة خدمات منزلك مع ServicesPlatform.
                    </p>
                    <div className="pt-8">
                        <div className="flex -space-x-4 rtl:space-x-reverse mb-4">
                             {[1, 2, 3, 4, 5].map(i => (
                                <img key={i} className="w-12 h-12 rounded-full border-4 border-blue-600" src={`https://i.pravatar.cc/100?img=${i+45}`} alt="user" />
                            ))}
                        </div>
                        <div className="text-blue-100 font-bold">انضم لآلاف المستخدمين السعداء</div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 relative">
                <Link to="/" className="absolute top-8 right-8 text-gray-400 hover:text-gray-900 flex items-center space-x-2 rtl:space-x-reverse font-bold group">
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    <span>العودة للرئيسية</span>
                </Link>

                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full space-y-10"
                >
                    <div>
                        <h1 className="text-4xl font-black text-gray-900 mb-4">تسجيل الدخول</h1>
                        <p className="text-gray-500 font-medium text-lg">من الجيد رؤيتك مرة أخرى!</p>
                    </div>
                    
                    {error && (
                        <div className="bg-red-50 text-red-600 p-5 rounded-3xl flex items-center space-x-3 rtl:space-x-reverse text-sm font-bold border border-red-100 italic duration-300">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        <div className="space-y-6">
                            <div className="relative">
                                <label className="text-sm font-black text-gray-700 block mb-3 uppercase tracking-wider ml-1">البريد الإلكتروني</label>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                        <Mail className="h-5 w-5" />
                                    </span>
                                    <input
                                        type="email"
                                        required
                                        className="block w-full pr-14 pl-6 py-5 border-2 border-gray-100 rounded-[2rem] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 transition-all font-bold text-lg shadow-sm"
                                        placeholder="user@example.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <div className="flex justify-between items-center mb-3 ml-1">
                                    <label className="text-sm font-black text-gray-700 uppercase tracking-wider">كلمة المرور</label>
                                    <Link to="#" className="text-xs font-black text-blue-600 hover:underline">نسيت كلمة المرور؟</Link>
                                </div>
                                <div className="relative group">
                                    <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                                        <Lock className="h-5 w-5" />
                                    </span>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        className="block w-full pr-14 pl-14 py-5 border-2 border-gray-100 rounded-[2rem] text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600 transition-all font-bold text-lg shadow-sm"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 left-0 pl-5 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <input
                                id="remember-me"
                                type="checkbox"
                                className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-xl cursor-pointer"
                            />
                            <label htmlFor="remember-me" className="mr-3 block text-sm text-gray-500 font-bold cursor-pointer">
                                تذكرني على هذا الجهاز
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-5 px-6 border border-transparent rounded-[2rem] text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transition-all font-black text-xl shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.4)] active:scale-95 disabled:opacity-70"
                        >
                            {loading ? <Loader2 className="animate-spin h-7 w-7" /> : 'تسجيل الدخول'}
                        </button>
                    </form>

                    <div className="text-center pt-6">
                        <p className="text-gray-500 font-bold">
                            ليس لديك حساب بعد؟{' '}
                            <Link to="/register" className="text-blue-600 font-black hover:underline underline-offset-4">
                                قم بإنشاء حساب جديد
                            </Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;
