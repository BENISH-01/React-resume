
import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { changeLogin, setSearch, setlogerDetails } from "../redux/slice/loginSlice";
import {setdata} from '../redux/slice/registerSlice'
import { setChangefood } from "../redux/slice/foodSlice";
import { setmycart } from "../redux/slice/cartSlice";


function Header(){

  const value=useSelector((state)=>state.isLogin) //loginSlice
  const {isLogin,logerDetails}=value
  const allFoods=useSelector((state)=>state.foodSlice)
  const{mycart}=useSelector((state)=>state.cartSlice)

  //  useEffect(()=>{
  //    const local_email=JSON.parse(localStorage.getItem("user-food"))
  //    if(local_email !== null){
  //     dispatch(setlogerDetails(local_email))
  //    }
     
      
  //    })
  
  
  const dispatch=useDispatch()
   useEffect(()=>{
    getallFoods()
    // getcart_db()
    
  },[])

  const getallFoods=async()=>{
    const data=await axios.get("http://localhost:13000/read")
    let b=data.data
    let c=JSON.parse(b.items)
    dispatch(setChangefood(c))
    

  }

  // const getcart_db=async()=>{
  //   console.log(logerDetails)
  //   const {data}=await axios.post("http://localhost:13000/getcart",JSON.stringify(logerDetails))
  //   console.log(data)
  //   let new_cart=JSON.parse(data.cart)
  //   dispatch(setmycart({...mycart,cart:new_cart,email:logerDetails.email}))

  // }

  
 
  
// to check login status after refresh
  useEffect(()=>{
    const locallog=localStorage.getItem('login-food')
      if(locallog=='true'){
        dispatch(changeLogin(true))
        const local_email=JSON.parse(localStorage.getItem("user-food"))
        dispatch(setlogerDetails(local_email))
      }
      if(locallog=='false'){
      dispatch(setmycart({...mycart,cart:[],email:''}))
      }
  },[isLogin])
    // logout
    const logout=()=>{
      dispatch(changeLogin(false)); //to change login state
      dispatch(setdata(false));  //to change register state
      localStorage.setItem('login-food',false)
      localStorage.setItem('user-food',null)
      dispatch(setlogerDetails({logerDetails:''}))
      
    }

    console.log(window.location.pathname)
     return(<>
           <nav className="navbar navbar-expand-lg navbar-light bg-success navfont ">
        <a className="navbar-brand" href="#"><img src="data:image/png;base64,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"/></a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
          <ul className="navbar-nav justify-content-right navhover navleft">
                <li className="nav-item active">
                    <Link to={'/'} className="nav-link text-white" >Home </Link>
                </li>
                <li className="nav-item dropdown ml-5">
                    <Link className="nav-link dropdown-toggle text-white" href="#" role="button"         data-toggle="dropdown" aria-expanded="false">
                      Hotels
                    </Link>
                  <div className="dropdown-menu">
                    <Link to={'/hotel/KFC'} className="dropdown-item" >KFC</Link>
                    <Link to={'/hotel/Pizza Hut'} className="dropdown-item">Pizza Hut</Link>
                    <Link to={'/hotel/Hotel Ariya Bhavan'} className="dropdown-item" >Ariya Bhavan</Link>
                    <Link to={'/hotel/Dindugul Thalapakatti'} className="dropdown-item" >Dindugul Thalapakatti</Link>
                  </div>
                </li>
                <li className="nav-item ml-4">
                    <Link className="nav-link text-white" to={'/cart'}>Cart</Link>
                </li>
                
          </ul>
        <div className="navleftlast">
           <ul className="navbar-nav  navfont   ">
               {window.location.pathname !='/cart' && <li>
                   <input class="form-control " aria-label="Search" placeholder="Search" onChange={(e)=>{dispatch(setSearch(e.target.value))}}/>
                </li>}
              {isLogin==true ?(<li className="nav-item active" style={window.location.pathname!='/cart'?{marginLeft:"40%"}:{marginLeft:"480%"}}> <Link to={'/'} onClick={logout}><button className="btn btn-danger btn-lg" type="button">Logout</button></Link></li>):(<li className="nav-item active" style={{marginLeft:"20%"}}> <Link to={'/Login/header/id'}><button type="button" className="btn btn-danger btn-lg"
              >Login</button></Link></li>) }
            </ul>
        </div>
      </div>
    </nav>

  </>)
}

export default Header;
