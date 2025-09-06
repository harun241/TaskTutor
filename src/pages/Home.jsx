import React from 'react';
import Hero from '../component/Hero';
import WhatWeOffer from '../component/WhatWeOffer';
import FeedbackSection from './Feedback';
import Footer from '../component/Footer';

const Home = () => {
    return (
        <div>
            <Hero></Hero>
            <WhatWeOffer></WhatWeOffer>
            <FeedbackSection></FeedbackSection>
            <Footer></Footer>
        </div>
    );
};

export default Home;