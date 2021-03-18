import React, { useState } from "react";
import "./Search.css";
import SearchIcon from "@material-ui/icons/Search";
import Skeleton from "@material-ui/lab/Skeleton";
import SearchLoading from "./SearchLoading";

export default function Search() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="search">
      <div className="widgets__input">
        <SearchIcon className="widgets__searchIcon" />
        <input
          onChange={() => console.log()}
          placeholder="Search UnbiasedIndia"
          type="text"
        />
      </div>
      {loading ? (
        <div>
          <SearchLoading />
          <SearchLoading />
          <SearchLoading />
          <SearchLoading />
        </div>
      ) : (
        <img src="search.png" />
      )}
    </div>
  );
}
