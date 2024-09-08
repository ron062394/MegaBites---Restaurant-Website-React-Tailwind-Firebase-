import React from 'react';
import Hero from '../../components/user/Hero';
import Menu from './Menu';
import Testimonials from '../../components/user/Testimonials';
import Services from '../../components/user/Sevices';
import SignatureDishes from '../../components/user/SignatureDishes';
import OurStory from '../../components/user/OurStory';




const Homepage = () => {
  return (
    <div id='home'>
      <Hero />
      <Services />
      <OurStory />
      <SignatureDishes />
      <Testimonials />
    </div>
  );
};

export default Homepage;
