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

function Feed() {
  const [isLoading, setIsLoading] = useState(false);
  const [moreLoading, setMoreLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);

  const getPosts = async () => {
    setIsLoading(true);

    const snapshot = await db
      .collection("posts")
      .orderBy("timestamp", "desc")
      .limit(4)
      .get();

    if (!snapshot.empty) {
      let newPosts = [];

      setLastDoc(snapshot.docs[snapshot.docs.length - 1].data());

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
    if (lastDoc !== null) {
      setMoreLoading(true);

      setTimeout(async () => {
        let snapshot = await db
          .collection("posts")
          .orderBy("timestamp", "desc")
          .startAfter(lastDoc.timestamp)
          .limit(4)
          .get();

        if (!snapshot.empty) {
          let newPosts = posts;

          setLastDoc(snapshot.docs[snapshot.docs.length - 1].data());

          for (let i = 0; i < snapshot.docs.length; i++) {
            newPosts.push({
              ...snapshot.docs[i].data(),
              uid: snapshot.docs[i].id,
            });
          }

          setPosts(newPosts);
          if (snapshot.docs.length < 4) setLastDoc(null);
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
      <div className="feed__header">
        <h2 className="newsfeed">
          <DescriptionIcon /> Latest News
        </h2>
      </div>
      <div className="feed__posts">
        {isLoading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <FlatList
            list={posts.slice(0, posts.length - 1)}
            renderItem={(item) => (
              <Cards
                headLine={item.headLine}
                description={item.description}
                img={item.img}
                favour={item.favour}
                against={item.against}
                uid={item.uid}
              />
            )}
            hasMoreItems={lastDoc !== null ? true : false}
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
    </div>
  );
}

export default Feed;
