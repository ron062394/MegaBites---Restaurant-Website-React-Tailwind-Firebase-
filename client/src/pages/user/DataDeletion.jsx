import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const DataDeletion = () => {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Data Deletion Instructions</h1>
          <div className="prose prose-lg text-gray-700">
            <p>
              To delete your data from our servers, please follow these steps:
            </p>
            <ol className="list-decimal list-inside">
              <li>Log in to your account</li>
              <li>Go to your account settings</li>
              <li>Click on the "Delete Account" option</li>
              <li>Confirm your decision by entering your password</li>
              <li>Click "Permanently Delete My Account"</li>
            </ol>
            <p>
              Please note that this action is irreversible and will permanently delete all your data associated with your account, including your order history, saved preferences, and personal information.
            </p>
            <p>
              If you're having trouble deleting your account or have any questions about our data deletion process, please contact our support team at support@tonkotsucorner.com.
            </p>
            <p>
              We are committed to protecting your privacy and complying with data protection regulations. Your request for data deletion will be processed in accordance with applicable laws.
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

export default DataDeletion;
