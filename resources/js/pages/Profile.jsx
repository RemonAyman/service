import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { 
    User as UserIcon, Mail, Phone, MapPin, Lock, 
    Loader2, Camera, ShieldCheck, Check,
    Briefcase, DollarSign, Quote, Eye, EyeOff, Clock
} from 'lucide-react';

const Profile = () => {
    const { user, checkUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); // Added showPassword
    const [categories, setCategories] = useState([]); // Added categories
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        role: '', // Added role
        category_id: '', // Added category_id
        password: '',
        password_confirmation: '',
        // Technician fields
        bio: '',
        hourly_rate: '',
        city: '',
        experience_years: '',
        availability: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                role: user.role || 'user',
                category_id: user.technician?.category_id || '',
                bio: user.technician?.bio || '',
                hourly_rate: user.technician?.hourly_rate || '',
                city: user.technician?.city || '',
                experience_years: user.technician?.experience_years || '',
                availability: user.technician?.availability || '',
            });
        }
    }, [user]);

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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // Update User Profile
            await axios.post('/profile/update', formData);
            
            // If technician, also update technician profile via a separate call or unified one
            // Assuming /profile/update handles both if role is technician in the backend
            // Let's check UserController.php
            
            await checkUser();
            toast.success('تم تحديث بيانات ملفك الشخصي بنجاح');
            setFormData({ ...formData, password: '', password_confirmation: '' });
        } catch (err) {
            const message = err.response?.data?.message || 'فشل تحديث البيانات. يرجى مراجعة المدخلات.';
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-16 font-cairo" dir="rtl">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden"
            >
                {/* Header / Banner */}
                <div className="h-48 bg-gradient-to-r from-blue-600 to-indigo-700 relative">
                    <div className="absolute -bottom-16 right-12 flex items-end space-x-6 rtl:space-x-reverse">
                        <div className="relative group">
                            <div className="w-32 h-32 rounded-[2.5rem] bg-white p-2 shadow-2xl border-4 border-white overflow-hidden">
                                <div className="w-full h-full bg-blue-50 flex items-center justify-center text-blue-600 text-4xl font-black">
                                    {user.name.charAt(0)}
                                </div>
                            </div>
                        </div>
                        <div className="pb-4 text-white">
                            <h1 className="text-3xl font-black drop-shadow-md">{user.name}</h1>
                            <div className="flex items-center space-x-2 rtl:space-x-reverse opacity-80 font-bold">
                                <span className="bg-white/20 px-3 py-1 rounded-lg text-xs uppercase tracking-wider">
                                    {user.role === 'technician' ? 'فني محترف' : 'عميل'}
                                </span>
                                <span>{user.email}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-24 px-12 pb-16">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Essential Info Section */}
                        <section>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                <h2 className="text-xl font-black text-gray-900">المعلومات الشخصية</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <ProfileInput label="الاسم الكامل" name="name" icon={<UserIcon size={18} />} value={formData.name} onChange={handleChange} />
                                <ProfileInput label="البريد الإلكتروني" name="email" type="email" icon={<Mail size={18} />} value={formData.email} onChange={handleChange} disabled />
                                <ProfileInput label="رقم الهاتف" name="phone" icon={<Phone size={18} />} value={formData.phone} onChange={handleChange} />
                                <ProfileInput label="العنوان" name="address" icon={<MapPin size={18} />} value={formData.address} onChange={handleChange} />
                                <div className="space-y-3 md:col-span-2">
                                    <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-1">نوع الحساب</label>
                                    <div className="flex items-center space-x-3 rtl:space-x-reverse bg-blue-50/50 p-4 rounded-2xl border border-blue-100 w-full max-w-sm">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                                            {user.role === 'admin' ? <ShieldCheck size={20} /> : user.role === 'technician' ? <Briefcase size={20} /> : <UserIcon size={20} />}
                                        </div>
                                        <div>
                                            <div className="text-blue-900 font-black text-sm">
                                                {user.role === 'admin' ? 'حساب مدير النظام' : user.role === 'technician' ? 'حساب فني محترف' : 'حساب عميل'}
                                            </div>
                                            <div className="text-blue-600 text-[10px] font-bold">
                                                {user.role === 'admin' ? 'صلاحيات كاملة لإدارة المنصة' : user.role === 'technician' ? 'يمكنك إدارة بيانات عملك وتلقي الطلبات' : 'يمكنك حجز الخدمات وتقييم الفنيين'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {formData.role === 'technician' && (
                            <>
                                <div className="h-px bg-gray-100" />
                                <section>
                                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                                        <div className="w-1.5 h-6 bg-green-600 rounded-full" />
                                        <h2 className="text-xl font-black text-gray-900">بيانات العمل</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-3 md:col-span-2">
                                            <label className="text-xs font-black text-gray-500 block mb-3 uppercase tracking-widest mr-1">نوع الخدمة (القسم)</label>
                                            <div className="relative group">
                                                <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                                                    <Briefcase size={18} />
                                                </span>
                                                <select
                                                    name="category_id"
                                                    required={formData.role === 'technician'}
                                                    className="block w-full pr-14 pl-6 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 focus:outline-none focus:border-blue-600 transition-all font-bold bg-white appearance-none"
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
                                        <ProfileInput label="المدينة" name="city" icon={<MapPin size={18} />} value={formData.city} onChange={handleChange} />
                                        <ProfileInput label="سعر الساعة" name="hourly_rate" icon={<DollarSign size={18} />} value={formData.hourly_rate} onChange={handleChange} />
                                        <ProfileInput label="سنوات الخبرة" name="experience_years" type="number" icon={<Briefcase size={18} />} value={formData.experience_years} onChange={handleChange} />
                                        <ProfileInput label="طبيعة التواجد (مثلاً: يومياً 9ص - 5م)" name="availability" icon={<Clock size={18} />} value={formData.availability} onChange={handleChange} />
                                        <div className="md:col-span-2">
                                            <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-1 mb-3 block">النبذة الشخصية (Bio)</label>
                                            <div className="relative group">
                                                <span className="absolute top-4 right-5 text-gray-400 group-focus-within:text-blue-600 transition-colors">
                                                    <Quote size={18} />
                                                </span>
                                                <textarea
                                                    name="bio"
                                                    rows="4"
                                                    className="block w-full pr-14 pl-6 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-all font-bold bg-white"
                                                    value={formData.bio}
                                                    onChange={handleChange}
                                                    placeholder="أخبر العملاء عن خبراتك..."
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </>
                        )}

                        <div className="h-px bg-gray-100" />

                        {/* Password Section */}
                        <section>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                                <div className="w-1.5 h-6 bg-indigo-600 rounded-full" />
                                <h2 className="text-xl font-black text-gray-900">تغيير كلمة المرور</h2>
                                <span className="text-xs font-bold text-gray-400 mr-2">(اتركه فارغاً إذا كنت لا ترغب في التغيير)</span>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <ProfileInput 
                                    label="كلمة المرور الجديدة" 
                                    name="password" 
                                    type={showPassword ? "text" : "password"} 
                                    icon={<Lock size={18} />} 
                                    placeholder="••••••••" 
                                    value={formData.password} 
                                    onChange={handleChange} 
                                    hasToggle={true}
                                    showPassword={showPassword}
                                    onToggle={() => setShowPassword(!showPassword)}
                                />
                                <ProfileInput 
                                    label="تأكيد كلمة المرور" 
                                    name="password_confirmation" 
                                    type={showPassword ? "text" : "password"} 
                                    icon={<Lock size={18} />} 
                                    placeholder="••••••••" 
                                    value={formData.password_confirmation} 
                                    onChange={handleChange} 
                                    hasToggle={true}
                                    showPassword={showPassword}
                                    onToggle={() => setShowPassword(!showPassword)}
                                />
                            </div>
                        </section>

                        {/* Footer / Submit */}
                        <div className="flex items-center justify-between pt-8 border-t border-gray-50 mt-12">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-blue-600">
                                <ShieldCheck size={20} />
                                <span className="text-sm font-bold">بياناتك محمية ومشفره بالكامل</span>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-600 text-white px-12 py-4 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 flex items-center space-x-3 rtl:space-x-reverse active:scale-95 disabled:opacity-70"
                            >
                                {loading ? <Loader2 className="animate-spin h-6 w-6" /> : (
                                    <>
                                        <span>حفظ التغييرات</span>
                                        <Check size={20} />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

const ProfileInput = ({ label, name, type = "text", icon, value, onChange, placeholder, disabled = false, hasToggle = false, showPassword = false, onToggle }) => (
    <div className="space-y-3">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-1">{label}</label>
        <div className="relative group">
            <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors pointer-events-none">
                {icon}
            </span>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`block w-full pr-14 ${hasToggle ? 'pl-14' : 'pl-6'} py-4 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-all font-bold ${disabled ? 'bg-gray-50' : 'bg-white'}`}
                value={value}
                onChange={onChange}
            />
            {hasToggle && (
                <button
                    type="button"
                    onClick={onToggle}
                    className="absolute inset-y-0 left-0 pl-5 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            )}
        </div>
    </div>
);

export default Profile;
