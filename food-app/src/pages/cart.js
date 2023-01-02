import React, { useEffect, useState } from 'react'
import '../App.css'
import {Link} from 'react-router-dom'
import Header from '../components/Header'
import { useDispatch, useSelector } from 'react-redux'
import {  setmycart } from '../redux/slice/cartSlice'
import axios from 'axios'



function Cart(){
     const cart_products=JSON.parse(localStorage.getItem('cart'))

     const dispatch=useDispatch()

     const{mycart}=useSelector((state)=>state.cartSlice)
     const{logerDetails,isLogin}=useSelector((state)=>state.isLogin)
    

    useEffect(()=>{
        getcart_db()
    },[isLogin])

    const remove_item=async(i)=>{
        const data=await axios.post("http://localhost:13000/deletecart",JSON.stringify({index:i,email:logerDetails.email}))
        console.log(data)
        getcart_db()
    }
 

   
        const getcart_db=async()=>{
            console.log(logerDetails)
            const {data}=await axios.post("http://localhost:13000/getcart",JSON.stringify(logerDetails))
            let new_cart=JSON.parse(data.cart)
            dispatch(setmycart({...mycart,cart:new_cart,email:logerDetails.email}))
        }

   const get_cart=()=>{

    let total=0
    
    return(
        <div className='container'>
        <div className='row text-center' >
           {mycart.cart && mycart.cart.length==0?(<div>
              <h1>Your Cart Is Empty</h1>
              <div><Link to={'/'}>Click here to add items</Link></div>
           </div>):(<>
          {mycart.cart && mycart.cart.map((value,index)=>{
            
             total=total+value.rate

           return(
               <div key={index} className=' col-4 card '>
                    <div className='cart-img'>
                       <img src={value.image} className='card-img-top imgheightcart '/>
                       <div className="card-body">
                               <h4 className="card-title">{value.food_name}</h4>
                               <h5 className='card-text'>{value.cost}</h5>
                               <h5 className='card-text'>{value.type}</h5>
                       </div>
                       <button type='button' className='btn btn-danger' onClick={()=>{remove_item(index)}}>Remove</button>
                    </div>
                       
                    
               </div>
           )
       })}
        <Link to={`/buy/cart/items`}><button className='btn btn-primary col-12 mt-5'>Buy All Items-{total}₹</button></Link>
       </>)}
      
   </div>
   </div> )
   }

   


   

    return(<>
        <Header/>
        {get_cart()}
        </>)
}
export default Cart
