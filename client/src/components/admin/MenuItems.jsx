import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      // Mock data
      const mockMenuItems = [
        { id: 1, name: 'Classic Tonkotsu Ramen', description: 'Rich pork broth with tender chashu', price: 12.99, category: 'Ramen' },
        { id: 2, name: 'Spicy Miso Ramen', description: 'Spicy miso-based broth with ground pork', price: 13.99, category: 'Ramen' },
        { id: 3, name: 'Vegetarian Ramen', description: 'Mushroom-based broth with tofu and vegetables', price: 11.99, category: 'Ramen' },
        { id: 4, name: 'Chicken Karaage', description: 'Japanese-style fried chicken', price: 7.99, category: 'Sides' },
        { id: 5, name: 'Gyoza', description: 'Pan-fried pork dumplings', price: 6.99, category: 'Sides' },
        { id: 6, name: 'Matcha Ice Cream', description: 'Green tea flavored ice cream', price: 4.99, category: 'Desserts' },
        { id: 7, name: 'Green Tea', description: 'Traditional Japanese green tea', price: 2.99, category: 'Drinks' },
        { id: 8, name: 'Ramune', description: 'Japanese carbonated soft drink', price: 3.99, category: 'Drinks' },
      ];
      setMenuItems(mockMenuItems);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch menu items');
      setLoading(false);
    }
  };

  const handleAddItem = () => {
    // Implement add item functionality
    toast.info('Add item functionality to be implemented');
  };

  const handleEditItem = (id) => {
    // Implement edit item functionality
    toast.info(`Edit item ${id} functionality to be implemented`);
  };

  const handleDeleteItem = (id) => {
    // Implement delete item functionality
    toast.info(`Delete item ${id} functionality to be implemented`);
  };

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredMenuItems = activeCategory === 'All'
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        className="text-3xl font-bold mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Menu Items
      </motion.h1>
      <motion.button
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 flex items-center"
        onClick={handleAddItem}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus className="mr-2" /> Add New Item
      </motion.button>
      <div className="mb-6">
        {categories.map(category => (
          <button
            key={category}
            className={`mr-2 px-4 py-2 rounded ${activeCategory === category ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        {filteredMenuItems.map((item) => (
          <motion.div
            key={item.id}
            className="bg-white rounded-lg shadow-md p-4"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
            <p className="text-gray-600 mb-2">{item.description}</p>
            <p className="text-lg font-bold mb-4">${item.price.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mb-2">Category: {item.category}</p>
            <div className="flex justify-end">
              <button
                className="text-blue-500 mr-2"
                onClick={() => handleEditItem(item.id)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500"
                onClick={() => handleDeleteItem(item.id)}
              >
                <FaTrash />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <ToastContainer />
    </div>
  );
};

export default MenuItems;
