import React from 'react';
import { UserItemType } from '../../redux/usersReducer';
import s from './User.module.css'

import userPhoto from '../../assets/images/userPhoto.png'
import { NavLink } from 'react-router-dom';

type UsersPagePropsType = {
    totalCount: number
    pageSize: number
    onPageChange: (page: number) => void
    currentPage: number
    users: Array<UserItemType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFetching: boolean

}

export const Users = (props: UsersPagePropsType) => {
    let pages = []
    let pageCount = Math.ceil(props.totalCount / props.pageSize)
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            <div>
                {pages.map(p => {

                    const setCurrentPageHandler = () => {
                        props.onPageChange(p)
                    }

                    return <span
                        key={p}
                        className={props.currentPage === p ? s.selected : ""}
                        onClick={setCurrentPageHandler}
                    >{p} </span>
                })}
            </div>
            {props.users.map(u => {
                const onFollowHandler = () => {
                    props.follow(u.id)
                }
                const onUnfollowHandler = () => {
                    props.unfollow(u.id)
                }

                return (
                    <div className={s.userContain} key={u.id}>

                        <div className={s.userImg}>
                            <NavLink to={'/profile/' + u.id} >
                                <div>
                                    <img src={u.photos.small !== null ? u.photos.small : userPhoto} />
                                </div>
                            </NavLink>
                            <div>
                                {u.followed
                                    ?
                                    <button onClick={onUnfollowHandler}>Unfollow</button>
                                    :
                                    <button onClick={onFollowHandler}>Follow</button>}
                            </div>
                        </div>

                        <div className={s.textContain}>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                            <div>{'u.location.country'}</div>
                            <div>{'u.location.city'}</div>
                        </div>
                    </div>)
            })}
        </div>)
}





