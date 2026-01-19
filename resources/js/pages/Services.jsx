import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TechnicianCard from '../components/TechnicianCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Search, Filter, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Services = () => {
    const { user } = useAuth();
    const [technicians, setTechnicians] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetchData();
    }, [user]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const mode = user ? 'real' : 'guest';
            const [techsRes, catsRes] = await Promise.all([
                axios.get('/api/techs', { 
                    baseURL: '/',
                    params: { mode: mode }
                }),
                axios.get('/api/cats', { baseURL: '/' })
            ]);

            if (techsRes.data.status === 200) {
                setTechnicians(techsRes.data.technicians || []);
            }
            if (catsRes.data.status === 200) {
                setCategories(catsRes.data.categories || []);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredTechnicians = technicians.filter(tech => {
        const matchesSearch = tech.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (tech.bio && tech.bio.toLowerCase().includes(searchTerm.toLowerCase())) ||
                             (tech.category?.name && tech.category.name.toLowerCase().includes(searchTerm.toLowerCase()));
        
        // Filter by category if selected
        const matchesCategory = selectedCategory === 'all' || tech.category_id.toString() === selectedCategory;
        
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="text-right w-full md:w-auto">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">ابحث عن محترفين</h1>
                    <p className="text-gray-500 font-medium">اختر أفضل الفنيين لخدمة منزلك اليوم</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto lg:min-w-[500px]">
                    <div className="relative flex-grow">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="ابحث عن اسم الفني أو التخصص..."
                            className="w-full pr-12 pl-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-all font-medium"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    <div className="relative min-w-[160px]">
                        <Filter className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                        <select
                            className="w-full pr-12 pl-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-600 appearance-none font-bold text-gray-700 bg-white"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="all">كل التخصصات</option>
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[...Array(6)].map((_, i) => <LoadingSkeleton key={i} />)}
                </div>
            ) : (
                <>
                    {filteredTechnicians.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredTechnicians.map((tech, idx) => (
                                <TechnicianCard key={tech.id} tech={tech} idx={idx} currentUser={user} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                            <div className="text-6xl mb-6">🔍</div>
                            <h3 className="text-xl font-bold text-gray-400">لا يوجد فنيين يطابقون بحثك</h3>
                            <p className="text-gray-400 mt-2">جرب البحث بكلمات مختلفة أو تصفح كل التخصصات</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Services;
