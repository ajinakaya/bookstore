// Bestsellers.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcards from './Bookcards';

const Bestsellers = () => {
  const [book, setBestsellers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/book/bestseller");
        setBestsellers(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Bookcards book={book} headline="Bestseller Books" />
    </div>
  );
};

export default Bestsellers;
