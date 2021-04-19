import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import Profile from './Profile'
import {ProfileType, setUserProfile} from '../../redux/profileReducer'
import { AppStateType } from "../../redux/redux-store";
import { withRouter } from "react-router";
import { RouteComponentProps } from "react-router-dom";
import { profileAPI} from "../../api/api";

export type mapDispatchPropsProfileType = {
    setUserProfile:(profile:ProfileType)=>void
}
export type mapStatePropsProfileType = {
    profile:ProfileType | null
}
type PathParamType = {
    userId:string
}
export type ProfileContainerType = mapDispatchPropsProfileType & mapStatePropsProfileType
type PropsType = RouteComponentProps<PathParamType> & ProfileContainerType



class ProfileContainer extends React.Component <PropsType> {

    componentDidMount () {
        let userId = this.props.match.params.userId

        profileAPI.selectUser(userId).then(data => {
            this.props.setUserProfile(data)
        })
    }

    render () {
        return (
            <Profile profile={this.props.profile} />
        )
    }
}


const mapStateToProps = (state:AppStateType):mapStatePropsProfileType =>({
    profile:state.profilePageState.profile
})

let WithUrlDataContainerComponent = withRouter(ProfileContainer)

export default connect (mapStateToProps, {setUserProfile})(WithUrlDataContainerComponent)



