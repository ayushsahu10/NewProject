import React, { useEffect, useState } from "react";
import "./Bookmark.css";
import Header from "./Header";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import db from "./firebase.js";
import { auth } from "./firebase.js";
import Cards from "./Cards";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { SharePost } from "./PostUtilities.js";
import LinearProgress from "@material-ui/core/LinearProgress";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Bookmark() {
  const uid = auth.currentUser !== null ? auth.currentUser.uid : "";
  const [saved, setSaved] = useState([]);
  const [loading, setLoading] = useState(true);
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

  const getSaved = async () => {
    let savedPost_ids = [];
    let posts = [];
    await db
      .collection("userDetails")
      .doc(uid)
      .get()
      .then((d) => (savedPost_ids = d.data().savedPosts));

    await Promise.all(
      savedPost_ids.map(async (id) => {
        let data = await db.collection("posts").doc(id).get();
        posts.push({ ...data.data(), uid: id });
      })
    );
    setLoading(false);
    console.log(posts);
    setSaved(posts);
  };

  useEffect(() => {
    getSaved();
  }, []);

  return (
    <div className="bookmark">
      <Header icon={<SaveAltIcon fontSize="large" />} text={"Bookmarks"} />
      {loading ? (
        <LinearProgress />
      ) : (
        <div className="bookmark__body" >
          {saved.map((item) => (
            <Cards
              headLine={item.headLine}
              description={item.description}
              img={item.img}
              remove={true}
              favour={item.favour}
              against={item.against}
              alert={handleClickAlert}
              showShareModal={showShareModal}
              uid={item.uid}
              getSaved={getSaved}
              setPostId={setPostId}
            />
          ))}
        </div>
      )}
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
        url={
          window.location.href.slice(0, window.location.href.lastIndexOf("/")) +
          `/feed/${postId}`
        }
      />
    </div>
  );
}

export default Bookmark;
