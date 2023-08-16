import axios from 'axios';
import React, {  useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate, useParams,Link } from 'react-router-dom'





function Order(){
    const foods=useSelector((state)=>state.foodSlice)
    const {allFoods}=foods

    const login=useSelector((state)=>state.isLogin)
    const {isLogin,logerDetails}=login

   const params=useParams();
   const locallog=localStorage.getItem('login-food')

   const {mycart}=useSelector((state)=>state.cartSlice)

   const navigate=useNavigate()

   useEffect(()=>{
      if( isLogin==false && locallog=='false'){
        alert("please log in first")
        navigate(`/login/order/${params.id}`)
      }
      
   },[])

   const Buy=()=>{
           alert('Your Order is Placed Successfully')
           if(params.id=='cart'){
           localStorage.removeItem('cart')
           }
           navigate('/')
   }

// const Buy=async()=>{
//     if(params.id=='cart'){
//         const data=await axios.post()
//     }
// }




  
  let total=0;

    return(
        <div className='order'>
            <div>
                {params.id!='cart'  && allFoods.map((data,index)=>{
                    if(params.id==data.id){
                        total=total+data.rate
                        return(
                            <div key={index}>
                                <img src={data.image} className='w-25'/>
                                <h3>Food:{data.food_name}</h3>
                                <h4>Cost:{data.cost}</h4>
                                <h4>Type:{data.type}</h4>
                            </div>
                        )
                    }
                    
                    
                })}
                <div className='container '>
                <div className='row orderview  text-center mb-5 '>
                 {params.id=='cart'  && mycart.cart && mycart.cart.map((value,index)=>{
                    total=total+value.rate
                    return(
                    
                         <div className='card  col-3 order_card_cart' key={index}>
                            <div key={index} className='card-body'>
                                <img src={value.image} className='card-img-top w-30 h-50'/>
                                <h3 className='card-title'>{value.food_name}</h3>
                                <h4>Cost:{value.cost}</h4>
                                <h4>Type:{value.type}</h4>
                                
                            </div>
                         </div>     
                        
                    
                    )
                })}
                </div>
                </div>
            </div>

            {/* order form */}
    <div className="container p-0 orderpage ">
        <div className='orderwidth m-auto'>
        <div className="card order px-4 ">
            <p className="h8 py-3 order">Payment Details</p>
            <div className="row gx-3">
                <div className="col-12">
                    <div className="d-flex flex-column">
                        <p className="text mb-1 order"> Name</p>
                        <input className="form-control mb-3" type="text" placeholder="Name" defaultValue={logerDetails.name}/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="d-flex flex-column">
                        <p className="text mb-1 order"> Address</p>
                        <input className="form-control mb-3" type="text" placeholder="Address" defaultValue={logerDetails.address}/>
                    </div>
                </div>
                <div className="col-12">
                    <div className="d-flex flex-column">
                        <p className="text mb-1 order">Card Number</p>
                        <input className="form-control mb-3" type="text" placeholder="1234 5678 435678"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex flex-column">
                        <p className="text mb-1 order">Expiry</p>
                        <input className="form-control mb-3" type="text" placeholder="MM/YYYY"/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="d-flex flex-column">
                        <p className="text mb-1 order">CVV/CVC</p>
                        <input className="form-control mb-3 pt-2 " type="password" placeholder="***"/>
                    </div>
                </div>
                <div className="row text-center">
                    <div className="btn btn-primary order mb-3 col-3">
                        <span className="ps-3" onClick={Buy}>Pay - ₹ {total}</span>
                        
                    </div>
                    <div className='col-6'><button type='button' className='btn btn-danger' onClick={()=>{alert('your order is cancelled');navigate('/')}}>Cancel Order</button></div>
                </div>
            </div>
        </div>
    </div>
  </div>
  </div>

        
    )
}


export default Order