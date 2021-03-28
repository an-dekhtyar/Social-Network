import React from "react";
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css'
import { FriendContain } from "./FriendsContain";



const Navbar = () => {



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
            <div className={s.item}>
                <NavLink to='/users' activeClassName={s.active}>Users</NavLink>
            </div>
            <div className={`${s.item} ${s.settingItem}`}>
                <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
            </div>
            <div className={s.navFriends}>
                <FriendContain/>
            </div>
        </nav>

    )
}

export default Navbar
