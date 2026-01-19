import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, MapPin, Briefcase, Clock, User } from 'lucide-react';

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
                        to={`/technician/${tech.id}`} 
                        className="w-full flex items-center justify-center py-4 px-6 bg-slate-900 text-white rounded-[1.5rem] font-bold text-lg hover:bg-blue-600 transition-all group-hover:shadow-xl active:scale-95"
                    >
                        <User size={20} className="ml-2" />
                        عرض الملف
                    </Link>
                )}
            </div>
        </motion.div>
    );
};

export default TechnicianCard;
