import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, MapPin, Loader2, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await axios.post('/register', formData, { baseURL: '/' });
            // Automatically login after successful registration
            await login({ email: formData.email, password: formData.password });
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'فشل إنشاء الحساب. يرجى التأكد من البيانات المدخلة.');
        } finally {
            setLoading(false);
        }
    };

    const trustPoints = [
        "وصول فوري لأمهر الفنيين في مصر",
        "أسعار محددة وشفافة قبل الحجز",
        "ضمان 100% على كافة الخدمات",
        "دعم فني متاح على مدار الساعة"
    ];

    return (
        <div className="min-h-screen flex bg-white font-cairo" dir="rtl">
            {/* Right Side - Visual & Trust */}
            <div className="hidden lg:flex w-5/12 bg-gray-900 relative overflow-hidden items-center justify-center p-16">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                     <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[120px]" />
                </div>
                
                <div className="relative z-10 space-y-12">
                    <div className="space-y-6">
                        <motion.h2 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-5xl font-black text-white leading-tight"
                        >
                            انضم إلينا <br /> وسنعتني بمنزلك
                        </motion.h2>
                        <p className="text-xl text-gray-400 font-medium max-w-sm">
                            أكثر من 50,000 منزل يعتمدون علينا يومياً في كل احتياجاتهم.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {trustPoints.map((point, idx) => (
                            <motion.div 
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 * idx }}
                                className="flex items-center space-x-4 rtl:space-x-reverse"
                            >
                                <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500">
                                    <CheckCircle2 size={20} />
                                </div>
                                <span className="text-lg font-bold text-gray-200">{point}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-12 border-t border-gray-800">
                        <div className="text-white font-black text-2xl mb-2">SP</div>
                        <div className="text-gray-500 font-bold tracking-widest text-xs uppercase">Premium Services Platform</div>
                    </div>
                </div>
            </div>

            {/* Left Side - Form */}
            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:p-20 relative bg-slate-50/30">
                <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-gray-900 flex items-center space-x-2 rtl:space-x-reverse font-bold group">
                    <span className="order-2">العودة للرئيسية</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform order-1" />
                </Link>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full"
                >
                    <div className="mb-12">
                        <h1 className="text-4xl font-black text-gray-900 mb-4">إنشاء حساب جديد</h1>
                        <p className="text-gray-500 font-medium text-lg">يسعدنا انضمامك إلى مجتمعنا المتنامي</p>
                    </div>
                    
                    {error && (
                        <div className="mb-8 bg-red-50 text-red-600 p-5 rounded-[2rem] flex items-center space-x-3 rtl:space-x-reverse text-sm font-black border border-red-100 shadow-sm">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form className="grid sm:grid-cols-2 gap-8" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <InputField label="الاسم الكامل" name="name" icon={<User size={20} />} placeholder="أحمد علي" value={formData.name} onChange={handleChange} />
                            <InputField label="البريد الإلكتروني" name="email" type="email" icon={<Mail size={20} />} placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                            <InputField label="رقم الهاتف" name="phone" icon={<Phone size={20} />} placeholder="01xxxxxxxxx" value={formData.phone} onChange={handleChange} />
                        </div>

                        <div className="space-y-4">
                            <InputField label="كلمة المرور" name="password" type="password" icon={<Lock size={20} />} placeholder="••••••••" value={formData.password} onChange={handleChange} />
                            <InputField label="تأكيد كلمة المرور" name="password_confirmation" type="password" icon={<Lock size={20} />} placeholder="••••••••" value={formData.password_confirmation} onChange={handleChange} />
                            <InputField label="العنوان" name="address" icon={<MapPin size={20} />} placeholder="القاهرة، المعادي" value={formData.address} onChange={handleChange} />
                        </div>

                        <div className="sm:col-span-2 pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-5 px-6 border border-transparent rounded-[2rem] text-white bg-blue-600 hover:bg-blue-700 transition-all font-black text-xl shadow-[0_20px_50px_rgba(37,99,235,0.2)] hover:shadow-[0_25px_60px_rgba(37,99,235,0.3)] active:scale-95 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin h-7 w-7" /> : 'إنشاء الحساب الآن'}
                            </button>
                            
                            <p className="text-center mt-10 text-gray-500 font-bold">
                                لديك حساب بالفعل؟{' '}
                                <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-8">
                                    سجل دخولك من هنا
                                </Link>
                            </p>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    );
};

const InputField = ({ label, name, type = "text", icon, placeholder, value, onChange }) => (
    <div>
        <label className="text-xs font-black text-gray-500 block mb-3 uppercase tracking-widest mr-2">{label}</label>
        <div className="relative group">
            <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
                {icon}
            </span>
            <input
                name={name}
                type={type}
                required
                className="block w-full pr-14 pl-6 py-5 border-2 border-gray-100 rounded-[2rem] text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-all font-bold text-lg bg-white shadow-sm"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

export default Register;
