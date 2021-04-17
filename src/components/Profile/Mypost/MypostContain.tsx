import React, { ChangeEvent, RefObject } from "react";

import { addPost, changePost, ProfilePageType } from "../../../redux/profileReducer";
import Myposts from "./Myposts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";



export type mapStatePropsType = {
    profilePageState: ProfilePageType
}
export type mapDispatchPropsType = {
    addPost: (newPostText: string) => void
    changePost: (newPostElement: string) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        profilePageState: state.profilePageState
    }
}

export const MypostsContain = connect(mapStateToProps, {
    addPost,
    changePost
})(Myposts)
