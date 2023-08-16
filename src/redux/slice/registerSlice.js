import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const registerSlice=createSlice({
    name:'userDetails',
    initialState:{
        register:{
            name : '',
            email : '',
            password : '',
            aadhar : '',
            address : '',
            phone:'',
            city:'',
            area:'',
            pin:'', 
            cart:[],
            myorders:[]
        },
        data:false
    },
    reducers:{
        changeRegister:(state,action)=>{
            state.register=action.payload
        },
        setdata:(state,action)=>{
            state.data=action.payload
        }
    }
})
export const registerApi=(details)=>async(dispatch)=>{
    const data=await axios.post("http://localhost:13000/create",JSON.stringify(details))
    console.log(data)
    if(data.data=='Record inserted successfully'){
        dispatch(setdata(true))
    }
    
}

export const {changeRegister,setdata}=registerSlice.actions;
export default registerSlice.reducer