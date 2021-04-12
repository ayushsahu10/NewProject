import React from 'react'
import LoginSec from './LoginSec'
import RegisterSec from './RegisterSec'
import './LoginSidebar.css'

function LoginSidebar() {
    return (
        <div className="login__button">
            <div className="login___sidebar">
            <LoginSec />
            Or
            <RegisterSec /></div>
        </div>
    )
}

export default LoginSidebar