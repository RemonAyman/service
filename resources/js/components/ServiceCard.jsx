import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Star, Bookmark, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const ServiceCard = ({ service }) => {
    return (
        <motion.div 
            whileHover={{ y: -8 }}
            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full relative"
        >
            {/* Badge for featured/new */}
            <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                <div className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-black text-gray-900 shadow-xl border border-white/50">
                    {service.price} ج.م
                </div>
            </div>

            <div className="relative aspect-[16/11] overflow-hidden">
                <img 
                    src={service.image || "https://images.unsplash.com/photo-1621905252507-b354bcadc911?q=80&w=2070&auto=format&fit=crop"} 
                    alt={service.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {service.category && (
                    <div className="absolute top-4 right-4 bg-blue-600/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-black text-white shadow-xl">
                        {service.category.name}
                    </div>
                )}
            </div>
            
            <div className="p-7 flex-grow flex flex-col text-right">
                <div className="flex justify-between items-start mb-4">
                    <button className="p-2 bg-gray-50 rounded-xl text-gray-400 hover:text-red-500 transition-colors">
                        <Bookmark className="h-5 w-5" />
                    </button>
                    <h3 className="text-2xl font-black text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
                        {service.name}
                    </h3>
                </div>
                
                <p className="text-gray-500 font-medium text-sm mb-6 line-clamp-2 leading-relaxed">
                    {service.description || "لا يوجد وصف لهذه الخدمة حالياً. نحن نضمن لك جودة عالية وأداءً متميزاً."}
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-gray-400">
                        <Clock size={16} />
                        <span className="text-xs font-bold">حجز فوري</span>
                    </div>
                    <div className="flex items-center space-x-2 rtl:space-x-reverse text-blue-500">
                        <ShieldCheck size={16} />
                        <span className="text-xs font-bold">خدمة مؤمنة</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between pt-6 border-t border-gray-50">
                    <Link
                        to={`/booking?service_id=${service.id}`}
                        className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-blue-600 transition-all text-sm shadow-xl shadow-gray-200"
                    >
                        احجز الآن
                    </Link>
                    <div className="flex items-center">
                        <div className="flex text-yellow-500 ml-2">
                             {[...Array(1)].map((_, i) => <Star key={i} size={18} fill="currentColor" />)}
                        </div>
                        <span className="text-lg font-black text-gray-900">4.8</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
