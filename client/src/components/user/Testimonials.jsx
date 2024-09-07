import React from 'react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      image: "https://i.pravatar.cc/100?img=1",
      quote: "The tonkotsu ramen here is absolutely amazing! I can't get enough of their rich, flavorful broth.",
      rating: 5,
    },
    {
      id: 2,
      name: "Jane Smith",
      image: "https://i.pravatar.cc/100?img=2",
      quote: "Great atmosphere and excellent service. Their spicy miso ramen is a must-try!",
      rating: 4,
    },
    {
      id: 3,
      name: "Mike Johnson",
      image: "https://i.pravatar.cc/100?img=3",
      quote: "The chef's special ramen was out of this world. I'll definitely be coming back for more.",
      rating: 5,
    },
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 to-black py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2 
          className="text-4xl font-extrabold text-white text-center mb-12"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          What Our Ramen Lovers Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id} 
              className="bg-white bg-opacity-10 rounded-lg shadow-lg p-6 backdrop-filter backdrop-blur-lg"
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4 border-2 border-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">{testimonial.name}</h3>
                  <div className="flex">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-300 italic">"{testimonial.quote}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
