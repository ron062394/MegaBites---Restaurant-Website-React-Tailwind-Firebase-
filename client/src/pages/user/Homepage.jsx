import React from 'react';
import Hero from '../../components/user/Hero';
import Menu from './Menu';
import Testimonials from '../../components/user/Testimonials';
import Services from '../../components/user/Sevices';
import SignatureDishes from '../../components/user/SignatureDishes';



const Homepage = () => {
  return (
    <div id='home'>
      <Hero />
      <Services />
      <SignatureDishes />
      <Menu />
      <Testimonials />
    </div>
  );
};

export default Homepage;
