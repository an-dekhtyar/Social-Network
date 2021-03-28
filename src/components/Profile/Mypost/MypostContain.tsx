import React, { ChangeEvent, RefObject } from "react";

import { AddPostCreator, ChangePostCreator, ProfilePageType } from "../../../redux/profileReducer";
import Myposts from "./Myposts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";



export type mapStatePropsType = {
    profilePageState: ProfilePageType
}
export type mapDispatchPropsType = {
    addNewPost: (newPostText: string) => void
    onChangePost: (newPostElement: string) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        profilePageState: state.profilePageState
    }
}

const mapDispatcToProps = (dispatch: Dispatch): mapDispatchPropsType => {
    return {
        addNewPost: (newPostText: string) => { dispatch(AddPostCreator(newPostText)) },
        onChangePost: (newPostElement: string) => { dispatch(ChangePostCreator(newPostElement)) }
    }
}

export const MypostsContain = connect(mapStateToProps, mapDispatcToProps)(Myposts)
