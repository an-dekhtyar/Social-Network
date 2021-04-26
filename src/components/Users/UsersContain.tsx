import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import {
    follow,
    unfollow,
    UserItemType,
    getUsers, changeUsersPage
} from '../../redux/usersReducer';
import {Users} from "./Users";
import { Preloader } from '../../common/Preloader';



export type mapStatePropsType = {
    users:Array<UserItemType>
    currentPage:number
    totalCount:number
    pageSize:number
    isFetching:boolean
    followingInProgress:number[]
}
export type mapDispatchPropsType = {
    follow:(userId:number)=>void
    unfollow:(userId:number)=>void


    getUsers:(currentPage: number, pageSize: number) => void
    changeUsersPage:(page:number, pageSize:number) =>void
}
export type UsersPageTPropsType = mapStatePropsType & mapDispatchPropsType

class UsersContain extends React.Component<UsersPageTPropsType> {


    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChange = (page: number) =>{
        this.props.changeUsersPage(page, this.props.pageSize)
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
                followingInProgress={this.props.followingInProgress}
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
        isFetching:state.usersPageState.isFetching,
        followingInProgress:state.usersPageState.followingInProgress
    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    getUsers,
    changeUsersPage
}) (UsersContain)
