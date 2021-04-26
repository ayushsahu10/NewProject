import React, { useState, useEffect } from "react";
import "./InnerContent.css";
import { makeStyles, IconButton } from "@material-ui/core";
import "react-dropdown/style.css";
import Poll from "../Poll";
import Comment from "./Comment";
import Divider from "@material-ui/core/Divider";
import PostUtilities from "../PostUtilities.js";
import db from "../firebase";
import { useParams } from "react-router-dom";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import FlatList from "flatlist-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import CommentBox from "../CommentBox.js";
import firebase from "firebase";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const options = ["Select opinion", "Favour", "Against"];


const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const Comments = ({
  userData,
  item,
  postId,
  deleteComment,
  handleClickAlert,
  userId,
  sendReport,
  postIcon,
  userIcon,
}) => {
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [repliesLoading, setRepliesLoading] = useState(false);

  console.log(item);

  const loadReplies = async () => {
    setRepliesLoading(true);
    let data = await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(item.comUid)
      .collection("replies")
      .orderBy("timestamp", "desc")
      .get();

    let rp = [];
    data.docs.map((doc) => rp.push({ ...doc.data(), repUid: doc.id }));
    setReplies(rp);
    console.log("=>>>>>>>>>>>>>>>>>>>>>replies", rp);
    setShowReply(true);
    setRepliesLoading(false);
  };

  const getReplies = () => {
    if (showReply) {
      setShowReply(false);
    } else {
      loadReplies();
    }
  };

  const postReply = (data, infavour, ref, replyName) => {
    console.log("posting reply", data, ref);
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(ref)
      .collection("replies")
      .add({
        text: `@${replyName}  ` + data,
        like: [],
        dislike: [],
        infavour: infavour,
        uid: userId,
        name: userData.name,
        userName: userData.userName,
        icon: userData.iconUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        loadReplies();
      });
  };

  const deleteReply = (cmtId, postId, repId) => {
    console.log("=>>>>>>>>>>>>>>deleting", cmtId, postId, repId);
    let cm = replies.filter((cmt) => cmt.repUid !== repId);
    setReplies(cm);
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(cmtId)
      .collection("replies")
      .doc(repId)
      .delete()
      .then(() => {
        handleClickAlert("success", "Reply deleted...");
      });
  };
  const sendReplyReport = (text, cmtId, postId, repId) => {
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
        replyId: repId,
      })
      .then(() => {
        handleClickAlert("success", "Report submitted...");
      });
  };



  return (
    <div className="comment">
      <Comment
        uid={item.comUid}
        userData={userData}
        text={item.text}
        name={item.name}
        userName={item.userName}
        icon={item.icon}
        like={item.like}
        commentOwnerId={item.uid}
        dislike={item.dislike}
        postId={postId}
        userId={userId}
        userIcon={userIcon}
        postIcon={postIcon}
        postReply={postReply}
        deleteComment={deleteComment}
        sendReport={sendReport}
      />
      {item.repliesLen ? (
        <div>
          {repliesLoading ? (
            <div className="comment__replyShowButton">
              <CircularProgress size={20} /> <p>Loading replies...</p>
            </div>
          ) : (
            <div
              className="comment__replyShowButton"
              onClick={() => getReplies()}
            >
              {showReply ? (
                <p>Hide replies</p>
              ) : (
                <p>View {item.repliesLen} replies</p>
              )}
            </div>
          )}
        </div>
      ) : null}

      <Divider />
      {showReply ? (
        <div className="comment__replies">
          {replies.map((reply) => (
            <Comment
              reply={true}
              userData={userData}
              replyUid={reply.repUid}
              uid={item.comUid}
              text={reply.text}
              name={reply.name}
              userName={reply.userName}
              icon={reply.icon}
              userId={userId}
              like={reply.like}
              userIcon={userIcon}
              commentOwnerId={reply.uid}
              dislike={reply.dislike}
              postId={postId}
              postIcon={postIcon}
              postReply={postReply}
              deleteComment={deleteReply}
              sendReport={sendReplyReport}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

function InnerContent({ userData }) {
  const [infavour, setInfavour] = useState(true);
  const [data, setData] = useState({});
  const { postId } = useParams();
  const [isMore, setIsMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [lastDoc, setLastDoc] = useState([]);
  const [cmtLength, setCmtLength] = useState(0);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [cmtType, setCmtType] = React.useState("Total Opinions");
  const classes = useStyles();

  const handleChange = (event) => {
    setCmtType(event.target.value);
    console.log(event.target.value);
  };

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

  const handleCommentSupport = () => {
    setInfavour(!infavour);
  };

  const getPostData = () => {
    setLoading(true);
    db.collection("posts")
      .doc(postId)
      .get()
      .then((data) => {
        setData(data.data());
        setLoading(false);
      });
  };

  const filterComments = (data) => {
    if (cmtType === "Total Opinions") return true;
    else if (cmtType === "In Favour" && data.infavour) return true;
    else if (cmtType === "In Against" && !data.infavour) return true;
    else return false;
  };

  const getTotalCommentsLen =  async () => {
    let ref = db
    .collection("posts")
    .doc(postId)
    .collection("comments");

    if (cmtType === "Total Opinions"){
      const cmtlen = await ref.get();
    setCmtLength(cmtlen.docs.length);
    }
    else if (cmtType === "In Favour"){
      const cmtlen = await ref.where("infavour","==",true).get();
    setCmtLength(cmtlen.docs.length);
    }else{
      const cmtlen = await ref.where("infavour","==",false).get();
    setCmtLength(cmtlen.docs.length);
    }

  }

  const getComments = async () => {
    setCommentLoading(true);


    const snapshot = await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .orderBy("timestamp", "desc")
      .limit(10)
      .get();

    if (!snapshot.empty) {
      let newComments = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        let rp = await db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .doc(snapshot.docs[i].id)
          .collection("replies")
          .get();
        if (filterComments(snapshot.docs[i].data())) {
          newComments.push({
            ...snapshot.docs[i].data(),
            comUid: snapshot.docs[i].id,
            repliesLen: rp.docs.length,
          });
        }
      }

      setComments(newComments);
      console.log(newComments);
    } else {
      setLastDoc(null);
    }
    setCommentLoading(false);
  };

  const getMoreComments = async () => {
    if (lastDoc) {
      setTimeout(async () => {
        let snapshot = await db
          .collection("posts")
          .doc(postId)
          .collection("comments")
          .orderBy("timestamp", "desc")
          .startAfter(lastDoc.data().timestamp)
          .limit(10)
          .get();

        if (!snapshot.empty) {
          let newComments = comments;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            let rp = await db
              .collection("posts")
              .doc(postId)
              .collection("comments")
              .doc(snapshot.docs[i].id)
              .collection("replies")
              .get();

            if (filterComments(snapshot.docs[i].data())) {
              newComments.push({
                ...snapshot.docs[i].data(),
                comUid: snapshot.docs[i].id,
                repliesLen: rp.docs.length,
              });
            }
          }

          setComments(newComments);
          if (snapshot.docs.length < 4) setLastDoc(null);
        } else {
          setLastDoc(null);
        }
      }, 1000);
    }
  };

  const postComment = (data, infavour, e) => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text: data,
        like: [],
        dislike: [],
        infavour: infavour,
        uid: userData.id,
        name: userData.name,
        userName: userData.userName,
        icon: userData.iconUrl,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => getComments());
  };

  const deleteComment = (cmtId, postId) => {
    let cm = comments.filter((cmt) => cmt.comUid !== cmtId);
    setComments(cm);
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(cmtId)
      .delete()
      .then(() => {
        handleClickAlert("success", "Comment deleted...");
      });
  };

  const sendReport = (text, cmtId, postId) => {
    if (text.length < 50) {
      handleClickAlert("error", "Report text must be 50 characters long'...");
      return;
    }
    db.collection("CommentReports")
      .doc(postId)
      .collection("report")
      .add({
        text: text,
        userId: userData.id,
        commentId: cmtId,
      })
      .then(() => {
        handleClickAlert("success", "Report submitted...");
      });
  };

  const savePosts = () => {
    db.collection("userDetails")
      .doc(userData.id)
      .update({
        savedPosts: firebase.firestore.FieldValue.arrayUnion(postId),
      })
      .then(() => {
        handleClickAlert("success", "saved");
      });
  };

  useEffect(() => {
    getPostData();
  }, []);
  useEffect(() => {
    getComments();
    getTotalCommentsLen();
  }, [cmtType]);

  switch (loading) {
    case false:
      return (
        <div className="innerContent__main">
          <div className="main__heading">
            <h1># {data.headLine}</h1>
          </div>
          <div className="innerContent__top">
            <div className="content">
              <img src={`${data.img}`}></img>
            </div>

            <div className="pollcss">
              <div className="pollcss__left">
                <Poll favour={data.favour} postId={postId} against={data.against} />
              </div>
              <PostUtilities
                ismore={
                  <div onClick={() => setIsMore(!isMore)}>
                    <IconButton>
                      {isMore ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                    {isMore ? <p>Less </p> : <p>More </p>}
                  </div>
                }
                cmtLength={cmtLength}
                savePost={savePosts}
              />
            </div>

            {isMore ? (
              <p className="main__para"> {data.description} </p>
            ) : (
              <p className="main__para">
                {data.description.slice(0, 200)}.....
              </p>
            )}

            <Divider />
            <div className="comment__top">
              <h2>{cmtLength} Total opinions {cmtType !== "Total Opinions" ? cmtType : ""} </h2>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="demo-simple-select-outlined-label">
                  Total{" "}
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={cmtType}
                  onChange={handleChange}
                  label="Age"
                >
                  <MenuItem value="Total Opinions">
                    <em>Total Opinions</em>
                  </MenuItem>
                  <MenuItem value={"In Favour"}>In Favour</MenuItem>
                  <MenuItem value={"In Against"}>In Against</MenuItem>
                </Select>
              </FormControl>
            </div>

            <CommentBox postComment={postComment} userIcon={userData.iconUrl} />
            <Divider />
            {commentLoading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "15px",
                }}
              >
                <CircularProgress />
              </div>
            ) : (
              <FlatList
                list={comments}
                renderItem={(item) => (
                  <Comments
                    userData={userData}
                    postIcon={data.img}
                    item={item}
                    userIcon={userData.iconUrl}
                    userId={userData.id}
                    postId={postId}
                    handleClickAlert={handleClickAlert}
                    deleteComment={deleteComment}
                    sendReport={sendReport}
                  />
                )}
                hasMoreItems={lastDoc !== null ? true : false}
                loadMoreItems={getMoreComments}
                paginationLoadingIndicator={
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress />
                  </div>
                }
                renderWhenEmpty={() => <div></div>}
              />
            )}
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
        </div>
      );
    default:
      return (
        <div className="main__loading">
          {" "}
          <CircularProgress />{" "}
        </div>
      );
  }
}

export default InnerContent;
