import React, { useState, useEffect } from "react";
import "./About.css";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import FlatList from "flatlist-react";
import Header from "./Header.js";
import AboutTab from "./AboutTab";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Button } from "@material-ui/core";
import EditProfile from "./EditProfile";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import db from "./firebase.js";
import { auth } from "./firebase.js";
import { useParams } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { Redirect } from "react-router";
import Avatar from "@material-ui/core/Avatar";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function About({ userId }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [dislikedPosts, setDislikesPosts] = useState([]);
  const [redirect, setRedirect] = useState(false);

  const { uid } = useParams();

  useEffect(() => {
    getUserData();
    getLikedPosts();
    getDislikedPosts();
  }, [uid]);

  const getUserData = () => {
    setLoading(true);
    db.collection("userDetails")
      .doc(uid)
      .get()
      .then((data) => setUserData(data.data()))
      .then(() => setLoading(false));
  };

  const getLikedPosts = () => {
    let p = [];
    db.collection("posts")
      .where("favour", "array-contains", uid)
      .get()
      .then((data) => data.docs.map((d) => p.push({ ...d.data(), uid: d.id })))
      .then(() => setLikedPosts(p));
  };

  const getDislikedPosts = () => {
    let p = [];
    db.collection("posts")
      .where("against", "array-contains", uid)
      .get()
      .then((data) => data.docs.map((d) => p.push({ ...d.data(), uid: d.id })))
      .then(() => setDislikesPosts(p));
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const signOut = () => {
    auth.signOut();
    setRedirect(true);
  };

  if (redirect) {
    return <Redirect to="/feed" />;
  }

  return (
    <div className="about">
      <Header icon={<AccountBoxIcon fontSize={"large"} />} text={"Profile"} />

      {loading ? (
        <LinearProgress />
      ) : (
        <div className="about__body">
          <div
            className="background__image"
            // style={{
            //   backgroundImage: "url(" + "/farmer.jpg" + ")",
            //   width: "100%",
            //   height: "250px",
            //   backgroundPosition: "center top",
            //   backgroundSize: "cover",
            //   backgroundRepeat: "no-repeat",
            // }}
          >
            <div className="profile__image">
              <div className="profile__image__name">
                {/* <img
                  className="profile__image__icon"
                  src={`${userData.iconUrl}`}
                ></img> */}

                <Avatar alt="Profile Icon" src={`${userData.iconUrl}`} />

                <span className="about__username">{userData.name}</span>
                <span className="username__user">@{userData.userName}</span>
              </div>

              <div className="profile__image__edit">
                {userId === uid ? (
                  <Button
                    variant="contained"
                    size="large"
                    onClick={signOut}
                    startIcon={<ExitToAppIcon />}
                    className="about__logout"
                  >
                    Logout
                  </Button>
                ) : null}
                {userId === uid ? (
                  <EditProfile userData={userData} reload={getUserData} />
                ) : null}
              </div>
            </div>
            <div className="about__bio">
              <p style={{ fontSize: "15px", color: "#c8d6d2" }}>
                {userData.bio}
              </p>
            </div>
          </div>
          <div className={classes.root} className="tabs__likes">
            <AppBar
              position="sticky"
              style={{
                backgroundColor: "white",
                boxShadow: "none",
                position: "static",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
                variant="fullWidth"
                indicatorColor="primary"
                selectionFollowsFocus
                style={{
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <Tab label="In Favour" {...a11yProps(0)} />
                <Tab label="In Against" {...a11yProps(1)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <FlatList
                list={likedPosts}
                renderItem={(item) => (
                  <AboutTab
                    uid={item.uid}
                    headLine={item.headLine}
                    img={item.img}
                    favour={item.favour}
                    against={item.against}
                  />
                )}
                renderWhenEmpty={() => <div>List is empty!</div>}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <FlatList
                list={dislikedPosts}
                renderItem={(item) => (
                  <AboutTab
                    uid={item.uid}
                    headLine={item.headLine}
                    img={item.img}
                    favour={item.favour}
                    against={item.against}
                  />
                )}
                renderWhenEmpty={() => <div> <p>you Haven't voted to any topic yet..</p> </div>}
              />
            </TabPanel>
          </div>
        </div>
      )}
    </div>
  );
}
