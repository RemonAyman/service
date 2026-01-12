import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <Link to="/" className="text-2xl font-bold text-white">
                            ServicesPlatform
                        </Link>
                        <p className="text-gray-400 leading-relaxed">
                            نحن نوفر لك أفضل الخدمات المنزلية بضغطة زر. جودة عالية، أسعار تنافسية، وفريق محترف.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">روابط سريعة</h4>
                        <ul className="space-y-4">
                            <li><Link to="/" className="hover:text-blue-500 transition-colors">الرئيسية</Link></li>
                            <li><Link to="/services" className="hover:text-blue-500 transition-colors">جميع الخدمات</Link></li>
                            <li><Link to="/about" className="hover:text-blue-500 transition-colors">من نحن</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">اتصل بنا</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <Phone className="h-5 w-5 text-blue-500" />
                                <span>+20 123 456 789</span>
                            </li>
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <Mail className="h-5 w-5 text-blue-500" />
                                <span>info@servicesplatform.com</span>
                            </li>
                            <li className="flex items-center space-x-3 rtl:space-x-reverse">
                                <MapPin className="h-5 w-5 text-blue-500" />
                                <span>القاهرة، مصر</span>
                            </li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h4 className="text-white font-bold text-lg mb-6">تابعنا</h4>
                        <div className="flex space-x-4 rtl:space-x-reverse">
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-600 transition-all">
                                <Facebook className="h-5 w-5" />
                            </a>
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-blue-400 transition-all">
                                <Twitter className="h-5 w-5" />
                            </a>
                            <a href="#" className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-all">
                                <Instagram className="h-5 w-5" />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500 font-medium">
                    &copy; {new Date().getFullYear()} ServicesPlatform. جميع الحقوق محفوظة.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
