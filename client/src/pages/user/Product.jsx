import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaShoppingCart, FaArrowLeft, FaStar, FaHeart, FaShare } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [pairedProducts, setPairedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Simulating API call with setTimeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockProduct = {
          id: id,
          name: "Classic Tonkotsu Ramen",
          price: 14.99,
          images: [
            "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp",
            "https://example.com/tonkotsu-ramen-2.jpg",
            "https://example.com/tonkotsu-ramen-3.jpg"
          ],
          description: "Rich pork broth, chashu, soft-boiled egg, bamboo shoots, green onions",
          rating: 4.8,
          reviews: 120
        };
        setProduct(mockProduct);

        const mockPairedProducts = [
          { id: 4, name: "Gyoza (6 pcs)", price: 6.99, image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp" },
          { id: 5, name: "Karaage", price: 7.99, image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp" },
          { id: 6, name: "Matcha Ice Cream", price: 4.99, image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp" }
        ];
        setPairedProducts(mockPairedProducts);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product. Please try again.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const addToCart = () => {
    toast.success(`Added ${quantity} ${quantity > 1 ? 'items' : 'item'} of ${product.name} to cart!`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast.info(isFavorite ? 'Removed from favorites' : 'Added to favorites');
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
                  <Link to="/cart" className="text-gray-600 hover:text-gray-800 transition duration-300 flex items-center">
                    <FaShoppingCart className="mr-2" />
                    View Cart
                  </Link>
                </div>
                <motion.img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-auto rounded-lg shadow-lg mb-4"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
                <div className="flex justify-center space-x-2">
                  {product.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className={`w-16 h-16 object-cover rounded-md cursor-pointer ${selectedImage === index ? 'border-2 border-gray-800' : ''}`}
                      onClick={() => setSelectedImage(index)}
                    />
                  ))}
                </div>
              </div>
              <div className="lg:w-1/2 p-12 bg-white">
                <h2 className="text-4xl font-bold mb-4 text-gray-800">{product.name}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviews} reviews)</span>
                </div>
                <p className="text-gray-600 mb-6 text-lg">{product.description}</p>
                <p className="text-3xl font-bold text-gray-800 mb-6">${product.price.toFixed(2)}</p>
                <div className="flex items-center mb-6">
                  <label htmlFor="quantity" className="mr-4 text-gray-700">Quantity:</label>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                    className="shadow appearance-none border rounded w-20 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300 transition duration-300"
                  />
                </div>
                <div className="flex space-x-4 mb-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={addToCart}
                    className="flex-1 justify-center py-3 px-6 border border-transparent rounded-full shadow-lg text-lg font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out flex items-center"
                  >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleFavorite}
                    className={`p-3 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out ${
                      isFavorite ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    <FaHeart />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={shareProduct}
                    className="p-3 rounded-full shadow-lg bg-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-300 ease-in-out"
                  >
                    <FaShare />
                  </motion.button>
                </div>
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
          <h3 className="text-3xl font-bold text-white mb-6">Best Paired With</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pairedProducts.map((item) => (
              <motion.div
                key={item.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <img src={item.image} alt={item.name} className="w-full h-56 object-cover cursor-pointer" />
                <div className="p-6">
                  <h4 className="text-2xl font-semibold text-gray-900 mb-2 cursor-pointer">{item.name}</h4>
                  <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-gray-800 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-gray-700"
                    onClick={() => {
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
