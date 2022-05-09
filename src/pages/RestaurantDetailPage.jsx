import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";


import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";


import StarRating from "../components/StarRating";
import Reviews from "../components/Reviews";
import AddReview from "../components/AddReview";



const RestaurantDetailPage = () => {
  const { id } = useParams();
  const { selectedRestaurant, setSelectedRestaurant } = useContext(
    RestaurantsContext
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await RestaurantFinder.get(`/${id}`);

        setSelectedRestaurant(response.data.data);
        console.log(response.data.data)
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="restaurant-detail-page">
      {selectedRestaurant && (
        <>
          <header style={{ height: '30vh', color: 'white'}}>
            <h1>
              {selectedRestaurant.restaurant.name}
            </h1>
            <p>Add a review</p>
            <div className="text-center">
              <StarRating rating={selectedRestaurant.restaurant.average_rating} />
              <span className="text-warning ml-1">
                {selectedRestaurant.restaurant.count
                  ? `(${selectedRestaurant.restaurant.count})`
                  : "(0)"}
              </span>
            </div>
          </header>

          <AddReview />

          <Reviews reviews={selectedRestaurant.reviews} />
          
          
        </>
      )}
    </div>
  );
};

export default RestaurantDetailPage;