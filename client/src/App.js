import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import './App.css';

// User Components
import Header from './components/user/Header';
import Footer from './components/user/Footer';

// User Pages
import Homepage from './pages/user/Homepage';
import Signin from './pages/user/Signin';
import Signup from './pages/user/Signup';
import Menu from './pages/user/Menu';
import Product from './pages/user/Product';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import OrderSuccessful from './pages/user/OrderSuccessful';
import Careers from './pages/user/Careers';
import AboutUs from './pages/user/AboutUs';
import Contact from './pages/user/Contact';
import PrivacyPolicy from './pages/user/PrivacyPolicy';
import DataDeletion from './pages/user/DataDeletion';
import Profile from './pages/user/Profile';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import AdminLogin from './pages/admin/AdminLogin';

// Utility Pages
import NotFoundPage from './pages/NotFoundPage';
import Loading from './pages/Loading';

// Hooks
import { useAuthContext } from './hooks/useAuthContext';

function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const { user } = useAuthContext();

  // Protected route for authenticated users
  const ProtectedRoute = ({ children }) => {
    if (!user) {
      return <Navigate to="/sign-in" replace />;
    }
    return children;
  };

  // Protected route for admin users
  const AdminProtectedRoute = ({ children }) => {
    if (!user || !user.isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  };

  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/data-deletion" element={<DataDeletion />} />

        {/* Protected user routes */}
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/order-successful/:id" element={<ProtectedRoute><OrderSuccessful /></ProtectedRoute>} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} /> 
        <Route path="/admin" element={<AdminProtectedRoute><Dashboard /></AdminProtectedRoute>} />

        {/* Utility routes */}
        <Route path="/loading" element={<Loading />} />
        <Route path="/not-found" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    window.onload = () => {
      setIsLoading(false);
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        <AppContent />
      </Router>
    </div>
  );
}

export default App;
