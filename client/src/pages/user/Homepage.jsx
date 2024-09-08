import React from 'react';
import Hero from '../../components/user/Hero';
import Menu from './Menu';
import Testimonials from '../../components/user/Testimonials';
import Services from '../../components/user/Sevices';


const Homepage = () => {
  return (
    <div id='home'>
      <Hero />
      <Services />
      <Menu />
      <Testimonials />
    </div>
  );
};

export default Homepage;
