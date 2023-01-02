import React,{useContext,useEffect,useState} from'react'
import  'bootstrap/dist/css/bootstrap.min.css'
import {Link,useNavigate} from 'react-router-dom'
import UserContext from '../context'
import axios from'axios'


function Login(){
    
      
    const value= useContext(UserContext)
    const navigate=useNavigate()
    const local_check=localStorage.getItem('login')

    useEffect(()=>{
          if(value.isLogin || local_check=='true'){
              navigate('/Home')
            }
          else{
            navigate('/')
          }
      },[])
  const[userdata,setData]=useState({
              request : 'candidate_login',
              email : '',
              password : ''
          })
         
          const verify=async()=>{
              const {data}=await axios.post("https://karka.academy/api/action.php?",JSON.stringify(userdata))
              
              if(data && data.status=='success'){
                 value.setisLogin(true)
                  value.setcurrentUser(data.data)
                  localStorage.setItem('login',true)
                  localStorage.setItem('user',data.data.name)
                  navigate('/Home')
                
              }
          
          }
  
      return(<>
         <div className='card input_form '>
          <div className='container  text-center card-body'>
             <div className='card-title'><h3>LogIn</h3></div>
            <input className='form-control was-validated mb-2' placeholder='Enter your email' onChange={(e)=>setData({...userdata,email:e.target.value})}/>
            <input className='form-control was-validated mb-2' placeholder='Enter password' onChange={(e)=>setData({...userdata,password:e.target.value})}/>
            <button className='btn btn-success' type='submit' onClick={verify}>Login</button>
            <Link to="/Register"> New user? Register Here</Link>
            </div>
          </div>
      </>)
  }
  export default Login