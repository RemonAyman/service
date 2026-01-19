import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
    ArrowRight, Star, Shield, Clock, Search, Zap, 
    Smile, Trophy, CheckCircle, Smartphone, 
    AirVent, Droplets, Hammer, Lightbulb, Sprout
} from 'lucide-react';
import { motion } from 'framer-motion';
import ServiceCard from '../components/ServiceCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Home = () => {
    const { user, loading: authLoading } = useAuth();
    const [featuredServices, setFeaturedServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();
    const [topTechnicians, setTopTechnicians] = useState([]);
    const [myBookings, setMyBookings] = useState([]);

    useEffect(() => {
        if (user?.role === 'admin') {
            navigate('/admin');
        }
    }, [user, navigate]);

    useEffect(() => {
        setLoading(true);
        // Fetch Services
        axios.get('/services')
            .then(res => {
                setFeaturedServices(res.data.services.data.slice(0, 4));
            })
            .catch(err => console.error('Error fetching services:', err));

        // Fetch Categories
        axios.get('/api/cats', { baseURL: '/' })
            .then(res => {
                if (res.data.status === 200) {
                    setCategories(res.data.categories);
                }
            })
            .catch(err => console.error('Error fetching categories:', err));

        // Role-based data fetching
        const fetchData = async () => {
            try {
                if (user) {
                    if (user.role === 'technician') {
                        // Fetch bookings for technician
                        const res = await axios.get('/api/servicerequests', { 
                            baseURL: '/',
                            params: { technician_id: user.technician?.id } 
                        });
                        setMyBookings((res.data.data || []).slice(0, 3));
                    } else {
                        // Fetch Top Technicians for regular users
                        const res = await axios.get('/api/techs', { baseURL: '/' });
                        if (res.data.status === 200) {
                            setTopTechnicians((res.data.technicians || []).slice(0, 6));
                        }
                    }
                } else {
                    // Fetch Top Technicians for guest users too
                    const res = await axios.get('/api/techs', { baseURL: '/' });
                    if (res.data.status === 200) {
                        setTopTechnicians((res.data.technicians || []).slice(0, 6));
                    }
                }
            } catch (err) {
                console.error('Error fetching role-based data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    // Added helping functions for status in Home.jsx or import them
    const getStatusLabel = (status) => {
        switch(status) {
            case 'pending': return 'قيد الانتظار';
            case 'accepted': return 'مقبول';
            case 'rejected': return 'مرفوض';
            case 'completed': return 'مكتمل';
            default: return status;
        }
    };

    const getStatusColor = (status) => {
        switch(status) {
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'accepted': return 'bg-green-100 text-green-700';
            case 'rejected': return 'bg-red-100 text-red-700';
            case 'completed': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getCategoryIcon = (name) => {
        switch (name) {
            case 'تنظيف': return <Droplets />;
            case 'كهرباء': return <Lightbulb />;
            case 'سباكة': return <Hammer />;
            case 'تكييف': return <AirVent />;
            case 'نجارة': return <Hammer />;
            case 'حدائق': return <Sprout />;
            case 'ألوميتال': return <Smartphone />;
            case 'نقاشة': return <Zap />;
            case 'نقل عفش': return <Smartphone />;
            case 'تصليح أجهزة': return <Smartphone />;
            case 'غاز': return <Zap />;
            case 'مياه': return <Droplets />;
            default: return <Hammer />;
        }
    };

    const getCategoryColor = (name) => {
        switch (name) {
            case 'تنظيف': return 'bg-blue-50 text-blue-600';
            case 'كهرباء': return 'bg-yellow-50 text-yellow-600';
            case 'سباكة': return 'bg-orange-50 text-orange-600';
            case 'تكييف': return 'bg-cyan-50 text-cyan-600';
            case 'نجارة': return 'bg-amber-50 text-amber-600';
            case 'حدائق': return 'bg-green-50 text-green-600';
            case 'غاز': return 'bg-red-50 text-red-600';
            case 'مياه': return 'bg-sky-50 text-sky-600';
            default: return 'bg-slate-50 text-slate-600';
        }
    };

    return (
        <div className="bg-slate-50 overflow-x-hidden" dir="rtl">
            {/* Hero Section - Only for Guest Users */}
            {!user ? (
                <section className="relative min-h-[90vh] flex items-center pt-20 pb-16 bg-white overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 skew-x-[-12deg] translate-x-1/4 -z-10" />
                    
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <motion.div 
                                initial={{ opacity: 0, x: 50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="space-y-8 text-right"
                            >
                                <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-bold animate-pulse">
                                    <Zap size={16} />
                                    <span>ثقة واحترافية في كل خدمة منزلية</span>
                                </div>
                                
                                <h1 className="text-6xl lg:text-7xl font-extrabold text-gray-900 leading-[1.1]">
                                    منزلك يستحق <br />
                                    <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">العناية الأفضل</span>
                                </h1>
                                
                                <p className="text-xl text-gray-600 max-w-lg leading-relaxed font-medium">
                                    نجمع لك أمهر الفنيين والخبراء في مكان واحد. جودة مضمونة، أسعار شفافة، وحجز في ثوانٍ.
                                </p>

                                {/* Advanced Search Bar */}
                                <div className="relative max-w-xl">
                                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input 
                                        type="text"
                                        placeholder="ما الخدمة التي تحتاجها اليوم؟"
                                        className="w-full pr-12 pl-4 py-5 rounded-2xl border-2 border-gray-100 focus:border-blue-600 outline-none shadow-sm text-lg font-medium transition-all"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <button className="absolute left-2 top-2 bottom-2 bg-blue-600 text-white px-8 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg active:scale-95">
                                        بحث
                                    </button>
                                </div>
                            </motion.div>

                            <motion.div 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative"
                            >
                                <div className="absolute -inset-10 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 rounded-full blur-3xl -z-10" />
                                <div className="relative rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(37,99,235,0.3)] transform rotate-2">
                                    <img 
                                        src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
                                        alt="Professional Craftsman" 
                                        className="w-full object-cover aspect-[4/5]"
                                    />
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="pt-32 pb-16 bg-white min-h-[60vh]">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-12 space-y-4 md:space-y-0 text-right">
                            <div>
                                <h1 className="text-4xl font-black text-gray-900 mb-2">
                                    {user ? (user.role === 'technician' ? `مرحباً بك يا بطل، ${user.name} 🛠️` : `مرحباً بك مجدداً، ${user.name} 👋`) : 'مرحباً بك في منصة الخدمات'}
                                </h1>
                                <p className="text-gray-500 text-xl font-medium">
                                    {user ? (
                                        user.role === 'technician' 
                                            ? 'ننتظر منك مجهوداً رائعاً وتقييمات ممتازة من عملائك. استمر في التألق! 🚀' 
                                            : 'إليك أفضل المحترفين المتاحين لخدمتك الآن'
                                    ) : 'اكتشف أفضل المحترفين لخدمة منزلك'}
                                </p>
                            </div>
                            {user.role === 'technician' ? (
                                <Link to="/dashboard" className="bg-blue-600 text-white px-8 py-4 rounded-2xl font-black hover:bg-blue-700 transition-all shadow-xl active:scale-95 flex items-center space-x-2 rtl:space-x-reverse">
                                    <span>انتقل للوحة التحكم</span>
                                    <ArrowRight size={20} />
                                </Link>
                            ) : (
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider">نشط الآن</span>
                                </div>
                            )}
                        </div>

                        {user.role === 'technician' ? (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-black text-gray-900 mb-6 flex items-center">
                                    <span className="w-2 h-8 bg-blue-600 rounded-full ml-3"></span>
                                    آخر الطلبات الواردة
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    {myBookings.length > 0 ? (
                                        myBookings.map((booking, idx) => (
                                            <motion.div 
                                                key={booking.id}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: idx * 0.1 }}
                                                className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 relative group"
                                            >
                                                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter shadow-sm ${getStatusColor(booking.status)}`}>
                                                    {getStatusLabel(booking.status)}
                                                </div>
                                                <div className="mb-4">
                                                    <div className="text-blue-600 font-bold text-sm mb-1">{booking.service?.name}</div>
                                                    <div className="text-gray-900 font-black text-lg">{booking.user?.name}</div>
                                                </div>
                                                <div className="flex items-center text-gray-500 text-xs font-bold mb-4">
                                                    <Clock size={14} className="ml-1" />
                                                    {booking.requested_date} @ {booking.requested_time}
                                                </div>
                                                <Link to="/dashboard" className="w-full block text-center py-3 bg-white border border-gray-200 rounded-xl text-blue-600 font-bold text-sm hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                                                    عرض التفاصيل
                                                </Link>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="col-span-3 py-12 text-center bg-blue-50/30 rounded-[2rem] border-2 border-dashed border-blue-100">
                                            <div className="text-4xl mb-3">📭</div>
                                            <div className="text-gray-500 font-bold">لا يوجد طلبات جديدة حالياً</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {loading ? (
                                    [...Array(3)].map((_, i) => <div key={i} className="h-64 bg-gray-100 animate-pulse rounded-[2.5rem]"></div>)
                                ) : topTechnicians.filter(t => {
                                    // If logged in, only show real users (those NOT using the seeded domain)
                                    // If not logged in, show seeded users (as marketing data)
                                    const isSeeded = t.user?.email?.endsWith('@services.com');
                                    return user ? !isSeeded : isSeeded;
                                }).map((tech, idx) => (
                                    <Link to={`/technician/${tech.id}`} key={tech.id}>
                                        <motion.div 
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            className="bg-gray-50/50 p-6 rounded-[2.5rem] border border-gray-100 hover:bg-white hover:shadow-2xl transition-all duration-300 group cursor-pointer"
                                        >
                                        <div className="flex items-center space-x-4 rtl:space-x-reverse mb-6">
                                            <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white font-black text-2xl uppercase shadow-lg group-hover:rotate-6 transition-transform overflow-hidden">
                                                {tech.user?.image ? (
                                                    <img src={tech.user.image} alt={tech.user.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    tech.user?.name?.charAt(0) || 'T'
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="font-black text-gray-900 text-lg">{tech.user?.name || 'فني محترف'}</h3>
                                                <div className="text-blue-600 text-xs font-bold uppercase tracking-tighter">{tech.category?.name || 'خدمات عامة'}</div>
                                            </div>
                                            <div className="mr-auto flex items-center text-yellow-500 font-black">
                                                <Star size={16} fill="currentColor" className="ml-1" />
                                                {tech.rating}
                                            </div>
                                        </div>
                                        <p className="text-gray-500 text-sm font-medium mb-6 line-clamp-2">{tech.bio}</p>
                                        <div className="flex items-center justify-between">
                                            <div className="text-gray-900 font-extrabold">{tech.hourly_rate} ج.م <span className="text-[10px] text-gray-400 font-bold">/ساعة</span></div>
                                            <span className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-sm group-hover:bg-blue-600 transition-all inline-block">
                                                عرض الملف
                                            </span>
                                        </div>
                                    </motion.div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* Categories Explorer */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">اكتشف خدماتنا</h2>
                        <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-6">
                        {categories.map((cat, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="group cursor-pointer w-full sm:w-[calc(50%-1.5rem)] md:w-[calc(33.33%-1.5rem)] lg:w-[calc(20%-1.5rem)] min-w-[160px]"
                            >
                                <Link to={`/category/${cat.id}/technicians`}>
                                    <div className={`aspect-square ${getCategoryColor(cat.name)} rounded-[2rem] flex flex-col items-center justify-center space-y-4 shadow-sm group-hover:shadow-2xl transition-all duration-300 border border-transparent group-hover:border-blue-100`}>
                                        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-gray-700">
                                            {React.cloneElement(getCategoryIcon(cat.name), { size: 30 })}
                                        </div>
                                        <span className="font-bold text-lg">{cat.name}</span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works - Premium Infographic */}
            <section className="py-24 bg-slate-900 text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                    <div className="absolute -top-48 -left-48 w-96 h-96 bg-blue-600 rounded-full blur-3xl" />
                </div>
                
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="text-center mb-20">
                        <span className="text-blue-400 font-black tracking-widest uppercase">كيف يعمل الموقع؟</span>
                        <h2 className="text-4xl lg:text-5xl font-extrabold mt-4">ثلاث خطوات بسيطة لمنزل مثالي</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 relative">
                        <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-800 to-transparent hidden md:block" />
                        
                        <StepCard 
                            number="01" 
                            icon={<Search size={32} />} 
                            title="اختر الخدمة" 
                            desc="تصفح قائمة واسعة من الخدمات المنزلية المتنوعة واختر ما يناسبك." 
                        />
                        <StepCard 
                            number="02" 
                            icon={<Smartphone size={32} />} 
                            title="حدد الموعد" 
                            desc="اختر الوقت والتاريخ المناسبين لك مع تأكيد فوري للحجز." 
                        />
                        <StepCard 
                            number="03" 
                            icon={<Smile size={32} />} 
                            title="استرخِ واستمتع" 
                            desc="سيفوم محترفونا بالعمل بأعلى جودة بينما تستمتع أنت بوقتك." 
                        />
                    </div>
                </div>
            </section>

            {/* About Us & History Section - NEW */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 skew-x-12 translate-x-1/2 -z-10" />
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content */}
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="text-right space-y-8"
                        >
                            <div>
                                <h2 className="text-4xl font-black text-gray-900 mb-4">قصتنا وتاريخنا</h2>
                                <div className="h-1.5 w-24 bg-blue-600 rounded-full mb-8" />
                                <p className="text-xl text-gray-600 leading-relaxed font-medium mb-6">
                                    تأسست منصتنا في عام 2020 برؤية طموحة تهدف إلى إحداث ثورة في سوق الخدمات المنزلية في مصر. بدأنا كفريق صغير من 5 أفراد يحملون حلماً بتسهيل حياة الناس، واليوم نفخر بكوننا الخيار الأول لأكثر من 50,000 أسرة.
                                </p>
                                <p className="text-lg text-gray-500 leading-relaxed">
                                    نحن نؤمن بأن الجودة ليست مجرد شعار، بل هي التزام يومي. لذلك، يمر جميع مقدمي الخدمات لدينا بعملية اختيار صارمة تشمل اختبارات فنية وفحص الخلفية الجنائية لضمان أمان منزلك وراحتك. هدفنا ليس مجرد إصلاح عطل، بل بناء علاقة ثقة تدوم لسنوات.
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
                                <div>
                                    <h4 className="text-3xl font-black text-blue-600 mb-1">+500</h4>
                                    <p className="text-gray-900 font-bold">فني محترف</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-black text-blue-600 mb-1">+50k</h4>
                                    <p className="text-gray-900 font-bold">عميل سعيد</p>
                                </div>
                                <div>
                                    <h4 className="text-3xl font-black text-blue-600 mb-1">+120k</h4>
                                    <p className="text-gray-900 font-bold">مهمة ناجحة</p>
                                </div>
                            </div>

                           <div className="pt-6">
                               <Link to="/register" className="inline-flex items-center space-x-2 rtl:space-x-reverse text-blue-700 font-black hover:text-blue-800 transition-colors">
                                   <span>انضم لقصة نجاحنا</span>
                                   <ArrowRight size={20} />
                               </Link>
                           </div>
                        </motion.div>

                        {/* Image/Visual */}
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                             <div className="relative rounded-[3rem] overflow-hidden shadow-2xl">
                                <img 
                                    src="https://images.unsplash.com/photo-1581578731117-10d52143b1e8?q=80&w=2069&auto=format&fit=crop" 
                                    alt="Our Team" 
                                    className="w-full h-full object-cover aspect-square"
                                />
                                <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-8 rounded-tl-[3rem]">
                                    <div className="text-5xl font-black mb-1">5</div>
                                    <div className="font-bold text-blue-100">سنوات من<br/>الخبرة والتميّز</div>
                                </div>
                            </div>
                            
                            {/* Floating Element */}
                            <div className="absolute -top-10 -left-10 bg-white p-6 rounded-[2rem] shadow-xl max-w-[200px] hidden md:block animate-bounce duration-[3000ms]">
                                <div className="flex items-center space-x-2 rtl:space-x-reverse mb-2">
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    <span className="text-xs font-bold text-gray-500">متاح الآن</span>
                                </div>
                                <div className="font-black text-gray-900">فريق دعم فني جاهز لخدمتك 24/7</div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Featured Services - Grid with animations */}
            <section className="py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-16">
                        <div className="text-right">
                            <h2 className="text-4xl font-black text-gray-900 mb-4">الأكثر طلباً الآن</h2>
                            <p className="text-gray-500 text-lg font-medium">خدمات متميزة حازت على رضا آلاف العملاء</p>
                        </div>
                        <Link to="/services" className="bg-white border-2 border-gray-100 px-6 py-3 rounded-2xl font-bold text-gray-700 hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm">
                            مشاهدة الكل
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {loading ? (
                            [...Array(4)].map((_, i) => <LoadingSkeleton key={i} />)
                        ) : featuredServices.length > 0 ? (
                            featuredServices.map(service => (
                                <motion.div key={service.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                    <ServiceCard service={service} />
                                </motion.div>
                            ))
                        ) : (
                            <div className="col-span-4 bg-white p-20 rounded-[3rem] text-center border-2 border-dashed border-gray-100">
                                <span className="text-6xl mb-4 block">🧹</span>
                                <h3 className="text-2xl font-bold text-gray-400">لا يوجد خدمات حالياً في هذه المنطقة</h3>
                                <p className="text-gray-400 mt-2">سجل كفني وابدأ العمل معنا الآن!</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Trust Section */}
            <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[4rem] mx-4 sm:mx-8 lg:mx-16 mb-24 shadow-2xl relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
                
                <div className="max-w-5xl mx-auto px-4 relative z-10 grid md:grid-cols-3 gap-12 text-center">
                    <div>
                        <div className="text-5xl font-black mb-2">100%</div>
                        <div className="text-blue-100 font-bold">خدمات موثوقة</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black mb-2">متنوعة</div>
                        <div className="text-blue-100 font-bold">تخصصات مهنية</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black mb-2">4.9</div>
                        <div className="text-blue-100 font-bold">متوسط تقييم الخدمة</div>
                    </div>
                </div>
                
                <div className="mt-16 text-center relative z-10">
                    {authLoading ? (
                        <div className="bg-white/50 px-12 py-5 rounded-2xl inline-block">
                            <div className="w-8 h-8 rounded-full border-4 border-blue-600 border-t-transparent animate-spin mx-auto" />
                        </div>
                    ) : (
                        <Link to={user ? "/services" : "/register"} className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-transform shadow-2xl inline-block">
                            {user ? "اكتشف الخدمات المتاحة" : "ابدأ رحلتك معانا اليوم"}
                        </Link>
                    )}
                </div>
            </section>
        </div>
    );
};

const StepCard = ({ number, icon, title, desc }) => (
    <div className="relative z-10 bg-slate-800/50 backdrop-blur-sm p-10 rounded-[2.5rem] border border-slate-700 hover:border-blue-500 transition-colors group">
        <div className="absolute -top-6 -right-6 text-7xl font-black text-blue-600/10 transition-colors group-hover:text-blue-600/20">{number}</div>
        <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-900/40">{icon}</div>
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed font-medium">{desc}</p>
    </div>
);

export default Home;
