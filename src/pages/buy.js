import React ,{useContext, useState}from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import UserContext from '../context';
import cartSlice from '../redux/slice/cartSlice';


function Buy(){

const params=useParams()

   const cart_buy=JSON.parse(localStorage.getItem('cart'))

   const foods=useSelector((state)=>state.foodSlice)
   const{allFoods}=foods

   const {mycart}=useSelector((state)=>state.cartSlice)
   
   
 
   let total=0
    return(<div>
        <Header/>
        {/* url name=cart */}
    <div className='container'>
        <div className='row row-cols-1 row-cols-md-3  '> 
        {params.name=='cart' && mycart.cart && mycart.cart.map((value,index)=>{
            total=total+value.rate
            return(<div key={index} className='text-center'>
                       <div className="col mb-4">
                            <div className="card">
                                <img src={value.image} className="card-img-top imgheight" alt="..." />
                            <div className="card-body">
                                <h5 className="card-title">{value.food_name}</h5>
                                <h5>{value.cost}</h5>
                                <h5>{value.type}</h5>
                            </div>
                        </div>
                    </div>
                    
                </div>)
            
        })}
         </div> 
    </div>

        {/*url name=food */}
         <div className='card'>
        {params.name=='food' && allFoods.map((data,i)=>{
              if(params.id==data.id){
                console.log("data",data)
                 total=total+data.rate
                return(<div key={i}>
                  <div className='text-center' >
                    
                    <img src={data.image} className='w-25'/>
                    <h4>{data.food_name}</h4>
                    <h4>{data.cost}</h4>
                    <h4>{data.type}</h4>
                 </div>
                </div>)
            }
            // return(<div key={index}>
            {/* {value.food.map((data,i)=>{
                
                if(params.id==data.id){
                    console.log("data",data)
                     total=total+data.rate
                    return(<div key={i}>
                      <div className='text-center' >
                        
                        <img src={data.image} className='w-25'/>
                        <h4>{data.food_name}</h4>
                        <h4>{data.cost}</h4>
                        <h4>{data.type}</h4>
                     </div>
                    </div>)
                }
            })} */}
            
        })}

         </div>

    
        {params.name=='food' ?( <Link  to={`/order/${params.id}`}> <button className='btn btn-info col-12 text-white'>Place Order /{total}₹</button></Link> ):(( <Link  to={'/order/cart'}> <button className='btn btn-info col-12 text-white'>Place Order /{total}₹</button></Link> ))}

        

    </div>)
}
export default Buy;