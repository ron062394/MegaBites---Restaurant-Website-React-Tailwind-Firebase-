import React from 'react';
import { motion } from 'framer-motion';

const Menu = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const menuItems = [
    {
      category: "Signature Ramen",
      items: [
        { name: "Classic Tonkotsu Ramen", price: "$14.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Rich pork broth, chashu, soft-boiled egg, bamboo shoots, green onions" },
        { name: "Spicy Miso Ramen", price: "$15.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Spicy miso-based broth, ground pork, corn, butter, bean sprouts" },
        { name: "Vegetarian Shoyu Ramen", price: "$13.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Soy sauce-based vegetable broth, tofu, shiitake mushrooms, spinach" },
      ]
    },
    {
      category: "Side Dishes",
      items: [
        { name: "Gyoza (6 pcs)", price: "$6.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Pan-fried pork and vegetable dumplings" },
        { name: "Karaage", price: "$7.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Japanese-style fried chicken" },
        { name: "Edamame", price: "$4.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Steamed and salted green soybeans" },
      ]
    },
    {
      category: "Desserts",
      items: [
        { name: "Matcha Ice Cream", price: "$5.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Green tea flavored ice cream" },
        { name: "Mochi (3 pcs)", price: "$6.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Assorted flavors of rice cake with ice cream filling" },
        { name: "Taiyaki", price: "$4.99", image: "https://i0.wp.com/theaicuisine.com/wp-content/uploads/2023/05/top-down-shot-of-a-bowl-of-fine-dining-Tonkotsu-Ramen-with-sliced-pork-belly-green-onions-and-a-soft-boiled-egg.webp", description: "Fish-shaped waffle with red bean paste filling" },
      ]
    },
  ];

  return (
    <section id='menu' className="bg-gradient-to-r from-gray-900 to-black py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-5xl font-extrabold text-white sm:text-6xl">Our Delightful Menu</h1>
          <p className="mt-4 text-xl text-gray-300">Experience the authentic flavors of Tonkotsu Corner</p>
        </motion.div>
        <div className="space-y-20">
          {menuItems.map((section, sectionIndex) => (
            <motion.section 
              key={sectionIndex}
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: sectionIndex * 0.2 }}
            >
              <h2 className="text-4xl font-bold text-white mb-10">{section.category}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {section.items.map((item, itemIndex) => (
                  <motion.div 
                    key={itemIndex} 
                    className="bg-white rounded-lg overflow-hidden shadow-lg transform transition duration-500 hover:scale-105"
                    whileHover={{ y: -5 }}
                  >
                    <img src={item.image} alt={item.name} className="w-full h-56 object-cover" />
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-gray-900 mb-2">{item.name}</h3>
                      <p className="text-gray-600 mb-4">{item.description}</p>
                      <p className="text-xl font-bold text-gray-900">{item.price}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
