import React from "react";
import { connect } from "react-redux";
import Header from "./Header"
import { AppStateType } from "../../redux/redux-store";
import { AuthType, setAuthUserData} from "../../redux/auth-reducer";
import { authAPI } from "../../api/api";

type mapStateToProps = {
    login:string | null
    isAuth: boolean
}
type mapDispathToProps = {
    setAuthUserData:(data:AuthType)=>void
}

type HeaderContainerType = mapStateToProps & mapDispathToProps

class HeaderContainer extends React.Component<HeaderContainerType> {
    componentDidMount(){

        authAPI.getAuthUserData().then(data => {
            if (data.resultCode === 0) {
                this.props.setAuthUserData(data.data)
            }
        })
    }

    render(){
        return <Header isAuth={this.props.isAuth} login={this.props.login} />

    }
}

let mapStateToProps = (state:AppStateType):mapStateToProps => ({
    login:state.authUserData.login,
    isAuth: state.authUserData.isAuth
})


export default connect(mapStateToProps, {setAuthUserData})(HeaderContainer)