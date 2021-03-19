import React from "react";
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css'
import Friends from "./Friends";
import { SideBarType } from "../../redux/store";

type NavbarPropsType = {
    sideBarState:SideBarType
}

const Navbar:React.FC<NavbarPropsType> = (props) => {
    return (

            <nav className={s.navLinkPages}>
                <div className={s.item}>
                    <NavLink to='/profile' activeClassName={s.active}>Profile</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to='/dialogs' activeClassName={s.active}>Message</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to='/news' activeClassName={s.active}>News</NavLink>
                </div>
                <div className={s.item}>
                    <NavLink to='/music' activeClassName={s.active}>Music</NavLink>
                </div>
                <div className={`${s.item} ${s.settingItem}`}>
                    <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
                </div>
                <div className={s.navFriends}>
                <Friends friends = {props.sideBarState.friends}/>
                </div>
            </nav>

    )
}

export default Navbar
