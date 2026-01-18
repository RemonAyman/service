import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, MapPin, Loader2, AlertCircle, ArrowRight, Briefcase, Clock, Quote, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const RegisterTechnician = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        role: 'technician',
        category_id: '',
        experience_years: '',
        hourly_rate: '',
        city: '',
        bio: '',
        availability: [],
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    
    // We only need checkUser to update the state, NOT login because backend logs us in
    const { checkUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('/api/cats', { baseURL: '/' });
                if (response.data.status === 200) {
                    setCategories(response.data.categories);
                }
            } catch (err) {
                console.error("فشل في تحميل الأقسام:", err);
            }
        };
        fetchCategories();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCheckboxChange = (day) => {
        const updatedAvailability = formData.availability.includes(day)
            ? formData.availability.filter(d => d !== day)
            : [...formData.availability, day];
        setFormData({ ...formData, availability: updatedAvailability });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await axios.post('/register', formData, { baseURL: '/' });
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

    const days = [
        { label: 'السبت', value: 'Saturday' },
        { label: 'الأحد', value: 'Sunday' },
        { label: 'الاثنين', value: 'Monday' },
        { label: 'الثلاثاء', value: 'Tuesday' },
        { label: 'الأربعاء', value: 'Wednesday' },
        { label: 'الخميس', value: 'Thursday' },
        { label: 'الجمعة', value: 'Friday' },
    ];

    return (
        <div className="min-h-screen flex bg-white font-cairo" dir="rtl">
            {/* Visual Side */}
            <div className="hidden lg:flex w-5/12 bg-purple-900 relative overflow-hidden items-center justify-center p-16">
                 <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                     <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] bg-white rounded-full blur-[120px]" />
                </div>
                
                <div className="relative z-10 space-y-8 text-center text-white">
                    <h2 className="text-4xl font-black leading-tight">
                        أهلاً بك شريكاً للنجاح
                    </h2>
                    <p className="text-purple-200 text-xl font-medium max-w-sm mx-auto">
                        انضم لنخبة مقدمي الخدمات وزد دخلك من خلال منصتنا.
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
                        <h1 className="text-3xl font-black text-gray-900 mb-4">تسجيل مقدم خدمة جديد</h1>
                        <p className="text-gray-500 font-medium">ابدأ رحلتك المهنية معنا اليوم</p>
                    </div>
                    
                    {error && (
                        <div className="mb-8 bg-red-50 text-red-600 p-5 rounded-[2rem] flex items-center space-x-3 rtl:space-x-reverse text-sm font-black border border-red-100 shadow-sm">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Section 1: Basic Info */}
                        <div className="space-y-6">
                            <h3 className="text-xl font-black text-gray-700 border-b border-gray-200 pb-2">1. المعلومات الشخصية</h3>
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
                        </div>

                        {/* Section 2: Professional Info */}
                         <div className="space-y-6">
                            <h3 className="text-xl font-black text-gray-700 border-b border-gray-200 pb-2">2. المعلومات المهنية</h3>
                             <div className="grid sm:grid-cols-2 gap-6">
                                <div>
                                    <label className="text-xs font-black text-gray-500 block mb-2 uppercase tracking-widest mr-2">نوع الخدمة (القسم)</label>
                                    <div className="relative group">
                                        <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 group-focus-within:text-purple-600 transition-colors pointer-events-none">
                                            <Briefcase size={20} />
                                        </span>
                                        <select
                                            name="category_id"
                                            required
                                            className="block w-full pr-12 pl-4 py-4 border-2 border-gray-100 rounded-[1.5rem] text-gray-900 focus:outline-none focus:border-purple-600 transition-all font-bold bg-white shadow-sm appearance-none"
                                            value={formData.category_id}
                                            onChange={handleChange}
                                        >
                                            <option value="">اختر القسم...</option>
                                            {categories.map((cat) => (
                                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <InputField label="المدينة التي تعمل بها" name="city" icon={<MapPin size={20} />} placeholder="القاهرة" value={formData.city} onChange={handleChange} required />
                                <InputField label="سعر الساعة (ج.م)" name="hourly_rate" type="number" icon={<Clock size={20} />} placeholder="150" value={formData.hourly_rate} onChange={handleChange} required />
                                <InputField label="سنوات الخبرة" name="experience_years" type="number" icon={<Briefcase size={20} />} placeholder="5" value={formData.experience_years} onChange={handleChange} required />
                                
                                <div className="sm:col-span-2">
                                    <InputField label="نبذة عن خبرتك" name="bio" icon={<Quote size={20} />} placeholder="تكلم باختصار عن شغلك وخبرتك للعملاء..." value={formData.bio} onChange={handleChange} />
                                </div>

                                <div className="sm:col-span-2">
                                    <label className="text-xs font-black text-gray-500 block mb-4 uppercase tracking-widest mr-2">أيام العمل المتاحة</label>
                                    <div className="flex flex-wrap gap-2">
                                        {days.map((day) => (
                                            <button
                                                key={day.value}
                                                type="button"
                                                onClick={() => handleCheckboxChange(day.value)}
                                                className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all border-2 ${
                                                    formData.availability.includes(day.value)
                                                        ? 'bg-purple-600 border-purple-600 text-white shadow-md'
                                                        : 'bg-white border-gray-100 text-gray-500 hover:border-purple-200'
                                                }`}
                                            >
                                                {day.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                disabled={loading}
                                className="group w-full flex justify-center py-4 px-6 border border-transparent rounded-[2rem] text-white bg-purple-600 hover:bg-purple-700 transition-all font-black text-lg shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin h-7 w-7" /> : 'إنشاء حساب مقدم خدمة'}
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
            <span className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 group-focus-within:text-purple-600 transition-colors pointer-events-none">
                {icon}
            </span>
            <input
                name={name}
                type={type}
                required={required}
                className={`block w-full pr-12 ${hasToggle ? 'pl-12' : 'pl-4'} py-4 border-2 border-gray-100 rounded-[1.5rem] text-gray-900 placeholder-gray-300 focus:outline-none focus:border-purple-600 transition-all font-bold bg-white shadow-sm`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
             {hasToggle && (
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 hover:text-purple-600 transition-colors"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    </div>
);

export default RegisterTechnician;
