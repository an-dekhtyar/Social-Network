import React from "react";
import {addPost, deletePost, PostType} from "../../../redux/profileReducer";
import Myposts from "./Myposts";
import { connect } from "react-redux";
import { AppStateType } from "../../../redux/redux-store";
import { Dispatch } from "redux";




export type mapStatePropsType = {
    posts:PostType[]
    userPhoto:string | null
    isAuth:boolean
    userName:string
}
export type mapDispatchPropsType = {
    addPost: (newPostText: string) => void
    deletePost: (id:number) => void
}

const mapStateToProps = (state: AppStateType): mapStatePropsType => {
    if (state.profilePageState.profile) {
        return {
            posts: state.profilePageState.posts,
            userPhoto:state.profilePageState.profile.photos.large ,
            userName:state.profilePageState.profile.fullName,
            isAuth: state.authUserData.isAuth
        }
    } else {
        return {
            posts: state.profilePageState.posts,
            userPhoto:null ,
            userName:'',
            isAuth: state.authUserData.isAuth
        }
    }

}
const mapDispatchProps = (dispatch:Dispatch): mapDispatchPropsType => {
    return {
        addPost: (newPostText) => dispatch(addPost(newPostText)),
        deletePost: (id:number) =>dispatch(deletePost(id))
    }
}

export const MypostsContain = connect(mapStateToProps, mapDispatchProps)(React.memo(Myposts))
