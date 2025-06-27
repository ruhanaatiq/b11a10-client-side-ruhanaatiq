import React from 'react';
import bg from '../assets/bg.jpg';
const AboutUs = () => {
  
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="min-h-screen  flex items-center justify-center px-4 py-12">
        <div className="max-w-3xl text-center text-white">
          <h1 className="text-6xl font-bold mb-6 text-orange-500">About Us</h1>
          <p className="text-lg leading-relaxed">
            Welcome to <strong>Recipe Book</strong> – your go-to destination to explore, share, and save mouthwatering recipes from around the world.
          </p>
          <p className="mt-4 text-base">
            Whether you're a professional chef or a passionate home cook, our platform helps you discover and preserve your favorite meals across cuisines.
          </p>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;