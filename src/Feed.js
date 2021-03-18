import React from "react";
import "./Feed.css";
import DescriptionIcon from "@material-ui/icons/Description";
import Cards from "./Cards";
import ShareIcon from "@material-ui/icons/Share";
import { IconButton } from "@material-ui/core";


function Feed() {
  return (
    <div className="feed">
      <h2 className="newsfeed">
        {" "}
        <DescriptionIcon /> Latest News
      </h2>

      <Cards
        share={
          <IconButton>
            <ShareIcon />
          </IconButton>
        }
      />
      <Cards />
      <Cards />
      <Cards />
      <Cards />
    </div>
  );
}

export default Feed;
