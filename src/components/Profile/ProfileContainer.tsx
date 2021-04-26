import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Profile from './Profile'
import {ProfileType, selectUser, setUserProfile} from '../../redux/profileReducer'
import { AppStateType } from "../../redux/redux-store";
import { withRouter } from "react-router";
import {Redirect, RouteComponentProps} from "react-router-dom";
import { profileAPI} from "../../api/api";

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
        if (!this.props.isAuth) return <Redirect to='/login' />
        return (
            <Profile profile={this.props.profile} />
        )
    }
}


const mapStateToProps = (state:AppStateType):mapStatePropsProfileType =>({
    profile:state.profilePageState.profile,
    isAuth:state.authUserData.isAuth
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect (mapStateToProps, {selectUser})(WithUrlDataContainerComponent)



