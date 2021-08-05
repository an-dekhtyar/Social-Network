import React from "react";
import { connect } from "react-redux";
import Header from "./Header"
import { AppStateType } from "../../redux/redux-store";
import {logout} from "../../redux/auth-reducer";


type mapStateToProps = {
    userPhoto:string | null
    isAuth: boolean
}
type mapDispatchToProps = {
    logout:()=>void
}

type HeaderContainerType = mapStateToProps & mapDispatchToProps

class HeaderContainer extends React.Component<HeaderContainerType> {

    render(){
        return <Header isAuth={this.props.isAuth} userPhoto={this.props.userPhoto} logout={this.props.logout} />
    }
}

let mapStateToProps = (state:AppStateType):mapStateToProps => {
    if (state.profilePageState.profile) {
        return {
            userPhoto:state.profilePageState.profile.photos.large ,
            isAuth: state.authUserData.isAuth
        }
    } else {
        return {
            userPhoto:null ,
            isAuth: state.authUserData.isAuth
        }
    }

}


export default connect(mapStateToProps, {logout})(HeaderContainer)