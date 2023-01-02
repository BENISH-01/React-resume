import {auth} from '../../firebase/firebaseconfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import React , {useState} from 'react'
import { Box, TextField , Button} from '@material-ui/core'





function Signup({handleClose}){

 const [Register,setRegister]=useState({
    email:'',
    password:'',
    repeatpassword:''
 })
 console.log(Register)

//  register
const register_user=async () =>{
   
        if(Register.password !== Register.repeatpassword){
            alert("Passwords Doesn't Match")
        }
    try{
        const result= await createUserWithEmailAndPassword (auth,Register.email,Register.password)
        alert("Sign up Successful")
         console.log(result)
         handleClose()
    }
    catch(error){
       alert("Sign up failed")
    }  
}

    return(<>
      <Box p={3} style={{display:"block",flexDirection:"coloumn",gap:"30px"}}>
        <TextField
        onChange={(e)=>setRegister({...Register,email:e.target.value})}
        variant="outlined"
        label="Enter Email"
        type="email"
        value={Register.email}
        fullWidth
        style={{marginBottom:10}}
        />
         <TextField
        onChange={(e)=>setRegister({...Register,password:e.target.value})}
        variant="outlined"
        label="Enter  Password"
        type="password"
        value={Register.password}
        fullWidth
        style={{marginBottom:10}}
        />
         <TextField
        onChange={(e)=>setRegister({...Register,repeatpassword:e.target.value})}
        variant="outlined"
        label="Confirm password"
        type="password"
        value={Register.repeatpassword}
        fullWidth
        style={{marginBottom:10}}
        />
        <Button 
        variant="outlined"
        size="large"
        style={{background:"#EEBC1D"}}
        onClick={register_user}
        className='col-12'
        >
       Sign Up
        </Button>

      </Box>

    </>)
}

export default Signup