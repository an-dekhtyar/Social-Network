import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import {
    follow,
    setCurrentPage,
    setTotalCount,
    setUsers,
    unfollow,
    UserItemType,
    toggleIsFetching
} from '../../redux/usersReducer';
import {Users} from "./Users";
import {userAPI} from '../../api/api'

import { Preloader } from '../../common/Preloader';


export type mapStatePropsType = {
    users:Array<UserItemType>
    currentPage:number
    totalCount:number
    pageSize:number
    isFetching:boolean
}
export type mapDispatchPropsType = {
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void
    setUsers:(users:Array<UserItemType>)=>void
    setCurrentPage:(currentPage:number)=>void
    setTotalCount:(totalCount:number)=>void
    toggleIsFetching:(isFetching:boolean)=>void
}
export type UsersPageTPropsType = mapStatePropsType & mapDispatchPropsType

class UsersContain extends React.Component<UsersPageTPropsType> {


    componentDidMount() {
        this.props.toggleIsFetching(true)


        userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
            this.props.setTotalCount(data.totalCount)
        })

    }

    onPageChange = (page: number) =>{
        this.props.toggleIsFetching(true)
        this.props.setCurrentPage(page)

        userAPI.changeUsersPage(page,this.props.pageSize).then(data => {
            this.props.toggleIsFetching(false)
            this.props.setUsers(data.items)
        })
    }

    render() {

        return <>
            {this.props.isFetching ? <Preloader/> : null}
            <Users
                totalCount={this.props.totalCount}
                pageSize={this.props.pageSize}
                onPageChange={this.onPageChange}
                currentPage={this.props.currentPage}
                users={this.props.users}
                follow={this.props.follow}
                unfollow={this.props.unfollow}
                isFetching={this.props.isFetching}
            />
        </>
    }
}

const mapStateToProps = (state:AppStateType):mapStatePropsType => {
    return {
        users:state.usersPageState.users,
        currentPage:state.usersPageState.currentPage,
        totalCount:state.usersPageState.totalCount,
        pageSize:state.usersPageState.pageSize,
        isFetching:state.usersPageState.isFetching
    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    setUsers,
    setCurrentPage,
    setTotalCount,
    toggleIsFetching
}) (UsersContain)
