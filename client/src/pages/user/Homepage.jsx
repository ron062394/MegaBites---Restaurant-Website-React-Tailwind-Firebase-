import React from 'react';
import Hero from '../../components/user/Hero';
import Services from '../../components/user/Services';
import OurStory from '../../components/user/OurStory';
import Testimonials from '../../components/user/Testimonials';
import SignatureDishes from '../../components/user/SignatureDishes';
import Gallery from '../../components/user/Gallery';



const Homepage = () => {

  return (
    <div>
      <Hero />
      <Services />
      <OurStory />
      <SignatureDishes />
      <Testimonials />
      <Gallery />
    </div>
  );
};

export default Homepage;
