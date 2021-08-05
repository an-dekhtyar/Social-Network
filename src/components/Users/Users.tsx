import React from 'react';
import {UserItemType} from '../../redux/usersReducer';
import {Pagination} from '../../common/Pagination/Pagination'
import {User} from './User'
import s from './User.module.css'
import {Preloader} from "../../common/Preloader";


type UsersPagePropsType = {
    totalCount: number
    pageSize: number
    onPageChange: (page: number) => void
    currentPage: number
    users: Array<UserItemType>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    isFetching: boolean
    followingInProgress: number[]
    isAuth:boolean
}

export const Users = (props: UsersPagePropsType) => {
    let {
        totalCount,
        pageSize,
        onPageChange,
        currentPage,
        users,
        follow,
        unfollow,
        followingInProgress,
        isAuth
    } = props

    return (
        <div className={s.userContainer}>
            <div className={s.usersHeader}>
                <h2 className={s.title}>Users</h2>
                <Pagination totalCount={totalCount} pageSize={pageSize}
                            onPageChange={onPageChange} currentPage={currentPage} portionSize={10}/>
            </div>
            {props.isFetching
                ? <div className={s.preloader}><Preloader/></div>
                : <div className={s.userList}>

                {users.map(u => <User key={u.id} user={u} follow={follow} isAuth={isAuth}
                                      unfollow={unfollow} followingInProgress={followingInProgress}/>)}
            </div>}

        </div>)
}





