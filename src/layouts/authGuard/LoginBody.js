import React, {useState} from 'react';
import Logo from '../../assets/img/logo-main.png';
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import {Paper} from "@mui/material";

export default function LoginBody() {
    const [showLoginModal, setShowLoginModal] = useState(true);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <Paper sx={{
                maxWidth: '650px',
                width: '650px',
                padding: '10px',
            }}>
                <div style={{maxWidth: '135px', margin: '0 auto 30px'}}>
                    <img src={Logo} alt="logo"/>
                </div>
                {showLoginModal ? <LoginForm/> : <RegisterForm/>}
            </Paper>
        </div>
    );

}
