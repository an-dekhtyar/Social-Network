import React from "react";
import { connect } from "react-redux";
import Profile from './Profile'
import {getUserStatus, ProfileType, selectUser, updatePhoto, updateUserStatus} from '../../redux/profileReducer'
import { AppStateType } from "../../redux/redux-store";
import { withRouter } from "react-router";
import {Redirect, RouteComponentProps} from "react-router-dom";
import { compose } from "redux";

export type mapDispatchPropsProfileType = {
    selectUser:(userId:number)=>void
    getUserStatus:(userId:number)=>void
    updateUserStatus:(status:string)=>void
    updatePhoto:(newPhoto:object)=>void
}
export type mapStatePropsProfileType = {
    profile:ProfileType | null
    isAuth:boolean
    status:string
    authorizedUserId:number | null
    editMode:boolean
    logInSuccess:boolean
}
type PathParamType = {
    userId:string
}
export type ProfileContainerType = mapDispatchPropsProfileType & mapStatePropsProfileType
type PropsType = RouteComponentProps<PathParamType> & ProfileContainerType



class ProfileContainer extends React.Component <PropsType> {

    refreshProfile () {
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

    componentDidMount () {
        this.refreshProfile()
    }
    componentDidUpdate(prevProps: Readonly<PropsType>, prevState: Readonly<{}>, snapshot?: any) {
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refreshProfile()
        }

    }

    render () {
        if (this.props.logInSuccess) return <Redirect to='/login' />
        return (
            <Profile
                isOwner={!this.props.match.params.userId}
                profile={this.props.profile}
                status={this.props.status}
                updateUserStatus={this.props.updateUserStatus}
                updatePhoto={this.props.updatePhoto}
                editMode={this.props.editMode}
            />

        )
    }
}


const mapStateToProps = (state:AppStateType):mapStatePropsProfileType =>({
    profile:state.profilePageState.profile,
    isAuth:state.authUserData.isAuth,
    logInSuccess:state.authUserData.logInSuccess,
    status:state.profilePageState.status,
    authorizedUserId:state.authUserData.id,
    editMode:state.profilePageState.editMode
})

export default compose<React.ComponentType>(
    connect(mapStateToProps, {selectUser, getUserStatus, updateUserStatus, updatePhoto}),
    withRouter,
    //withAuthRedirect
)(ProfileContainer)


