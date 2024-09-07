import React from 'react';
import Hero from '../../components/user/Hero';
import Menu from './Menu';
import Testimonials from '../../components/user/Testimonials';



const Homepage = () => {
  return (
    <div id='home'>
      <Hero />
      <Menu />
      <Testimonials />
    </div>
  );
};

export default Homepage;
