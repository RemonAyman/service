import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
    LayoutGrid, Users, Settings, Plus, Edit, Trash2, 
    PieChart, Loader2, X, Image as ImageIcon, CheckCircle, 
    TrendingUp, Calendar, DollarSign, ChevronLeft, MoreVertical, Bell
} from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState('services');
    const [items, setItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Modal state
    const [showModal, setShowModal] = useState(false);
    const [modalType, setModalType] = useState('service');
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({});
    const [stats, setStats] = useState(null);

    useEffect(() => {
        // Fetch data for all tabs including stats
        fetchData();
        
        if (activeTab === 'services' || activeTab === 'stats') {
            fetchCategories();
        }
    }, [activeTab]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const endpoint = activeTab === 'services' ? '/services' : 
                            activeTab === 'categories' ? '/cats' : 
                            activeTab === 'users' ? '/users' : '/admin/stats';
            
            // Explicitly request JSON to trigger wantsJson() in controller
            const response = await axios.get(endpoint, {
                headers: { 'Accept': 'application/json' }
            });
            
            if (activeTab === 'services') {
               // Handle both paginated and non-paginated responses safely
               const data = response.data.services?.data || response.data.services || [];
               setItems(data);
            }
            else if (activeTab === 'categories') setItems(response.data.categories);
            else if (activeTab === 'users') setItems(response.data.users);
            else if (activeTab === 'stats') setStats(response.data);
            
        } catch (err) {
            console.error(err);
            const errMsg = err.response?.data?.message || err.message || 'فشل تحميل البيانات.';
            toast.error(`خطأ: ${errMsg}`);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const res = await axios.get('/cats');
            setCategories(res.data.categories || []);
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('هل أنت متأكد من حذف هذا العنصر؟ سيتم الحذف من قاعدة البيانات مباشرة.')) return;
        
        try {
            let endpoint;
            if (activeTab === 'services') endpoint = `/servicedelete/${id}`;
            else if (activeTab === 'categories') endpoint = `/catdelete/${id}`;
            else endpoint = `/userdelete/${id}`;
            
            await axios.get(endpoint);
            setItems(items.filter(item => item.id !== id));
            toast.success('تم الحذف بنجاح من الـ SQL');
        } catch (err) {
            toast.error('حدث خطأ أثناء الحذف.');
        }
    };

    const handleOpenModal = (type, item = null) => {
        setModalType(type);
        setEditingItem(item);
        if (item) {
            setFormData({ ...item });
        } else {
            setFormData({}); // Remove manual ID generation
        }
        setShowModal(true);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const endpoint = editingItem 
            ? (modalType === 'service' ? '/serviceupdate' : '/catupdate')
            : (modalType === 'service' ? '/servicestore' : '/catstore');
            
        const data = { ...formData };
        if (editingItem) data.old_id = editingItem.id;

        try {
            await axios.post(endpoint, data);
            toast.success(editingItem ? 'تم التحديث في قاعدة البيانات' : 'تم الإضافة بنجاح');
            setShowModal(false);
            // Small timeout to ensure DB commit is visible
            setTimeout(() => fetchData(), 200);
        } catch (err) {
            toast.error('فشل حفظ البيانات. راجع مدخلات SQL.');
        }
    };

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-cairo" dir="rtl">
                <div className="text-center bg-white p-16 rounded-[3rem] shadow-2xl border border-gray-100 max-w-lg">
                    <div className="text-red-500 mb-8 flex justify-center"><div className="p-6 bg-red-50 rounded-full"><Settings className="h-16 w-16" /></div></div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4">الدخول للمسؤولين فقط</h2>
                    <p className="text-gray-500 font-bold text-lg leading-relaxed">عفواً، ليس لديك الصلاحيات الكافية للوصول إلى لوحة التحكم الإدارية.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-white font-cairo overflow-hidden" dir="rtl">
            {/* Elegant Sidebar */}
            <aside className="w-80 bg-slate-900 flex flex-col p-8 shrink-0">
                <div className="mb-14 px-4 flex items-center space-x-3 rtl:space-x-reverse">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black">SP</div>
                    <h2 className="text-xl font-black text-white">لوحة الإدارة</h2>
                </div>
                
                <nav className="flex-grow space-y-3">
                    <AdminSidebarItem icon={<PieChart />} label="الإحصائيات العامة" active={activeTab === 'stats'} onClick={() => setActiveTab('stats')} />
                    <AdminSidebarItem icon={<LayoutGrid />} label="كتالوج الخدمات" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
                    <AdminSidebarItem icon={<Settings />} label="تصنيفات النظام" active={activeTab === 'categories'} onClick={() => setActiveTab('categories')} />
                    <AdminSidebarItem icon={<Users />} label="قاعدة المستخدمين" active={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                </nav>

                <div className="mt-auto p-6 bg-slate-800/50 rounded-3xl border border-slate-700">
                    <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2">تسجيل الدخول كـ</div>
                    <div className="text-white font-black truncate">{user.name}</div>
                </div>
            </aside>

            {/* Main Admin Area */}
            <main className="flex-grow flex flex-col overflow-hidden bg-slate-50/50">
                <header className="h-24 bg-white border-b border-gray-100 px-12 flex items-center justify-between shrink-0">
                    <div className="flex flex-col">
                        <h1 className="text-2xl font-black text-gray-900">
                             {activeTab === 'stats' ? 'نظرة عامة على النظام' : 
                              activeTab === 'services' ? 'إدارة الخدمات' : 
                              activeTab === 'categories' ? 'إدارة التصنيفات' : 'مدير المستخدمين'}
                        </h1>
                        <p className="text-blue-600 font-black text-sm uppercase tracking-[0.2em] mt-1">Welcome Sir, {user.name} 👑</p>
                    </div>
                    
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                         {(activeTab === 'services' || activeTab === 'categories') && (
                            <button 
                                onClick={() => handleOpenModal(activeTab === 'services' ? 'service' : 'category')}
                                className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black flex items-center space-x-3 rtl:space-x-reverse shadow-xl hover:shadow-blue-200 transition-all active:scale-95"
                            >
                                <Plus size={20} />
                                <span>إضافة {activeTab === 'services' ? 'خدمة' : 'تصنيف'}</span>
                            </button>
                        )}
                        <div className="w-px h-8 bg-gray-100 mx-2" />
                        <button className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 hover:text-blue-600 transition-colors">
                            <Bell size={22} />
                        </button>
                    </div>
                </header>

                <div className="flex-grow p-12 overflow-auto">
                    <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {activeTab === 'stats' ? (
                            <AdminStatsView stats={stats} loading={loading} />
                        ) : loading ? (
                            <div className="flex flex-col justify-center items-center h-96 space-y-6">
                                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                                <div className="text-lg font-black text-gray-400">جاري جلب البيانات من SQL...</div>
                            </div>
                        ) : (
                            <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
                                <table className="w-full text-right border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50/50 border-b border-gray-50">
                                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest">العنصر</th>
                                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-center">التفاصيل</th>
                                            <th className="px-8 py-6 text-xs font-black text-gray-400 uppercase tracking-widest text-left">العمليات</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-50">
                                        {items.map((item) => (
                                            <tr key={item.id} className="group hover:bg-slate-50/80 transition-all">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                                        <div className="w-14 h-14 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-300 group-hover:bg-white transition-colors overflow-hidden border border-gray-50">
                                                            {item.image ? <img src={item.image} alt="" className="w-full h-full object-cover" /> : <ImageIcon size={24} />}
                                                        </div>
                                                        <div>
                                                            <div className="font-black text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</div>
                                                            <div className="text-xs text-gray-400 font-bold mt-1 tracking-widest uppercase">ID: {item.id}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6 text-center">
                                                    {activeTab === 'users' ? (
                                                        <div className="flex flex-col items-center space-y-2">
                                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                                                item.role === 'admin' ? 'bg-red-100 text-red-700' :
                                                                item.role === 'technician' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                                                            }`}>
                                                                {item.role === 'admin' ? 'مسؤول' : item.role === 'technician' ? 'مقدم خدمة' : 'عميل'}
                                                            </span>
                                                            <div className="flex items-center space-x-2 rtl:space-x-reverse text-[10px] font-bold text-gray-400">
                                                                <span>📦 {item.stats?.total_requests || 0}</span>
                                                                <span className="text-gray-200">|</span>
                                                                <span className="text-yellow-600">⌛ {item.stats?.pending || 0}</span>
                                                                <span className="text-gray-200">|</span>
                                                                <span className="text-green-600">✅ {item.stats?.completed || 0}</span>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <span className="inline-block px-4 py-2 bg-slate-100 rounded-xl text-slate-700 font-black text-sm">
                                                            {activeTab === 'services' ? `${item.price} ج.م` : item.description}
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-8 py-6">
                                                    <div className="flex justify-end space-x-3 rtl:space-x-reverse">
                                                        {(activeTab === 'services' || activeTab === 'categories') && (
                                                            <button 
                                                                onClick={() => handleOpenModal(activeTab === 'services' ? 'service' : 'category', item)}
                                                                className="w-10 h-10 flex items-center justify-center text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all shadow-sm bg-blue-50"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                        )}
                                                        <button 
                                                            onClick={() => handleDelete(item.id)}
                                                            className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all shadow-sm bg-red-50"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </motion.div>
                </div>
            </main>

            {/* Premium Modal Backdrop */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                            onClick={() => setShowModal(false)}
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, rotateX: 10 }}
                            animate={{ scale: 1, opacity: 1, rotateX: 0 }}
                            exit={{ scale: 0.9, opacity: 0, rotateX: 10 }}
                            className="bg-white rounded-[3rem] shadow-2xl w-full max-w-xl p-10 relative z-10 border border-white/20"
                        >
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-3xl font-black text-gray-900">
                                        {editingItem ? 'تحديث البيانات' : 'إضافة عنصر جديد'}
                                    </h3>
                                    <p className="text-gray-400 font-medium mt-1">المعالجة فورية في قاعدة البيانات</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 hover:text-red-500 transition-all hover:rotate-90">
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleFormSubmit} className="space-y-8">
                                <div className="grid grid-cols-2 gap-6">
                                    {/* <AdminInput label="الرقم التعريفي (ID)" value={formData.id} onChange={(v) => setFormData({...formData, id: v})} type="number" /> */}
                                    <div className="col-span-2">
                                         <AdminInput label="الاسم" value={formData.name} onChange={(v) => setFormData({...formData, name: v})} />
                                    </div>
                                </div>

                                {modalType === 'service' && (
                                    <>
                                        <div className="grid grid-cols-2 gap-6">
                                            <AdminInput label="السعر" value={formData.price} onChange={(v) => setFormData({...formData, price: v})} type="number" />
                                            <AdminInput label="وقت الخدمة" value={formData.estimated_time || ''} onChange={(v) => setFormData({...formData, estimated_time: v})} placeholder="مثلاً: 2 ساعة" />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">التصنيف الرئيسي</label>
                                            <select 
                                                required
                                                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none font-bold bg-slate-50/50 appearance-none text-gray-700"
                                                value={formData.category_id || ''}
                                                onChange={(e) => setFormData({...formData, category_id: e.target.value})}
                                            >
                                                <option value="">اختر من القائمة</option>
                                                {categories.map(cat => (
                                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </>
                                )}

                                <div>
                                    <label className="block text-xs font-black text-gray-400 mb-3 uppercase tracking-widest">الوصف الكامل</label>
                                    <textarea 
                                        required
                                        className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none min-h-[120px] font-medium bg-slate-50/50"
                                        value={formData.description || ''}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    />
                                </div>

                                <button className="w-full bg-gray-900 border-b-4 border-gray-600 text-white py-5 rounded-[2rem] font-black text-xl shadow-2xl hover:bg-blue-600 hover:border-blue-800 transition-all active:translate-y-1 active:border-b-0">
                                    {editingItem ? 'حفظ التغييرات' : 'إضافة الخدمة الآن'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

const AdminSidebarItem = ({ icon, label, active, onClick }) => (
    <button 
        onClick={onClick}
        className={`flex items-center space-x-3 rtl:space-x-reverse px-6 py-4 rounded-2xl font-black transition-all w-full text-right ${active ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/40' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
    >
        <span className={active ? 'text-white' : 'text-slate-500'}>{icon}</span>
        <span className="text-sm tracking-wide">{label}</span>
        {active && <ChevronLeft className="mr-auto" size={16} />}
    </button>
);

const AdminStatsView = ({ stats, loading }) => {
    if (loading) return (
        <div className="flex justify-center items-center h-64">
             <Loader2 className="h-10 w-10 text-blue-600 animate-spin" />
        </div>
    );

    if (!stats) return (
        <div className="flex flex-col justify-center items-center h-64 text-red-500">
             <div className="bg-red-50 p-4 rounded-full mb-3"><X size={32} /></div>
             <div className="font-bold text-lg">فشل تحميل الإحصائيات</div>
             <p className="text-sm opacity-70 mt-1">يرجى المحاولة مرة أخرى أو التحقق من السجلات</p>
        </div>
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatCard icon={<LayoutGrid className="text-blue-600" />} label="إجمالي الخدمات" value={stats.total_services} trend="خدمة مسجلة" color="blue" />
            <StatCard icon={<Users className="text-indigo-600" />} label="المستخدمين النشطين" value={stats.active_users} trend="عضو فعال" color="indigo" />
            <StatCard icon={<DollarSign className="text-emerald-600" />} label="إيرادات اليوم" value={stats.todays_revenue} trend="ج.م" color="emerald" />
            <StatCard icon={<Calendar className="text-amber-600" />} label="حجوزات معلقة" value={stats.pending_bookings} trend="تحتاج موافقة" color="amber" />
            
            <div className="md:col-span-4 bg-white p-12 rounded-[3rem] shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h3 className="text-2xl font-black text-gray-900">آخر التحركات في النظام</h3>
                        <p className="text-gray-400 font-bold mt-1">تحديثات مباشرة من قاعدة بيانات SQL</p>
                    </div>
                    {/* <button className="text-blue-600 font-black hover:underline">مشاهدة السجل الكامل</button> */}
                </div>
                
                <div className="space-y-6">
                    {stats.recent_activities && stats.recent_activities.length > 0 ? (
                        stats.recent_activities.map((activity) => (
                            <div key={activity.id} className="flex items-center justify-between p-6 bg-slate-50/50 rounded-3xl group hover:bg-white border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600 shadow-inner group-hover:rotate-6 transition-transform"><Calendar size={24} /></div>
                                    <div>
                                        <div className="font-black text-gray-900">طلب حجز جديد (#{activity.id})</div>
                                        <div className="text-xs text-gray-400 font-bold mt-1">بواسطة: {activity.user_name} • {activity.created_at_human}</div>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                    <span className={`px-5 py-2 rounded-full text-xs font-black ring-4 ring-white ${
                                        activity.status === 'pending' ? 'bg-amber-100 text-amber-700' : 
                                        activity.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                    }`}>
                                        {activity.status === 'pending' ? 'قيد المراجعة' : activity.status}
                                    </span>
                                    {/* <MoreVertical className="text-gray-300" size={20} /> */}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-400 py-10 font-bold">لا توجد تحركات حديثة</div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, trend, color }) => (
    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative group overflow-hidden">
        <div className={`absolute top-0 left-0 w-2 h-full bg-${color}-500/20 group-hover:w-full transition-all duration-700 -z-10`} />
        <div className="flex justify-between items-start mb-6">
            <div className={`bg-${color}-50 p-4 rounded-2xl shadow-inner`}>{icon}</div>
            <span className={`text-[10px] font-black tracking-widest bg-${color}-50 text-${color}-600 px-3 py-1.5 rounded-full uppercase`}>{trend}</span>
        </div>
        <div className="text-gray-400 text-sm font-black tracking-[0.1em] uppercase mb-1">{label}</div>
        <div className="text-3xl font-black text-gray-900">{value}</div>
    </div>
);

const AdminInput = ({ label, value, onChange, type = "text", placeholder }) => (
    <div className="flex-1">
        <label className="block text-xs font-black text-gray-400 mb-3 uppercase tracking-widest ml-1">{label}</label>
        <input 
            type={type} required
            placeholder={placeholder}
            className="w-full px-6 py-4 rounded-2xl border-2 border-slate-100 focus:border-blue-600 outline-none font-bold bg-slate-50/50 transition-all shadow-inner"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
        />
    </div>
);

export default AdminDashboard;
