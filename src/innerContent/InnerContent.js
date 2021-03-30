import React, { useState, useEffect } from "react";
import "./InnerContent.css";
import { makeStyles, IconButton } from "@material-ui/core";
import Dropdown from "react-dropdown";
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
import CommentBox from '../CommentBox.js';
import firebase from 'firebase'


const options = ["Select opinion", "Favour", "Against"];

const defaultOption = options[0];

const useStyles = makeStyles((theme) => ({
  hidden: {
    display: "-webkit-box",
    WebkitLineClamp: 4,
    overflow: "hidden",
    WebkitBoxOrient: "vertical",
  },
}));

const Comments = ({ item, postId }) => {
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState([]);
  const [toReplyName, setToReplyName] = useState('');
  const [repliesLoading, setRepliesLoading] = useState(false);

console.log(item);

  const loadReplies = async () => {
    setRepliesLoading(true);
    let data = await db
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .doc(item.uid)
      .collection("replies")
      .orderBy("timestamp", "desc")
      .get();

    let rp = [];
    data.docs.map((doc) => rp.push({...doc.data(),uid:doc.id}));
    setReplies(rp);
    setShowReply(true);
    setRepliesLoading(false);
  }

  const getReplies =  () => {
    if (showReply) {
      setShowReply(false);
    } else {
      loadReplies();
    }
  };


  const postReply = (data,ref,replyName) => {
    console.log('posting reply',data,ref);
    db.collection("posts").doc(postId).collection("comments").doc(ref).collection('replies').add({text: `@${replyName}  ` + data,
      like:[],
      dislike:[],
      name:'ayush',
      userName:'ayush10',
      icon:"https://houstontamilchair.org/wp-content/uploads/2020/07/parent-directory-avatar-2png-avatar-png-256_256.png",
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    }).then(()=>{
      loadReplies();
    });
  }

  const showReplyInput = (userName) => {
    setToReplyName(userName); 
  }

  return (
    <div className="comment">
      <Comment
        uid={item.uid}
        text={item.text}
        name={item.name}
        userName={item.userName}
        icon={item.icon}
        like={item.like}
        dislike={item.dislike}
        postId={postId}
        postReply={postReply}
      />
      {repliesLoading ? (
        <div className="comment__replyShowButton">
          <CircularProgress size={20} /> <p>Loading replies...</p>
        </div>
      ) : (
        <div className="comment__replyShowButton" onClick={() => getReplies()}>
          {showReply ? <p>Hide replies</p> : <p>View replies</p>}
        </div>
      )}
      <Divider />
      {showReply ? (
        <div className="comment__replies">
          {replies.map((reply) => (
            <Comment
              reply={true}
              replyUid={reply.uid}
              uid={item.uid}
              text={reply.text}
              name={reply.name}
              userName={reply.userName}
              icon={reply.icon}
              like={reply.like}
              dislike={reply.dislike}
              postId={postId}
              postReply={postReply}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

function InnerContent() {
  const [infavour, setInfavour] = useState(true);
  const inputColor = infavour ? "#00FF84" : "#FF0000";
  const inputplaceholder = infavour ? "favour" : "against";
  const [data, setData] = useState({});
  const { postId } = useParams();
  const [isMore, setIsMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const [lastDoc, setLastDoc] = useState([]);

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
        newComments.push({
          ...snapshot.docs[i].data(),
          uid: snapshot.docs[i].id,
        });
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
            newComments.push({
              ...snapshot.docs[i].data(),
              uid: snapshot.docs[i].id,
            });
          }

          setComments(newComments);
          if (snapshot.docs.length < 4) setLastDoc(null);
        } else {
          setLastDoc(null);
        }
      }, 1000);
    }
  };

  const postComment = (data,e) => {


          db.collection("posts")
          .doc(postId)
          .collection("comments")
          .add({text:data,
            like:[],
            dislike:[],
            name:'ayush',
            userName:'ayush10',
            icon:"https://houstontamilchair.org/wp-content/uploads/2020/07/parent-directory-avatar-2png-avatar-png-256_256.png",
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then(()=>getComments());
  
  }

  useEffect(() => {
    getPostData();
    console.log(postId);
    getComments();
  }, []);

  switch (loading) {
    case false:
      return (
        <div className="main">
          <div className="main__heading">
            <h1># {data.headLine}</h1>
          </div>
          <div className="innerContent__top">
            <div className="content">
              <img src={`${data.img}`}></img>
            </div>

            <div className="pollcss">
              <div className="pollcss__left">
                <Poll favour={data.favour} against={data.against} />
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
              <h2>{data.favour.length + data.against.length} Total opinions</h2>
              <Dropdown
                options={options}
                className="myClassName"
                value={defaultOption}
                placeholder="Select an option"
              />
            </div>
           
            <CommentBox postComment={postComment}  />
            <Divider />
            {commentLoading ? (
              <p>loading</p>
            ) : (
              <FlatList
                list={comments}
                renderItem={(item) => <Comments item={item} postId={postId} />}
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
                renderWhenEmpty={() => <div>List is empty!</div>}
              />
            )}
          </div>
        </div>
      );
    default:
      return <h2>loading</h2>;
  }
}

export default InnerContent;
