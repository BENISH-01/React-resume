import React , {useState} from 'react'
import {auth} from '../../firebase/firebaseconfig'
import { Box, TextField , Button} from '@material-ui/core'
import { signInWithEmailAndPassword } from 'firebase/auth'



function Login({handleClose}){

    const [Logger,setLogger]=useState({
        email:"",
        password:""
    })

    const logger_user=async ()=>{
        
        if(!Logger.email || !Logger.password){
            alert("please Fill All the Fields")
        }
        try{
        const result=await signInWithEmailAndPassword(auth,Logger.email,Logger.password)
         console.log(result)
         handleClose()
    }
    catch(error){
           alert("Login failed")
    }
}
    

    return(<>

<Box p={3} style={{display:"block",flexDirection:"coloumn",gap:"20px"}}>
        <TextField
        onChange={(e)=>setLogger({...Logger,email:e.target.value})}
        variant="outlined"
        label="Enter Email"
        type="email"
        value={Logger.email}
        fullWidth
        className='mb-4'
        />
         <TextField
        onChange={(e)=>setLogger({...Logger,password:e.target.value})}
        variant="outlined"
        label="Enter  Password"
        type="password"
        value={Logger.password}
        fullWidth
        className='mb-4'
        />
        
        <Button 
        variant="outlined"
        size="large"
        style={{background:"#EEBC1D"}}
        onClick={logger_user}
        className='col-12'
        >
       Log in
        </Button>

      </Box>
    </>)
}

export default Login