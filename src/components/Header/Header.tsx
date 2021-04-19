import React from "react";
import s from './Header.module.css'
import {NavLink} from "react-router-dom";

type HeaderPropsType = {
    login:string | null
    isAuth:boolean
}

const Header = (props:HeaderPropsType) => {
    return(
        <header className={s.header}>
            <img src="https://cdn.logo.com/hotlink-ok/logo-social-sq.png"/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ?
                    props.login
                    :
                    <NavLink to='/login'>Login</NavLink>
                }
            </div>
        </header>)
}

export default Header