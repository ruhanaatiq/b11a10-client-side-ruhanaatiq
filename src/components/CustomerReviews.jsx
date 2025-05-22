import React from 'react';



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

  return (
    <div className="py-12 px-4 md:px-10 lg:px-20 bg-gray-100">
      <h2 className="text-3xl font-bold text-center text-orange-400 mb-8">Customer Reviews</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <div key={index} className="bg-white shadow-md rounded-lg p-6">
            <h3 className="text-xl text-red-500 font-semibold mb-2">{review.name}</h3>
            <p className="mb-4 text-gray-600 italic">"{review.comment}"</p>
            <div className="text-yellow-500">
              {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerReviews;
