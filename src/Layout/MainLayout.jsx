import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
         <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;