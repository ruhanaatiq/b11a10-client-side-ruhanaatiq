import React from 'react';
import { motion } from 'framer-motion';

const tipsData = [
  {
    id: 1,
    title: "Keep Herbs Fresh Longer 🌿",
    description: "Wrap herbs in a damp paper towel and store in a ziplock bag to keep them fresh for up to a week.",
    image: "https://i.ibb.co/JJRcyXr/herbs.jpg",
  },
  {
    id: 2,
    title: "Prevent Tears While Chopping Onions 🧅",
    description: "Refrigerate onions for 30 mins before chopping to reduce eyes from watering.",
    image: "https://i.ibb.co/bgHTFZqF/onion.jpg",
  },
  {
    id: 3,
    title: "Freshen Stale Bread 🍞",
    description: "In a damp towel wrap your bread and microwave it for 20 seconds.",
    image: "https://i.ibb.co/0yL0ypVH/bread.jpg",
  },
  {
    id: 4,
    title: "How to peel garlic fast 🧄",
    description: "Use a knife's flat side to smash the garlic, the peel will come off very easily.",
    image: "https://i.ibb.co/LhJb807n/garlic.jpg",
  }
];

// Animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const card = {
  hidden: { opacity: 0, x: 50 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const Tips = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">🧠 Kitchen Tips & Tricks</h2>

      {/* Animated container */}
      <motion.div
        className="grid md:grid-cols-4 gap-5"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {tipsData.map((tip) => (
          <motion.div
            key={tip.id}
            variants={card}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-1000"
          >
            <img src={tip.image} alt={tip.title} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl text-center text-red-500 font-semibold mb-2">{tip.title}</h3>
            <p className="text-gray-600 text-center text-sm">{tip.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Tips;
