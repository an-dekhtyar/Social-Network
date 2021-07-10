import React from 'react';
import { UserItemType } from '../../redux/usersReducer';
import s from './User.module.css'

import userPhoto from '../../assets/images/userPhoto.png'
import { NavLink } from 'react-router-dom';


type UserPagePropsType = {

    follow: (userId: number) => void
    unfollow: (userId: number) => void
    user:UserItemType
    followingInProgress: number[]
}

export const User = (props: UserPagePropsType) => {
    let {
        follow,
        unfollow,
        user,
        followingInProgress
    } = props

    return (
        <div className={s.userContain}>
            <div className={s.userImg}>
                <NavLink to={'/profile/' + user.id}>
                    <div>
                        <img src={user.photos.small !== null ? user.photos.small : userPhoto} />
                    </div>
                </NavLink>
                <div>
                    {user.followed
                        ?
                        <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    unfollow(user.id)
                                }}>Unfollow</button>
                        :
                        <button disabled={followingInProgress.some(id => id === user.id)}
                                onClick={() => {
                                    follow(user.id)
                                }}>Follow</button>
                    }
                </div>
            </div>

            <div className={s.textContain}>
                <div>{user.name}</div>
                <div>{user.status}</div>
                <div>{'u.location.country'}</div>
                <div>{'u.location.city'}</div>
            </div>
        </div >)

}





