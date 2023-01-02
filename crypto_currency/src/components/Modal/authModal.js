import React, {useContext, useState} from 'react';
import {auth} from "../../firebase/firebaseconfig"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { AppBar, Button, Tabs , Tab,Box } from '@material-ui/core';
import Login from './login';
import Signup from './signup';
import GoogleButton from "react-google-button"
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width:400,
    backgroundColor: theme.palette.background.paper,
    color:"white",
    borderRadius:10,
    
    
  },
  google:{
    padding:20,
    paddingTop:0,
    paddingLeft:0,
    display:"flex",
    flexDirection:"coloumn",
    textAlign:"center",
    fontSize:20
  }
}));

export default function Authmodal() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [value, setValue] = useState(0);

 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(value)

  // google signin
  const googleProvider=new GoogleAuthProvider
  const Google_sign=()=>{
     signInWithPopup(auth,googleProvider).then((data=>{
      console.log(data)
       alert(`Sign in successful , Welcome ${data.user.displayName}`)
       handleClose()
     })).catch((error=>{
      alert(`${error.message}`)
     }))
  }

  return (
    <div>
     <Button 
     variant="contained"
     style={{width:85,height:40,background:"#EEBC1D"}}
     onClick={handleOpen}
     >Login</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
               <AppBar position='static' style={{backgroundColor:"transparant",color:"White"}}>
                  <Tabs 
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{borderRadius:10}}>
                    <Tab label="Login"/>
                    <Tab label="Sign Up"/>
                  </Tabs>
               </AppBar>
               {value===0 && <Login handleClose={handleClose}/>}
               {value===1 && <Signup  handleClose={handleClose}/>}
               <Box className={classes.google}>
                <span >OR</span>
                <GoogleButton
                style={{width:"100%",outline:"none"}}
                onClick={Google_sign}
                />
               </Box>
          </div>
        </Fade>
      </Modal>

    </div>
  );
}