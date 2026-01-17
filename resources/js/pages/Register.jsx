import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Lock, Phone, MapPin, Loader2, AlertCircle, ArrowRight, CheckCircle2, Briefcase, Clock, Calendar, Quote, Eye, EyeOff } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
        phone: '',
        address: '',
        role: 'user', // default role
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
    const [showPassword, setShowPassword] = useState(false); // Added showPassword
    
    const { login } = useAuth();
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
            // Automatically login after successful registration
            await login({ email: formData.email, password: formData.password });
            navigate('/');
        } catch (err) {
            console.error('Registration error:', err.response?.data);
            
            // Handle validation errors
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
            <div className="w-full lg:w-7/12 flex items-center justify-center p-8 sm:p-12 lg:py-20 lg:px-12 relative bg-slate-50/30">
                <Link to="/" className="absolute top-8 left-8 text-gray-400 hover:text-gray-900 flex items-center space-x-2 rtl:space-x-reverse font-bold group">
                    <span className="order-2">العودة للرئيسية</span>
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform order-1" />
                </Link>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-2xl w-full"
                >
                    <div className="mb-10 text-center sm:text-right">
                        <h1 className="text-4xl font-black text-gray-900 mb-4">إنشاء حساب جديد</h1>
                        <p className="text-gray-500 font-medium text-lg">يسعدنا انضمامك إلى مجتمعنا المتنامي</p>
                    </div>

                    {/* Role Selection */}
                    <div className="flex bg-gray-100 p-1.5 rounded-[2rem] mb-10 w-full max-w-md mx-auto sm:mx-0">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'user' })}
                            className={`flex-1 py-3 px-6 rounded-[1.8rem] font-black text-sm transition-all ${
                                formData.role === 'user' 
                                    ? 'bg-white text-blue-600 shadow-sm' 
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            أنا عميل
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, role: 'technician' })}
                            className={`flex-1 py-3 px-6 rounded-[1.8rem] font-black text-sm transition-all ${
                                formData.role === 'technician' 
                                    ? 'bg-blue-600 text-white shadow-lg' 
                                    : 'text-gray-500 hover:text-gray-900'
                            }`}
                        >
                            أنا فني (مقدم خدمة)
                        </button>
                    </div>
                    
                    {error && (
                        <div className="mb-8 bg-red-50 text-red-600 p-5 rounded-[2rem] flex items-center space-x-3 rtl:space-x-reverse text-sm font-black border border-red-100 shadow-sm">
                            <AlertCircle className="h-5 w-5 shrink-0" />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <InputField label="الاسم الكامل" name="name" icon={<User size={20} />} placeholder="أحمد علي" value={formData.name} onChange={handleChange} />
                                <InputField label="البريد الإلكتروني" name="email" type="email" icon={<Mail size={20} />} placeholder="name@example.com" value={formData.email} onChange={handleChange} />
                                <InputField label="رقم الهاتف" name="phone" icon={<Phone size={20} />} placeholder="01xxxxxxxxx" value={formData.phone} onChange={handleChange} />
                            </div>

                            <div className="space-y-4">
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
                                <InputField label="العنوان" name="address" icon={<MapPin size={20} />} placeholder="القاهرة، المعادي" value={formData.address} onChange={handleChange} />
                            </div>
                        </div>

                        {/* Technician Extra Fields */}
                        <AnimatePresence>
                            {formData.role === 'technician' && (
                                <motion.div 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-10 mb-6 border-t border-gray-100 mt-10">
                                        <h3 className="text-xl font-black text-gray-900 mb-2">بيانات العمل الاحترافية</h3>
                                        <p className="text-gray-500 text-sm font-medium">ساعدنا العميل يوصلك بسهولة</p>
                                    </div>
                                    
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="text-xs font-black text-gray-500 block mb-3 uppercase tracking-widest mr-2">نوع الخدمة (القسم)</label>
                                            <div className="relative group">
                                                <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                                                    <Briefcase size={20} />
                                                </span>
                                                <select
                                                    name="category_id"
                                                    required={formData.role === 'technician'}
                                                    className="block w-full pr-14 pl-6 py-5 border-2 border-gray-100 rounded-[2rem] text-gray-900 focus:outline-none focus:border-blue-600 transition-all font-bold text-lg bg-white shadow-sm appearance-none"
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

                                        <InputField label="المدينة" name="city" icon={<MapPin size={20} />} placeholder="القاهرة" value={formData.city} onChange={handleChange} required={formData.role === 'technician'} />
                                        
                                        <InputField label="سعر الساعة (ج.م)" name="hourly_rate" type="number" icon={<Clock size={20} />} placeholder="150" value={formData.hourly_rate} onChange={handleChange} required={formData.role === 'technician'} />
                                        
                                        <InputField label="سنوات الخبرة" name="experience_years" type="number" icon={<Briefcase size={20} />} placeholder="5" value={formData.experience_years} onChange={handleChange} required={formData.role === 'technician'} />
                                        
                                        <div className="sm:col-span-2">
                                            <InputField label="نبذة عن خبرتك" name="bio" icon={<Quote size={20} />} placeholder="تكلم باختصار عن شغلك وخبرتك للعملاء..." value={formData.bio} onChange={handleChange} />
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label className="text-xs font-black text-gray-500 block mb-4 uppercase tracking-widest mr-2">أيام العمل المتاحة</label>
                                            <div className="flex flex-wrap gap-3">
                                                {days.map((day) => (
                                                    <button
                                                        key={day.value}
                                                        type="button"
                                                        onClick={() => handleCheckboxChange(day.value)}
                                                        className={`px-5 py-3 rounded-full text-sm font-black transition-all border-2 ${
                                                            formData.availability.includes(day.value)
                                                                ? 'bg-blue-600 border-blue-600 text-white shadow-md'
                                                                : 'bg-white border-gray-100 text-gray-500 hover:border-blue-200'
                                                        }`}
                                                    >
                                                        {day.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div className="pt-10">
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

const InputField = ({ label, name, type = "text", icon, placeholder, value, onChange, required = true, hasToggle = false, showPassword = false, onToggle }) => (
    <div>
        <label className="text-xs font-black text-gray-500 block mb-3 uppercase tracking-widest mr-2">{label}</label>
        <div className="relative group">
            <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                {icon}
            </span>
            <input
                name={name}
                type={type}
                required={required}
                className={`block w-full pr-14 ${hasToggle ? 'pl-14' : 'pl-6'} py-5 border-2 border-gray-100 rounded-[2rem] text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-all font-bold text-lg bg-white shadow-sm`}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
            {hasToggle && (
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute inset-y-0 left-0 pl-5 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            )}
        </div>
    </div>
);

export default Register;
