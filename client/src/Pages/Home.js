import React,{useEffect,useContext} from 'react';

import Header from '../Components/Header/Header';
import Banner from '../Components/Banner/Banner';

import FeaturedProducts from '../Components/FeaturedProducts/FeaturedProducts';
import Footer from '../Components/Footer/Footer';
import Categories from '../Components/Categories/Categories';
import NewArrivals from '../Components/NewArrivals/NewArrivals';
import WhyChooseUs from '../Components/WhyChooseUs/WhyChooseUs';
import Offers from '../Components/Offers/Offers';

function Home() {
  
  
  return (
    <div className="homeParentDiv">
      <Header/>
      <Banner />
      <Categories/>
      <FeaturedProducts />
      <NewArrivals/>
      <WhyChooseUs/>
      <Footer />
    </div>
  );
}

export default Home;
 
