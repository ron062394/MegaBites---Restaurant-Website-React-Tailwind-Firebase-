import React from 'react';
import Hero from '../../components/user/Hero';
import Services from '../../components/user/Services';
import OurStory from '../../components/user/OurStory';
import Testimonials from '../../components/user/Testimonials';
import SignatureDishes from '../../components/user/SignatureDishes';


const Homepage = () => {

  return (
    <div>
      <Hero />
      <Services />
      <OurStory />
      <SignatureDishes />
      <Testimonials />
    </div>
  );
};

export default Homepage;
