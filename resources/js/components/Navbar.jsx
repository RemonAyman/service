import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
    Menu, X, User, ShoppingBag, LogOut, 
    Bell, Settings, LayoutDashboard, ChevronDown
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { user, logout, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
            setShowUserMenu(false);
        } catch (err) {
            console.error('Logout failed:', err);
        }
    };

    const navLinks = user?.role === 'admin' 
        ? [
            { name: 'لوحة الإدارة', path: '/admin' },
          ]
        : [
            { name: 'الرئيسية', path: '/' },
            { name: 'الخدمات', path: '/services' },
            { name: 'من نحن', path: '/about' }, // Changed from #about to /about
          ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${scrolled ? 'py-4 bg-white/80 backdrop-blur-xl shadow-xl' : 'py-6 bg-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-12">
                    {/* Logo */}
                    <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
                            <span className="text-2xl font-black">SP</span>
                        </div>
                        <span className="text-2xl font-black bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">
                            ServicesPlatform
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-10 rtl:space-x-reverse">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-sm font-black transition-all hover:text-blue-600 ${location.pathname === link.path ? 'text-blue-600' : 'text-gray-500'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div className="hidden lg:flex items-center space-x-6 rtl:space-x-reverse">
                        {authLoading ? (
                            <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                            </div>
                        ) : user ? (
                            <div className="relative">
                                <button 
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    className="flex items-center space-x-3 rtl:space-x-reverse bg-gray-50 p-1.5 pr-4 rounded-2xl hover:bg-gray-100 transition-all border border-gray-100"
                                >
                                    <div className="text-right">
                                        <div className="text-xs font-black text-gray-900 leading-none">{user.name}</div>
                                        <div className="text-[10px] text-blue-600 font-bold mt-1 uppercase tracking-tighter">{user.role || 'عميل'}</div>
                                    </div>
                                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                                        {user.name.charAt(0)}
                                    </div>
                                    <ChevronDown size={14} className={`text-gray-400 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                                </button>

                                <AnimatePresence>
                                    {showUserMenu && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                            className="absolute left-0 mt-4 w-60 bg-white rounded-3xl shadow-2xl border border-gray-50 p-3 z-50 overflow-hidden"
                                        >
                                            <div className="p-3 mb-2 bg-blue-50/50 rounded-2xl">
                                                <div className="text-sm font-black text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500 mt-1">{user.email}</div>
                                            </div>
                                            
                                            {user.role !== 'admin' && (
                                                <Link to="/dashboard" onClick={() => setShowUserMenu(false)} className="flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-slate-50 rounded-xl transition-colors font-bold text-sm text-gray-700">
                                                    <LayoutDashboard size={18} className="text-blue-500" />
                                                    <span>لوحة التحكم</span>
                                                </Link>
                                            )}

                                            <Link to="/profile" onClick={() => setShowUserMenu(false)} className="flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-slate-50 rounded-xl transition-colors font-bold text-sm text-gray-700">
                                                <User size={18} className="text-green-500" />
                                                <span>الملف الشخصي</span>
                                            </Link>
                                            
                                            {user.role === 'admin' && (
                                                <Link to="/admin" onClick={() => setShowUserMenu(false)} className="flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-slate-50 rounded-xl transition-colors font-bold text-sm text-gray-700">
                                                    <Settings size={18} className="text-indigo-500" />
                                                    <span>إدارة المنصة</span>
                                                </Link>
                                            )}
                                            
                                            <div className="h-0.5 bg-gray-50 my-2" />
                                            
                                            <button 
                                                onClick={handleLogout}
                                                className="w-full flex items-center space-x-3 rtl:space-x-reverse p-3 hover:bg-red-50 text-red-600 rounded-xl transition-colors font-bold text-sm"
                                            >
                                                <LogOut size={18} />
                                                <span>تسجيل الخروج</span>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-4 rtl:space-x-reverse">
                                <Link to="/login" className="text-sm font-black text-gray-600 hover:text-blue-600 transition-colors">
                                    دخول
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-gray-900 text-white px-8 py-3 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all shadow-xl shadow-gray-200"
                                >
                                    سجل الآن
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="lg:hidden p-2.5 bg-gray-50 rounded-xl text-gray-900"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-t border-gray-50 overflow-hidden shadow-2xl"
                    >
                        <div className="px-4 py-8 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="block text-2xl font-black text-gray-900 hover:text-blue-600 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="h-0.5 bg-gray-100" />
                            {!user ? (
                                <div className="grid grid-cols-2 gap-4">
                                    <Link to="/login" className="py-4 text-center font-black text-gray-600" onClick={() => setIsOpen(false)}>دخول</Link>
                                    <Link to="/register" className="py-4 text-center font-black bg-blue-600 text-white rounded-2xl" onClick={() => setIsOpen(false)}>سجل الآن</Link>
                                </div>
                            ) : (
                                <Link 
                                    to={user.role === 'admin' ? '/admin' : '/dashboard'} 
                                    className="block py-4 text-center font-black bg-gray-900 text-white rounded-2xl" 
                                    onClick={() => setIsOpen(false)}
                                >
                                    {user.role === 'admin' ? 'إدارة المنصة' : 'لوحة التحكم'}
                                </Link>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
