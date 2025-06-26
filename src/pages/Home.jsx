import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerReviews from "../components/CustomerReviews";
import { Typewriter } from 'react-simple-typewriter';
import Tips from "../components/Tips";
import { Carousel } from 'react-responsive-carousel'; // Import Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles

const Home = () => {
  const [topRecipes, setTopRecipes] = useState([]);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    fetch(`${BASE_URL}/recipes/top`)
      .then(res => res.json())
      .then(data => setTopRecipes(data))
      .catch(err => console.error("Failed to fetch top recipes:", err));
  }, [BASE_URL]);

  return (
    <>
      {/* Banner with Carousel */}
      <div className="relative min-h-[60vh] bg-cover bg-center">
        <Carousel 
          infiniteLoop={true} 
          autoPlay={true} 
          showArrows={false} 
          showThumbs={false} 
          showStatus={false} 
          interval={3000}
        >
          {/* Carousel Items */}
          <div className="relative">
            <img src="https://i.ibb.co/VpVzgRG1/banner3.jpg" alt="Carousel Item 1" className="w-full h-[60vh] object-cover" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-blue-950">
              <h2 className="text-4xl md:text-6xl font-bold text-orange-500 animate__animated animate__fadeIn animate__delay-1s">
                <Typewriter
                  words={['Welcome to Recipe Book']}
                  loop={0}
                  cursor
                  cursorStyle="_"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1500}
                />
              </h2>
              <p className="py-6 text-lg animate__animated animate__fadeIn animate__delay-2s">Discover and share your favorite recipes from around the world.</p>
              <Link to="/recipes" className="btn bg-orange-500">Explore All Recipes</Link>
            </div>
          </div>

          <div className="relative">
            <img src="https://i.ibb.co/Q7qLq0XR/banner4.jpg" alt="Carousel Item 2" className="w-full h-[60vh] object-cover" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-blue-950">
              <h2 className="text-4xl md:text-6xl font-bold text-orange-500 animate__animated animate__fadeIn animate__delay-1s">
                Your Culinary Adventure Starts Here
              </h2>
              <p className="py-6 text-lg animate__animated animate__fadeIn animate__delay-2s">Explore, share, and enjoy delicious recipes.</p>
              <Link to="/recipes" className="btn bg-orange-500">Explore All Recipes</Link>
            </div>
          </div>

          <div className="relative">
            <img src="https://i.ibb.co/CsM9qLFX/banner.jpg" alt="Carousel Item 3" className="w-full h-[60vh] object-cover" />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-blue-950">
              <h2 className="text-4xl md:text-6xl font-bold text-orange-500 animate__animated animate__fadeIn animate__delay-1s">
                Share Your Own Recipes
              </h2>
              <p className="py-6 text-lg animate__animated animate__fadeIn animate__delay-2s">Join the community and share your favorite dishes!</p>
              <Link to="/recipes" className="btn bg-orange-500">Explore All Recipes</Link>
            </div>
          </div>
        </Carousel>
      </div>

      {/* Top Recipes */}
      <div className="py-12 px-4 md:px-10 lg:px-20 bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-8">Top Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecipes.map(recipe => (
            <div key={recipe._id} className="card bg-base-100 shadow-md">
              <figure>
                <img
                  src={recipe.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={recipe.title}
                  className="h-52 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-xl">{recipe.title}</h2>
                <p className="text-gray-600">Cuisine: {recipe.cuisineType}</p>
                <p className="text-sm text-gray-500">Likes: ❤️ {recipe.likes || 0}</p>
                <div className="mt-4">
                  <Link
                    to={`/recipes/${recipe._id}`}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* See All Recipes Button */}
        <div className="text-center mt-10">
          <Link to="/recipes" className="btn btn-wide bg-orange-500">
            See All Recipes
          </Link>
        </div>
      </div>

      <CustomerReviews />
      <Tips />
    </>
  );
};

export default Home;
