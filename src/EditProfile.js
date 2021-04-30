import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./EditProfile.css";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import EditIcon from "@material-ui/icons/Edit";
import db from "./firebase.js";
import { useParams } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";
import ImageUpload from "image-upload-react";
//important for getting nice style.
import "image-upload-react/dist/index.css";
import firebase from "firebase";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function EditProfile({ userData, reload }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = useState(userData.name);
  const [userName, setUserName] = useState(userData.userName);
  const [iconUrl, setIconUrl] = useState(userData.iconUrl);
  const [bio, setBio] = useState(userData.bio);
  const [location, setLocation] = useState(userData.location);
  const [email, setEmail] = useState(userData.emailId);
  const [loading, setLoading] = useState(false);
  const { uid } = useParams();
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [imageAsFile, setImageAsFile] = useState();

  const handleImageSelect = (e) => {
    setImageSrc(URL.createObjectURL(e.target.files[0]));
    setImageAsFile(e.target.files[0]);
  };
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mystyle__button = {
    color: "white",
    padding: "10px 25px",
    borderRadius: "20px",
    backgroundColor: "#2381db" /* Green */,
    fontSize: "15px",
    border: "none",
    // boxShadow: "0px 10px 24px rgba(112, 144, 176, 0.8)",
  };

  useEffect(() => {
    setImageSrc(iconUrl);
  }, []);

  const handleClickAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const updateUserDetails = async () => {
    if (name.trim().length < 6 ||  name.trim().length > 20 )
      handleClickAlert("error", "Name must be 5-20 character long..");
    else if (userName.trim().length < 5 || userName.trim().length > 15  )
      handleClickAlert("error", "UserName must be 5-15 character long..");
    else if (bio.trim().length < 20 || bio.trim().length > 251)
      handleClickAlert("error", "Bio must be 20-251 character long..");
    else if (location.trim().length < 3 || location.trim().length > 30)
      handleClickAlert("error", "Location must be 3-30 character long..");
    else {
      setLoading(true);
      let photoUrl = iconUrl;

      if (imageAsFile) {
        console.log("image found",imageSrc)
        let filename = imageSrc.substring(imageSrc.lastIndexOf("/") + 1);

        // Add timestamp to File Name
        const extension = filename.split(".").pop();
        const name = filename.split(".").slice(0, -1).join(".");
        filename = name + Date.now() + "." + extension;
        await firebase.storage().ref(filename).put(imageAsFile);
        photoUrl = await firebase.storage().ref(filename).getDownloadURL();
      }
      else console.log("image Not found",imageSrc);

      if (userName.trim() !== userData.userName) {
        let data = await db
          .collection("userDetails")
          .where("userName", "==", userName.trim())
          .get();
        if (data.docs.length) {
          handleClickAlert("error", "UserName is already taken");
          setLoading(false);
        } else updateData(photoUrl);
      } else updateData(photoUrl);
    }
  };

  const updateData = (photoUrl) => {
    db.collection("userDetails")
      .doc(uid)
      .update({
        name: name.trim(),
        userName: userName.trim(),
        location: location.trim(),
        bio: bio.trim(),
        iconUrl:photoUrl
      })
      .then(() => {

        setLoading(false);
        handleClickAlert("success", "Profile Updated...");
        handleClose();
        reload();
      });
  };

  return (
    <div className="edit__profile">
      <div className="edit__button">
        <Button
          variant="contained"
          className="edit__button"
          onClick={handleClickOpen}
          startIcon={<EditIcon />}
        >
          Edit Profile
        </Button>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="xs"
      >
        <div className="edit__header">
          <DialogTitle id="form-dialog-title" style={{ padding: "9px 20px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "baseline",
              }}
            >
              <Button
                style={{ color: "rgba(56,56,209,255)", fontSize: "20px" }}
                onClick={handleClose}
                color="black"
              >
                ✖
              </Button>

              <div>
                <p>Edit</p>
              </div>

              <div
                style={{
                  float: "right",
                }}
              >
                <Button
                  onClick={updateUserDetails}
                  color="primary"
                  variant="outlined"
                  size="small"
                  style={mystyle__button}
                >
                  Save
                </Button>
              </div>
            </div>
          </DialogTitle>
        </div>
        <DialogContent>
          <div className="edit__main">
            <div className="image__cover__overlay">
              {/* <img src={`${iconUrl}`}></img> */}
              <ImageUpload
                handleImageSelect={handleImageSelect}
                imageSrc={imageSrc}
                setImageSrc={setImageSrc}
                style={{
                  width: 100,
                  height: 100,
                  background: "#2381db",
                  borderRadius: 50,
                  marginTop: 0,
                }}
              />
            </div>

            <div className="edit__text">
              <DialogContentText>
                Fill your details accurately.
              </DialogContentText>

              <TextField
                id="name"
                label="Enter your Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                variant="outlined"
                color="primary"
                style={{
                  width: "100%",
                  marginBottom: "10px",
                }}
              />

              <TextField
                id="username"
                label="Enter your Username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                variant="outlined"
                color="primary"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
              <TextField
                id="Email"
                disabled
                label="Enter your Email"
                value={email}
                variant="outlined"
                color="primary"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />

              <TextField
                id="bio"
                label="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                type="text"
                variant="outlined"
                color="primary"
                fullWidth
                rowsMax={4}
                multiline
                maxLength="40"
                style={{
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />

              <TextField
                id="location"
                label="Location"
                type="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                variant="outlined"
                color="primary"
                fullWidth
                style={{
                  width: "100%",
                  marginTop: "10px",
                  marginBottom: "10px",
                }}
              />
            </div>
          </div>
          <Snackbar
            open={openAlert}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
          >
            <Alert onClose={handleCloseAlert} severity={alertType}>
              {alertMessage}
            </Alert>
          </Snackbar>
          <Backdrop className={classes.backdrop} open={loading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditProfile;
