import React, { useContext, useState } from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantsContext } from '../context/RestaurantsContext'

function AddRestaurant() {

    const {addRestaurant} = useContext(RestaurantsContext)

    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('Price Range')

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await RestaurantFinder.post('/', {
                name,
                location,
                price_range: priceRange
            })
            addRestaurant(response.data.data.restaurant)
        } catch (err) {console.log(err)}
    }

  return (
    <div className='add-restaurant'>
        <form action="#">
            <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Name' />
            <div className="separator"></div>
            <input value={location} onChange={e => setLocation(e.target.value)} type="text" placeholder='Location'/>
            <div className="separator"></div>
            <select value={priceRange} onChange={e => setPriceRange(e.target.value)}>
                <option disabled>Price Range</option>
                <option value='1'>$</option>
                <option value='2'>$$</option>
                <option value='3'>$$$</option>
                <option value='4'>$$$$</option>
                <option value='5'>$$$$$</option>
            </select>
            <div className="separator"></div>
            <button onClick={handleSubmit} >Add</button>
        </form>
    </div>
  )
}

export default AddRestaurant