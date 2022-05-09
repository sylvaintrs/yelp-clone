import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

import StarRating from './StarRating'

function RestaurantList(props) {

    const {restaurants, setRestaurants} = useContext(RestaurantsContext)
    const navigate = useNavigate()

    useEffect(() => {

        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get('/')
                setRestaurants(response.data.data.restaurants)
            } catch (err) { console.log(err) }
        }

        fetchData()
    }, [])


    const handleDelete = (e, id) => {
        e.stopPropagation()
        try {
            RestaurantFinder.delete('/' + id)
            setRestaurants(restaurants.filter((restaurant) => {
                return restaurant.id !== id
            }))
        } catch (err) { console.log(err) }
    }
    const handleUpdate = (e, id) => {
        e.stopPropagation()
        try {
            navigate(`/restaurants/${id}/update`)
        } catch (err) { console.log(err) }
    }
    const handleRestaurantSelect = (id) => {
        navigate(`/restaurants/${id}`);
    };

    const renderRating = (restaurant) => {
        if (!restaurant.count) {
          return <span className="text-warning">0 reviews</span>;
        }
        return (
          <>
            <StarRating rating={restaurant.id} />
            <span className="text-warning ml-1">({restaurant.count})</span>
          </>
        );
    };



  return (
    <div className='list-restaurant'>
        <table>
            <thead>
                <tr>
                    <th>Restaurant</th>
                    <th>Location</th>
                    <th>Price range</th>
                    <th>Ratings</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {restaurants && restaurants.map(restaurant => {
                    return (
                        <tr onClick={() => handleRestaurantSelect(restaurant.id)} key={restaurant.id}>
                            <td>{restaurant.name}</td>
                            <td>{restaurant.location}</td>
                            <td>{"$".repeat(restaurant.price_range)}</td>
                            <td>{renderRating(restaurant)}</td>
                            <td><button onClick={(e) => handleUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                            <td><button onClick={(e) => handleDelete(e, restaurant.id)} className="btn btn-danger">Delete</button></td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
  )
}

export default RestaurantList