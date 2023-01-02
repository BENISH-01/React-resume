import React, { useEffect, useState } from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Login from './pages/login'
import Home from './pages/home'
import UserContext from './context'
import Foods from './pages/foods'
import Cart from './pages/cart'
import Buy from './pages/buy'
import Order from './pages/order'
import Hotel from './pages/Hotels'
import Register from './pages/Register'


function MainRoutes(){
    

    const [cartBuy,setcartBuy]=useState(localStorage.getItem('cart'))

 
    


   return(<>


          <Router>
            <Routes>
               <Route path='/' exact element={<Home/>} />
               <Route path='/Login/:name/:id'  element={<Login/>} />
               <Route path='/foods/:id'  element={<Foods/>} />
               <Route path='/cart' element={<Cart />} />
               <Route path='/buy/:name/:id'  element={<Buy/>}  />
               <Route path='/order/:id' element={<Order/>}/> 
               <Route path='/hotel/:name' element={<Hotel/>}/> 
               <Route path='/register' element={<Register/>}/> 
               
               
            </Routes>
        </Router>
      
    
   </>)


}
export default MainRoutes