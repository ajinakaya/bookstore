import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Bookcards from './Bookcards';

const NewArrivals = () => {
  const [book, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/book/newArrival");
        setNewArrivals(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Bookcards book={book} headline="New Arrival Books" />
    </div>
  );
};

export default NewArrivals;
