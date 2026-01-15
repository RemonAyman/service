import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const Booking = () => {
    const [searchParams] = useSearchParams();
    const serviceId = searchParams.get('service_id');
    const techId = searchParams.get('tech_id');
    const navigate = useNavigate();
    const { user } = useAuth();
    
    const [service, setService] = useState(null);
    const [technician, setTechnician] = useState(null);
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        requested_date: new Date().toISOString().split('T')[0],
        requested_time: '',
        address: user?.address || '',
        phone: user?.phone || '',
        notes: ''
    });

    // Update formData when user loads
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                address: user.address || prev.address,
                phone: user.phone || prev.phone
            }));
        }
    }, [user]);

    useEffect(() => {
        if (serviceId) {
            fetchService();
        } else if (techId) {
            fetchTechnician();
        }
    }, [serviceId, techId]);

    const fetchService = async () => {
        try {
            const response = await axios.get(`/api/serviceone/${serviceId}`, { baseURL: '/' });
            setService(response.data.service);
        } catch (err) {
            console.error('Error fetching service:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchTechnician = async () => {
        try {
            const response = await axios.get(`/api/techone/${techId}`, { baseURL: '/' });
            if (response.data.status === 200) {
                const tech = response.data.technician;
                setTechnician(tech);
                
                // Fetch services for this category
                const servicesRes = await axios.get(`/api/services`, { baseURL: '/' });
                const catServices = servicesRes.data.services.data.filter(s => s.category_id === tech.category_id);
                setServices(catServices);
                if (catServices.length > 0) {
                    setService(catServices[0]); // Default to first service
                }
            }
        } catch (err) {
            console.error('Error fetching technician:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            navigate('/login');
            return;
        }

        setSubmitting(true);
        setError('');

        try {
            await axios.post('/servicerequeststore', {
                ...formData,
                service_id: serviceId || service?.id,
                technician_id: techId || technician?.id,
                user_id: user.id,
                status: 'pending'
            });
            setSuccess(true);
            setTimeout(() => navigate('/dashboard'), 3000);
        } catch (err) {
            console.error('Booking Error:', err.response?.data || err.message);
            setError(err.response?.data?.message || 'حدث خطأ أثناء إرسال طلب الحجز. يرجى التأكد من ملء جميع البيانات ورن أمر الميجريشن.');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    if (success) {
        return (
            <div className="max-w-md mx-auto my-24 p-8 bg-white rounded-3xl shadow-2xl border border-green-50 text-center animate-in zoom-in duration-500">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h2 className="text-2xl font-extrabold text-gray-900 mb-2">تم الحجز بنجاح!</h2>
                <p className="text-gray-500 font-medium mb-8">سنتواصل معك قريباً لتأكيد الموعد.</p>
                <div className="text-sm text-gray-400">جاري توجيهك إلى لوحة التحكم...</div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-3 gap-8">
                {/* Service Info Summary */}
                <div className="md:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                        <img 
                            src={service?.image || technician?.user?.avatar || "https://images.unsplash.com/photo-1621905252507-b354bcadc911?q=80&w=2070&auto=format&fit=crop"} 
                            alt={service?.name} 
                            className="w-full h-40 object-cover rounded-2xl mb-4"
                        />
                        {technician && (
                            <div className="mb-4 pb-4 border-b border-gray-50 text-right">
                                <div className="text-sm font-bold text-blue-600 uppercase mb-1">الفني المختار</div>
                                <div className="font-extrabold text-gray-900 text-lg uppercase">{technician.user?.name}</div>
                                <div className="text-gray-400 text-xs font-bold uppercase">{technician.category?.name}</div>
                            </div>
                        )}
                        <h2 className="text-xl font-bold text-gray-900 mb-2">{service?.name || 'اختر الخدمة'}</h2>
                        <div className="text-2xl font-extrabold text-blue-600 mb-4">{service?.price || technician?.hourly_rate || 0} ج.م</div>
                        <div className="space-y-3 pt-4 border-t border-gray-50">
                            <div className="flex items-center text-sm text-gray-500 font-medium">
                                <Clock className="h-4 w-4 ml-2 text-blue-500" />
                                <span>{service ? `مدة الخدمة: ${service.estimated_time}` : `سعر الساعة: ${technician?.hourly_rate} ج.م`}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="md:col-span-2">
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h1 className="text-2xl font-extrabold text-gray-900 mb-8 pb-4 border-b border-gray-50">تفاصيل الحجز</h1>
                        
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center mb-6 space-x-3 rtl:space-x-reverse font-bold border border-red-100">
                                <AlertCircle className="h-5 w-5" />
                                <span>{error}</span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-sm font-bold text-gray-700 block mb-2 mr-1">التاريخ المفضل</label>
                                    <div className="relative">
                                        <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                        <input
                                            type="date"
                                            required
                                            className="w-full pr-12 pl-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-all font-medium"
                                            value={formData.requested_date}
                                            onChange={(e) => setFormData({...formData, requested_date: e.target.value})}
                                            min={new Date().toISOString().split('T')[0]}
                                        />
                                    </div>
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-sm font-bold text-gray-700 block mb-2 mr-1">الوقت المفضل</label>
                                    <div className="relative">
                                        <Clock className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
                                        <input
                                            type="time"
                                            required
                                            className="w-full pr-12 pl-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-all font-medium"
                                            value={formData.requested_time}
                                            onChange={(e) => setFormData({...formData, requested_time: e.target.value})}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-sm font-bold text-gray-700 block mb-2 mr-1">رقم الهاتف للتواصل</label>
                                    <input
                                        type="tel"
                                        required
                                        className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-all font-medium"
                                        placeholder="مثال: 01012345678"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    />
                                </div>
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-sm font-bold text-gray-700 block mb-2 mr-1">عنوان الخدمة بالتفصيل</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-4 py-3.5 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-all font-medium"
                                        placeholder="المنطقة، الشارع، رقم الشقة"
                                        value={formData.address}
                                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-sm font-bold text-gray-700 block mb-2 mr-1">ملاحظات إضافية</label>
                                <textarea
                                    className="w-full px-4 py-4 border-2 border-gray-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-all font-medium min-h-[120px]"
                                    placeholder="أخبرنا بأي تفاصيل أخرى..."
                                    value={formData.notes}
                                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                                ></textarea>
                            </div>

                            <div className="bg-blue-50 p-6 rounded-2xl flex items-start space-x-4 rtl:space-x-reverse mb-8 border border-blue-100">
                                <CreditCard className="h-6 w-6 text-blue-600 mt-1" />
                                <div>
                                    <h4 className="font-bold text-blue-900">الدفع عند الخدمة</h4>
                                    <p className="text-sm text-blue-700 font-medium">لا يلزم الدفع الآن. ستدفع بعد إتمام الخدمة مباشرة.</p>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-blue-600 text-white py-4 rounded-2xl font-extrabold text-lg shadow-xl shadow-blue-100 hover:shadow-2xl hover:bg-blue-700 transition-all flex items-center justify-center disabled:opacity-70"
                            >
                                {submitting ? <Loader2 className="animate-spin h-6 w-6" /> : 'تأكيد طلب الحجز'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;
