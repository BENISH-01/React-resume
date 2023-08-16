import { createSlice } from "@reduxjs/toolkit";

export const foodSlice=createSlice({
    name:'foods',
    initialState:{
        allFoods:""
    },
    
    reducers:{
        setChangefood:(state,action)=>{
          state.allFoods=action.payload
       
        }
    }
})


export const {setChangefood} = foodSlice.actions
export default foodSlice.reducer