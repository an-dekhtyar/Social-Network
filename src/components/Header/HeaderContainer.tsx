import React from "react";
import { connect } from "react-redux";
import Header from "./Header"
import { AppStateType } from "../../redux/redux-store";
import {authMe, logout,} from "../../redux/auth-reducer";


type mapStateToProps = {
    login:string | null
    isAuth: boolean
}
type mapDispatchToProps = {
    logout:()=>void
}

type HeaderContainerType = mapStateToProps & mapDispatchToProps

class HeaderContainer extends React.Component<HeaderContainerType> {

    render(){
        return <Header isAuth={this.props.isAuth} login={this.props.login} logout={this.props.logout} />

    }
}

let mapStateToProps = (state:AppStateType):mapStateToProps => ({
    login:state.authUserData.login,
    isAuth: state.authUserData.isAuth
})


export default connect(mapStateToProps, {logout})(HeaderContainer)