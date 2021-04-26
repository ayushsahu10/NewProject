import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import FavoriteIcon from "@material-ui/icons/Favorite";
import "./NotificationContent.css";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import db from "./firebase.js";
import Comment from "./innerContent/Comment.js";
import firebase from "firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Redirect } from "react-router";
import { makeStyles } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import Zoom from '@material-ui/core/Zoom';
import LinearProgress from '@material-ui/core/LinearProgress';
import {Link } from 'react-router-dom'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function NotificationContent({ data, userId, userData }) {
  const classes = useStyles();
  const [color, setColor] = useState("rgba(255,255,255,1)");
  const [open, setOpen] = useState(false);
  const [mainComment, setMainComment] = useState({});
  const [replies, setReplies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [redirect, setRedirect] = useState(false);
  const marginH = window.innerWidth <= 1000 ? "0%" : "25%";

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
  const setBgColor = () => {
    if (data.type == "like" || data.type == "dislike")
      setColor("rgba(255, 0, 0, 1)");
    else if (data.type == "replied") setColor("rgba(125, 134, 248, 1)");
  };

  useEffect(() => {
    setBgColor();
    console.log("=>>>>>>>>>>>>inside", new Date(data.timestamp?.toDate()).toLocaleDateString());
  }, []);

  const Icon = () => {
    if (data.type == "like" || data.type == "dislike")
      return <FavoriteIcon color="secondary" />;
    else return <QuestionAnswerIcon color="primary" />;
  };

  const handleClickOpen = () => {
    setOpen(true);
    getComment();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getComment = async () => {
    setLoading(true);

    let mainCmt = await db
      .collection("posts")
      .doc(data.postId)
      .collection("comments")
      .doc(data.cmtId)
      .get();

    let reply = await db
      .collection("posts")
      .doc(data.postId)
      .collection("comments")
      .doc(data.cmtId)
      .collection("replies")
      .get();

    let rp = [];
    reply.docs.map((d) => rp.push({ ...d.data(), repUid: d.id }));

    console.log("=>>>>>>>>", !!mainCmt.data());

    if (!!mainCmt.data()) 
    {
      setMainComment(mainCmt.data());
      setReplies(rp);
      setLoading(false);
    }
    else setRedirect(true);
  };

  const postReply = (text,infavour, ref, replyName) => {
    console.log("posting reply", text, data.postId, data.cmtId);
    db.collection("posts")
      .doc(data.postId)
      .collection("comments")
      .doc(data.cmtId)
      .collection("replies")
      .add({
        text: `@${replyName}  ` + text,
        like: [],
        dislike: [],
        infavour:infavour,
        uid: userData.id,
        name: userData.name,
        userName: userData.userName,
        icon: userData.iconUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        getComment();
      });
  };

  const deleteReply = (cmtId, postId, repId) => {
    console.log("=>>>>>>>>>>>>>>deleting", cmtId, postId, repId);
    let delRef = !!repId
      ? db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .doc(cmtId)
          .collection("replies")
          .doc(repId)
      : db.collection("posts").doc(postId).collection("comments").doc(cmtId);

    let cm = replies.filter((cmt) => cmt.repUid !== repId);
    setReplies(cm);

    delRef.delete().then(() => {
      handleClickAlert("success", "Reply deleted...");
      handleClose();
    });
  };

  const sendReport = (text, cmtId, postId, repId) => {
    let rep_Id = !!repId ? repId : "";

    if (text.length < 50) {
      handleClickAlert("error", "Report text must be 50 characters long'...");
      return;
    }
    db.collection("CommentReports")
      .doc(postId)
      .collection("report")
      .add({
        text: text,
        userId: userId,
        commentId: cmtId,
        replyId: rep_Id,
      })
      .then(() => {
        handleClickAlert("success", "Report submitted...");
      });
  };

  if (redirect) {
    return <Redirect to={`/feed/${data.postId}`} />;
  }

  return (
    <Zoom in={true} >
    <div className="notification__content">
      <div  className="notification__contentBody">
      <Link to={`/about/${data.userId}`} >
        <div className="notification__contentIcon">
          <img
            className="notification__contentIconImage"
            src={`${data.iconUrl}`}
          />
          <div className="overlay">
            <Icon />
          </div>
        </div>
        </Link>
        <p onClick={handleClickOpen} >
          <span className="notification__username">@{data.userName +"  "}</span>
          <span style={{ color: color }}>{data.type+"  "}</span>
          <span className="notification__username">
            your opinion on Farmer's protest
          </span>
        </p>
        <span className="notification__time">{new Date(data.timestamp?.toDate()).toDateString()}</span>
        <Link to={`/feed/${data.postId}`} > 
        <span className="notification__img">
        <img src={`${data.postIcon}`}></img>
        </span>
        </Link> 
      </div>
      <Dialog
        style={{ margin: ` 0% ${marginH} ` }}
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <DialogTitle id="form-dialog-title" style={{ padding: "10px 2px" }}>
          <Button onClick={handleClose} color="#263238">
            <ArrowBackIcon />
          </Button>
          Replies
        </DialogTitle>
        <div className="notification__contentDialog">
          {loading ? (
            <LinearProgress />
          ) : (
            <>
              <Comment
                uid={data.cmtId}
                text={mainComment.text}
                name={mainComment.name}
                userName={mainComment.userName}
                icon={mainComment.icon}
                like={mainComment.like}
                commentOwnerId={mainComment.uid}
                dislike={mainComment.dislike}
                postId={data.postId}
                userData={userData}
                postIcon={data.postIcon}
                postReply={postReply}
                userId={userId}
                deleteComment={deleteReply}
                sendReport={sendReport}
              />

              <div className="notification__contentDialogReply">
                {replies.map((rep) => (
                  <Comment
                    uid={data.cmtId}
                    reply={true}
                    replyUid={rep.repUid}
                    text={rep.text}
                    name={rep.name}
                    userName={rep.userName}
                    icon={rep.icon}
                    like={rep.like}
                    commentOwnerId={rep.uid}
                    dislike={rep.dislike}
                    postId={data.postId}
                    userData={userData}
                    postIcon={data.postIcon}
                    postReply={postReply}
                    userId={userId}
                    deleteComment={deleteReply}
                    sendReport={sendReport}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Dialog>
      <Snackbar
        open={openAlert}
        autoHideDuration={1000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
    </div>
    </Zoom>
  );
}

export default NotificationContent;
