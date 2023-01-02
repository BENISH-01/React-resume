import React,{useContext, useState,useEffect} from "react"
import axios from 'axios'
import UserContext from "../context"
import { Container,  Table, TextField, ThemeProvider,makeStyles, LinearProgress } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import {Pagination} from "@material-ui/lab"


const useStyles=makeStyles(()=>({
  pagination:{
    "& .MultiPaginationItem-root":{
      color:"gold",
    },
  }
}))


function Coinstable(){
    
    const [Search,setSearch]=useState("")
    const[Page,setPage]=useState(1)
    const value=useContext(UserContext)
    const {Currency,Symbol,Coins,setCoins,User,Loading,setLoading}=value

    const navigate=useNavigate()

    
    const classes=useStyles()
  


const numbers=(num)=>{
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,",")
   }

const HandleSearch=()=>{
    return Coins.filter((value)=>
        value.name.toLowerCase().includes(Search) ||
        value.symbol.toLowerCase().includes(Search)
    )
}

console.log(HandleSearch())
console.log(Search)
console.log(Coins)


    return(<div>
       <Container> 
        <div className=" text-center">
             <h4 style={{
                fontFamily:"Montserrat",
                color:"white",
                fontSize:40
             }}>Cryptocurrency Prices by Market Cap</h4>
            <TextField label="Search for a Crypto Currency..." variant="outlined"
             style={{marginBottom:20,width:"100%",backgroundColor:"white"}}
             onChange={(e)=>setSearch(e.target.value)}/>
        </div>
     
        <Table className="mt-5">
            <thead className="cointable" >
                <tr className="text-dark" >
                    <th>Coin</th>
                    <th>Price</th>
                    <th>24h Change</th>
                    <th>Market Cap</th>
                </tr>
            </thead>
            <tbody className="text-white">
               {Loading==false?(<LinearProgress  style={{color:"gold",width:100}}  />):(<>
                                 
                                 {HandleSearch()
                                    .slice((Page-1)*10,(Page-1)*10+10)
                                    .map((coin,index)=>{
                                        let profit=coin.price_change_percentage_24h >=0
                                        return(
                                            <tr key={index} onClick={()=>navigate(`/Coins/${coin.id}`)} className="border-bottom my-5">
                                            <td className='row'>
                                            <img src={coin.image} className="my-2 col-2" height="50" alt=''/>
                                            <div className='col-4 mt-1 text-start'>
                                            <p style={{fontSize: 22 }} className='m-0'>{coin.symbol.toUpperCase()}</p>
                                            <p className='m-0 '>{coin.name}</p>
                                            </div>
                                            </td>
                                            <td className='pt-2'>{Symbol}{' '}{numbers(coin.current_price.toFixed(2))}</td>
                                            <td className='pt-2' style={{color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500, }}>{profit && "+"}{coin.price_change_percentage_24h.toFixed(2)}%</td>
                                            <td className='pt-2'>{Symbol}{" "}{numbers(coin.market_cap.toString().slice(0, -6))}</td>
                                        </tr>
                                        )
                                    })}
                                 </>) }
             
            </tbody>
        </Table>
           

          
        </Container>
        <Pagination
           count={Coins.length/10}
           style={{padding:20,width:"100%",display:"flex",justifyContent:"center",backgroundColor:"gold"}}
           classes={{ul:classes.pagination}}
           onChange={(_,value)=>{
            setPage(value);
            window.scroll(0,450)
            
           }}/>
       
    </div>)
}

export default Coinstable