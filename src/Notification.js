import React, { useState, useEffect } from "react";
import "./Notification.css";
import Header from "./Header.js";
import NotificationsIcon from "@material-ui/icons/Notifications";
import NotificationContent from "./NotificationContent.js";
import db from "./firebase";

function Notification({ userId,userData }) {
 
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getNotifications();
  }, []);

  const getNotifications = () => {
    let noti = [];
    setLoading(true);
    db.collection("userDetails")
      .doc(userId)
      .collection("notifications")
      .orderBy("timestamp","desc")
      .onSnapshot((data) => {
        data.docs.map((d) => noti.push(d.data()));
        setNotifications(noti);
        setLoading(false);
        updateSeen();
      });
  };

  const updateSeen = () => {

    db.collection("userDetails")
      .doc(userId)
      .collection("notifications")
      .where("seen","==",false)
      .get()
      .then((snapshot) => {
        return Promise.all(snapshot.docs.map((doc) => {
          return doc.ref.update({seen: true});
        }));
      });

  }



  return (
    <div className="notification">
      <Header
        text={"Notifications"}
        icon={<NotificationsIcon fontSize={"large"} />}
      />

      {loading ? (
        <h1>loading</h1>
      ) : (
        <div className="notification__body">
          {notifications.map((noti) => (
            <NotificationContent data={noti} userId={userId} userData={userData}  />
          ))}
        </div>
      )}

    </div>
  );
}

export default Notification;
