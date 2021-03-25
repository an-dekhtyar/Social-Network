import React from "react";
import { connect } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { SideBarType } from "../../redux/store";
import {Friends} from "./Friends"


export type mapStatePropsType = {
    sideBarState:SideBarType
}

const mapStateToProps = (state:AppStateType):mapStatePropsType => {
    return {
        sideBarState:state.sideBarState
    }
}

export const FriendsContain = connect(mapStateToProps)(Friends)
