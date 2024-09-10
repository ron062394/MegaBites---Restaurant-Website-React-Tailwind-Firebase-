import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      // Simulating API call with setTimeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const fetchedImages = [
        { src: 'https://images2.alphacoders.com/132/1322098.png', alt: 'Delicious Ramen Bowl' },
        { src: 'https://recipes.net/wp-content/uploads/2023/09/how-to-eat-ramen-noodles-1694798802.jpg', alt: 'Eating Ramen' },
        { src: 'https://www.cannolikitchen.com/wp-content/uploads/2022/04/fresh_ingredients_cannoli_kitchen-scaled.jpg', alt: 'Fresh Ramen Ingredients' },
      ];
      setImages(fetchedImages);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to fetch images');
      setLoading(false);
      toast.error('Failed to fetch images. Please try again.');
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <div className="w-16 h-16 border-t-4 border-yellow-500 border-solid rounded-full animate-spin mb-4"></div>
    </div>
  );
  
  if (error) return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-gray-900 to-black">
      <p className="text-2xl font-semibold text-red-500">Error: {error}</p>
      <button 
        onClick={fetchImages} 
        className="mt-4 px-6 py-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600 transition duration-300"
      >
        Try Again
      </button>
    </div>
  );

  return (
    <section id='gallery' className="bg-gradient-to-r from-gray-900 to-black py-20 px-4 sm:px-6 lg:px-8">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-4">Our Gallery</h2>
          <p className="mt-4 text-2xl text-gray-300">Feast your eyes on our delicious creations</p>
        </motion.div>
        <div className="relative w-full max-w-4xl mx-auto overflow-hidden rounded-2xl shadow-2xl">
          <div className="flex">
            <img
              src={images[currentIndex].src}
              alt={images[currentIndex].alt}
              className="w-full h-96 object-cover"
            />
          </div>

          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition duration-300"
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition duration-300"
          >
            <FaChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex items-center justify-center gap-2">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`
                    transition-all w-3 h-3 bg-white rounded-full
                    ${currentIndex === index ? "p-2" : "bg-opacity-50"}
                  `}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
