import React from 'react';
import {setUsersAC} from '../../redux/usersReducer';
import s from './User.module.css'
import {mapDispatchPropsType, mapStatePropsType} from './UsersContain';


export type UsersPageTPropsType = mapStatePropsType & mapDispatchPropsType

export const Users: React.FC<UsersPageTPropsType> = (props) => {

    const users = props.users.map(u => {

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
                        <img src={u.urlImage}/>
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
                    <div>{u.fullName}</div>
                    <div>{u.status}</div>
                    <div>{u.location.country}</div>
                    <div>{u.location.city}</div>
                </div>
            </div>)
    })


return (
    <div>
        {users}
    </div>
)

}