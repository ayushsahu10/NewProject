import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "./EditProfile.css";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import EditIcon from "@material-ui/icons/Edit";

function EditProfile() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const mystyle__button = {
    color: "white",
    padding: "15px 32px",
    borderRadius: "30px",
    backgroundColor: "rgba(56,56,209,255)" /* Green */,
    fontSize: "15px",
    border: "none",
    // boxShadow: "0px 10px 24px rgba(112, 144, 176, 0.8)",
  };

  return (
    <div className="edit__profile">
      <Button color="black" onClick={handleClickOpen}>
        Edit Profile
      </Button>
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
                {" "}
                <p>Edit</p>{" "}
              </div>

              <div
                style={{
                  float: "right",
                }}
              >
                <Button
                  onClick={handleClose}
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
              {/* <div className="change__cover">
                <div className="edit__img__cover">
                  <img src="farmer.jpg"></img>
                  <div className="edit__cover__icon">
                    <AddAPhotoOutlinedIcon />
                  </div>
                </div>
              </div> */}

              <div className="change__image">
                <div className="edit__image__profile">
                  <img
                    // src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
                    src="avatar2.png"
                  ></img>
                  <div className="edit__image__icon">
                    <AddAPhotoOutlinedIcon />
                  </div>
                </div>
              </div>
            </div>
            <div className="edit__text">
              <DialogContentText>
                Fill your details accurately.
              </DialogContentText>

              <TextField
                id="name"
                label="Enter your Name"
                variant="outlined"
                color="primary"
                style={{
                  width: "100%",
                }}
              />

              <TextField
                id="username"
                label="Enter your Username"
                variant="outlined"
                color="primary"
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
              />

              <TextField
                id="bio"
                label="Bio"
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
                }}
              />

              <TextField
                id="location"
                label="Location"
                type="location"
                variant="outlined"
                color="primary"
                fullWidth
                style={{
                  width: "100%",
                  marginTop: "10px",
                }}
              />
              <p style={{ paddingTop: "10px" }}>Date of Birth</p>
              <TextField
                id="dob"
                variant="outlined"
                color="primary"
                type="date"
                fullWidth
                style={{ marginBottom: "20px" }}
              />
            </div>
          </div>
        </DialogContent>

        {/* <div style={{display:"flex",flexDirection:"column",justifyContent:"center",margin:"20px 100px 20px 100px"}}>
<Button onClick={handleClose} color="primary" variant="outlined" size="small" style={mystyle__button}>
            Save
          </Button>
          </div> */}
      </Dialog>
    </div>
  );
}

export default EditProfile;
