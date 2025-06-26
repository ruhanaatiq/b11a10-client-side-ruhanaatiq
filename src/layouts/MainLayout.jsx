import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <>
            <Navbar />
      <main className="min-h-screen px-4 md:px-10 lg:px-20">
        {/* Container to center content */}
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
};
export default MainLayout;