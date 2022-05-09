import React from "react";
import StarRating from "./StarRating";

const Reviews = ({ reviews }) => {
  // console.log(reviews)
  return (
    <div className="reviews-container">
      {reviews.map((review) => {
        return (
          <div key={review.id} className="review-card">
            <div className="name-stars">
              <span>{review.name}</span>
              <span>
                <StarRating rating={review.rating} />
              </span>
            </div>
            
            <div className="review-text">
              <p className="">{review.review}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Reviews;