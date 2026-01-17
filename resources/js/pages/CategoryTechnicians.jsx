import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Star, MapPin, Briefcase, Clock, Phone, 
    ArrowRight, Loader2, AlertCircle, Calendar,
    User, ShieldCheck, Zap
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CategoryTechnicians = () => {
    const { categoryId } = useParams();
    const { user } = useAuth();
    const [technicians, setTechnicians] = useState([]);
    const [category, setCategory] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch Category Details
                const catRes = await axios.get(`/api/catone/${categoryId}`, { baseURL: '/' });
                if (catRes.data.status === 200) {
                    setCategory(catRes.data.category);
                }

                // Fetch Technicians for this category
                const techRes = await axios.get(`/api/techs?category_id=${categoryId}`, { baseURL: '/' });
                if (techRes.data.status === 200) {
                    setTechnicians(techRes.data.technicians);
                }
            } catch (err) {
                setError('فشل في تحميل البيانات. يرجى المحاولة مرة أخرى.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categoryId]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto" />
                    <p className="text-gray-500 font-bold">جاري البحث عن أفضل الفنيين...</p>
                </div>
            </div>
        );
    }

    return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
                {/* Header Section */}
                <div className="mb-12 text-right">
                    <Link to="/" className="inline-flex items-center text-blue-600 font-bold hover:underline mb-6 group">
                        <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                        العودة للرئيسية
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-black text-gray-900 mb-2">
                                فنيين قسم {category?.name || 'الخدمات'}
                            </h1>
                            <p className="text-gray-500 text-lg font-medium">
                                {user?.role === 'technician' 
                                    ? 'استكشف الزملاء المحترفين في مجالك' 
                                    : 'اختر من بين أمهر المتخصصين المتاحين حالياً'}
                            </p>
                        </div>
                        <div className="hidden md:block bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
                            <span className="text-blue-600 font-black text-2xl">{technicians.length}</span>
                            <span className="text-gray-400 font-bold mr-2 text-sm uppercase">فني متاح</span>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-600 p-6 rounded-[2rem] border border-red-100 flex items-center mb-12">
                        <AlertCircle className="ml-3" />
                        <span className="font-bold">{error}</span>
                    </div>
                )}

                {/* Technicians Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence>
                        {technicians.filter(t => {
                            const isSeeded = t.user?.email?.endsWith('@services.com');
                            return user ? !isSeeded : isSeeded;
                        }).length > 0 ? (
                            technicians.filter(t => {
                                const isSeeded = t.user?.email?.endsWith('@services.com');
                                return user ? !isSeeded : isSeeded;
                            }).map((tech, idx) => (
                                <TechnicianCard key={tech.id} tech={tech} idx={idx} currentUser={user} />
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center bg-white rounded-[3rem] border-2 border-dashed border-gray-200">
                                <div className="text-6xl mb-6">🔍</div>
                                <h3 className="text-2xl font-black text-gray-400 mb-2">لا يوجد فنيين مسجلين في هذا القسم حالياً</h3>
                                <p className="text-gray-400 font-medium">كن أول من ينضم إلينا في هذا القسم!</p>
                                <Link to="/register" className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all">
                                    سجل كفني الآن
                                </Link>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </main>

    );
};

const TechnicianCard = ({ tech, idx, currentUser }) => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group flex flex-col h-full"
        >
            <div className="p-8 pb-4 text-right">
                <div className="flex items-start justify-between mb-6">
                    <div className="relative">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-black text-3xl shadow-inner uppercase">
                            {tech.user?.name?.charAt(0) || 'T'}
                        </div>
                        {tech.is_available && (
                            <div className="absolute -bottom-2 -left-2 bg-green-500 w-5 h-5 rounded-full border-4 border-white shadow-sm" title="متاح الآن" />
                        )}
                    </div>
                    <div className="text-left">
                        <div className="flex items-center text-yellow-500 font-black text-lg">
                            <Star size={18} fill="currentColor" className="ml-1" />
                            {tech.rating || 'جديد'}
                        </div>
                        <div className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-tighter">تقييم الفني</div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase">
                            {tech.user?.name}
                        </h3>
                        <div className="flex items-center text-gray-500 mt-1 font-bold">
                            <MapPin size={16} className="ml-1 text-blue-500" />
                            {tech.city || tech.user?.address || 'القاهرة'}
                        </div>
                    </div>

                    <p className="text-gray-500 text-sm font-medium line-clamp-2 min-h-[40px]">
                        {tech.bio || 'فني محترف متخصص في تقديم أفضل الخدمات بأعلى جودة ودقة متناهية.'}
                    </p>

                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-50">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Briefcase className="text-blue-500" size={18} />
                            <div>
                                <div className="text-gray-900 font-black text-sm">{tech.experience_years}+ سنوات</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase">الخبرة</div>
                            </div>
                        </div>
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Clock className="text-blue-500" size={18} />
                            <div>
                                <div className="text-gray-900 font-black text-sm">{tech.hourly_rate || '---'} ج.م</div>
                                <div className="text-[10px] text-gray-400 font-bold uppercase">سعر الساعة</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 mt-auto">
                {currentUser?.role === 'technician' ? (
                    <div className="w-full py-4 text-center bg-blue-50 text-blue-700 font-bold rounded-[1.5rem]">
                        زميل محترف
                    </div>
                ) : (
                    <Link 
                        to={`/booking?tech_id=${tech.id}`} 
                        className="w-full flex items-center justify-center py-4 px-6 bg-slate-900 text-white rounded-[1.5rem] font-bold text-lg hover:bg-blue-600 transition-all group-hover:shadow-xl active:scale-95"
                    >
                        <Calendar size={20} className="ml-2" />
                        احجز الآن
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default CategoryTechnicians;
