import React from "react";
import { motion } from "framer-motion";

const CustomerReviews = () => {
  const reviews = [
    {
      name: "Sam",
      comment: "This app made cooking so much fun!",
      rating: 5,
    },
    {
      name: "David",
      comment: "I found so many easy recipes to try at home.",
      rating: 4,
    },
    {
      name: "Ayesha",
      comment: "The UI is beautiful and recipes are well organized!",
      rating: 5,
    },
  ];

  const cardVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <section className="py-16 px-6 md:px-10 lg:px-24 bg-gradient-to-b from-orange-50 to-orange-100">
      <motion.h2
        className="text-4xl font-extrabold text-center text-orange-600 mb-12 tracking-wide"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        What Our Users Say 
      </motion.h2>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="rounded-2xl p-6 bg-white/60 backdrop-blur-lg shadow-xl border border-white/30 hover:scale-105 hover:shadow-2xl transition-transform"
          >
            {/* Avatar */}
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-xl shadow-md">
                {review.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{review.name}</h3>
            </div>

            {/* Comment */}
            <p className="text-gray-600 italic text-sm mb-4">
              “{review.comment}”
            </p>

            {/* Rating Stars */}
            <motion.div
              className="text-yellow-500 text-lg"
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Floating Emoji Animation */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: -10 }}
        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        className="text-center mt-12 text-3xl"
      >
        🍽️✨
      </motion.div>
    </section>
  );
};

export default CustomerReviews;
