import React, { useState} from 'react';
import axios from 'axios';
import '../css/Review.css';
import toast from 'react-hot-toast';

const Review = ({ bookId }) => {
  const [reviews, setReview] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // // New state to store the user's review fetched from the server
  // const [userReview, setUserReview] = useState(0);

  // useEffect(() => {
  //   // Fetch the user's review for the current book from the server
  //   axios.get(`/reviews/${bookId}`)
  //     .then((response) => {
  //       const userReviewFromServer = response.data.rating;
  //       setUserReview(userReviewFromServer);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user review:', error);
  //     });
  // }, [bookId]);

  // useEffect(() => {
  //   // Initialize the review state with the stored user review
  //   setReview(userReview);
  // }, [userReview]);

  const handleStarClick = (starCount) => {
    setReview(starCount);
    setIsButtonDisabled(false); 
  };

  const handleStarHover = (starCount) => {
    setHoveredStar(starCount);
  };

  const handleStarLeave = () => {
    setHoveredStar(0);
  };

  const submitReview = () => {
    axios
      .post('/reviews', {
        bookId: bookId,
        rating: reviews,
      })
      .then((response) => {
        console.log('Review submitted successfully:', response.data);
        toast.success('Review submitted successfully');
      })
      .catch((error) => {
        console.error('Error submitting review:', error);
      });
  };

  return (
    <div className="star-rating-section">
      <h6 className="ReviewTitle">Rate this book:</h6>
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${reviews >= star || hoveredStar >= star ? 'selected' : ''}`}
            onClick={() => handleStarClick(star)}
            onMouseEnter={() => handleStarHover(star)}
            onMouseLeave={() => handleStarLeave()}
          >
            &#9733;
          </span>
        ))}
      </div>
      <div className='review-btn'>
      <button onClick={() => submitReview()} disabled={isButtonDisabled}>
        Submit Review
      </button>
      </div>
    </div>
  );
};

export default Review;
