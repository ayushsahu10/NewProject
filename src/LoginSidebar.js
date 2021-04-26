import React, { useState } from "react";
import LoginSec from "./LoginSec";
import RegisterSec from "./RegisterSec";
import "./LoginSidebar.css";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

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
  return (
    <div className="login__button">
     
      <Link to={"/login"} >
        <Button variant="contained"  style={{borderRadius:'10px',backgroundColor:"#2381db",color:"#FFF"}} >
          Login
        </Button>
        </Link>

        <p>or </p>

        <Link to={"/register"} >
        <Button variant="contained"   style={{borderRadius:'10px',backgroundColor:"#2381db",color:"#FFF"}} >
          Register
        </Button>
        </Link>
        
     
    </div>
  );
}

export default LoginSidebar;
