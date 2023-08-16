import React from 'react'
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'




function  Hotel(){

    const params=useParams();
    const foods=useSelector((state)=>state.foodSlice)
    const{allFoods}=foods
    
   return(<div >
    <Header/>
    

    {/* hotels */}
  <div className='text-center hotel-name mt-3 container mb-4'>
         <h1> Welcome To {params.name} !!!</h1>
    </div>
    <div className='container-fluid mt-5 mb-5'>
      <div className='row'>
       {allFoods && allFoods.map((value,index)=>{
          if(value.hotel_name==params.name){
               return(
                   <div className='card col-3 text-center' key={index} style={{marginLeft:"6%"}}>
                           <div > 
                              <Link to={`/foods/${value.id}`}>
                                  <img src={value.image} className='w-100 imgheight' />
                              </Link>
                                  <h4>{value.food_name}</h4>
                                  <h4>{value.cost}</h4>
                                  <h4>{value.type}</h4>
                            </div>   
                      </div>)
                   
              
          }
        })}
      </div>

  </div>
  <div className='mt-4'>
     <Footer/>
  </div>
</div>)
   
}

export default Hotel
