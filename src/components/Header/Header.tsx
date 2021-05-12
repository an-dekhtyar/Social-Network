import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    login: string | null
    isAuth: boolean
    logout:()=>void
}

const Header = (props: HeaderPropsType) => {

    const logoutHandler = () => {
        props.logout()
    }

    return (
        <header className={s.header}>
            <img src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ?
                    <div>{props.login} <button onClick={logoutHandler}>Log Out</button></div>
                    :
                    <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>)
}

export default Header