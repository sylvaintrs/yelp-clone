import React, { useState } from "react";
import RestaurantFinder from "../apis/RestaurantFinder";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const AddReview = () => {
  const { id } = useParams();
  const location = useLocation();
  // console.log(location);
  const history = useNavigate();
  // console.log(id);

  const [name, setName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState("Rating");

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await RestaurantFinder.post(`/${id}/addReview`, {
        name,
        review: reviewText,
        rating,
      });
      history("/");
      history(-1);
    } catch (err) {}
  };


  return (
    <div className="add-review">
      <form action="">
        <div className="top">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            placeholder="Name"
            type="text"
            className="form-control"
          />

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            id="rating"
            className="custom-select"
          >
            <option disabled>Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          id="Review"
          className="form-control"
          placeholder="Your review"
        ></textarea>

        <button
          type="submit"
          onClick={handleSubmitReview}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddReview;