import React from 'react';
import { Link } from 'react-router-dom';
import logo1 from "../images/logo1.png";
import logo2 from "../images/logo2.webp";
import logo3 from "../images/logo3.jpeg";
import logo4 from "../images/logo4.webp";
import logo9 from "../images/logo9.jpeg";
import logo6 from "../images/logo6.png";
import logo7 from "../images/logo7.jpeg";

const Genres = () => {
  return (
    <>
    <h5 className="genre-title">Genres</h5>
      <div className="main-genre-container">
        <div className="logo-and-text">
        <Link to="/category/Fiction">
            <img src={logo1} alt="Fiction"/>
            <div className="logo-text">Fiction</div>
          </Link>
        </div>

        <div className="logo-and-text">
        <Link to="/category/Biography">
            <img src={logo2} alt="Biography"/>
            <div className="logo-text">Biography</div>
            </Link>
        </div>

        <div className="logo-and-text">
        <Link to="/category/Historical">
            <img src={logo3} alt="Historical"/>
            <div className="logo-text">Historical</div>
            </Link>
        </div>
        <div className="logo-and-text">
        <Link to="/category/Kids & Teen">
            <img src={logo4} alt="Kids & Teen"/>
            <div className="logo-text">Kids & Teen</div>
            </Link>
        </div>
        <div className="logo-and-text">
        <Link to="/category/Photography">
            <img src={logo9} alt="Photography"/>
            <div className="logo-text">Photography</div>
            </Link>
        </div>
        <div className="logo-and-text">
        <Link to="/category/Inventory">
            <img src={logo6} alt="Inventory"/>
            <div className="logo-text">Inventory</div>
            </Link>
        </div>
        <div className="logo-and-text">
        <Link to="/category/Improvement">
            <img src={logo7} alt="Improvement" />
            <div className="logo-text">Improvement</div>
            </Link>
        </div>
      </div>
    </>
  );
};

export default Genres;
