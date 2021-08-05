import React from 'react';
import { UserItemType } from '../../redux/usersReducer';
import s from './User.module.css'

import userPhoto from '../../assets/images/user.png'
import { NavLink } from 'react-router-dom';


type UserPagePropsType = {

    follow: (userId: number) => void
    unfollow: (userId: number) => void
    user:UserItemType
    isAuth:boolean
    followingInProgress: number[]
}

export const User = (props: UserPagePropsType) => {
    let {
        follow,
        unfollow,
        user,
        followingInProgress,
        isAuth
    } = props

    return (
        <div className={s.userContain}>
            <div className={s.user}>
                <NavLink to={'/profile/' + user.id}>
                    <div>
                        <img src={user.photos.large !== null ? user.photos.large : userPhoto} />
                    </div>
                </NavLink>
                <NavLink to={'/profile/' + user.id}>
                <div className={s.userName}>{user.name}</div>
                </NavLink>
                <div>
                    {user.followed
                        ?
                        <button disabled={followingInProgress.some(id => id === user.id) || !isAuth}
                                className={`${s.button} ${s.unfollowButton}`}
                                onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>
                        :
                        <button disabled={followingInProgress.some(id => id === user.id) || !isAuth}
                                className={`${s.button} ${s.followButton}`}
                                onClick={() => {
                                    follow(user.id)
                                }}>Follow</button>
                    }
                </div>
            </div>

        </div >)

}





