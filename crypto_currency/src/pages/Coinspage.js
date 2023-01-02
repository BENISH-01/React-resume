import axios from "axios"
import React, { useEffect,useState,useContext} from "react"
import {useParams} from "react-router-dom"
  import parse from 'react-html-parser'
import Header from "../components/Header"
import { LinearProgress } from "@material-ui/core"
import UserContext from "../context"
import CoinChart from "../components/CoinChart"
import {auth,db}  from "../firebase/firebaseconfig"
import {doc, setDoc,onSnapshot} from "@firebase/firestore"


function Coinspage(){
    const params=useParams()

    const value=useContext(UserContext)

    const {Currency,Symbol,singleCoin,setsingleCoin,User,watchList,setwatchList}=value

    

 
    
  

    useEffect(()=>{
        fetchSinglecoin(params.id)
    },[params.id])

   

    const numbers=(num)=>{
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
     }

    //  watchlist add
    const addWatchlist= async ()=>{
      const coinRef= doc(db,"watchlist",User.uid);

      try{
        await setDoc(coinRef,
          {coins:watchList ? [...watchList,singleCoin?.id]:[singleCoin?.id]})
          alert(`${singleCoin.id} added to watch list`)

        } catch(error){
          alert(error.message)
        }
      
    }
    // watchlist remove

    const removewatchlist= async ()=>{
       const coinRef= doc(db,"watchlist",User.uid);

      try{
        await setDoc(coinRef,
          {coins: watchList.filter((watch)=>watch !== singleCoin.id)},
          {marge:"true"}
          )
          alert(`${singleCoin.id} removed fromWatchlist`)

        } catch(error){
          alert(error.message)
        }
    }
  
    

    


 const fetchSinglecoin=async (id)=>{
    const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
     setsingleCoin(data)
 }
 console.log(singleCoin)
 if(!singleCoin) {
   return <LinearProgress style={{backgroundColor:"gold"}}/>
 }

    return(<div>
      <Header/>
       <div className="row mt-5 container  text-white ">
        {/* sidebar */}
        <div className="col-4 coinleft">
            <img src={singleCoin?.image.large} style={{height:200,marginBottom:10}}/>
            <h3>{singleCoin?.name}</h3>
           <p>  {parse(singleCoin?.description.en.split(". ")[0])} </p>
           <h5>Rank:{singleCoin?.market_cap_rank}</h5>
           <h5>Current Price:{Symbol}{numbers(singleCoin?.market_data.current_price[Currency.toLowerCase()])}</h5>
           <h5>Market Cap:{Symbol} {numbers(singleCoin?.market_data.market_cap[Currency.toLowerCase()])}</h5>
            {User!==null && <>{!watchList.includes(singleCoin.id)?<><button className="btn btn-warning col-12 mt-2" onClick={addWatchlist}>Add To Watchlist</button></>:<><button className="btn btn-danger col-12 mt-2" onClick={removewatchlist}>Remove Watch List</button></>}</>}
            
        </div>
        {/* chart */}
      <div className="col-7 chart">
            <CoinChart/>
      </div>

       </div>
    </div>)
}
export default Coinspage