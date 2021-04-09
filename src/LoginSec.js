import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import './LoginSec.css'
import { makeStyles } from '@material-ui/core/styles';
import logo5 from './assets/logo5.gif';



function LoginSec() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const styles = {
      rootStyle: {
        borderRadius: 20
      }
    };
    
  
    const mystyle = {
      color: "white",
      padding: "15px 32px",
      borderRadius: "30px",
      backgroundColor: "blue" /* Green */,
      fontSize:"15px",
        border:"none",
        boxShadow: "0px 10px 24px rgba(112, 144, 176, 0.8)",
      
     
    };

    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
          width: '25ch',
          borderRadius: 15,
        },
      },
    }));

    const classes = useStyles();

    return (
        <div>
            
            <Button size="large" style={{borderRadius: "30px",marginBottom:"10px"}} variant="contained" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <div style={{ display:"flex", flexDirection:"column",alignItems:"center"}}>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" aria-labelledby="form-dialog-title" classes={{ paper: classes.rootStyle }} style={{ backgroundImage: `url("bg2.jpg")` ,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',}}>
        <div className="login__main">
          <div className="left__img__login" ><img src={"logo5.gif"}></img></div>
          <div className="right__text__login">
    
          <Button style={{color: "blue", position: "absolute", right: "-5px" ,fontSize:"20px"}} onClick={handleClose} color="black">
            ✖
          </Button> 
        
        <DialogContent >
        <h2 style={{marginLeft:"50px",marginTop:"30px",marginBottom:"20px",fontSize:"30px",fontWeight:"bold",opacity:"1",color:"#15233D", }}>Sign In</h2>
<form className={classes.root} noValidate autoComplete="off">
 
  
  <TextField
    id="name"
    label="Username or Email"
    variant="outlined"
    color="primary"
    style={{
      marginLeft:"12%",
      width:"75%",
      marginTop:"20px",   
  }}
  />

<TextField
  type="password" 
    id="password"
    label="Password"
    variant="outlined"
    color="primary"
    style={{
      marginLeft:"12%",
      width:"75%",
      marginTop:"20px",   
  }}
  />
  <p style={{marginLeft:"12%",}}>Forgot Password?</p>
</form>
<div style={{display:"flex",flexDirection:"column",justifyContent:"center",margin:"30px 100px 30px 100px"}}>
<Button onClick={handleClose} color="primary" variant="outlined" style={mystyle}>
            Sign In
          </Button>
          </div>
          <div style={{paddingTop:"20px",display:"flex", flexDirection:"column", alignItems:"center"}}>
          <span
          style={{
           opacity:"0.5",
           fontSize:"16px",
           fontWeight:"bold"
          }}>
          
              Or login with
          
          </span>
          </div>
          <div className="signinwith">
              <img src="google.png"></img>
              
            
          </div>
          <div className="login__signup">
              <p>Sign Up</p>
          </div>
        </DialogContent>
        </div>
        </div>
      </Dialog>
      
      </div>
    
    </div>
    )
}

export default LoginSec



