import React from 'react';
import { Link } from 'react-router-dom';
import { User, Briefcase, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

const RegisterChoice = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 relative overflow-hidden font-cairo" dir="rtl">
            {/* Background Decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute -top-[20%] -right-[10%] w-[700px] h-[700px] bg-blue-100/50 rounded-full blur-[100px]" />
                <div className="absolute -bottom-[20%] -left-[10%] w-[700px] h-[700px] bg-purple-100/50 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 space-y-4">
                     <Link to="/" className="inline-flex items-center space-x-2 rtl:space-x-reverse text-gray-500 hover:text-blue-600 font-bold mb-8 transition-colors">
                        <ArrowRight size={20} />
                        <span>العودة للرئيسية</span>
                    </Link>
                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-black text-gray-900"
                    >
                        كيف تود الانضمام إلينا؟
                    </motion.h1>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-500 font-medium max-w-2xl mx-auto"
                    >
                        اختر الطريقة التي تناسب احتياجاتك، سواء كنت تبحث عن خدمة أو تقدمها
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Client Card */}
                    <Link to="/register/client" className="group">
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white rounded-[2rem] p-10 h-full border-2 border-transparent hover:border-blue-500 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-[100px] transition-colors group-hover:bg-blue-600/10" />
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <User size={40} strokeWidth={1.5} />
                                </div>

                                <h2 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                                    أنا عميل
                                </h2>
                                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                    أبحث عن فنيين محترفين لإنجاز مهام الصيانة والخدمات المنزلية بسهولة وضمان.
                                </p>

                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <span>وصول فوري لأمهر الفنيين</span>
                                    </li>
                                    <li className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <span>ضمان على جميع الخدمات</span>
                                    </li>
                                    <li className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <span>أسعار شفافة ومحددة</span>
                                    </li>
                                </ul>

                                <div className="flex items-center text-blue-600 font-black text-lg group-hover:translate-x-[-10px] transition-transform rtl:group-hover:translate-x-2">
                                    <span>تسجيل كعميل</span>
                                    <ArrowRight className="mr-2 rtl:mr-0 rtl:ml-2" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>

                    {/* Technician Card */}
                    <Link to="/register/technician" className="group">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white rounded-[2rem] p-10 h-full border-2 border-transparent hover:border-purple-500 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-50 rounded-bl-[100px] transition-colors group-hover:bg-purple-600/10" />
                            
                            <div className="relative z-10">
                                <div className="w-20 h-20 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform duration-300">
                                    <Briefcase size={40} strokeWidth={1.5} />
                                </div>

                                <h2 className="text-3xl font-black text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                                    أنا مقدم خدمة
                                </h2>
                                <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                                    أمتلك مهارة وأرغب في تقديم خدماتي بمهنية وزيادة دخلي والوصول لعملاء أكثر.
                                </p>

                                <ul className="space-y-4 mb-10">
                                    <li className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <span>سجل مجاناً وابدأ العمل</span>
                                    </li>
                                    <li className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <span>جدول مواعيد مرن</span>
                                    </li>
                                    <li className="flex items-center space-x-3 rtl:space-x-reverse text-gray-600 font-medium">
                                        <CheckCircle2 size={20} className="text-green-500 shrink-0" />
                                        <span>نظام تقييم عادل واحترافي</span>
                                    </li>
                                </ul>

                                <div className="flex items-center text-purple-600 font-black text-lg group-hover:translate-x-[-10px] transition-transform rtl:group-hover:translate-x-2">
                                    <span>تسجيل كمهني</span>
                                    <ArrowRight className="mr-2 rtl:mr-0 rtl:ml-2" />
                                </div>
                            </div>
                        </motion.div>
                    </Link>
                </div>
                
                <p className="text-center mt-12 text-gray-500 font-bold">
                    لديك حساب بالفعل؟{' '}
                    <Link to="/login" className="text-blue-600 font-black hover:underline underline-offset-8">
                        سجل دخولك من هنا
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterChoice;
