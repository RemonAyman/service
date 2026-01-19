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

import TechnicianCard from '../components/TechnicianCard';

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
                const mode = user ? 'real' : 'guest';
                const techRes = await axios.get(`/api/techs`, { 
                    baseURL: '/',
                    params: { 
                        category_id: categoryId,
                        mode: mode
                    }
                });
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
                        {technicians.length > 0 ? (
                            technicians.map((tech, idx) => (
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

export default CategoryTechnicians;
