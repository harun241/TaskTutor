import React from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import { Outlet } from 'react-router';
import WhatWeOffer from '../component/WhatWeOffer';
import FeedbackSection from '../pages/Feedback';



const MainLayout = () => {
    return (
         <div className="flex flex-col min-h-screen">
            <Navbar></Navbar>
            <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

 <WhatWeOffer></WhatWeOffer>
 <FeedbackSection></FeedbackSection>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;