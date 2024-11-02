import React from 'react';
import Header from '../components/Header';
import MainBookingPage from '../components/MainBookingPage';
import Footer from '../components/Footer';


function BookingPage() {
  return (
    <React.Fragment>
      <Header />
      <MainBookingPage />
      <Footer />
    </React.Fragment>
  );
}

export default BookingPage;
