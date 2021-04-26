import React, { useState,useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import "./LoginSec.css";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { auth, provider } from "./firebase.js";
import db from "./firebase.js";
import clsx from "clsx";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import IconButton from "@material-ui/core/IconButton";
import { Redirect } from 'react-router'
import { Link } from "react-router-dom";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginSec({show}) {
  const [open, setOpen] = useState(show);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    console.log('=>>>>>>>>>>',show)
  }, [])

  const handleClose = () => {
    setRedirect(true);
  };
  const mystyle = {
    color: "white",
    padding: "10px 32px",
    marginTop:"20px",
    borderRadius: "30px",
    backgroundColor: "#2381db" /* Green */,
    fontSize: "15px",
    border: "none",
    boxShadow: "0px 10px 24px rgba(112, 144, 176, 0.8)",
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
        borderRadius: 15,
        display: "flex",
        flexWrap: "wrap",
      },
      margin: {
        margin: theme.spacing(1),
      },
      withoutLabel: {
        marginTop: theme.spacing(3),
      },
      textField: {
        width: "25ch",
      },
    },
  }));

  const classes = useStyles();

  const [values, setValues] = React.useState({
    amount: "",
    password: "",
    weight: "",
    weightRange: "",
    showPassword: false,
  });

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
    setPassword(event.target.value);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const handleClickAlert = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const handleLogin = async () => {
    if (!emailId) {
      setAlertMessage("Email or username can't be Empty !...");
      handleClickAlert();
    } else if (password.length < 8) {
      setAlertMessage("Password must contain at least 8 characters !...");
      handleClickAlert();
    } else {
      setLoading(true);

      if (!emailId.includes("@")) {

        let data = await db
          .collection("userDetails")
          .where("userName", "==", `${emailId}`)
          .get();
        let id = !!data.docs[0] ? data.docs[0].data().emailId : "";

        if(id){
          login(id,password);
        }
        else{
        setAlertMessage("user not found !...");
        handleClickAlert();
        setLoading(false);
        }
      } else login(emailId,password);
    }
  };

  const login = (id,pass) => {
    
    auth
      .signInWithEmailAndPassword(id, pass)
      .then(() => {
        setLoading(false);
        setRedirect(true);
      })
      .catch((e) => {
        setAlertMessage(e.message);
        handleClickAlert();
        setLoading(false);
      });
  };

  const signInGoogle = () => {
    setLoading(true);
    let result = {}
    auth.signInWithPopup(provider)
    .then((res) => {
      result = res;
      setLoading(false);
      setRedirect(true);

    }).catch((e) => {
      setLoading(false);
      setAlertMessage(e.message);
      handleClickAlert();
    });
  };
  

  if (redirect) {
    return <Redirect to='/feed'/>;
  }

  return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Dialog
          open={true}
          onClose={handleClose}
          fullWidth
          maxWidth="md"
          aria-labelledby="form-dialog-title"
          classes={{ paper: classes.rootStyle }}
          style={{
            backgroundImage: `url("bg2.jpg")`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        >

          <DialogContent style={{padding:"0px"}} >
          <div className="r__main">
            <div className="r__left">
              <img src="https://firebasestorage.googleapis.com/v0/b/thewiseindia-8e9a9.appspot.com/o/register.jpg?alt=media&token=3e384896-b902-4cb2-9e8c-e06288af84db"></img>
            </div>

            <div className="r__right">
              <div className="r__rightHeader">
                <h3>Welcome...!</h3>
                <IconButton onClick={handleClose}>
                  <CloseIcon />
                </IconButton>
              </div>
              <div className="r__rightBody" style={{marginTop:"8%"}} >
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="name"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value.trim())}
                    label="Username or Email"
                    variant="outlined"
                    color="primary"
                    style={{
                      width: "90%",
                      marginTop: "20px",
                    }}
                  />

                  <FormControl
                    className={clsx(classes.margin, classes.textField)}
                    variant="outlined"
                    style={{
                      width: "90%",
                      marginTop: "20px",
                    }}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={values.showPassword ? "text" : "password"}
                      value={values.password.trim()}
                      onChange={handleChange("password")}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {values.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      labelWidth={70}
                    />
                  </FormControl>
                </form>
                {loading ? (
                  <Button
                    color="primary"
                    variant="outlined"
                    style={mystyle}
                  >
                  <CircularProgress color={"#FFF"}  size={20}  />
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleLogin()}
                    color="primary"
                    variant="outlined"
                    style={mystyle}
                  >
                    <p>Sign Up</p>
                  </Button>
                )}
                <div
                  style={{
                    paddingTop: "5px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop:"20px"
                  }}
                >
                  <span
                    style={{
                      opacity: "0.5",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Or register with
                  </span>
                </div>
                <div className="signinwith" onClick={signInGoogle} >
                  <img src="google.png"></img>
                </div>
                <div className="register__signup">
                <Link to={"/register"} >
                  <p>Dont have an Acoount?Register... </p>
                  </Link>
                </div>
                <Snackbar
                  open={openAlert}
                  autoHideDuration={6000}
                  onClose={handleCloseAlert}
                >
                  <Alert onClose={handleCloseAlert} severity="warning">
                    {alertMessage}
                  </Alert>
                </Snackbar>
              </div>
            </div>
          </div>
          </DialogContent>
        </Dialog>
      </div>
  );
}

export default LoginSec;
