import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CustomerReviews from "../components/CustomerReviews";
import { Typewriter } from 'react-simple-typewriter'
const Home = () => {
  const [topRecipes, setTopRecipes] = useState([]);

  useEffect(() => {
   fetch("http://localhost:5000/recipes/top")
      .then(res => res.json())
      .then(data => setTopRecipes(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <>
     

      {/* Banner / Slider */}
      <div className="hero min-h-[60vh] bg-[url('https://i.ibb.co/v6SrpJ0m/banner.jpg')] bg-cover bg-center">
        <div className="hero-overlay bg-opacity-20"></div>
        <div className="hero-content text-center text-white">
          <div className="max-w-2xl">
<h1 className="text-4xl md:text-6xl font-bold text-orange-500">
  <Typewriter
    words={['Welcome to Recipe Book', 'Explore Tasty Dishes', 'Share Your Own Recipes']}
    loop={0}
    cursor
    cursorStyle="_"
    typeSpeed={70}
    deleteSpeed={50}
    delaySpeed={1500}
  />
</h1>            <p className="py-6 text-lg">Discover and share your favorite recipes from around the world.</p>
            <Link to="/recipes" className="btn  bg-orange-500">Explore All Recipes</Link>
          </div>
        </div>
      </div>

      {/* Top Recipes */}
      <div className="py-12 px-4 md:px-10 lg:px-20 bg-base-100">
        <h2 className="text-3xl font-bold text-center mb-8">Top Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topRecipes.map(recipe => (
            <div key={recipe._id} className="card bg-base-100 shadow-md">
              <figure>
                <img
                  src={recipe.image || ""}
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
    </>
  );
};

export default Home;
