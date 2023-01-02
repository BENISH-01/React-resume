import React,{useContext,useEffect} from 'react'
import UserContext from '../context'
import {useNavigate} from 'react-router-dom'
import  'bootstrap/dist/css/bootstrap.min.css'
import Header from '../Component/Header'
import Resumeform from './resumeform'







function Home(){
   const value=useContext(UserContext)
   const navigate=useNavigate()

   const local_check=localStorage.getItem('login')

   useEffect(()=>{
    if( local_check=='true' || value.isLogin ){
        navigate('/Home')
    }
    else{navigate('/')}
    
},[value.isLogin])



   
    return(<>
      <Header />
      
      {/* input form */}
      <Resumeform/>

     
    </>)
}

export default Home