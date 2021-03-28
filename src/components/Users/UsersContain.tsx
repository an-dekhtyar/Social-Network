import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { followAC, setUsersAC, unfollowAC, UserItemType } from '../../redux/usersReducer';
import { Users } from './Users';


export type mapStatePropsType = {
    users:Array<UserItemType>
}
export type mapDispatchPropsType = {
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void
    setUsers:(users:Array<UserItemType>)=>void
}

const mapStateToProps = (state:AppStateType):mapStatePropsType => {
    return {
        users:state.usersPageState.users
    }
}
const mapDispatchToProps = (dispatch:Dispatch):mapDispatchPropsType => {
    return {
        follow:(userId:number)=>{
            dispatch(followAC(userId))
        },
        unfollow:(userId:number)=>{dispatch(unfollowAC(userId))},
        setUsers:(users:Array<UserItemType>)=>{dispatch(setUsersAC(users))
        },

    }
}

export const UsersContain = connect(mapStateToProps, mapDispatchToProps) (Users)
