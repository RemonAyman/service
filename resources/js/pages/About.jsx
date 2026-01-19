import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Users, Trophy, Target, Heart, Globe, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
    return (
        <div className="bg-white font-cairo text-right" dir="rtl">
            {/* Hero Section */}
            <div className="relative py-24 bg-blue-900 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute -top-24 -right-24 w-96 h-96 bg-white rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
                </div>
                
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black mb-6"
                    >
                        نبني مستقبلاً أسهل
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto font-medium"
                    >
                        منصة الخدمات الرائدة في مصر التي تجمع بين التكنولوجيا الحديثة والخبرة الحرفية لتقديم تجربة استثنائية.
                    </motion.p>
                </div>
            </div>

            {/* Story Section */}
            <section className="py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-blue-100 rounded-[2.5rem] transform -rotate-3" />
                            <img 
                                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                                alt="Founding Team" 
                                className="relative rounded-[2rem] shadow-xl w-full"
                            />
                        </div>
                        
                        <div className="space-y-6">
                            <span className="text-blue-600 font-bold tracking-widest uppercase">بدايتنا</span>
                            <h2 className="text-4xl font-black text-gray-900">من فكرة بسيطة إلى واقع يخدم الملايين</h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                تأسست الشركة في عام 2020 عندما واجه مؤسسونا صعوبة في العثور على فنيين موثوقين لإصلاحات منزلية بسيطة. كانت الأسعار غير واضحة، والمواعيد غير دقيقة، والجودة متذبذبة.
                            </p>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                من هنا ولدت الفكرة: لماذا لا نستخدم التكنولوجيا لربط أصحاب المنازل بأفضل الحرفيين المعتمدين؟ بدأنا بفريق صغير من 5 أشخاص في مكتب متواضع بالقاهرة، واليوم نحن عائلة تضم أكثر من 150 موظفاً و5000 مقدم خدمة.
                            </p>
                            
                            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-gray-100">
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">2020</div>
                                    <div className="text-gray-500 font-bold">عام التأسيس</div>
                                </div>
                                <div>
                                    <div className="text-4xl font-black text-gray-900 mb-2">+100</div>
                                    <div className="text-gray-500 font-bold">مدينة نغطيها</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-8">
                        <Card 
                            icon={<Target />} 
                            title="مهمتنا" 
                            desc="تسهيل حياة الناس اليومية من خلال توفير خدمات منزلية موثوقة وعالية الجودة بضغطة زر." 
                        />
                        <Card 
                            icon={<Globe />} 
                            title="رؤيتنا" 
                            desc="أن نكون المنصة الأكثر موثوقية وشهرة للخدمات المنزلية في الشرق الأوسط وأفريقيا." 
                        />
                        <Card 
                            icon={<Heart />} 
                            title="قيمنا" 
                            desc="الشفافية المطلقة، الجودة التي لا نتنازل عنها، واحترام وقت وخصوصية عملائنا." 
                        />
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-20 bg-blue-600 text-white text-center">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        <Stat number="+50k" label="عميل سعيد" />
                        <Stat number="+5k" label="مقدم خدمة" />
                        <Stat number="+150k" label="مهمة منجزة" />
                        <Stat number="4.9" label="متوسط التقييم" />
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <h2 className="text-4xl font-black text-gray-900 mb-6">هل أنت مستعد لتجربة خدماتنا؟</h2>
                    <p className="text-xl text-gray-500 mb-10">
                        انضم لآلاف العملاء الذين وثقوا بنا واكتشف الفرق بنفسك.
                    </p>
                    <Link to="/register" className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-blue-600 text-white px-8 py-4 rounded-[2rem] font-bold hover:bg-blue-700 transition-all shadow-xl hover:shadow-2xl">
                        <span>ابدأ الآن مجاناً</span>
                        <ArrowRight />
                    </Link>
                </div>
            </section>
        </div>
    );
};

const Card = ({ icon, title, desc }) => (
    <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300">
        <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">
            {React.cloneElement(icon, { size: 32 })}
        </div>
        <h3 className="text-2xl font-black text-gray-900 mb-4">{title}</h3>
        <p className="text-gray-500 font-medium leading-relaxed">{desc}</p>
    </div>
);

const Stat = ({ number, label }) => (
    <div>
        <div className="text-5xl font-black mb-2">{number}</div>
        <div className="text-blue-200 font-bold text-lg">{label}</div>
    </div>
);

export default About;
