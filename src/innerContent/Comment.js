import React, { useState, useEffect } from "react";
import "./Comment.css";
import { Avatar } from "@material-ui/core";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownAltOutlinedIcon from "@material-ui/icons/ThumbDownAltOutlined";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import db from "../firebase";
import { IconButton } from "@material-ui/core";
import CommentBox from "../CommentBox.js";
import firebase from "firebase";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Typography from "@material-ui/core/Typography";
import ReportIcon from "@material-ui/icons/Report";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {auth} from "../firebase";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import TextField from '@material-ui/core/TextField';
import {Link } from 'react-router-dom'


const ITEM_HEIGHT = 50;

function PaperComponent(props) {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

function Comment({
  uid,
  text,
  name,
  userData,
  userName,
  icon,
  like,
  dislike,
  userId,
  reply,
  postId,
  postIcon,
  replyUid,
  userIcon,
  postReply,
  commentOwnerId,
  deleteComment,
  sendReport
}) {
  const [likes, setLikes] = useState(typeof like !== "undefined" ? like : []);
  const [dislikes, setDisLikes] = useState(
    typeof dislike !== "undefined" ? dislike : []
  );
  const [iconUrl, setIconUrl] = useState(icon);
  const [replyInput, setReplyInput] = useState(false);
  const commentRef = reply
    ? db
        .collection("posts")
        .doc(postId)
        .collection("comments")
        .doc(uid)
        .collection("replies")
        .doc(replyUid)
    : db.collection("posts").doc(postId).collection("comments").doc(uid);

    const [openCommentDilaog, setOpenCommentDilaog] = React.useState(false);
    const [openReport, setOpenReport] = React.useState(false);
    const [reportText, setReportText] = useState("");

  const commentDilaoghandleClickOpen = () => {
    setOpenCommentDilaog(true);
  };

  const commentDilaoghandleClose = () => {
    setOpenCommentDilaog(false);
  };
  const handleClickOpenReport = () => {
    setOpenReport(true);
    setAnchorEl(null);
  };

  const handleCloseReport = () => {
    setOpenReport(false);
    setAnchorEl(null);
  };

  const pressLike = () => {
    console.log("=>>>>>>>>>>>>>>>>>", postId, uid,userId,userData);
    let l = [...likes];
    if (dislikes.includes(userId)) {
      pressDislike();
    }
    if (likes.includes(userId)) {
      l = l.filter((lk) => lk !== userId);
      setLikes(l);
    } else {
      l.push(userId);
      setLikes(l);
    }

    commentRef
      .update({
        like: firebase.firestore.FieldValue.arrayUnion(userId)
      })
      .then(() => notify("like"));
  };

  const pressDislike = () => {
    let l = [...dislikes];
    if (likes.includes(userId)) pressLike();
    if (dislikes.includes(userId)) {
      l = l.filter((dl) => dl !== userId);
      setDisLikes(l);
    } else {
      l.push(userId);
      setDisLikes(l);
    }
    commentRef
      .update({
        dislike: firebase.firestore.FieldValue.arrayRemove(userId)
      })
      .then(() => notify("dislike"));
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


 const delcmt = () => {
   if(reply) deleteComment(uid,postId,replyUid);
   else deleteComment(uid,postId);
   setAnchorEl(null);
   commentDilaoghandleClose();
 }

 const updateReport = () => {
  if(reply) sendReport(reportText,uid,postId,replyUid);
  else sendReport(reportText,uid,postId)
   handleCloseReport();
 }

 const notify = (type) => {

   if(userId !== commentOwnerId){
    db.collection("userDetails").doc(commentOwnerId).collection("notifications").add({
      cmtId:uid,
      postId:postId,
      seen:false,
      type:type,
      userName:userData.userName,
      userId:userData.id,
      postIcon:postIcon,
      iconUrl:userData.iconUrl,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
   }

 }

  return (
    <div>
      <div className="comment1">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", margin: "2px" }}>
          <Link to={`/about/${commentOwnerId}`} >
            <Avatar
              src={`${iconUrl}`}
              style={{ marginTop: "5px", marginRight: "10px" }}
            ></Avatar> </Link>
            <div
              style={{
                backgroundColor: "#f0f2f5",
                borderRadius: "20px",
                display: "inline-block",
                padding: "10px",
              }}
            >
              <div className="comment__header">
              <Link to={`/about/${commentOwnerId}`} >
                <div className="comment__headerText">
                  <h3>
                    {name}
                    <span className="comment__headerSpecial">
                      {" "}
                      @{userName}{" "}
                    </span>
                  </h3>
                </div>
                </Link>
              </div>
              <div className="comment__headerDescription">
                <p>{text}</p>
              </div>
            </div>
          </div>
          <IconButton
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
          {auth.currentUser.uid === commentOwnerId ? <MenuItem onClick={commentDilaoghandleClickOpen}>
          <ListItemIcon>
            <DeleteOutlineIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Delete </Typography>
        </MenuItem>
        : null}
        <MenuItem onClick={handleClickOpenReport}>
          <ListItemIcon>
            <ReportIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Report </Typography>
        </MenuItem>
          </Menu>
        </div>
        <div className="comment__body">
          <div className="comment_footer">
            <div className="comment__footerDiv" onClick={pressLike}>
              <IconButton>
                {likes.includes(userId) ? (
                  <ThumbUpIcon fontSize="small" style={{ color: "#0284fe" }} />
                ) : (
                  <ThumbUpAltOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <p>{likes.length} </p>
            </div>
            <div className="comment__footerDiv" onClick={pressDislike}>
              <IconButton>
                {dislikes.includes(userId) ? (
                  <ThumbDownIcon
                    fontSize="small"
                    style={{ color: "#0284fe" }}
                  />
                ) : (
                  <ThumbDownAltOutlinedIcon fontSize="small" />
                )}
              </IconButton>
              <p>{dislikes.length} </p>
            </div>
            <div
              className="comment__footerDiv"
              onClick={() => setReplyInput(!replyInput)}
            >
              <p>reply</p>
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          width: "85%",
          marginLeft: "50px",
        }}
      >
        {replyInput ? (
          <CommentBox
            postComment={postReply}
            notify={notify}
            docRef={uid}
            replyName={userName}
            userIcon={userData.iconUrl}
            setReplyInput={setReplyInput}
          />
        ) : null}
      </div>
      <Dialog
        open={openCommentDilaog}
        onClose={commentDilaoghandleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          {reply? 'Delete Reply' :'Delete Comment' }
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this {reply? 'Reply' :'Comment' }?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={commentDilaoghandleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={delcmt} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openReport} onClose={handleCloseReport} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Report</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter what you have found suspicious about this {reply? 'Reply' :'Comment' }.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            onChange={(e)=>setReportText(e.target.value)}
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
          <Button onClick={updateReport} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Comment;