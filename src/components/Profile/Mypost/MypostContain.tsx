import React, { useMemo } from "react";
import { addPost, PostType, ProfilePageType } from "../../../redux/profileReducer";
import Myposts from "./Myposts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";




export type mapStatePropsType = {
    posts:PostType[]
}
export type mapDispatchPropsType = {
    addPost: (newPostText: string) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    return {
        posts: state.profilePageState.posts
    }
}
const mapDispatchProps = (dispatch:Dispatch): mapDispatchPropsType => {
    return {addPost: (newPostText) => dispatch(addPost(newPostText))}
}

export const MypostsContain = connect(mapStateToProps, mapDispatchProps)(React.memo(Myposts))
