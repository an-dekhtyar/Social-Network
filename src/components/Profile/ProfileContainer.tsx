import React from "react";
import { connect } from "react-redux";
import Profile from './Profile'
import {getUserStatus, ProfileType, selectUser, updateUserStatus} from '../../redux/profileReducer'
import { AppStateType } from "../../redux/redux-store";
import { withRouter } from "react-router";
import {RouteComponentProps} from "react-router-dom";
import { compose } from "redux";

export type mapDispatchPropsProfileType = {
    selectUser:(userId:string)=>void
    getUserStatus:(userId:string)=>void
    updateUserStatus:(status:string)=>void
}
export type mapStatePropsProfileType = {
    profile:ProfileType | null
    isAuth:boolean
    status:string
}
type PathParamType = {
    userId:string
}
export type ProfileContainerType = mapDispatchPropsProfileType & mapStatePropsProfileType
type PropsType = RouteComponentProps<PathParamType> & ProfileContainerType



class ProfileContainer extends React.Component <PropsType> {

    componentDidMount () {
        let userId = this.props.match.params.userId
        if(!userId) {
            userId = '16011'
        }
        this.props.selectUser(userId)
        this.props.getUserStatus(userId)
    }

    render () {
       // if (!this.props.isAuth) return <Redirect to='/login' />
        return (
            <Profile profile={this.props.profile} status={this.props.status} updateUserStatus={this.props.updateUserStatus}/>
        )
    }
}


const mapStateToProps = (state:AppStateType):mapStatePropsProfileType =>({
    profile:state.profilePageState.profile,
    isAuth:state.authUserData.isAuth,
    status:state.profilePageState.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {selectUser, getUserStatus, updateUserStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)


