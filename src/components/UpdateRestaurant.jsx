import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RestaurantsContext } from "../context/RestaurantsContext";
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = (props) => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { restaurants } = useContext(RestaurantsContext);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [priceRange, setPriceRange] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const response = await RestaurantFinder.get(`/${id}`);
      console.log(response.data.data.restaurants.name);
      setName(response.data.data.restaurants.name);
      setLocation(response.data.data.restaurants.location);
      setPriceRange(response.data.data.restaurants.price_range);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedRestaurant = await RestaurantFinder.put(`/${id}`, {
      name,
      location,
      price_range: priceRange,
    });
    navigate("/");
  };

  return (
    <div className="update-restaurant">
      <form action="">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="name"
          type="text"
          placeholder="Name"
        />
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          id="location"
          type="text"
          placeholder="Location"
        />
        <input
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          id="price_range"
          type="number"
          placeholder="Price range"
        />
        <button
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default UpdateRestaurant;