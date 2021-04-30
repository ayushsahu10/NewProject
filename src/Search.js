import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import AboutTab from "./AboutTab";
import SearchLoading from "./SearchLoading";
import db from "./firebase";
import ClearIcon from "@material-ui/icons/Clear";
import { IconButton } from "@material-ui/core";
import PageviewIcon from '@material-ui/icons/Pageview';
import Zoom from '@material-ui/core/Zoom';
import Header from './Header.js';


export default function Search() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearch = (e) => {
    setInput(e.target.value);

    if (input.trim()) {
      console.log(input.split(" "), "inside serach ");
      setLoading(true);

      let d = [];

      db.collection("posts")
        .where("tags","array-contains-any",input.split(" "))
        .get()
        .then((data) =>
          data.docs.map((doc) => d.push({ ...doc.data(), uid: doc.id }))
        )
        .then(() => {
          setPosts(d);
          console.log(d);
          setLoading(false);
        });
    }
  };

  const clearInput = () => {
    setInput("");
  };


  return (
    <div className='main' >
    <Header  
      icon={<PageviewIcon fontSize={"large"} />}
      text={"Search"}
    />
      <Zoom in={true}>
      <div className="search">
        <div className="widgets__input">
          <SearchIcon className="widgets__searchIcon" />
          <input
            onChange={(e) => handleSearch(e)}
            placeholder="Search UnbiasedIndia"
            type="text"
            value={input}
          />
          <IconButton onClick={clearInput}>
            <ClearIcon fontSize={"small"} />
          </IconButton>
        </div>
        {!input.length ? (
          <img  className='search__img' src="search.png" />
        ) : (
          <>
            {loading ? (
              <div>
                <SearchLoading />
                <SearchLoading />
                <SearchLoading />
                <SearchLoading />
              </div>
            ) : (
              <div className='search__posts' >
                {posts.map((post) => (
                  <AboutTab
                    search
                    uid={post.uid}
                    img={post.img}
                    against={post.against}
                    favour={post.favour}
                    headLine={post.headLine}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
      </Zoom>
    </div>
  );
}
