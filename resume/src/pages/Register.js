import React, { useState } from 'react'
import  'bootstrap/dist/css/bootstrap.min.css'
import '../App.css';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'





function Register(){

   const navigate=useNavigate()

    const[register,setRegister]=useState({
        request : 'create_candidate',
        name : '',
        email : '',
        password : '',
        aadhar : '',
        address : '',
        phone:'',
        city:'',
        area:'',
        pin:'',
        })

        const submit=async()=>{
            const data=await axios.post("https://karka.academy/api/action.php?",JSON.stringify(register))
            console.log(data)
            if(data){
                navigate('/')
            }
        }
     return(<div>
      
      <h2 className='text-center'>Please fill your Details!!!</h2>
     <div className='container display-form '>
     <form>
        NAME:<input className='form-control' onChange={(e)=>setRegister({...register,name:e.target.value})}/>
        EMAIL:<input className='form-control' onChange={(e)=>setRegister({...register,email:e.target.value})}/>
        PASSWORD:<input className='form-control' onChange={(e)=>setRegister({...register,password:e.target.value})}/>
        AADHAR:<input className='form-control' onChange={(e)=>setRegister({...register,aadhar:e.target.value})}/>
        ADDRESS:<input className='form-control' onChange={(e)=>setRegister({...register,address:e.target.value})}/>
        PHONE:<input className='form-control' onChange={(e)=>setRegister({...register,phone:e.target.value})}/>
        CITY:<input className='form-control' onChange={(e)=>setRegister({...register,city:e.target.value})}/>
        AREA:<input className='form-control' onChange={(e)=>setRegister({...register,area:e.target.value})}/>
        PIN:<input className='form-control' onChange={(e)=>setRegister({...register,pin:e.target.value})}/>
        <button type='button' className='btn btn-primary mt-3 col-12' onClick={submit}>Create Account</button>
     </form>
     </div>

   </div>)
 }
 export default Register