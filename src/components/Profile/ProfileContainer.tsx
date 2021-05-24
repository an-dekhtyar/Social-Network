import React from "react";
import { connect } from "react-redux";
import Profile from './Profile'
import {getUserStatus, ProfileType, selectUser, updateUserStatus} from '../../redux/profileReducer'
import { AppStateType } from "../../redux/redux-store";
import { withRouter } from "react-router";
import {RouteComponentProps} from "react-router-dom";
import { compose } from "redux";

export type mapDispatchPropsProfileType = {
    selectUser:(userId:number)=>void
    getUserStatus:(userId:number)=>void
    updateUserStatus:(status:string)=>void
}
export type mapStatePropsProfileType = {
    profile:ProfileType | null
    isAuth:boolean
    status:string
    authorizedUserId:number | null
}
type PathParamType = {
    userId:string
}
export type ProfileContainerType = mapDispatchPropsProfileType & mapStatePropsProfileType
type PropsType = RouteComponentProps<PathParamType> & ProfileContainerType



 class ProfileContainer extends React.Component <PropsType> {

    componentDidMount () {
        let userId = Number(this.props.match.params.userId)
        if(!userId) {
            userId = Number(this.props.authorizedUserId)
            if (!userId) {
                this.props.history.push('/login')
            }
        }
        this.props.selectUser(Number(userId))
        this.props.getUserStatus(Number(userId))
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
    status:state.profilePageState.status,
    authorizedUserId:state.authUserData.id,

})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {selectUser, getUserStatus, updateUserStatus}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)


