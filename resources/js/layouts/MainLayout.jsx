import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col font-cairo bg-slate-50" dir="rtl">
            <Navbar />
            <main className="flex-grow pt-24">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
