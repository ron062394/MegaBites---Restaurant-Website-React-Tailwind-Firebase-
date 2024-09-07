import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/user/Header';
import Homepage from './pages/user/Homepage';
import Footer from './components/user/Footer'; 
import Signin from './pages/user/Signin';
import Signup from './pages/user/Signup';
import Menu from './components/user/Menu';
import NotFoundPage from './pages/NotFoundPage';
import { Navigate } from 'react-router-dom';
import Loading from './pages/Loading';

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
          {/* Add other routes here */}
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
