import React, { useContext } from 'react'
import  'bootstrap/dist/css/bootstrap.min.css'
import UserContext from '../context'
import '../App.css'
import {  useNavigate } from 'react-router-dom'



function Header(){
    const value=useContext(UserContext)
    const navigate=useNavigate()
   const user=localStorage.getItem('user')


   
    const Setlocal=()=>{
      localStorage.setItem('login', false)
      localStorage.setItem('user','')
      navigate('/')
      
    }
      return(<>
       <div className='row container  head-bar '>
        <div className='col-8 text-center '>
          <h3>RESUME APP</h3>
          {value.currentUser ? ( <h3>Welcome {value.currentUser.name}</h3>) : (<h3>Welcome {user}</h3>)}
        </div>
        <div className='col-4 log_button mt-3'><button className='btn btn-danger' type='button' onClick={()=>{value.setisLogin(false); Setlocal()}}>Logout</button></div>
       </div>
      
      </>)
}
export default Header