import {auth,db} from "../firebase/firebaseconfig"

import  'bootstrap/dist/css/bootstrap.min.css'
import { signOut } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { useContext, useEffect } from 'react'
import UserContext from '../context'
import Authmodal from './Modal/authModal'
import UserSidebar from "./Modal/userSidebar"
import { Link } from "react-router-dom"

import {doc, setDoc,onSnapshot} from "@firebase/firestore"




function Header(){
 const value=useContext(UserContext)
 const  {Currency,setCurrency,Symbol,setSymbol,User,setUser,watchList,setwatchList}=value
    useEffect(()=>{
        if(Currency==='INR'){
            setSymbol('₹')
        }
        else if(Currency==='USD'){
            setSymbol('$')
        }

    },[Currency])

    useEffect(()=>{
        onAuthStateChanged(auth,(logger)=>{
            if(logger) setUser(logger);
            else setUser(null)
            
        })
     },[])

     useEffect(()=>{
        if(User){
            const coinRef=doc(db,"watchlist",User.uid);
            var unsubscribe =  onSnapshot(coinRef,(coin)=>{
                if(coin.exists()){
                     setwatchList(coin.data().coins)
                     console.log(watchList)
                 }
             })
             return()=>{
                unsubscribe()
            }
        }
      
      },[User])

    
 
   
    return(
 
        <div className='container-fluid bg-dark text-white'>
                <div className='row  head'>
                    <div className='col-10 '>
                       <Link to={'/'} > Crypto Hunter</Link>
                    </div>
                    <div className='col-2'>
                        <div className='row'>
                            <div className='col-7'>
                                <select className="form-select" value={Currency} onChange={(e)=>setCurrency(e.target.value)}>
                                    <option value='INR'>INR</option>
                                    <option value="USD">USD</option>
                                </select>
                            </div>
                        <div className='col-5'>
                       {User ? (<>
                       
                       <UserSidebar/>
                       </>):(<Authmodal/>)}     
                        </div>
                        </div>
                    </div>
                </div>
                
       </div>



    )
}

export default Header