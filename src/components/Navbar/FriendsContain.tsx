import { connect } from "react-redux";
import { SideBarType } from "../../redux/navbarReducer";
import { AppStateType } from "../../redux/redux-store";
import {Friends} from "./Friends"


export type mapStatePropsType = {
    sideBarState:SideBarType
}

const mapStateToProps = (state:AppStateType):mapStatePropsType => {
    return {
        sideBarState:state.sideBarState
    }
}

export const FriendContain = connect(mapStateToProps)(Friends)
