import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import ImageSlider from "./ImageSlider";
import Genres from "./Genres";
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import Author from "./Author";

export const Home = () => {
  return (
    <div>
      <ImageSlider />
      <Genres />
      <BestSellers />
      <NewArrivals />
      <Author />
    </div>
  );
};

export default Home;
