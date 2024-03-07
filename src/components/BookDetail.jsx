
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import "../css/bookdetail.css";
import DeliveryLocationDay from './DeliveryLocationDay';
import Review from './Review';
import { IoLanguageSharp } from "react-icons/io5";
import { TbWeight } from "react-icons/tb";
import { IoNewspaperOutline } from "react-icons/io5";
import { RiBarcodeLine } from "react-icons/ri";


const BookDetail = () => {
  const [book, setBook] = useState({});
  const { id } = useParams();
  

  useEffect(() => {
    axios.get(`/booklisting/${id}`)
      .then(res => {
        setBook(res.data);
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
      });
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <>
    <div className='main-book-details-container'>
    <div className="book-detail-container">
      <div className="book-details-wrapper">
        <div className="book-top-section">
          <img src={book.imageURL} alt={''} className="books-image" />
          
          <div className="book-info">
            <h2 className="book-title">{book.bookTitle}</h2>
            <p className="book-author"> by: {book.authorName}</p>
            <p className="book-category">Genres: {book.category}</p>
            <p className="book-Synopsis">Synopsis</p>
            <p className="book-description"> {book.bookDescription}</p>
            <p className="book-availability">Availability: {book.available ? 'Available' : 'Not Available'}</p>

            <div className="additional-info">
            <div className="info-box">
           <p className="info-label">Page Count</p>
           <p className="info-logo"><IoNewspaperOutline/></p>
           <p className="info-value">{book.pagecount}Pages</p>
           </div>
          <div className="info-box">
         <p className="info-label">Weight</p>
         <p className="info-logo"><TbWeight/></p>
         <p className="info-value">{book.Weight}g</p>
         </div>
         <div className="info-box">
        <p className="info-label">ISBN</p>
        <p className="info-logo"><RiBarcodeLine/></p>
        <p className="info-value">{book.ISBN}</p>
        </div>
        <div className="info-box">
        <p className="info-label">Language</p>
        <p className="info-logo">< IoLanguageSharp/></p>
        <p className="info-value">{book. Language}</p>
       </div>
       </div>
   
          </div>
            </div>  
            </div>
           
        </div>

  
      <div className="review-delivery">
      <div>
        <DeliveryLocationDay book={book}  />
      </div>
      <div>
        <Review />
      </div>
      
      </div>
    </div>
      </>
  );
};

export default BookDetail;
