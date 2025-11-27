// keep your imports as they are at the top
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerReviews from "../components/CustomerReviews";
import { Typewriter } from "react-simple-typewriter";
import Tips from "../components/Tips";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import AboutUs from "../components/AboutUs";
import { motion } from "framer-motion";

const Home = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    fetch(`${BASE_URL}/recipes/top`)
      .then((res) => res.json())
      .then((data) => setTopRecipes(data))
      .catch((err) => console.error("Failed to fetch top recipes:", err));
  }, [BASE_URL]);

  // 🔹 Slide data for the banner
  const bannerSlides = [
    {
      id: 1,
      image: "https://i.ibb.co/VpVzgRG1/banner3.jpg",
      badge: "Cook · Share · Enjoy",
      title: "Welcome to Recipe Book",
      subtitle:
        "Discover and save your favorite recipes from around the world. Your digital cookbook, always with you.",
      primaryLabel: "Explore Recipes",
      primaryTo: "/recipes",
      secondaryLabel: "Add Your Recipe",
      secondaryTo: "/add-recipe",
      showTypewriter: true,
    },
    {
      id: 2,
      image: "https://i.ibb.co/Q7qLq0XR/banner4.jpg",
      badge: "Handpicked Dishes",
      title: "Your Culinary Adventure Starts Here",
      subtitle:
        "From quick weekday meals to weekend feasts, find recipes that match your taste and mood.",
      primaryLabel: "Browse Top Recipes",
      primaryTo: "/recipes",
    },
    {
      id: 3,
      image: "https://i.ibb.co/CsM9qLFX/banner.jpg",
      badge: "Join The Community",
      title: "Share Your Signature Dishes",
      subtitle:
        "Upload your own recipes, inspire others, and become part of a growing food-loving family.",
      primaryLabel: "Share a Recipe",
      primaryTo: "/add-recipe",
      secondaryLabel: "View All Recipes",
      secondaryTo: "/recipes",
    },
  ];

  return (
    <>
      {/* 🔥 Revamped Banner with Carousel */}
      <section className="relative w-full min-h-[70vh] bg-black">
        <Carousel
          infiniteLoop
          autoPlay
          showArrows={false}
          showThumbs={false}
          showStatus={false}
          interval={3500}
          swipeable
          emulateTouch
        >
          {bannerSlides.map((slide) => (
            <div key={slide.id} className="relative">
              {/* Background image */}
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-[70vh] object-cover"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/60 to-black/10" />

              {/* Content */}
              <div className="absolute inset-0 flex items-center">
                <div className="w-full max-w-6xl mx-auto px-6 md:px-10 lg:px-16">
                  <div className="max-w-2xl space-y-4 md:space-y-6 text-white text-center md:text-left">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-xs md:text-sm uppercase tracking-[0.25em] text-orange-300 backdrop-blur-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                      {slide.badge}
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
                      <span className="text-orange-400">{slide.title}</span>
                    </h2>

                    {/* Optional typewriter line */}
                    {slide.showTypewriter && (
                      <p className="text-sm md:text-base uppercase tracking-[0.25em] text-orange-200/90">
                        <Typewriter
                          words={[
                            "Discover · Cook · Share",
                            "From Your Kitchen To The World",
                          ]}
                          loop={0}
                          cursor
                          cursorStyle="_"
                          typeSpeed={70}
                          deleteSpeed={40}
                          delaySpeed={1500}
                        />
                      </p>
                    )}

                    {/* Subtitle */}
                    <p className="text-base md:text-lg text-slate-100/90 leading-relaxed max-w-xl mx-auto md:mx-0">
                      {slide.subtitle}
                    </p>

                    {/* Buttons */}
                    <div className="pt-2 flex flex-wrap gap-3 justify-center md:justify-start">
                      <Link
                        to={slide.primaryTo}
                        className="btn border-none bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/40"
                      >
                        {slide.primaryLabel}
                      </Link>

                      {slide.secondaryLabel && slide.secondaryTo && (
                        <Link
                          to={slide.secondaryTo}
                          className="btn btn-outline border-orange-400 text-orange-200 hover:bg-orange-500/10 hover:border-orange-300"
                        >
                          {slide.secondaryLabel}
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Carousel>
      </section>

      {/* 🔥 Animated Top Recipes Section */}
      <section className="py-12 px-4 md:px-10 lg:px-20 bg-base-100">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-center mb-8"
        >
          Top Recipes
        </motion.h2>

        {topRecipes.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center text-gray-500"
          >
            No top recipes available yet. Check back soon!
          </motion.p>
        ) : (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topRecipes.map((recipe, index) => (
              <motion.div
                key={recipe._id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.03 }}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden"
              >
                <figure className="relative">
                  <img
                    src={
                      recipe.image ||
                      "https://via.placeholder.com/300x200?text=No+Image"
                    }
                    alt={recipe.title}
                    className="h-56 w-full object-cover"
                  />

                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition duration-300" />
                </figure>

                <div className="card-body">
                  <h2 className="card-title text-xl font-semibold">
                    {recipe.title}
                  </h2>
                  <p className="text-gray-600">
                    Cuisine: {recipe.cuisineType || "N/A"}
                  </p>
                  <p className="text-sm text-gray-500">
                    ❤️ Likes: {recipe.likes || 0}
                  </p>

                  <div className="mt-4">
                    <Link
                      to={`/recipes/${recipe._id}`}
                      className="btn btn-sm bg-orange-600 hover:bg-orange-700 text-white"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <Link
            to="/recipes"
            className="btn btn-wide bg-orange-500 hover:bg-orange-600 text-white"
          >
            See All Recipes
          </Link>
        </motion.div>
      </section>

      {/* Other sections remain below */}
      <AboutUs />
      <CustomerReviews />
      <Tips />
    </>
  );
};

export default Home;
