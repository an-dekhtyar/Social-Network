import React from "react";
import { connect } from "react-redux";
import Profile from './Profile'
import {getUserStatus, ProfileType, selectUser, setUserProfile} from '../../redux/profileReducer'
import { AppStateType } from "../../redux/redux-store";
import { withRouter } from "react-router";
import {RouteComponentProps} from "react-router-dom";
import { compose } from "redux";

export type mapDispatchPropsProfileType = {
    selectUser:(userId:string)=>void
    getUserStatus:(userId:string)=>void
}
export type mapStatePropsProfileType = {
    profile:ProfileType | null
    isAuth:boolean
    status:string | null
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
            userId = '2'
        }
        this.props.selectUser(userId)
        this.props.getUserStatus(userId)
    }

    render () {
        debugger
       // if (!this.props.isAuth) return <Redirect to='/login' />
        return (
            <Profile profile={this.props.profile} status={this.props.status} />
        )
    }
}


const mapStateToProps = (state:AppStateType):mapStatePropsProfileType =>({
    profile:state.profilePageState.profile,
    isAuth:state.authUserData.isAuth,
    status:state.profilePageState.status
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {selectUser, getUserStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)


