import { CircularProgress } from "@material-ui/core"
import axios from "axios"
import { useContext, useEffect, useState } from "react"
import UserContext from "../context"
import {Line} from "react-chartjs-2"
import { chartDays } from "./chart/Chartdays"

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)




function CoinChart(){
    
    const[History,setHistory]=useState()
    const[Days,setDays]=useState(1)
    const [flag,setflag] = useState(false)

    const value=useContext(UserContext)
     const {Currency,Symbol,singleCoin}=value;

     useEffect(()=>{
        getHistory()
     },[Currency,Days])

     const getHistory=async()=>{
        const {data}=await axios.get(`https://api.coingecko.com/api/v3/coins/${singleCoin.id}/market_chart?vs_currency=${Currency}&days=${Days}`)
        setHistory(data.prices)
        setflag(true)
     }
    
     console.log(History)
    return(
     <div>
        {!History || flag===false ? (<CircularProgress 
        style={{color:"gold"}}
        size={200}
        thickness={1}/>):(
            <>
            <Line 
            
            data={{
                labels:History.map((coin)=>{
                    let date=new Date(coin[0]);
                    let time=date.getHours() >12 ?
                    `${date.getHours()-12}:${date.getMinutes()}PM`
                    :`${date.getHours()}:${date.getMinutes()}AM`

                    return Days===1 ? time:date.toLocaleDateString()
                }),
              datasets:[
                {
                data:History.map((coin)=>coin[1]),
                label:`Price(Past${Days} Days) in ${Currency}`,
                borderColor:"#EEBC1D"
                }
              ]
            }}
            options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
            }}/>
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <button className="btn selectbutton btn-outline-warning"
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                 
                >
                  {day.label}
                </button>
              ))}
            </div>
            </>
        )}
     </div>
    )
}
export default CoinChart