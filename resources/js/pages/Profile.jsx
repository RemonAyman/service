import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { 
    User as UserIcon, Mail, Phone, MapPin, Lock, 
    Loader2, Camera, ShieldCheck, Check,
    Briefcase, DollarSign, Quote
} from 'lucide-react';

const Profile = () => {
    const { user, checkUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: '',
        password_confirmation: '',
        // Technician fields
        bio: '',
        hourly_rate: '',
        city: '',
        experience_years: ''
    });

    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
                bio: user.technician?.bio || '',
                hourly_rate: user.technician?.hourly_rate || '',
                city: user.technician?.city || '',
                experience_years: user.technician?.experience_years || '',
            });
        }
    }, [user]);

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
                            </div>
                        </section>

                        {user.role === 'technician' && (
                            <>
                                <div className="h-px bg-gray-100" />
                                <section>
                                    <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                                        <div className="w-1.5 h-6 bg-green-600 rounded-full" />
                                        <h2 className="text-xl font-black text-gray-900">بيانات العمل</h2>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <ProfileInput label="المدينة" name="city" icon={<MapPin size={18} />} value={formData.city} onChange={handleChange} />
                                        <ProfileInput label="سعر الساعة" name="hourly_rate" icon={<DollarSign size={18} />} value={formData.hourly_rate} onChange={handleChange} />
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
                                <ProfileInput label="كلمة المرور الجديدة" name="password" type="password" icon={<Lock size={18} />} placeholder="••••••••" value={formData.password} onChange={handleChange} />
                                <ProfileInput label="تأكيد كلمة المرور" name="password_confirmation" type="password" icon={<Lock size={18} />} placeholder="••••••••" value={formData.password_confirmation} onChange={handleChange} />
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

const ProfileInput = ({ label, name, type = "text", icon, value, onChange, placeholder, disabled = false }) => (
    <div className="space-y-3">
        <label className="text-xs font-black text-gray-500 uppercase tracking-widest mr-1">{label}</label>
        <div className="relative group">
            <span className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 group-focus-within:text-blue-600 transition-colors">
                {icon}
            </span>
            <input
                name={name}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`block w-full pr-14 pl-6 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-all font-bold ${disabled ? 'bg-gray-50' : 'bg-white'}`}
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

export default Profile;
