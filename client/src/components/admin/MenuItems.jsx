import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSort } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockMenuItems = [
        { id: 1, name: 'Classic Tonkotsu Ramen', description: 'Rich pork broth with tender chashu', price: 12.99, category: 'Ramen', image: 'https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp' },
        { id: 2, name: 'Spicy Miso Ramen', description: 'Spicy miso-based broth with ground pork', price: 13.99, category: 'Ramen', image: 'https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp' },
        { id: 3, name: 'Vegetarian Ramen', description: 'Mushroom-based broth with tofu and vegetables', price: 11.99, category: 'Ramen', image: 'https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp' },
        { id: 4, name: 'Chicken Karaage', description: 'Japanese-style fried chicken', price: 7.99, category: 'Sides', image: 'https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp' },
        { id: 5, name: 'Gyoza', description: 'Pan-fried pork dumplings', price: 6.99, category: 'Sides', image: 'https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp' },
        { id: 6, name: 'Matcha Ice Cream', description: 'Green tea flavored ice cream', price: 4.99, category: 'Desserts', image: 'https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp' },
        { id: 7, name: 'Green Tea', description: 'Traditional Japanese green tea', price: 2.99, category: 'Drinks', image: 'https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp' },
        { id: 8, name: 'Ramune', description: 'Japanese carbonated soft drink', price: 3.99, category: 'Drinks', image: 'https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp' },
      ];
      setMenuItems(mockMenuItems);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch menu items');
      setLoading(false);
      toast.error('Failed to fetch menu items. Please try again.');
    }
  };

  const handleAddItem = () => {
    toast.info('Add item functionality to be implemented');
  };

  const handleEditItem = (id) => {
    toast.info(`Edit item ${id} functionality to be implemented`);
  };

  const handleDeleteItem = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      setMenuItems(menuItems.filter(item => item.id !== id));
      toast.success(`Item ${id} has been deleted`);
    }
  };

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...menuItems];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [menuItems, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const filteredMenuItems = sortedItems
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="text-center text-2xl text-gray-800">Loading...</div>;
  if (error) return <div className="text-center text-2xl text-red-500">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <motion.h1
        className="text-4xl font-bold mb-6 text-gray-800 text-center"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        Menu Items Management
      </motion.h1>
      <motion.div
        className="flex flex-col md:flex-row justify-between items-center mb-6"
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <motion.button
          className="bg-gray-700 text-white px-6 py-3 rounded-full mb-4 md:mb-0 flex items-center justify-center hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
          onClick={handleAddItem}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPlus className="mr-2" /> Add New Item
        </motion.button>
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search menu items..."
            className="pl-10 pr-4 py-3 rounded-full shadow appearance-none border w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </motion.div>
      <div className="mb-6 flex flex-wrap justify-center">
        {categories.map(category => (
          <motion.button
            key={category}
            className={`m-2 px-6 py-3 rounded-full ${activeCategory === category ? 'bg-gray-700 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg`}
            onClick={() => setActiveCategory(category)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-gray-800">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3">Image</th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('name')}>
                Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3">Description</th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('price')}>
                Price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3 cursor-pointer" onClick={() => requestSort('category')}>
                Category {sortConfig.key === 'category' && (sortConfig.direction === 'ascending' ? '▲' : '▼')}
              </th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {filteredMenuItems.map((item) => (
                <motion.tr
                  key={item.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <td className="p-3">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">${item.price.toFixed(2)}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">
                    <motion.button
                      className="bg-gray-700 text-white px-4 py-2 rounded-full mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
                      onClick={() => handleEditItem(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaEdit className="mr-2 inline" /> Edit
                    </motion.button>
                    <motion.button
                      className="bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 shadow-lg"
                      onClick={() => handleDeleteItem(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaTrash className="mr-2 inline" /> Delete
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
    </div>
  );
};

export default MenuItems;
