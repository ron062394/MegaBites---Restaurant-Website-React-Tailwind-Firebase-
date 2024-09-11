import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/authContext';
import { CartContextProvider } from './context/cartContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';



const stripePromise = loadStripe("pk_test_51PxuOcGO06YI3OvuZYnw39Vf4w0gGP6rZKdgvTVUbw4yAD4LapMfARzV60ApNp0OLH3dBSYboT51GqHAHSrM8u9R00rNy9QLih");
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <AuthContextProvider>
      <CartContextProvider>
      <App />
      </CartContextProvider>
    </AuthContextProvider>
    </Elements>
  </React.StrictMode>
);

