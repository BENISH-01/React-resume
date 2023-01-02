import React ,{useContext,useEffect}from "react";
import Header from "../components/Header";
import  'bootstrap/dist/css/bootstrap.min.css';
import Banner from "../components/Banner";
import Coinstable from "../components/Coinstable";


import UserContext from "../context";

function Home(){
    const value=useContext(UserContext)
    const {User,watchList,setwatchList}=value

    // useEffect(()=>{
    //     if(User){
    //         const coinRef=doc(db,"watchlist",User.uid);
    //         var unsubscribe =  onSnapshot(coinRef,(coin)=>{
    //             if(coin.exists()){
    //                  setwatchList(coin.data().coins)
    //                  console.log(watchList)
    //              }
    //          })
    //          return()=>{
    //             unsubscribe()
    //         }
    //     }
      
    //   },[User])

    return(<div>
         <Header/>
         <Banner/>
         <Coinstable/>
         
    </div>)
}

export default Home