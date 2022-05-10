import axios from 'axios'

export default axios.create({
    baseURL: 'https://yelp-clone-backend.herokuapp.com/api/v1/restaurants'
})