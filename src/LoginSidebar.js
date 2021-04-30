import React, { useState } from "react";
import "./LoginSidebar.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

function LoginSidebar() {
  const classes = useStyles();
  const [login, setLogin] = useState(false);

  const mystyle = {
    color: "white",
    padding: "10px 25px",
    borderRadius: "30px",
    backgroundColor: "#2381db" /* Green */,
    fontSize: "12px",
    border: "none",
    boxShadow: "0px 10px 24px rgba(112, 144, 176, 0.8)",
  };


  return (
    <div className="login__button">
     <Avatar alt="Remy Sharp"   src="https://firebasestorage.googleapis.com/v0/b/thewiseindia-8e9a9.appspot.com/o/fist.png?alt=media&token=247b22f0-d86b-4a61-882c-0d56c52aa1bd" />
     
     <p>WiseIndia</p>
     <p className="wiseIndia__about" >Thewiseindia.com is an online platform where you can express your opinions about current issues going on in our country.</p>
      <Link to={"/login"} >
        <Button variant="contained"  style={mystyle} >
          Login
        </Button>
        </Link>
        
    </div>
  );
}

export default LoginSidebar;
