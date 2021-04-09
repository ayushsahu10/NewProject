import React from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import './RegisterSec.css'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';


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
      display: 'flex',
    flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    },
  },
}));

const classes = useStyles();

const [values, setValues] = React.useState({
  amount: '',
  password: '',
  weight: '',
  weightRange: '',
  showPassword: false,
});

const handleChange = (prop) => (event) => {
  setValues({ ...values, [prop]: event.target.value });
};

const handleClickShowPassword = () => {
  setValues({ ...values, showPassword: !values.showPassword });
};

const handleMouseDownPassword = (event) => {
  event.preventDefault();
};


    return (
        <div>
            
            <Button size="large" style={{borderRadius: "30px",marginTop:"10px"}} variant="contained" color="primary" onClick={handleClickOpen}>
            Sign Up
           </Button>
           <div style={{ display:"flex", flexDirection:"column",alignItems:"center"}}>
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md"  aria-labelledby="form-dialog-title" style={{ backgroundImage: `url("bg2.jpg")` ,backgroundRepeat: 'no-repeat',backgroundSize: 'cover',}} >
          <div className="register__main">
       <div className="left__image__register"><img src="register3.jpg"></img></div>
        <div className="right__text__register">

        <Button style={{color: "blue", position: "absolute", right: "-5px" ,fontSize:"20px"}} onClick={handleClose} color="black">
            ✖
          </Button> 
        <DialogContent>


        <h2 style={{marginLeft:"50px",marginTop:"30px",marginBottom:"20px",fontSize:"30px",fontWeight:"bold",opacity:"1",color:"#15233D", }}>Sign Up</h2>
<form className={classes.root} noValidate autoComplete="off">
 
  
        <TextField
         id="name"
          label="Enter your Name"
          variant="outlined"
          color="primary"
          style={{
            marginLeft:"12%",
                   width:"90%",
            marginTop:"20px",   
        }}
        />
      
       <TextField
           id="username"
           label="Enter your Username"
           variant="outlined"
                  color="primary"
           style={{
             marginLeft:"12%",
             width:"90%",
             marginTop:"20px",   
         }}
         />
       
       <TextField
           id="E-mail"
           label="Enter your Email"
           variant="outlined"
          color="primary"
           style={{
             marginLeft:"12%",
             width:"90%",
            marginTop:"20px",   
         }}
         />
       
       
       <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined"  style={{marginLeft:"12%",     width:"90%", marginTop:"20px",  }}>
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </FormControl>

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
        </div>
      </Dialog>
      
      </div>
    
    </div>
    )
}

export default RegisterSec