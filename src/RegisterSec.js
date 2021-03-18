import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import InputAdornment from '@material-ui/core/InputAdornment';
import './RegisterSec.css'

function RegisterSec() {

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

const textStyle = {
    width: "80%",
    padding: "10px 20px",
    margin: "8px 0",
    boxSizing: "border-box",
    borderRadius: "15px",
    boxShadow: "0px 10px 24px rgba(136, 136, 136, 0.40)" ,
    marginLeft:"12%",
    fontFamily:"sans-serif",
    fontSize:"19px",
    outline:"none",
    marginTop:"20px",
   border:"0"
};

    return (
        <div>
            
            <Button style={{borderRadius: "30px"}} variant="outlined" color="primary" onClick={handleClickOpen}>
        Sign Up
      </Button>
      <div style={{ display:"flex", flexDirection:"column",alignItems:"center"}}>
      <Dialog open={open} onClose={handleClose}  aria-labelledby="form-dialog-title" style={{ backgroundImage: `url("bg2.jpg")` ,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',}} >
          <div  style={{ width:"440px"}}>
        <h2 style={{textAlign:"center",marginTop:"10px",marginBottom:"0px",fontSize:"30px",fontWeight:"bold",opacity:"1",color:"#15233D"}}>Sign Up</h2>
        
        <DialogContent>
        
          
          <form>
  <label>
     
    <input
     type="text" 
     name="name" 
     placeholder="Enter your name"
     fullWidth
     style={textStyle}
     />

<input
     type="text" 
     name="username" 
     placeholder="Enter your username"
     fullWidth
     style={textStyle}
     />

<input
     type="text" 
     name="email"      
     placeholder="Enter your e-mail"
     fullWidth
     style={textStyle}
     />

<input
     type="password" 
     name="password" 
     placeholder="Enter your password"
     fullWidth
     style={{
        width: "80%",
        padding: "12px 20px",        
        boxSizing: "border-box",
        borderRadius: "15px",
        boxShadow: "0px 10px 24px rgba(136, 136, 136, 0.40)",
        marginLeft:"12%",
        marginTop:"20px",
        fontSize:"19px",
        outline:"none",
        border:"0"
    }}
     />

<input
     type="password" 
     name="confirm password" 
     placeholder="Confirm your password"
     fullWidth
     style={{
        width: "80%",
        padding: "12px 20px",
        boxSizing: "border-box",
        borderRadius: "15px",
        boxShadow: "0px 10px 24px rgba(136, 136, 136, 0.40)",
        marginLeft:"12%",
        marginTop:"25px",
        fontSize:"19px",
        outline:"none",
        border:"0"
    }}
     />

  </label>
</form>
<div style={{display:"flex",flexDirection:"column",justifyContent:"center",margin:"20px 100px 20px 100px"}}>
<Button onClick={handleClose} color="primary" variant="outlined" style={mystyle}>
            Sign Up
          </Button>
          </div>
          <div style={{paddingTop:"5px", display:"flex", flexDirection:"column", alignItems:"center"} }>
          <span
          style={{
            opacity:"0.5",
           fontSize:"16px",
           fontWeight:"bold"
          }}>
          
              Or register with
          
          </span>
          </div>
          <div className="signinwith">
              <img src="google.png"></img>           
          </div>
          <div className="register__signup">
              <p>Sign In</p>
          </div>
        </DialogContent>
        </div>
      </Dialog>
      
      </div>
    
    </div>
    )
}

export default RegisterSec
