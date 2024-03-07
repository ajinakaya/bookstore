import { NavLink, useNavigate} from "react-router-dom";
import { IoSearchOutline } from "react-icons/io5";
// import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { BiCartAdd } from "react-icons/bi";
import { LuUser } from "react-icons/lu";
import main_logo from "../images/main_logo.png";
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Link} from 'react-router-dom'
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { useAuth } from "./AuthContext";
import { useCart } from "./CartContext";
import {Dropdown} from "react-bootstrap";




const SearchBar = () => {
  const [book, setBook] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  
  const {totalQuantity} = useCart();
  const { user, isAuthenticated, logout,getUsername, getEmail  } = useAuth();

  
  useEffect(() => {
    if(searchTerm.trim() !== ""){
      try {
        axios.get(`/book/search?searchTerm=${searchTerm}`)
          .then(response => setBook(response.data.book))
          .catch(error => console.error('Axios Error:', error));
      } catch (error) {
        console.error('Error:', error);
      }
    } else{
      setBook([]);
    }
  }, [searchTerm]);

  
  const handleSearchClick = () => {
    setIsActive(!isActive);
  };
  
 
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleBookClick =() => {
    setsearchTerm('');
    setBook([]);
  }

  const handleLogout = () => {
    // Perform logout action here
    logout();
  };
  

  return (
    <>
      <header className="main-container">
        <div className="logo-div">

        <NavLink to="/" className="nav-link">
          <img className="logo-img" src={main_logo} alt="Pustakgriha" />
          </NavLink>
        </div>

        <div className="search-bar">
          <div className={`search-input ${isActive ? "active" : ""}`}>
            <form onSubmit ={handleSubmit}>
            <input
              type="text"
              placeholder="&nbsp; Search for books you love and explore your explore our extensive collection..."
              value={searchTerm}
              className="search-input"
              onChange={(e) => setsearchTerm(e.target.value)}
              onFocus={handleSearchClick}
            />
            <span className="search-icon" onClick={handleSearchClick}>

              <IoSearchOutline />
            </span>
            </form>
          </div>
        
          {isActive && book.length > 0 && (
          <div className="search-results-container">         
            {book.map((book) => (
              <Link to={`/booklisting/${book._id}`} key={book._id} className="book-card" onClick={handleBookClick}>
                
                <div className="searchbar-book-img">
                  <img src={book.imageURL} alt={book.bookTitle} />
                </div>
                <h5>{book.bookTitle}</h5>
                <p>By: {book.authorName}</p>
              </Link>
            ))}


        </div>
          )}  
      </div>
        

        

      <div className="icon-right">
      {isAuthenticated() ? (
          <Dropdown>
            <Dropdown.Toggle variant="" id="dropdown-basic">
              <LuUser />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Divider />
              <Dropdown.Item href="#" onClick={handleLogout}>
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          <NavLink to="/login" className="nav-link">
            <LuUser />
          </NavLink>
        )}

        
          <NavLink to="/shopping-cart" className="nav-link">
          <BiCartAdd />
          <span className="totalquantity">{totalQuantity}</span>
         </NavLink>

          <NavLink to="/Wishlist" className="nav-link">
            <MdOutlineFavoriteBorder />
          </NavLink>

          
        </div>
      </header>

    </>
  );
};

export default SearchBar;
