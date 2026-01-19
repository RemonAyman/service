import './bootstrap';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Layouts
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/ProtectedRoute';

// Toast
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import Home from './pages/Home';
import Services from './pages/Services';
import Login from './pages/Login';
import RegisterChoice from './pages/RegisterChoice';
import RegisterClient from './pages/RegisterClient';
import RegisterTechnician from './pages/RegisterTechnician';
import About from './pages/About'; // Import About
import Dashboard from './pages/Dashboard';
import Booking from './pages/Booking';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import CategoryTechnicians from './pages/CategoryTechnicians';
import TechnicianProfile from './pages/TechnicianProfile';

const PageWrapper = ({ children }) => (
    <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3 }}
    >
        {children}
    </motion.div>
);

function AppContent() {
    const location = useLocation();
    
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<MainLayout />}>
                    <Route index element={<PageWrapper><Home /></PageWrapper>} />
                    <Route path="category/:categoryId/technicians" element={<PageWrapper><CategoryTechnicians /></PageWrapper>} />
                    <Route path="technician/:id" element={<PageWrapper><TechnicianProfile /></PageWrapper>} />
                    <Route path="services" element={<PageWrapper><Services /></PageWrapper>} />
                    <Route path="login" element={<PageWrapper><Login /></PageWrapper>} />
                    
                    {/* New Separate Registration Routes */}
                    <Route path="register" element={<PageWrapper><RegisterChoice /></PageWrapper>} />
                    <Route path="register/client" element={<PageWrapper><RegisterClient /></PageWrapper>} />
                    <Route path="register/technician" element={<PageWrapper><RegisterTechnician /></PageWrapper>} />
                    <Route path="about" element={<PageWrapper><About /></PageWrapper>} /> {/* Added Route */}
                    
                    <Route path="dashboard" element={
                        <ProtectedRoute>
                            <PageWrapper><Dashboard /></PageWrapper>
                        </ProtectedRoute>
                    } />
                    <Route path="booking" element={
                        <ProtectedRoute>
                            <PageWrapper><Booking /></PageWrapper>
                        </ProtectedRoute>
                    } />
                    <Route path="profile" element={
                        <ProtectedRoute>
                            <PageWrapper><Profile /></PageWrapper>
                        </ProtectedRoute>
                    } />
                    <Route path="admin" element={
                        <ProtectedRoute adminOnly={true}>
                            <PageWrapper><AdminDashboard /></PageWrapper>
                        </ProtectedRoute>
                    } />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <AuthProvider>
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <AppContent />
                <ToastContainer position="top-center" rtl={true} />
            </BrowserRouter>
        </AuthProvider>
    );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
