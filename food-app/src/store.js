import { configureStore } from '@reduxjs/toolkit'
import LoginSlice from './redux/slice/loginSlice'
import foodSlice from './redux/slice/foodSlice'
import registerSlice from './redux/slice/registerSlice'
import cartSlice from './redux/slice/cartSlice'

export default configureStore({
    reducer:{
        isLogin:LoginSlice,
        foodSlice:foodSlice,
        registerSlice:registerSlice,
        cartSlice:cartSlice
        
    }
})