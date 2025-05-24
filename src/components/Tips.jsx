import React from 'react';

const tipsData = [
  {
    id: 1,
    title: "Keep Herbs Fresh Longer 🌿",
    description: "Wrap herbs in a damp paper towel and store in a ziplock bag to keep them fresh for up to a week.",
    image: "/images/herbs.jpg",
  },
  {
    id: 2,
    title: "Prevent Tears While Chopping Onions 🧅",
    description: "Refrigerate onions for 30 mins before chopping to reduce the sulfur compounds that cause tears.",
    image: "/images/onions.jpg",
  },
  {
    id: 3,
    title: "Use Ice Cubes for Leftover Herbs 🧊",
    description: "Chop herbs, add olive oil, and freeze them in ice cube trays for future use.",
    image: "/images/herb-cubes.jpg",
  },
];

const Tips = () => {
  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center text-orange-500 mb-8">🧠 Kitchen Tips & Tricks</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {tipsData.map((tip) => (
          <div key={tip.id} className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition">
            <img src={tip.image} alt={tip.title} className="w-full h-40 object-cover rounded mb-4" />
            <h3 className="text-xl font-semibold mb-2">{tip.title}</h3>
            <p className="text-gray-600 text-sm">{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
