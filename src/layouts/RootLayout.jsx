import React from 'react';
import { Outlet } from 'react-router';
import Footer from '../pages/Footer/Footer';
import NavBar from '../pages/NavBar/NavBar';
import Home from '../pages/Home/Home/Home';

const RootLayout = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <NavBar></NavBar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
