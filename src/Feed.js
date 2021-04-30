import React, { useState, useEffect } from "react";
import "./Feed.css";
import DescriptionIcon from "@material-ui/icons/Description";
import Cards from "./Cards";
import ShareIcon from "@material-ui/icons/Share";
import { IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import db from "./firebase.js";
import FlatList from "flatlist-react";
import HomeIcon from "@material-ui/icons/Home";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { SharePost } from "./PostUtilities.js";
import Header from "./Header.js";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [shareModal, setShareModal] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);
  const [alertType, setAlertType] = useState("error");
  const [alertMessage, setAlertMessage] = useState("");
  const [postId, setPostId] = useState("");

  const handleClickAlert = (type, message) => {
    setAlertType(type);
    setAlertMessage(message);
    setOpenAlert(true);
  };

  const showShareModal = () => {
    setShareModal(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenAlert(false);
  };

  const getPosts = async () => {
    setIsLoading(true);

    const snapshot = await db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .limit(5)
      .get();

    if (!snapshot.empty) {
      let newPosts = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

      for (let i = 0; i < snapshot.docs.length; i++) {
        newPosts.push({ ...snapshot.docs[i].data(), uid: snapshot.docs[i].id });
      }

      setPosts(newPosts);
    } else {
      setLastDoc(null);
    }
    setIsLoading(false);
  };

  const getMorePosts = async () => {
    if (lastDoc) {
      setMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await db
          .collection("posts")
          .orderBy("timestamp", "desc")
          .startAfter(lastDoc.data().timestamp)
          .limit(5)
          .get();

        if (!snapshot.empty) {
          let newPosts = [...posts];

          setLastDoc(snapshot.docs[snapshot.docs.length - 1]);

          for (let i = 0; i < snapshot.docs.length; i++) {
            
              newPosts.push({
                ...snapshot.docs[i].data(),
                uid: snapshot.docs[i].id,
              });
              
          }

          setPosts(newPosts);

          if (snapshot.docs.length < 5) setLastDoc(null);
        } else {
          setLastDoc(null);
        }

        setMoreLoading(null);
      }, 1000);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="feed">
      <Header icon={<HomeIcon fontSize={"large"} />} text={"Home"} />
      <div className="feed__posts">
        {isLoading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <FlatList
            list={posts}
            renderItem={(item) => (
              <Cards
                headLine={item.headLine}
                description={item.description}
                img={item.img}
                favour={item.favour}
                against={item.against}
                uid={item.uid}
                remove={false}
                showShareModal={showShareModal}
                alert={handleClickAlert}
                setPostId={setPostId}
              />
            )}
            hasMoreItems={lastDoc !== null  }
            loadMoreItems={getMorePosts}
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
      <Snackbar
        open={openAlert}
        autoHideDuration={4000}
        onClose={handleCloseAlert}
      >
        <Alert onClose={handleCloseAlert} severity={alertType}>
          {alertMessage}
        </Alert>
      </Snackbar>
      <SharePost
        shareModal={shareModal}
        setShareModal={setShareModal}
        alert={handleClickAlert}
        url={window.location.href + `/${postId}`}
      />
    </div>
  );
}

export default Feed;
