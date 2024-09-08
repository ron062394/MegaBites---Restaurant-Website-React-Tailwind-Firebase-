import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8">
      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="px-6 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <div className="prose prose-lg text-gray-700">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
            <p>
              Tonkotsu Corner ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by Tonkotsu Corner.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-4">Information We Collect</h2>
            <p>
              We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This may include your name, email address, phone number, and payment information.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-4">How We Use Your Information</h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, process your orders, and communicate with you about promotions and updates.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-4">Sharing of Information</h2>
            <p>
              We may share your information with third-party service providers to help us operate our business and provide our services to you. We may also share information to comply with legal obligations or to protect our rights.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-4">Your Choices</h2>
            <p>
              You can choose not to provide certain information, but this may limit your ability to use some features of our service. You can also opt-out of receiving promotional communications from us.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-4">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.
            </p>
            <h2 className="text-xl font-semibold mt-6 mb-4">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at privacy@tonkotsucorner.com.
            </p>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-100">
          <Link to="/" className="text-gray-600 hover:text-gray-900 transition duration-300">
            Return to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;
