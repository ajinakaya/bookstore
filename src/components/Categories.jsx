import React, { useEffect, useState } from "react";
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import FooterUI from "./FooterUI";
import "../css/Categories.css";

const Categories = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/books/${category}`);
        setBooks(response.data.books);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <>
          <div className="contents">
            <div className="content-column">
              <div className="list-title">
                <h3> Genres</h3>
              </div>
              <div className="list-box">
                <Link className="category-link" to="/category/Fiction">Fiction</Link>
                <Link className="category-link" to="/category/Biography">Biography</Link>
                <Link className="category-link" to="/category/Historical">Historical</Link>
                <Link className="category-link" to="/category/Kids & Teen">Kids & Teen</Link>
                <Link className="category-link" to="/category/Photography">Photography</Link>
                <Link className="category-link" to="/category/Inventory">Inventory</Link>
                <Link className="category-link" to="/category/Improvement">Improvement</Link>
              </div>
            </div>
            <div className="booksView-content">
              <div className="books-main">
                <div className="books-row">
                  {books.map((book) => (
                    <Link to={`/booklisting/${book._id}`} key={book._id} className="books-items">
                        <div className="book-item-content">
                          <div className="book-cardGenre">
                          <div className="book-img-genre">
                            <img src={book.imageURL} alt={`Cover of ${book.bookTitle}`} />
                            <div>
                              <div className="book-text">
                                <h4>{book.bookTitle}</h4>
                                <p>{'Rs. ' + book.price}</p>
                                <button className="add-to-cart-btn">ADD TO CART</button>
                              </div>
                            </div>
                          </div>
                          </div>
                        </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </>
  );
};

export default Categories;
