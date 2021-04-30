import React, { useState, useEffect } from "react";
import "./Cards.css";
import Poll from "./Poll";
import { Link } from "react-router-dom";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ShareIcon from "@material-ui/icons/Share";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import ReportIcon from "@material-ui/icons/Report";
import db from "./firebase.js";
import { auth } from "./firebase.js";
import firebase from "firebase";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";

const DotMenu = ({
  remove,
  uid,
  alert,
  getSaved,
  showShareModal,
  setPostId,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [openReport, setOpenReport] = React.useState(false);
  const [reportText, setReportText] = useState("");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const savePosts = () => {

    if(auth.currentUser === null){
      alert("info", "Login to WiseIndia");
      return;
    }

    db.collection("userDetails")
      .doc(auth.currentUser.uid)
      .update({
        savedPosts: firebase.firestore.FieldValue.arrayUnion(uid),
      })
      .then(() => {
        handleClose();
        alert("success", "saved");
      });
  };
  

  const removePost = () => {
    db.collection("userDetails")
      .doc(auth.currentUser.uid)
      .update({
        savedPosts: firebase.firestore.FieldValue.arrayRemove(uid),
      })
      .then(() => {
        handleClose();
        alert("success", "Deleted...");
        getSaved();
      });
  };

  const shareModal = () => {
    showShareModal();
    setPostId(uid);
    setAnchorEl(null);
  };

  const handleClickOpenReport = () => {
    if(auth.currentUser === null){
      alert("info", "Login to WiseIndia");
      return;
    }
    setOpenReport(true);
    setAnchorEl(null);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
    setAnchorEl(null);
  };

  const sendReport = () => {

    if (reportText.length < 50) {
      alert("error", "Report text must be 50 characters long'...");
      return;
    }
    db.collection("postReports")
      .doc(uid)
      .set({
        text: reportText,
        postId: uid,
        userId: auth.currentUser.uid,
      })
      .then(() => {
        alert("success", "Report submitted...");
        handleCloseReport();
      });
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <MoreVertIcon />
      </IconButton>
      <Menu
        style={{ top: "50px", left: "-25px" }}
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={shareModal}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Share </Typography>
        </MenuItem>
        {remove ? (
          <MenuItem onClick={removePost}>
            <ListItemIcon>
              <RemoveCircleOutlineIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Remove</Typography>
          </MenuItem>
        ) : (
          <MenuItem onClick={savePosts}>
            <ListItemIcon>
              <SaveAltIcon fontSize="small" />
            </ListItemIcon>
            <Typography variant="inherit">Save </Typography>
          </MenuItem>
        )}
        <MenuItem onClick={handleClickOpenReport}>
          <ListItemIcon>
            <ReportIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Report </Typography>
        </MenuItem>
      </Menu>
      <Dialog
        open={openReport}
        onClose={handleCloseReport}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter what you have found suspicious about this post.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={(e) => setReportText(e.target.value)}
            id="name"
            label="Report"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseReport} color="primary">
            Cancel
          </Button>
          <Button onClick={sendReport} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

function Cards({
  headLine,
  img,
  favour,
  against,
  description,
  uid,
  alert,
  remove,
  getSaved,
  showShareModal,
  setPostId,
}) {
  return (
    <Grow in={true}>
      <div className="cards">
        <div className="mob__heading">
          <Link to={`/feed/${uid}`}>
            <h2 style={{ color: "#324e4e", fontSize: "18px" }}>{headLine}</h2>
          </Link>
          <DotMenu
            showShareModal={showShareModal}
            setPostId={setPostId}
            remove={remove}
            uid={uid}
            alert={alert}
            getSaved={getSaved}
          />
        </div>

        <img src={`${img}`} className="img"></img>

        <div className="para">
          <div className="desktop__heading">
            <Link to={`/feed/${uid}`}>
              <h2 style={{ color: "#324e4e", fontSize: "24px" }}>
                {headLine}
              </h2>
            </Link>
            <DotMenu
              remove={remove}
              uid={uid}
              alert={alert}
              setPostId={setPostId}
              getSaved={getSaved}
              showShareModal={showShareModal}
            />
          </div>
          <Link to={`/feed/${uid}`}>
            <p>{description.slice(0, 200)} .........</p>
          </Link>

          <Poll favour={favour} against={against} postId={uid} alert={alert} />
        </div>
      </div>
    </Grow>
  );
}

export default Cards;
