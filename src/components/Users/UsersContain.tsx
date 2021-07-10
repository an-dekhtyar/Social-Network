import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/redux-store';
import {
    follow,
    unfollow,
    UserItemType,
    requestUsers, changeUsersPage
} from '../../redux/usersReducer';
import {Users} from "./Users";
import { Preloader } from '../../common/Preloader';
import {getCurrentPage, getFollowInProgresValue, getIsFetchingValue, getPageSize, getTotalCount, getUsers} from '../../selectors/users-selector'


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


    requestUsers:(currentPage: number, pageSize: number) => void
    changeUsersPage:(page:number, pageSize:number) =>void
}
export type UsersPageTPropsType = mapStatePropsType & mapDispatchPropsType

class UsersContain extends React.Component<UsersPageTPropsType> {


    componentDidMount() {
        const {currentPage, pageSize} = this.props
        this.props.requestUsers(currentPage, pageSize)
    }

    onPageChange = (page: number) =>{
        const {pageSize} = this.props
        this.props.changeUsersPage(page, pageSize)
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
        users:getUsers(state),
        currentPage:getCurrentPage(state),
        totalCount:getTotalCount(state),
        pageSize:getPageSize(state),
        isFetching:getIsFetchingValue(state),
        followingInProgress:getFollowInProgresValue(state)
    }
}


export default connect(mapStateToProps, {
    follow,
    unfollow,
    requestUsers,
    changeUsersPage
}) (UsersContain)
