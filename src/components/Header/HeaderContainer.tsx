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

export const HeaderContain = connect((state:AppStateType):mapStateToProps => {
    return {
        userPhoto:state.authUserData.authUserPhoto,
        isAuth: state.authUserData.isAuth,
    }
}, {logout})(HeaderContainer)