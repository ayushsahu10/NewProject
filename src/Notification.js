import React from 'react'
import './Notification.css'
import SettingsIcon from '@material-ui/icons/Settings';
import NotificationContent from './NotificationContent';
import NotificationsRoundedIcon from '@material-ui/icons/NotificationsRounded';

function Notification() {
    return (
        <div  className="notification">
            <div className="notification__header">
            
            <h2> Notifications</h2>
            </div>
            <NotificationContent />
            <NotificationContent />

            <NotificationContent />
        
            <NotificationContent />
            
            <NotificationContent />
            <NotificationContent />
        </div>
    )
}

export default Notification