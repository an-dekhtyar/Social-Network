import React from 'react';
import {AxiosUsersResponceType, setUsersAC, UserItemType} from '../../redux/usersReducer';
import s from './User.module.css'
import {mapDispatchPropsType, mapStatePropsType} from './UsersContain';
import axios, {AxiosResponse} from 'axios'
import userPhoto from '../../assets/images/userPhoto.png'


export type UsersPageTPropsType = mapStatePropsType & mapDispatchPropsType

export const Users: React.FC<UsersPageTPropsType> = (props) => {

    const getUser = () => {
        if (props.users.length === 0) {
            axios.get('https://social-network.samuraijs.com/api/1.0/users').then((response: AxiosResponse<AxiosUsersResponceType>) => {
                props.setUsers(response.data.items)
            })
        }
    }
    const users = props.users.map(u => {
        debugger
        const onFollowHandler = () => {
            props.follow(u.id)
        }
        const onUnfollowHandler = () => {
            props.unfollow(u.id)
        }

        return (
            <div className={s.userContain} key={u.id}>
                <div className={s.userImg}>
                    <div>
                        <img src={u.photos.small !== null ? u.photos.small : userPhoto }/>
                    </div>
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
    })


    return (
        <div>
            <button onClick={getUser}>add users</button>
            {users}
        </div>
    )

}