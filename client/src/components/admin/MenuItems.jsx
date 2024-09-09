import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSort, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc, getDoc } from 'firebase/firestore';

const MenuItems = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [isItemModalOpen, setIsItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

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

  const handleAddItem = () => {
    setEditingItem({
      name: '',
      description: '',
      price: '',
      category: '',
      imageURL: ''
    });
    setIsItemModalOpen(true);
    console.log('Add item modal opened');
  };

  const handleEditItem = (item) => {
    setEditingItem({ ...item });
    setIsItemModalOpen(true);
    console.log('Edit item modal opened');
  };

  const handleItemSubmit = async (e) => {
    e.preventDefault();
    try {
      const price = parseFloat(editingItem.price);
      if (price < 0) {
        toast.error('Price cannot be negative.');
        return;
      }
      if (editingItem.id) {
        // Update existing item
        await updateDoc(doc(db, 'Menu', editingItem.id), {
          ...editingItem,
          price: price
        });
        setMenuItems(prevItems => prevItems.map(prevItem => 
          prevItem.id === editingItem.id ? { ...prevItem, ...editingItem, price } : prevItem
        ));
        toast.success('Item updated successfully!');
      } else {
        // Add new item
        const docRef = await addDoc(collection(db, 'Menu'), {
          ...editingItem,
          price: price
        });
        setMenuItems(prevItems => [...prevItems, { id: docRef.id, ...editingItem, price }]);
        toast.success('New item added successfully!');
      }
      setIsItemModalOpen(false);
      setEditingItem(null);
    } catch (error) {
      console.error('Error saving document: ', error);
      toast.error('Failed to save item. Please try again.');
    }
  };

  const handleDeleteItem = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'Menu', id));
        setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
        toast.success(`Item has been deleted`);
      } catch (err) {
        console.error('Error deleting item:', err);
        toast.error('Failed to delete item. Please try again.');
      }
    }
  };

  const categories = ['All', 'Ramen', 'Appetizers', 'Side Dishes', 'Desserts', 'Drinks'];

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
                    <img src={item.imageURL} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-3">{item.name}</td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3">${typeof item.price === 'number' ? item.price.toFixed(2) : parseFloat(item.price).toFixed(2)}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">
                    <motion.button
                      className="bg-gray-700 text-white px-4 py-2 rounded-full mr-2 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
                      onClick={() => handleEditItem(item)}
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
      <AnimatePresence>
        {isItemModalOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">{editingItem.id ? 'Edit Item' : 'Add New Item'}</h2>
              <form onSubmit={handleItemSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={editingItem.name}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                  <textarea
                    id="description"
                    value={editingItem.description}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="price" className="block text-gray-700 text-sm font-bold mb-2">Price</label>
                  <input
                    type="number"
                    id="price"
                    value={editingItem.price}
                    onChange={(e) => setEditingItem({ ...editingItem, price: Math.max(0, parseFloat(e.target.value)) })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    step="0.01"
                    min="0"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                  <select
                    id="category"
                    value={editingItem.category}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="imageURL" className="block text-gray-700 text-sm font-bold mb-2">Image URL</label>
                  <input
                    type="text"
                    id="imageURL"
                    value={editingItem.imageURL}
                    onChange={(e) => setEditingItem({ ...editingItem, imageURL: e.target.value })}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gray-700 text-white px-4 py-2 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 shadow-lg"
                >
                  {editingItem.id ? 'Update Item' : 'Add Item'}
                </button>
              </form>
              <button
                onClick={() => setIsItemModalOpen(false)}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-300 shadow-lg"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MenuItems;
