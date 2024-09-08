import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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

  const addToCart = (item) => {
    setCart([...cart, item]);
    toast.success(`Added ${item.name} to cart!`);
  };

  const categories = ['All', ...new Set(menuItems.map(item => item.category))];

  const filteredMenuItems = menuItems
    .filter(item => activeCategory === 'All' || item.category === activeCategory)
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div></div>;
  if (error) return <div className="text-center text-2xl text-red-500 bg-red-100 p-4 rounded-lg shadow-md">{error}</div>;

  return (
    <section id='menu' className="bg-gradient-to-r from-gray-900 via-gray-800 to-black py-16 px-4 sm:px-6 lg:px-8 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500">Our Delightful Menu</h1>
          <p className="mt-4 text-xl text-gray-300">Experience the authentic flavors of Tonkotsu Corner</p>
        </motion.div>
        <div className="mb-8 flex flex-wrap justify-center">
          {categories.map(category => (
            <motion.button
              key={category}
              className={`m-2 px-6 py-3 rounded-full ${activeCategory === category ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 shadow-lg`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <div className="relative mb-8">
          <input
            type="text"
            placeholder="Search menu items..."
            className="pl-10 pr-4 py-3 rounded-full shadow-lg appearance-none border w-full text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <AnimatePresence>
            {filteredMenuItems.map((item) => (
              <motion.div 
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/product/${item.id}`}>
                  <img src={item.image} alt={item.name} className="w-full h-64 object-cover cursor-pointer transition duration-300 transform hover:scale-110" />
                </Link>
                <div className="p-6">
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-2xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-red-600 transition duration-300">{item.name}</h3>
                  </Link>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-2xl font-bold text-red-600">${item.price.toFixed(2)}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-600 text-white px-6 py-3 rounded-full flex items-center shadow-lg hover:bg-red-700 transition duration-300"
                      onClick={() => addToCart(item)}
                    >
                      <FaShoppingCart className="mr-2" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Menu;
