import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, MapPin, Loader2, AlertCircle, ArrowRight, Eye, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterClient = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        role: 'user', // Hardcoded for client
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    // We only need checkUser to update the state, NOT login because backend logs us in
    const { checkUser } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            // Register - The backend automatically logs the user in after registration
            await axios.post('/register', formData, { baseURL: '/' });
            
            // Just update the context state to reflect the logged-in user
            await checkUser();
            
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err.response?.data);
            
            if (err.response?.data?.errors) {
                const errors = err.response.data.errors;
                const errorMessages = Object.values(errors).flat();
                setError(errorMessages.join(' • '));
            } else {
                setError(err.response?.data?.message || 'فشل إنشاء الحساب. يرجى التأكد من البيانات المدخلة.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white font-cairo" dir="rtl">
            {/* Visual Side */}
            <div className="hidden lg:flex w-5/12 bg-blue-900 relative overflow-hidden items-center justify-center p-16">
                 <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                     <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-white rounded-full blur-[120px]" />
                </div>
                
                <div className="relative z-10 space-y-8 text-center text-white">
                    <h2 className="text-4xl font-black leading-tight">
                        مرحباً بك في مجتمعنا
                    </h2>
                    <p className="text-blue-200 text-xl font-medium max-w-sm mx-auto">
                        سجل حسابك كعميل واستمتع بأسهل تجربة لطلب الخدمات المنزلية.
                    </p>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:py-20 lg:px-12 relative bg-slate-50/30">
                <Link to="/register" className="absolute top-8 left-8 text-gray-400 hover:text-gray-900 flex items-center space-x-2 rtl:space-x-reverse font-bold group">
                    <span className="order-2">العودة</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform order-1" />
                </Link>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full"
                >
                    <div className="mb-10 text-center sm:text-right">
                        <h1 className="text-3xl font-black text-gray-900 mb-4">تسجيل حساب عميل جديد</h1>
                        <p className="text-gray-500 font-medium">خطوة بسيطة تفصلك عن راحة بالك</p>
                    </div>
                    
                    {error && (
                        <div className="mb-8 bg-red-50 text-red-600 p-5 rounded-[2rem] flex items-center space-x-3 rtl:space-x-reverse text-sm font-black border border-red-100 shadow-sm">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <InputField label="الاسم الكامل" name="name" icon={<User size={20} />} placeholder="أحمد علي" value={formData.name} onChange={handleChange} />
                            <InputField label="البريد الإلكتروني" name="email" type="email" icon={<Mail size={20} />} placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                            <InputField label="رقم الهاتف" name="phone" icon={<Phone size={20} />} placeholder="01xxxxxxxxx" value={formData.phone} onChange={handleChange} />
                            <InputField label="العنوان" name="address" icon={<MapPin size={20} />} placeholder="القاهرة، المعادي" value={formData.address} onChange={handleChange} />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                             <InputField 
                                label="كلمة المرور" 
                                name="password" 
                                type={showPassword ? "text" : "password"} 
                                icon={<Lock size={20} />} 
                                placeholder="••••••••" 
                                value={formData.password} 
                                onChange={handleChange} 
                                hasToggle={true}
                                showPassword={showPassword}
                                onToggle={() => setShowPassword(!showPassword)}
                            />
                            <InputField 
                                label="تأكيد كلمة المرور" 
                                name="password_confirmation" 
                                type={showPassword ? "text" : "password"} 
                                icon={<Lock size={20} />} 
                                placeholder="••••••••" 
                                value={formData.password_confirmation} 
                                onChange={handleChange} 
                                hasToggle={true}
                                showPassword={showPassword}
                                onToggle={() => setShowPassword(!showPassword)}
                            />
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full flex justify-center py-4 px-6 border border-transparent rounded-[2rem] text-white bg-blue-600 hover:bg-blue-700 transition-all font-black text-lg shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin h-7 w-7" /> : 'إنشاء حساب عميل'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

const InputField = ({ label, name, type = "text", icon, placeholder, value, onChange, required = true, hasToggle = false, showPassword = false, onToggle }) => (
    <div>
        <label className="text-xs font-black text-gray-500 block mb-2 uppercase tracking-widest mr-2">{label}</label>
        <div className="relative group">
            <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                {icon}
            </span>
            <input
                name={name}
                type={type}
                required={required}
                className={`block w-full pr-12 ${hasToggle ? 'pl-12' : 'pl-4'} py-4 border-2 border-gray-100 rounded-[1.5rem] text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-all font-bold bg-white shadow-sm`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {hasToggle && (
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    </div>
);

export default RegisterClient;
