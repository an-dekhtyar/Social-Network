import React from "react";
import { addPost, ProfilePageType } from "../../../redux/profileReducer";
import Myposts from "./Myposts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";




export type mapStatePropsType = {
    profilePageState: ProfilePageType
}
export type mapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        profilePageState: state.profilePageState
    }
}

export const MypostsContain = connect(mapStateToProps, {
    addPost,
})(Myposts)
