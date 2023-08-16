import React, { useContext,useEffect,useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import  'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios"
import { setmycart } from '../redux/slice/cartSlice';


function Foods(){
    const params=useParams()
    const dispatch=useDispatch()

    const navigate=useNavigate()
    
    const foods=useSelector((state)=>state.foodSlice)
    const {logerDetails,isLogin}=useSelector((state)=>state.isLogin)
    const {mycart}=useSelector((state)=>state.cartSlice)
    const {allFoods}=foods

  


 const  cartadd=async(value)=>{
    
    const data=await  axios.post("http://localhost:13000/cart",JSON.stringify(mycart))
   
    }

    useEffect(()=>{
     if(mycart.cart.length>0){
         cartadd()
        }
   })
   const check_log=(id)=>{
       if(!isLogin){
        alert("Please Login First")
        navigate(`/Login/foods/${id}`)
       }
   }





    return(<div>
        <Header/>
    
       {allFoods && allFoods.map((value,index)=>{
               if(value.id==params.id){
                return(<div key={index}>
                     <div className="container">

                    <div className="card mb-3 cardfont" style={{marginTop:'10%'}}>
                        <div className="row no-gutters">
                        <div className="col-md-6">
                            <img src={`${value.image}`} alt="..." className='imgheight' />
                        </div>
                        <div className="col-md-6  ">
                            <div className="card-body ml-3 mt-5">
                            <h5 className="card-title"><label>RESTAURANT</label>: <span >{value.hotel_name}</span></h5>
                            <h5 className="card-text"><label>FOOD</label>: <span ></span>{value.food_name}</h5>
                            <h5 className="card-text"><label>PRICE</label>: <span>{value.cost}</span></h5>
                            <h5 className="card-text"><label>FOOD TYPE</label>: <span >{value.type}</span></h5>
                            {/* <button className="btn btn-primary" onClick={()=>{cart(value)}}   >ADD CART</button> */}
                            <button className='btn btn-primary' onClick={()=>{check_log(value.id);dispatch(setmycart({...mycart,cart:[...mycart.cart,value],email:logerDetails.email}));cartadd(value)}}>ADD CART</button>
                            <Link to={`/buy/food/${value.id}`}><button className="btn btn-success marg-left " >ORDER</button></Link>
                            </div>
                        </div>
                        </div>
                    </div>

                    </div>
                </div>)
               }
        
       })}
    <div style={{marginTop:'10%'}}>
       <Footer/>
    </div>

    </div>)
}

export default Foods;