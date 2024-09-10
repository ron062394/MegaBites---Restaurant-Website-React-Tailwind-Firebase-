import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaArrowLeft, FaShare } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from '../../firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs } from 'firebase/firestore';
import { useAuthContext } from '../../hooks/useAuthContext';
import { CartContext } from '../../context/cartContext';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [pairedProducts, setPairedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const { user } = useAuthContext();
  const { dispatch } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productRef = doc(db, 'Menu', id);
        const productSnap = await getDoc(productRef);
        
        if (productSnap.exists()) {
          setProduct({ id: productSnap.id, ...productSnap.data() });
        } else {
          toast.error('Product not found');
        }

        // Fetch all menu items
        const menuSnapshot = await getDocs(collection(db, 'Menu'));
        const menuItems = menuSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filter out items of the same category as the current product
        const differentCategoryItems = menuItems.filter(item => item.category !== productSnap.data().category);

        // Randomly select 3 items for pairing
        const randomPairedProducts = [];
        for (let i = 0; i < 3 && differentCategoryItems.length > 0; i++) {
          const randomIndex = Math.floor(Math.random() * differentCategoryItems.length);
          randomPairedProducts.push(differentCategoryItems[randomIndex]);
          differentCategoryItems.splice(randomIndex, 1);
        }

        setPairedProducts(randomPairedProducts);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product. Please try again.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      toast.info('Please sign in to add items to your cart');
      navigate('/sign-in');
      return;
    }

    try {
      console.log(user.uid)
      const cartRef = doc(db, 'Cart', user.uid);
      const cartSnap = await getDoc(cartRef);

      if (cartSnap.exists()) {
        const cartData = cartSnap.data();
        const existingItemIndex = cartData.items.findIndex(item => item.itemId === product.id);

        if (existingItemIndex !== -1) {
          cartData.items[existingItemIndex].quantity += quantity;
        } else {
          cartData.items.push({
            itemId: product.id,
            name: product.name,
            quantity: quantity,
            price: product.price,
            category: product.category
          });
        }

        cartData.totalAmount = cartData.items.reduce((total, item) => total + (item.price * item.quantity), 0);
        cartData.updatedAt = new Date().toISOString();

        await updateDoc(cartRef, cartData);
      } else {
        const newCart = {
          userId: user.uid,
          items: [{
            itemId: product.id,
            name: product.name,
            quantity: quantity,
            price: product.price,
            category: product.category
          }],
          totalAmount: product.price * quantity,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };

        await setDoc(cartRef, newCart);
      }

      dispatch({ type: 'ADD_ITEM', payload: { id: product.id, name: product.name, quantity, price: product.price, category: product.category } });
      toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add item to cart. Please try again.');
    }
  };

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.info('Product link copied to clipboard!');
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
        <motion.div
          className="text-white text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading...
        </motion.div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 to-black">
        <motion.div
          className="text-white text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Product not found
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          <motion.div
            key={product.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-8">
                <div className="flex justify-between items-center mb-4">
                  <Link to="/menu" className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center">
                    <FaArrowLeft className="mr-2" />
                    Back to Menu
                  </Link>
                </div>
                <motion.div
                  className="w-full h-96 overflow-hidden rounded-lg shadow-lg mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>
              <div className="lg:w-1/2 p-12 bg-white relative">
                <h2 className="text-4xl font-bold mb-4 text-gray-800 text-left">{product.name}</h2>
                <p className="text-gray-600 mb-6 text-lg text-left">{product.description}</p>
                <p className="text-3xl font-bold text-yellow-600 mb-6 text-left">${product.price.toFixed(2)}</p>
                <div className="flex items-center mb-6">
                  <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-yellow-300 transition duration-300"
                  />
                </div>
                <div className="flex flex-col space-y-4 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addToCart}
                    className="w-full justify-center py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 ease-in-out flex items-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </motion.button>
                  <Link to="/cart" className="w-full">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full justify-center py-3 px-6 border border-yellow-500 rounded-full shadow-lg text-lg font-medium text-yellow-500 bg-white hover:bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 ease-in-out flex items-center"
                    >
                      <FaShoppingCart className="mr-2" />
                      View Cart
                    </motion.button>
                  </Link>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={shareProduct}
                  className="absolute bottom-4 right-4 p-3 rounded-full shadow-lg bg-yellow-100 text-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-300 ease-in-out"
                >
                  <FaShare />
                </motion.button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Best Paired With Section */}
        <motion.div
          className="bg-white bg-opacity-10 rounded-lg shadow-lg overflow-hidden p-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-6">Best Paired With</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pairedProducts.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <Link to={`/product/${item.id}`}>
                  <div className="w-full h-56 overflow-hidden">
                    <img src={item.imageURL} alt={item.name} className="w-full h-full object-cover cursor-pointer" />
                  </div>
                </Link>
                <div className="p-6 text-left">
                  <Link to={`/product/${item.id}`}>
                    <h4 className="text-2xl font-semibold text-gray-900 mb-2 cursor-pointer hover:text-yellow-600 transition duration-300">{item.name}</h4>
                  </Link>
                  <p className="text-yellow-600 mb-4 font-bold">${item.price.toFixed(2)}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-yellow-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-yellow-400"
                    onClick={() => {
                      if (!user) {
                        toast.info('Please sign in to add items to your cart');
                        navigate('/sign-in');
                        return;
                      }
                      dispatch({ type: 'ADD_ITEM', payload: { id: item.id, name: item.name, quantity: 1, price: item.price, category: item.category } });
                      toast.success(`Added ${item.name} to cart!`);
                    }}
                  >
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Product;
