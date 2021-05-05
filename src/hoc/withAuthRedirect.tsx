import React, {ComponentType} from "react"
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/redux-store";

type mapStatePropsType = {
    isAuth:boolean
}

const mapStateToProps = (state:AppStateType):mapStatePropsType => ({
    isAuth:state.authUserData.isAuth
})

export function withAuthRedirect<T>(Component:ComponentType<T>) {

  const  RedirectComponent = (props:mapStatePropsType) => {
    let {isAuth, ...restProps} = props
    if (!isAuth) return <Redirect to='/login' />

      return <Component {...restProps as T}/>
  }
  let withConnectRedirectComponent = connect(mapStateToProps)(RedirectComponent)

  return withConnectRedirectComponent
}