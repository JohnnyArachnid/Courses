import React from 'react';
import Header from '../components/Header';
import MainHomePage from '../components/MainHomePage';
import Footer from '../components/Footer';


function HomePage() {
  return (
    <React.Fragment>
      <Header />
      <MainHomePage />
      <Footer />
    </React.Fragment>
  );
}

export default HomePage;
