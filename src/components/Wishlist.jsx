import React from 'react';
import { useWishlist } from './WishlistContext';
 
const Wishlist = () => {
  const { wishlist } = useWishlist();
 
  return (
    <div className='wishlist'>
      <h2>Your Wishlist</h2>
      {wishlist.length > 0 ? (
        <ul>
          {wishlist.map((bookItem) => (
           
            <li key={bookItem._id} className="wishlist-item"> 
             
              <img src={bookItem.imageURL} alt=" " className="book-image__img" />

              <div className='wishlist-details'>
              <p>{bookItem.bookTitle}</p>
              <p>by:{bookItem.authorName}</p>
              </div> 
            </li>
          ))}
          
        </ul>
        
      ) : (
        <p>Your wishlist is empty.</p>
      )}
    </div>
    
  );
};
 
export default Wishlist;
 