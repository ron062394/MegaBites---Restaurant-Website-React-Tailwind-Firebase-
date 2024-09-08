import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/user/Header';
import Homepage from './pages/user/Homepage';
import Footer from './components/user/Footer'; 
import Signin from './pages/user/Signin';
import Signup from './pages/user/Signup';
import Menu from './pages/user/Menu';
import NotFoundPage from './pages/NotFoundPage';
import { Navigate } from 'react-router-dom';
import Loading from './pages/Loading';
import Dashboard from './pages/admin/Dashboard';
import Product from './pages/user/Product';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import OrderSuccessful from './pages/user/OrderSuccessful';
import Careers from './pages/user/Careers';
import AboutUs from './pages/user/AboutUs';
import Contact from './pages/user/Contact';
import PrivacyPolicy from './pages/user/PrivacyPolicy';
import DataDeletion from './pages/user/DataDeletion';
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
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/not-found" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="/product" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-successful" element={<OrderSuccessful />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Dashboard />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </Router>

    </div>
  );
}

export default App;
