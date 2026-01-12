import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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

    useEffect(() => {
        setLoading(true);
        axios.get('/services')
            .then(res => {
                setFeaturedServices(res.data.services.data.slice(0, 4));
            })
            .catch(err => console.error('Error fetching services:', err))
            .finally(() => setLoading(false));
    }, []);

    const categories = [
        { name: 'تنظيف', icon: <Droplets />, color: 'bg-blue-50 text-blue-600' },
        { name: 'كهرباء', icon: <Lightbulb />, color: 'bg-yellow-50 text-yellow-600' },
        { name: 'سباكة', icon: <Hammer />, color: 'bg-orange-50 text-orange-600' },
        { name: 'تكييف', icon: <AirVent />, color: 'bg-cyan-50 text-cyan-600' },
        { name: 'نجارة', icon: <Hammer />, color: 'bg-amber-50 text-amber-600' },
        { name: 'حدائق', icon: <Sprout />, color: 'bg-green-50 text-green-600' },
    ];

    return (
        <div className="bg-slate-50 overflow-x-hidden" dir="rtl">
            {/* Hero Section - Premium Design */}
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
                                <span>ثقة أكثر من 10,000+ عميل في مصر</span>
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

                            <div className="flex items-center space-x-6 rtl:space-x-reverse pt-4">
                                <div className="flex -space-x-2 rtl:space-x-reverse">
                                    {[1, 2, 3, 4].map(i => (
                                        <img key={i} className="w-10 h-10 rounded-full border-4 border-white" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                                    ))}
                                </div>
                                <div className="text-sm font-bold text-gray-500">
                                    <span className="text-gray-900 ml-1">4.9/5</span>
                                    تقييم العملاء الراضين
                                </div>
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
                                <div className="absolute bottom-6 right-6 left-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-2xl border border-white/50">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white"><CheckCircle /></div>
                                            <div>
                                                <div className="font-bold text-gray-900 uppercase tracking-wider">تم التحقق</div>
                                                <div className="text-xs text-gray-500 font-bold">كل الفنيين خضعوا لاختبارات دقيقة</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Categories Explorer */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-gray-900 mb-4">اكتشف خدماتنا</h2>
                        <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full" />
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {categories.map((cat, idx) => (
                            <motion.div 
                                key={idx}
                                whileHover={{ y: -10 }}
                                className="group cursor-pointer"
                            >
                                <div className={`aspect-square ${cat.color} rounded-[2rem] flex flex-col items-center justify-center space-y-4 shadow-sm group-hover:shadow-2xl transition-all duration-300 border border-transparent group-hover:border-blue-100`}>
                                    <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-sm text-gray-700">
                                        {React.cloneElement(cat.icon, { size: 30 })}
                                    </div>
                                    <span className="font-bold text-lg">{cat.name}</span>
                                </div>
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
                        <div className="text-5xl font-black mb-2">50k+</div>
                        <div className="text-blue-100 font-bold">عملية صيانة ناجحة</div>
                    </div>
                    <div>
                        <div className="text-5xl font-black mb-2">12k+</div>
                        <div className="text-blue-100 font-bold">فني محترف مسجل</div>
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
