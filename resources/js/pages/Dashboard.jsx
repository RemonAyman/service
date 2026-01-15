import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import axios from 'axios';

const Dashboard = () => {
    const { user, loading: authLoading } = useAuth();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            fetchBookings();
        }
    }, [user]);

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`/servicerequests?user_id=${user.id}`);
            setBookings(response.data.serviceRequests?.data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex-grow flex items-center justify-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'accepted': return 'bg-blue-100 text-blue-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return <CheckCircle className="h-4 w-4" />;
            case 'accepted': return <CheckCircle className="h-4 w-4" />;
            case 'cancelled': return <XCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12" dir="rtl">
            <div className="mb-12">
                <h1 className="text-4xl font-black text-gray-900 mb-2">لوحة التحكم</h1>
                <p className="text-gray-500 text-lg font-medium">مرحباً بك، {user?.name} 👋 تابع حجوزاتك وحالة طلباتك هنا</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Stats */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-between">
                        <div>
                            <div className="text-gray-400 text-sm font-bold mb-1">إجمالي الحجوزات</div>
                            <div className="text-4xl font-black text-gray-900">{bookings.length}</div>
                        </div>
                        <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                            <Calendar size={32} />
                        </div>
                    </div>
                </div>

                {/* Bookings List */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-8 border-b border-gray-50 bg-gray-50/50">
                            <h2 className="text-2xl font-black text-gray-900">سجل الطلبات</h2>
                        </div>
                        
                        <div className="overflow-x-auto">
                            {bookings.length > 0 ? (
                                <table className="w-full text-right">
                                    <thead className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-50">
                                        <tr>
                                            <th className="px-8 py-5">الخدمة / الفني</th>
                                            <th className="px-8 py-5">الموعد المطلوب</th>
                                            <th className="px-8 py-5">المكان والتواصل</th>
                                            <th className="px-8 py-5">الحالة</th>
                                            <th className="px-8 py-5 text-left">التكلفة</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {bookings.map((booking) => (
                                            <tr key={booking.id} className="hover:bg-blue-50/10 transition-colors">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                                        <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                            {booking.service?.name?.charAt(0) || 'S'}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-gray-900">{booking.service?.name || 'خدمة عامة'}</div>
                                                            <div className="text-gray-400 text-xs font-bold uppercase">{booking.technician?.user?.name || 'فني محترف'}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="space-y-1">
                                                        <div className="flex items-center text-gray-900 font-bold text-sm">
                                                            <Calendar className="h-3.5 w-3.5 ml-2 text-blue-500" />
                                                            {booking.requested_date || 'غير محدد'}
                                                        </div>
                                                        <div className="flex items-center text-gray-500 font-medium text-xs">
                                                            <Clock className="h-3.5 w-3.5 ml-2 text-gray-400" />
                                                            {booking.requested_time || 'غير محدد'}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="max-w-[200px] truncate text-gray-900 font-bold text-sm mb-1" title={booking.address}>
                                                        {booking.address || 'لا يوجد عنوان'}
                                                    </div>
                                                    <div className="text-blue-600 font-bold text-xs">{booking.phone || 'بدون هاتف'}</div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold space-x-2 rtl:space-x-reverse ${getStatusColor(booking.status)}`}>
                                                        {getStatusIcon(booking.status)}
                                                        <span>{booking.status === 'pending' ? 'قيد المراجعة' : booking.status === 'accepted' ? 'تم القبول' : booking.status}</span>
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6 text-left">
                                                    <div className="text-lg font-black text-blue-600">
                                                        {booking.service?.price || booking.technician?.hourly_rate || '0'} 
                                                        <span className="text-[10px] text-gray-400 mr-1 font-bold">ج.م</span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center text-gray-400 font-bold">
                                    لا يوجد حجوزات حتى الآن.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
