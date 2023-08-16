import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const  LoginSlice=createSlice({
    name:'logincheck',
    initialState:{
        isLogin:false,
        loginDetails:{
          email : '',
          password : ''
        },
        logerDetails:'',
        search:''
        
    },
    reducers:{
      changeLogin:(state,action)=>{
        state.isLogin=action.payload
      },
      changeLogindetails:(state,action)=>{
        state.loginDetails=action.payload
      },
      setlogerDetails:(state,action)=>{
        state.logerDetails=action.payload
      },
      setSearch:(state,action)=>{
        state.search = action.payload
      }
    }

})

// login
export const verify=(userdata)=>async(dispatch)=>{
  const {data}=await axios.post("http://localhost:13000/login",JSON.stringify(userdata))
  console.log(data)
  
  if(data.data !== null){
     dispatch(changeLogin(true))
     dispatch(setlogerDetails(data.data))
     localStorage.setItem('login-food',true)
     localStorage.setItem('user-food',JSON.stringify(data.data))
     localStorage.setItem('user-email',data.data.email)
     console.log(data)
    }
  else{
    alert("Wrong Email or Password")
  }

}
export const {changeLogin,changeLogindetails,setlogerDetails,setSearch}=LoginSlice.actions

export default LoginSlice.reducer