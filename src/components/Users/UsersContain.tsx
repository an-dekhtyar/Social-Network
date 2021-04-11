import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import {
    AxiosUsersResponceType,
    followAC,
    setCurrentPageAC,
    setTotalCountAC,
    setUsersAC,
    unfollowAC,
    UserItemType
} from '../../redux/usersReducer';
import axios, {AxiosResponse} from "axios";
import {Users} from "./Users";


export type mapStatePropsType = {
    users:Array<UserItemType>
    currentPage:number
    totalCount:number
    pageSize:number
}
export type mapDispatchPropsType = {
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void
    setUsers:(users:Array<UserItemType>)=>void
    setCurrentPage:(currentPage:number)=>void
    setTotalCount:(totalCount:number)=>void
}
export type UsersPageTPropsType = mapStatePropsType & mapDispatchPropsType

class UsersContain extends React.Component<UsersPageTPropsType> {


    componentDidMount() {

        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
                this.props.setTotalCount(response.data.totalCount)
            })

    }

    onPageChange = (page: number) =>{
        this.props.setCurrentPage(page)
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                this.props.setUsers(response.data.items)
            })
    }

    render() {

        return (
            <Users
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                onPageChange={this.onPageChange}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}

            />
        )
    }
}

const mapStateToProps = (state:AppStateType):mapStatePropsType => {
    return {
        users:state.usersPageState.users,
        currentPage:state.usersPageState.currentPage,
        totalCount:state.usersPageState.totalCount,
        pageSize:state.usersPageState.pageSize
    }
}
const mapDispatchToProps = (dispatch:Dispatch):mapDispatchPropsType => {
    return {
        follow:(userId:number)=>{
            dispatch(followAC(userId))
        },
        unfollow:(userId:number)=>{dispatch(unfollowAC(userId))},
        setUsers:(users:Array<UserItemType>)=>{dispatch(setUsersAC(users))},
        setCurrentPage:(currentPage:number)=>{dispatch(setCurrentPageAC(currentPage))},
        setTotalCount:(totalCount:number)=>{dispatch(setTotalCountAC(totalCount))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (UsersContain)
