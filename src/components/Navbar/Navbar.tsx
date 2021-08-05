import React, {useState} from "react";
import {NavLink} from "react-router-dom";
import s from './Navbar.module.css'
import l from '../Header/Header.module.css'
import {backgroundImageHelper} from "../Header/Header";
import profileImg from '../../assets/images/profile.png'
import messageImg from '../../assets/images/message.png'
import usersImg from '../../assets/images/friends2.png'
import musicImg from '../../assets/images/music.png'
import newsImg from '../../assets/images/news.png'
import settingsImage from '../../assets/images/settings.png'
import {FriendContain} from "./FriendsContain";
import {useSelector} from "react-redux";
import {AppStateType} from "../../redux/redux-store";


const Navbar = () => {

    const isAuth = useSelector<AppStateType, boolean>(state => state.authUserData.isAuth)

    return (

        <nav className={s.navLinkPages}>
            <div className={s.mainBlock}>

                <NavLink to='/profile' activeClassName={s.active}>
                    <div className={s.item}>
                        <span style={backgroundImageHelper(profileImg)}
                              className={l.userImage}/>
                        <span>Profile</span>
                    </div>
                </NavLink>


                <NavLink to='/dialogs' activeClassName={s.active}>
                    <div className={s.item}><span style={backgroundImageHelper(messageImg)}
                                                  className={l.userImage}/><span>Message</span></div>
                </NavLink>


                <NavLink to='/news' activeClassName={s.active}>
                    <div className={s.item}><span style={backgroundImageHelper(newsImg)}
                                                  className={l.userImage}/><span>News</span></div>
                </NavLink>


                <NavLink to='/music' activeClassName={s.active}>
                    <div className={s.item}><span style={backgroundImageHelper(musicImg)}
                                                  className={l.userImage}/><span>Music</span></div>
                </NavLink>


                <NavLink to='/users' activeClassName={s.active}>
                    <div className={s.item}><span style={backgroundImageHelper(usersImg)}
                                                  className={l.userImage}/><span>Users</span></div>
                </NavLink>

            </div>
            <div className={s.secondaryBlock}>

                <NavLink to='/settings' activeClassName={s.active}>
                    <div className={s.item}><span style={backgroundImageHelper(settingsImage)} className={l.userImage}/><span>Settings</span></div>
                </NavLink>

            </div>
            {isAuth && <div className={s.secondaryBlock}>
                <div className={s.navFriends}>
                    <FriendContain/>
                </div>
            </div>}

        </nav>

    )
}

export default Navbar
