import React from 'react';
import { Link } from 'react-router-dom';
import author_img1 from "../images/author_img1.jpeg";
import author_img2 from "../images/author_img2.jpeg";
import author_img3 from "../images/author_img3.webp";
import author_img4 from "../images/author_img4.jpeg";
import author_img8 from "../images/author_img8.jpeg";
import author_img6 from "../images/author_img6.jpeg";
import author_img7 from "../images/author_img7.jpeg";

const Author = () => {
  return (
    <>
      <h5 className="author-title">Author</h5>
      <div className="main-author-container">
        <div className="logo-and-text">
          <Link to="/author/Colleen Hoover" >
            <img src={author_img1} alt="Colleen Hoover"/>
            <div className="logo-text">Colleen Hoover</div>
          </Link>
        </div>

        <div className="logo-and-text">
          <Link to="/author/Holly Jackson">
            <img src={author_img2} alt="Holly Jackson"/>
            <div className="logo-text">Holly Jackson</div>
          </Link>
        </div>

        <div className="logo-and-text">
          <Link to="/author/John Green">
            <img src={author_img3} alt='John Green'/>
            <div className="logo-text">John Green</div>
          </Link>
        </div>
        <div className="logo-and-text">
          <Link to="/author/Tahereh Mafi">
            <img src={author_img4} alt='Tahereh Mafi'/>
            <div className="logo-text">Tahereh Mafi</div>
          </Link>
        </div>
        <div className="logo-and-text">
          <Link to="/author/Kathleen Glasgow">
            <img src={author_img8} alt='Kathleen Glasgow'/>
            <div className="logo-text">Kathleen Glasgow</div>
          </Link>
        </div>
        <div className="logo-and-text">
          <Link to="/author/Naomi Alderman">
            <img src={author_img6} alt='Naomi Alderman'/>
            <div className="logo-text">Naomi Alderman</div>
          </Link>
        </div>
        <div className="logo-and-text">
          <Link to="/author/Adam Silvera">
            <img src={author_img7} alt='Adam Silvera'/>
            <div className="logo-text">Adam Silvera</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Author;
