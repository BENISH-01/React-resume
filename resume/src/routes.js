import React, {useState,useContext}  from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import Home from './pages/Home'
import Register from './pages/Register'
import UserContext from './context'
import Login from './pages/Login'
import ViewResume from './pages/View'







function MainRoutes(){
    const [isLogin,setisLogin]=useState(false)
    const[currentUser,setcurrentUser]=useState()
    const[Resume,setResume]=useState({
      name:'',
      email:'',
      phone:'',
      role:'',
      objective:'',
      skills:[],
      languages:[],
      intrest:[],
      education:[],
      project:[],
      experience:[],
      certification:[],
      personal_details:{},
      hobbies:[]
    })


    
   
  
    

    
    

    return(
      <UserContext.Provider  value={{isLogin,setisLogin,currentUser,setcurrentUser,Resume,setResume}}>
          <Router>
            <Routes>
               <Route path='/'  element={<Login/>} />
               <Route path='/Home' element={<Home/>} />
               <Route path='/Register' element={<Register/>}/>
               <Route path='/View/:id' element={<ViewResume/>}/>
            </Routes>
        </Router>
      </UserContext.Provider>
    )
}

export default MainRoutes