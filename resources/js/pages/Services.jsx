import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceCard from '../components/ServiceCard';
import LoadingSkeleton from '../components/LoadingSkeleton';
import { Search, Filter, Loader2 } from 'lucide-react';

const Services = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [servicesRes, catsRes] = await Promise.all([
                axios.get('/services'),
                axios.get('/cats')
            ]);
            setServices(servicesRes.data.services.data);
            setCategories(catsRes.data.categories || []);
        } catch (err) {
            console.error('Error fetching data:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredServices = services.filter(service => {
        const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             (service.description && service.description.toLowerCase().includes(searchTerm.toLowerCase()));
        const matchesCategory = selectedCategory === 'all' || service.category_id.toString() === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
                <div className="text-right w-full md:w-auto">
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-2">اكتشف خدماتنا</h1>
                    <p className="text-gray-500 font-medium">اختر الخدمة التي تناسب احتياجاتك اليوم</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto lg:min-w-[500px]">
                    <div className="relative flex-grow">
                        <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="ابحث عن خدمة..."
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
                            <option value="all">الكل</option>
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
                    {filteredServices.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredServices.map(service => (
                                <ServiceCard key={service.id} service={service} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                            <h3 className="text-xl font-bold text-gray-400">لا يوجد خدمات تطابق بحثك</h3>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Services;
