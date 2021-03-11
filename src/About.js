import React from "react";
import "./About.css";
import EditIcon from "@material-ui/icons/Edit";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Cards from "./Cards";
import AboutTab from "./AboutTab";
import { Block } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";

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

export default function About() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="about">
      <div className="about__header">
        <h2>Username</h2>
      </div>
      <div
        style={{
          backgroundImage: "url(" + "/farmer.jpg" + ")",
          width: "100%",
          height: "250px",
          backgroundPosition: "center top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="profile__image">
          <div className="profile__image__name">
            <img
              className="profile__image__icon"
              src="http://www.pngall.com/wp-content/uploads/5/Profile-Avatar-PNG.png"
            ></img>
            <span className="about__username">Ayush Sahu </span>
            <span className="username__user"> @ayushsahu </span>
          </div>
          <div className="profile__image__edit">
            <h3>Edit Profile </h3>
            <EditIcon />
          </div>
        </div>
      </div>

      <div className={classes.root} style={{ marginTop: "200px" }}>
        <AppBar position="sticky">
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="Recent Votes" {...a11yProps(0)} />
            <Tab label="Recent Commments" {...a11yProps(1)} />
            <Tab label="Saved" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <AboutTab />
          <AboutTab />
          <AboutTab />
          <AboutTab />
        </TabPanel>
        <TabPanel value={value} index={1}></TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </div>
    </div>
  );
}
