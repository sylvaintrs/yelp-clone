import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { RestaurantsContextProvider } from './context/RestaurantsContext'

import './sass/main.css'

import Home from './pages/Home'
import RestaurantdetailPage from './pages/RestaurantDetailPage'
import UpdatePage from './pages/UpdatePage'


function App() {
  return (
    <RestaurantsContextProvider>
        <div className='app'>
          <Link to="/" className="floating-home">
            Home
          </Link>
          <Routes>
              <Route index element={<Home />}/>
              <Route path='/restaurants/:id' element={<RestaurantdetailPage />} />
              <Route path='/restaurants/:id/update' element={<UpdatePage />} />
          </Routes>
        </div>
    </RestaurantsContextProvider>
  )
}


export default App