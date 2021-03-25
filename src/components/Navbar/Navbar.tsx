import React from "react";
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css'
import Friends from "./Friends";
import {SideBarType, StoreType} from "../../redux/store";
import { FriendsContain } from "./FriendsContain";



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
            <div className={`${s.item} ${s.settingItem}`}>
                <NavLink to='/settings' activeClassName={s.active}>Settings</NavLink>
            </div>
            <div className={s.navFriends}>
                <FriendsContain/>
            </div>
        </nav>

    )
}

export default Navbar
