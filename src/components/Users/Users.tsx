import React from 'react';
import {UserItemType} from '../../redux/usersReducer';
import {Pagination} from './Pagination'
import {User} from './User'


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
}

export const Users = (props: UsersPagePropsType) => {
    let {totalCount,
        pageSize,
        onPageChange,
        currentPage,
        users,
        follow,
        unfollow,
        followingInProgress
    } = props

    return (
        <div>
            <Pagination totalCount={totalCount} pageSize={pageSize}
                        onPageChange={onPageChange} currentPage={currentPage}/>

            {users.map(u => <User key={u.id} user={u} follow={follow}
                                  unfollow={unfollow} followingInProgress={followingInProgress} />)}
        </div>)
}





