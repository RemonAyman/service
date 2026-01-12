import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import { 
    User, Mail, Phone, MapPin, Lock, 
    Loader2, Camera, ShieldCheck, Check 
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
    });

    useEffect(() => {
        if (user) {
            setFormData({
                ...formData,
                name: user.name || '',
                email: user.email || '',
                phone: user.phone || '',
                address: user.address || '',
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
            await axios.post('/profile/update', formData);
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
                            <button className="absolute bottom-0 left-0 bg-gray-900 text-white p-2.5 rounded-2xl shadow-xl hover:bg-blue-600 transition-all border-4 border-white">
                                <Camera size={18} />
                            </button>
                        </div>
                        <div className="pb-4">
                            <h1 className="text-3xl font-black text-white drop-shadow-md">{user.name}</h1>
                            <p className="text-blue-100 font-bold opacity-80 mt-1">{user.email}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-24 px-12 pb-16">
                    <form onSubmit={handleSubmit} className="space-y-12">
                        {/* Essential Info Section */}
                        <section>
                            <div className="flex items-center space-x-3 rtl:space-x-reverse mb-8">
                                <div className="w-1.5 h-6 bg-blue-600 rounded-full" />
                                <h2 className="text-xl font-black text-gray-900">المعلومات الأساسية</h2>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                <ProfileInput label="الاسم الكامل" name="name" icon={<User size={18} />} value={formData.name} onChange={handleChange} />
                                <ProfileInput label="البريد الإلكتروني" name="email" type="email" icon={<Mail size={18} />} value={formData.email} onChange={handleChange} />
                                <ProfileInput label="رقم الهاتف" name="phone" icon={<Phone size={18} />} value={formData.phone} onChange={handleChange} />
                                <ProfileInput label="العنوان" name="address" icon={<MapPin size={18} />} value={formData.address} onChange={handleChange} />
                            </div>
                        </section>

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

const ProfileInput = ({ label, name, type = "text", icon, value, onChange, placeholder }) => (
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
                className="block w-full pr-14 pl-6 py-4 border-2 border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:border-blue-600 transition-all font-bold bg-white"
                value={value}
                onChange={onChange}
            />
        </div>
    </div>
);

export default Profile;
