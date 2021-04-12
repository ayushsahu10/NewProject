import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import "./LoginSec.css";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import CircularProgress from "@material-ui/core/CircularProgress";
import { auth } from "./firebase.js";
import db from "./firebase.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function LoginSec() {
  const [open, setOpen] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const styles = {
    rootStyle: {
      borderRadius: 20,
    },
  };

  const mystyle = {
    color: "white",
    padding: "15px 32px",
    borderRadius: "30px",
    backgroundColor: "blue" /* Green */,
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
      },
    },
  }));

  const classes = useStyles();

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
        handleClose();
      })
      .catch((e) => {
        setAlertMessage(e.message);
        handleClickAlert();
        setLoading(false);
      });
  };

  return (
    <div>
      <Button
        size="large"
        style={{ borderRadius: "30px", marginBottom: "10px" }}
        variant="contained"
        color="primary"
        onClick={handleClickOpen}
      >
        Login
      </Button>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Dialog
          open={open}
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
          <div className="login__main">
            <div className="left__img__login">
              <img
                src={
                  "https://firebasestorage.googleapis.com/v0/b/thewiseindia-8e9a9.appspot.com/o/logo5.gif?alt=media&token=b7d6e071-1be6-48b7-ac4b-53da30d5872c"
                }
                alt="not found"
              />
            </div>
            <div className="right__text__login">
              <Button
                style={{
                  color: "blue",
                  position: "absolute",
                  right: "-5px",
                  fontSize: "20px",
                }}
                onClick={handleClose}
                color="black"
              >
                ✖
              </Button>

              <DialogContent>
                <h2
                  style={{
                    marginLeft: "50px",
                    marginTop: "30px",
                    marginBottom: "20px",
                    fontSize: "30px",
                    fontWeight: "bold",
                    opacity: "1",
                    color: "#15233D",
                  }}
                >
                  Sign In
                </h2>
                <form className={classes.root} noValidate autoComplete="off">
                  <TextField
                    id="name"
                    value={emailId}
                    onChange={(e) => setEmailId(e.target.value.trim())}
                    label="Username or Email"
                    variant="outlined"
                    color="primary"
                    style={{
                      marginLeft: "12%",
                      width: "75%",
                      marginTop: "20px",
                    }}
                  />

                  <TextField
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value.trim())}
                    label="Password"
                    variant="outlined"
                    color="primary"
                    style={{
                      marginLeft: "12%",
                      width: "75%",
                      marginTop: "20px",
                    }}
                  />
                  <p style={{ marginLeft: "12%" }}>Forgot Password?</p>
                </form>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    margin: "30px 100px 30px 100px",
                  }}
                >
                {loading ? <CircularProgress /> : 
                  <Button
                    onClick={handleLogin}
                    color="primary"
                    variant="outlined"
                    style={mystyle}
                  >
                    Sign In
                  </Button>}
                </div>
                <div
                  style={{
                    paddingTop: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      opacity: "0.5",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    Or login with
                  </span>
                </div>
                <div className="signinwith">
                  <img src="google.png"></img>
                </div>
                <div className="login__signup">
                  <p>Sign Up</p>
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
              </DialogContent>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default LoginSec;
