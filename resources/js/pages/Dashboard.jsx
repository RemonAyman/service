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
            const response = await axios.get('/servicerequests');
            // Filter bookings for current user if backend doesn't do it automatically
            const userData = response.data.serviceRequests?.data || [];
            setBookings(userData.filter(b => b.user_id === user.id));
        } catch (err) {
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    if (authLoading || loading) {
        return (
            <div className="flex-grow flex items-center justify-center">
                <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
            </div>
        );
    }

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return <CheckCircle className="h-4 w-4" />;
            case 'cancelled': return <XCircle className="h-4 w-4" />;
            default: return <Clock className="h-4 w-4" />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="mb-12">
                <h1 className="text-3xl font-extrabold text-gray-900 border-r-4 border-blue-600 pr-4">لوحة التحكم</h1>
                <p className="text-gray-500 mt-2 pr-4 font-medium">مرحباً بك، {user?.name}</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Stats */}
                <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                        <div className="text-gray-400 text-sm font-bold mb-1">إجمالي الحجوزات</div>
                        <div className="text-3xl font-extrabold text-gray-900">{bookings.length}</div>
                    </div>
                </div>

                {/* Bookings Table/List */}
                <div className="lg:col-span-3 bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <h2 className="text-xl font-extrabold text-gray-900">حجوزاتي الأخيرة</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        {bookings.length > 0 ? (
                            <table className="w-full text-right">
                                <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                                    <tr>
                                        <th className="px-6 py-4">الخدمة</th>
                                        <th className="px-6 py-4">التاريخ</th>
                                        <th className="px-6 py-4">الحالة</th>
                                        <th className="px-6 py-4">السعر</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {bookings.map((booking) => (
                                        <tr key={booking.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-6 py-5">
                                                <div className="font-bold text-gray-900">{booking.service?.name || 'خدمة'}</div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <div className="flex items-center text-gray-600 text-sm font-medium">
                                                    <Calendar className="h-4 w-4 ml-2 text-gray-400" />
                                                    {new Date(booking.created_at).toLocaleDateString('ar-EG')}
                                                </div>
                                            </td>
                                            <td className="px-6 py-5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold space-x-1 rtl:space-x-reverse ${getStatusColor(booking.status)}`}>
                                                    {getStatusIcon(booking.status)}
                                                    <span>{booking.status || 'قيد الانتظار'}</span>
                                                </span>
                                            </td>
                                            <td className="px-6 py-5 font-bold text-gray-900">
                                                {booking.service?.price || '0'} ج.م
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
    );
};

export default Dashboard;
