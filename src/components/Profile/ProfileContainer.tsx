import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Profile from './Profile'
import {ProfileType, selectUser, setUserProfile} from '../../redux/profileReducer'
import { AppStateType } from "../../redux/redux-store";
import { withRouter } from "react-router";
import {Redirect, RouteComponentProps} from "react-router-dom";
import { profileAPI} from "../../api/api";
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import { compose } from "redux";

export type mapDispatchPropsProfileType = {
    selectUser:(userId:string)=>void
}
export type mapStatePropsProfileType = {
    profile:ProfileType | null
    isAuth:boolean
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

    }

    render () {
        debugger
       // if (!this.props.isAuth) return <Redirect to='/login' />
        return (
            <Profile profile={this.props.profile} />
        )
    }
}


const mapStateToProps = (state:AppStateType):mapStatePropsProfileType =>({
    profile:state.profilePageState.profile,
    isAuth:state.authUserData.isAuth
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {selectUser}),
    withRouter,
    withAuthRedirect
)(ProfileContainer)


