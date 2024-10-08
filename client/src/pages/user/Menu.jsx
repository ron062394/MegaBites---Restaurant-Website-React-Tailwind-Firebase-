import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaSearch } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CartContext } from '../../context/cartContext';

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Ramen');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const { user } = useAuthContext();
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  const fetchMenuItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'Menu'));
      const menuItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenuItems(menuItems);
      console.log(menuItems);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching menu items:', err);
      setError('Failed to fetch menu items');
      setLoading(false);
      toast.error('Failed to fetch menu items. Please try again.');
    }
  };

  const addToCart = async (item) => {
    if (!user) {
      toast.info('Please sign in to add items to your cart');
      navigate('/sign-in');
      return;
    }

    try {
      const cartRef = doc(db, 'Cart', user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const existingItemIndex = cartData.items.findIndex(cartItem => cartItem.itemId === item.id);

        if (existingItemIndex !== -1) {
          cartData.items[existingItemIndex].quantity += 1;
        } else {
          cartData.items.push({
            itemId: item.id,
            name: item.name,
            quantity: 1,
            price: item.price,
            category: item.category
          });
        }

        cartData.totalAmount = cartData.items.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
        cartData.updatedAt = new Date().toISOString();

        await updateDoc(cartRef, cartData);
      } else {
        const newCart = {
          userId: user.uid,
          items: [{
            itemId: item.id,
            name: item.name,
            quantity: 1,
            price: item.price,
            category: item.category
          }],
          totalAmount: item.price,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await setDoc(cartRef, newCart);
      }

      dispatch({ type: 'ADD_ITEM', payload: { id: item.id, name: item.name, quantity: 1, price: item.price, category: item.category } });
      toast.success(`Added ${item.name} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const categories = ['Ramen', 'Appetizers', 'Side Dishes', 'Desserts', 'Drinks'];

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
    .filter(item => item.category === activeCategory)
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="w-16 h-16 border-t-4 border-yellow-500 border-solid rounded-full animate-spin mb-4"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <p className="text-2xl font-semibold text-red-500">Error: {error}</p>
      <button 
        onClick={fetchMenuItems} 
        className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <section id='menu' className="bg-gradient-to-r from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8 min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-4">Our Delightful Menu</h2>
          <p className="mt-4 text-2xl text-gray-300">Experience the authentic flavors of Tonkotsu Corner</p>
        </motion.div>
        <div className="mb-8 flex flex-wrap justify-center">
          {categories.map(category => (
            <motion.button
              key={category}
              className={`m-2 px-8 py-3 rounded-full text-lg font-semibold ${activeCategory === category ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-800'} hover:bg-yellow-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 shadow-lg`}
              onClick={() => setActiveCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </div>
        <div className="relative mb-10">
          <input
            type="text"
            placeholder="Search menu items..."
            className="pl-12 pr-4 py-4 rounded-full shadow-lg appearance-none border w-full text-gray-700 text-lg leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <AnimatePresence>
            {filteredMenuItems.map((item) => (
              <motion.div 
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-2xl transform transition duration-500 hover:scale-105 flex flex-col"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/product/${item.id}`}>
                  <img src={item.imageURL} alt={item.name} className="w-full h-48 object-cover cursor-pointer transition duration-300 hover:opacity-80" />
                </Link>
                <div className="p-4 flex flex-col justify-between flex-grow text-left">
                  <div>
                    <Link to={`/product/${item.id}`}>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 cursor-pointer hover:text-yellow-600 transition duration-300">{item.name}</h3>
                    </Link>
                    <p className="text-gray-600 mb-2 text-sm line-clamp-2">{item.description}</p>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-lg font-bold text-yellow-600">${typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-full flex items-center text-sm font-semibold hover:bg-yellow-400 transition duration-300"
                      onClick={() => addToCart(item)}
                    >
                      <FaShoppingCart className="mr-1" />
                      Add
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
