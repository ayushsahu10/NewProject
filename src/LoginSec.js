import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import './LoginSec.css'
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import InputAdornment from '@material-ui/core/InputAdornment';

function LoginSec() {

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    
  
    const mystyle = {
      color: "white",
      padding: "15px 32px",
      borderRadius: "30px",
      backgroundColor: "var( --twitter-color)" /* Green */,
      fontSize:"15px",
        border:"none",
        boxShadow: "0px 10px 24px rgba(112, 144, 176, 0.8)",
      
     
    };

    return (
        <div>
            
            <Button style={{borderRadius: "30px"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Login
      </Button>
      <div style={{ display:"flex", flexDirection:"column",alignItems:"center"}}>
      <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title" style={{ backgroundImage: `url("bg2.jpg")` ,backgroundRepeat: 'no-repeat',backgroundSize: 'cover'}} >
          <div  style={{ width:"400px"}}>
        <h2 style={{textAlign:"center",marginTop:"70px",marginBottom:"20px",fontSize:"30px",fontWeight:"bold",opacity:"1",color:"#15233D"}}>Sign In</h2>
        
        <DialogContent>
        
          
          <form>
  <label>
    <input
     type="text" 
     name="name" 
     startAdornment={
      <InputAdornment position="start">
        <PersonRoundedIcon />
      </InputAdornment>
    }
     placeholder="username or email"
     fullWidth
     style={{
        width: "75%",
        padding: "12px 20px",
        margin: "8px 0",
        boxSizing: "border-box",
        borderRadius: "15px",
        boxShadow: "0px 10px 24px rgba(136, 136, 136, 0.40)" ,
        marginLeft:"12%",
        fontFamily:"sans-serif",
        fontSize:"20px",
        outline:"none",
        
       border:"0"
    }}
     />
<input
     type="password" 
     name="password" 
     placeholder="password"
     fullWidth
     style={{
        width: "75%",
        padding: "12px 20px",
        
        boxSizing: "border-box",
        borderRadius: "15px",
        boxShadow: "0px 10px 24px rgba(136, 136, 136, 0.40)",
        marginLeft:"12%",
        marginTop:"20px",
        fontSize:"20px",
        outline:"none",
        border:"0"
    }}
     />
  </label>
</form>
<div style={{display:"flex",flexDirection:"column",justifyContent:"center",margin:"30px 100px 30px 100px"}}>
<Button onClick={handleClose} color="primary" variant="outlined" style={mystyle}>
            Sign In
          </Button>
          </div>
          <div style={{paddingTop:"40px",display:"flex", flexDirection:"column", alignItems:"center"}}>
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
      </Dialog>
      
      </div>
    
    </div>
    )
}

export default LoginSec
