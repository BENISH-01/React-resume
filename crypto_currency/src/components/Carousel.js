import React, { useContext, useEffect,useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context';
import AliceCarousel from 'react-alice-carousel';
import { makeStyles } from '@material-ui/core';

const useStyles=makeStyles((theme)=>({
    carousel:{
        height:'50%',
        display:"flex",
        alignItems:"center",
        width:'100%',
        fontFamily:"Montserrat"
        
    },
    carouselItem: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        textTransform: "uppercase",
        color: "white",
      }
}))

function Carousel(){
   const value=useContext(UserContext)
   const {Currency,Symbol}=value

   const [Trending,setTrending]=useState([])

   useEffect(()=>{
    TrendingCoins(Currency)
   },[Currency])

   const numbers=(num)=>{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
   }

 const TrendingCoins = async(currency) =>{
 const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`)
 setTrending(data)
 console.log(Trending)
}

const classes=useStyles()
const responsiveItems={
    0:{
        items:2
    },
    512:{
        items:4
    }
}

const coinItems=Trending.map((value)=>{
    let profit=value.price_change_percentage_24h >=0
    return(<>
      <Link to={`/coins/${value.id}`} className={classes.carouselItem} >
        <img src={value.image} alt={value.name} height='80' style={{marginBottom:10}}/>
        <span>{value.symbol}</span>
        <span style={{
            color:profit > 0 ?"rgb(14,203,129)" :"red",
            fontWeight:"500"
        }}>{profit && '+'} {value.price_change_percentage_24h.toFixed(2)}%</span>
        <span>{Symbol}{numbers(value.current_price.toFixed(2))}</span>
      </Link>
    </>)
})



    return(<div className={classes.carousel}>
        <AliceCarousel 
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={2000}
        disableButtonsControls
        disableDotsControls
        responsive={responsiveItems}
        autoPlay
        items={coinItems}/>
    </div>)
}
export default Carousel