import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    Calendar, Clock, CheckCircle, XCircle, 
    AlertCircle, Loader2, MapPin, Phone, 
    User as UserIcon, Check, X, ClipboardList
} from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';

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
            setLoading(true);
            let url = '/servicerequests';
            if (user.role === 'technician') {
                if (user.technician) {
                    url += `?technician_id=${user.technician.id}`;
                } else {
                    toast.error('لم يتم العثور على بيانات فني لهذا الحساب');
                    setLoading(false);
                    return;
                }
            } else {
                url += `?user_id=${user.id}`;
            }
            const response = await axios.get(url);
            setBookings(response.data.serviceRequests?.data || []);
        } catch (err) {
            console.error('Error fetching bookings:', err);
            toast.error('فشل في تحميل البيانات');
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (bookingId, newStatus) => {
        try {
            await axios.post('/servicerequestupdate', {
                old_id: bookingId,
                status: newStatus
            });
            toast.success(`تم ${newStatus === 'accepted' ? 'قبول' : 'رفض'} الطلب بنجاح`);
            fetchBookings(); // Refresh data
        } catch (err) {
            toast.error('فشل تحديث حالة الطلب');
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
            case 'rejected': return 'bg-red-100 text-red-700';
            case 'cancelled': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getStatusLabel = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'مكتمل';
            case 'accepted': return 'مقبول';
            case 'pending': return 'قيد الانتظار';
            case 'rejected': return 'مرفوض';
            case 'cancelled': return 'ملغي';
            default: return status;
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 font-cairo" dir="rtl">
            <div className="mb-12 flex justify-between items-center">
                <div>
                    <h1 className="text-4xl font-black text-gray-900 mb-2">
                        {user.role === 'technician' ? 'لوحة تحكم الفني' : 'لوحة التحكم'}
                    </h1>
                    <p className="text-gray-500 text-lg font-medium">
                        مرحباً بك، {user?.name} 👋 {user.role === 'technician' ? 'تابع طلبات الخدمة المرسلة إليك' : 'تابع حجوزاتك وحالة طلباتك هنا'}
                    </p>
                </div>
                {user.role === 'technician' && (
                    <div className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center space-x-3 rtl:space-x-reverse shadow-lg">
                        <ClipboardList size={20} />
                        <span>{bookings.filter(b => b.status === 'pending').length} طلبات جديدة</span>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <StatCard title="إجمالي الحجوزات" value={bookings.length} icon={<Calendar size={24} />} color="blue" />
                <StatCard title="طلبات مكتملة" value={bookings.filter(b => b.status === 'completed').length} icon={<CheckCircle size={24} />} color="green" />
                <StatCard title="قيد الانتظار" value={bookings.filter(b => b.status === 'pending').length} icon={<Clock size={24} />} color="yellow" />
            </div>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-8 border-b border-gray-50 bg-gray-50/50 flex justify-between items-center">
                    <h2 className="text-2xl font-black text-gray-900">سجل الطلبات</h2>
                    <button onClick={fetchBookings} className="text-blue-600 font-bold hover:underline text-sm">تحديث القائمة</button>
                </div>
                
                <div className="overflow-x-auto">
                    {bookings.length > 0 ? (
                        <table className="w-full text-right">
                            <thead className="bg-gray-50/50 text-gray-400 text-xs font-bold uppercase tracking-widest border-b border-gray-50">
                                <tr>
                                    <th className="px-8 py-5">{user.role === 'technician' ? 'العميل' : 'الفني / الخدمة'}</th>
                                    <th className="px-8 py-5">الموعد</th>
                                    <th className="px-8 py-5">المكان / التواصل</th>
                                    <th className="px-8 py-5">الحالة</th>
                                    <th className="px-8 py-5">الإجراءات</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {bookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-blue-50/10 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                                                    {(user.role === 'technician' ? booking.user?.name : booking.technician?.user?.name)?.charAt(0) || 'U'}
                                                </div>
                                                <div>
                                                    <div className="font-black text-gray-900">
                                                        {user.role === 'technician' ? booking.user?.name : booking.service?.name}
                                                    </div>
                                                    <div className="text-gray-400 text-xs font-bold">
                                                        {user.role === 'technician' ? 'عميل' : booking.technician?.user?.name || 'فني محترف'}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="space-y-1">
                                                <div className="flex items-center text-gray-900 font-bold text-sm">
                                                    {booking.requested_date}
                                                </div>
                                                <div className="text-gray-400 text-xs">{booking.requested_time}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-bold text-gray-900 flex items-center">
                                                <MapPin size={14} className="ml-1 text-gray-400" />
                                                {booking.address}
                                            </div>
                                            <div className="text-xs text-blue-600 font-bold mt-1 flex items-center">
                                                <Phone size={14} className="ml-1" />
                                                {booking.phone}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-4 py-1.5 rounded-xl text-xs font-bold ${getStatusColor(booking.status)}`}>
                                                {getStatusLabel(booking.status)}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            {user.role === 'technician' && booking.status === 'pending' ? (
                                                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                                                    <button 
                                                        onClick={() => handleUpdateStatus(booking.id, 'accepted')}
                                                        className="bg-green-600 text-white p-2 rounded-xl hover:bg-green-700 transition-all shadow-lg shadow-green-100"
                                                        title="قبول"
                                                    >
                                                        <Check size={18} />
                                                    </button>
                                                    <button 
                                                        onClick={() => handleUpdateStatus(booking.id, 'rejected')}
                                                        className="bg-red-600 text-white p-2 rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-red-100"
                                                        title="رفض"
                                                    >
                                                        <X size={18} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <span className="text-gray-400 text-xs font-medium italic">لا توجد إجراءات</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-20 text-center">
                            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300">
                                <ClipboardList size={40} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-400">لا توجد سجلات حتى الآن</h3>
                            <p className="text-gray-400 mt-2">بمجرد توفر طلبات جديدة، ستظهر هنا.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon, color }) => {
    const colors = {
        blue: 'bg-blue-50 text-blue-600',
        green: 'bg-green-50 text-green-600',
        yellow: 'bg-yellow-50 text-yellow-600',
    };
    return (
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center justify-between">
            <div>
                <div className="text-gray-400 text-sm font-bold mb-1">{title}</div>
                <div className="text-4xl font-black text-gray-900">{value}</div>
            </div>
            <div className={`w-16 h-16 ${colors[color]} rounded-2xl flex items-center justify-center`}>
                {icon}
            </div>
        </div>
    );
};

export default Dashboard;
