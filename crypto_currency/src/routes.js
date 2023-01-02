import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'
import Home from './pages/Home'
import Coinspage from './pages/Coinspage'
import UserContext from './context'
import { useEffect, useState } from 'react'
import axios from 'axios'





function MainRoutes(){
     const[User,setUser]=useState(null)
     const [Currency,setCurrency]=useState("INR")
     const [Symbol,setSymbol]=useState("₹")

     const [Coins,setCoins]=useState([])

     const [singleCoin,setsingleCoin]=useState()

     const [watchList,setwatchList]=useState([])

     const[Loading,setLoading]=useState(false)


     const CoinList =async (Currency) =>{
        const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${Currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
        setCoins(data)
        setLoading(true)
        console.log(Coins)
    }
    useEffect(()=>{
        CoinList(Currency)
    },[Currency])



     

    return(<>
    <UserContext.Provider value={{Currency,setCurrency,Symbol,setSymbol,singleCoin,setsingleCoin,User,setUser,watchList,setwatchList,Coins,setCoins}}>
        <Router>
            <Routes>
                
                <Route path='/' element={<Home/>}/>
                <Route path='/Coins/:id' element={<Coinspage/>}/>
            </Routes>
        </Router> 
    </UserContext.Provider>  
    </>)
}


export default MainRoutes