import { createSlice } from "@reduxjs/toolkit";

export const cartSlice=createSlice({
    name:'cart',
    initialState:{
        mycart:{
            cart:[],
            email:''
        },
       
    },
    reducers:{
        setmycart:(state,action)=>{
          state.mycart=action.payload
       },
       
    }
})

export const {setmycart,setdeletecart} = cartSlice.actions
export default cartSlice.reducer