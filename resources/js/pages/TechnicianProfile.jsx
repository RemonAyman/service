import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
    Star, MapPin, Clock, Award, Briefcase, Calendar, 
    ArrowRight, CheckCircle, Loader2, Shield 
} from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';

const TechnicianProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [technician, setTechnician] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchTechnicianData();
    }, [id]);

    const fetchTechnicianData = async () => {
        try {
            setLoading(true);
            
            // Fetch technician details
            const techRes = await axios.get(`/api/techone/${id}`, { baseURL: '/' });
            
            if (techRes.data.status === 200) {
                const techData = techRes.data.technician;
                setTechnician(techData);
                
                // Fetch services in this technician's category
                const servicesRes = await axios.get('/api/services', { baseURL: '/' });
                if (servicesRes.data.services?.data) {
                    const categoryServices = servicesRes.data.services.data.filter(
                        s => s.category_id === techData.category_id
                    );
                    setServices(categoryServices);
                }
            } else {
                setError('لم يتم العثور على الفني');
            }
        } catch (err) {
            console.error('Error fetching technician:', err);
            setError('حدث خطأ أثناء تحميل بيانات الفني');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center min-h-screen">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (error || !technician) {
        return (
            <div className="flex-grow flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-6xl mb-4">😕</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{error || 'الفني غير موجود'}</h2>
                    <Link to="/" className="text-blue-600 font-bold hover:underline">
                        العودة للرئيسية
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 min-h-screen" dir="rtl">
            {/* Hero Section - Technician Header */}
            <section className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white pt-32 pb-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col md:flex-row items-center md:items-start gap-8"
                    >
                        {/* Avatar */}
                        <div className="w-32 h-32 rounded-3xl bg-white/10 backdrop-blur-sm flex items-center justify-center text-6xl font-black uppercase shadow-2xl overflow-hidden border-4 border-white/20">
                            {technician.user?.image ? (
                                <img 
                                    src={technician.user.image} 
                                    alt={technician.user.name} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-white">{technician.user?.name?.charAt(0) || 'T'}</span>
                            )}
                        </div>

                        {/* Info */}
                        <div className="flex-grow text-center md:text-right">
                            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold mb-4">
                                <Shield size={16} />
                                <span>فني معتمد</span>
                            </div>
                            
                            <h1 className="text-4xl lg:text-5xl font-extrabold mb-3">
                                {technician.user?.name || 'فني محترف'}
                            </h1>
                            
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <Briefcase size={18} />
                                    <span className="font-bold">{technician.category?.name || 'خدمات عامة'}</span>
                                </div>
                                
                                <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <Award size={18} />
                                    <span className="font-bold">{technician.experience_years} سنوات خبرة</span>
                                </div>
                                
                                <div className="flex items-center space-x-2 rtl:space-x-reverse bg-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                                    <Star size={18} fill="currentColor" />
                                    <span className="font-bold">{technician.rating || '4.8'}</span>
                                </div>
                            </div>

                            <div className="text-3xl font-black mb-6">
                                {technician.hourly_rate} ج.م <span className="text-lg text-white/70 font-medium">/ ساعة</span>
                            </div>

                            <Link
                                to={`/booking?tech_id=${technician.id}`}
                                className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-white text-blue-600 px-8 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-all shadow-2xl"
                            >
                                <span>احجز الآن</span>
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Bio Section */}
            {technician.bio && (
                <section className="py-12 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-slate-50 p-8 rounded-3xl border border-gray-100"
                        >
                            <h2 className="text-2xl font-black text-gray-900 mb-4 flex items-center">
                                <span className="w-2 h-8 bg-blue-600 rounded-full ml-3"></span>
                                نبذة عن الفني
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed font-medium whitespace-pre-line">
                                {technician.bio}
                            </p>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Additional Info Cards */}
            <section className="py-12 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 text-center"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="text-green-600" size={32} />
                            </div>
                            <h3 className="font-black text-gray-900 text-lg mb-2">متاح للعمل</h3>
                            <p className="text-gray-500 text-sm font-medium">
                                {technician.is_available ? 'جاهز لاستقبال الطلبات' : 'غير متاح حالياً'}
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 text-center"
                        >
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Clock className="text-blue-600" size={32} />
                            </div>
                            <h3 className="font-black text-gray-900 text-lg mb-2">استجابة سريعة</h3>
                            <p className="text-gray-500 text-sm font-medium">
                                يرد خلال ساعة واحدة
                            </p>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white p-6 rounded-2xl border border-gray-100 text-center"
                        >
                            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <MapPin className="text-purple-600" size={32} />
                            </div>
                            <h3 className="font-black text-gray-900 text-lg mb-2">الموقع</h3>
                            <p className="text-gray-500 text-sm font-medium">
                                {technician.city || 'جميع المناطق'}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>



            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-3xl lg:text-4xl font-extrabold mb-4">
                        جاهز للبدء؟
                    </h2>
                    <p className="text-xl text-blue-100 mb-8 font-medium">
                        احجز موعدك الآن واحصل على خدمة احترافية من {technician.user?.name}
                    </p>
                    <Link
                        to={`/booking?tech_id=${technician.id}`}
                        className="inline-flex items-center space-x-3 rtl:space-x-reverse bg-white text-blue-600 px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl"
                    >
                        <span>احجز الآن</span>
                        <Calendar size={24} />
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default TechnicianProfile;
