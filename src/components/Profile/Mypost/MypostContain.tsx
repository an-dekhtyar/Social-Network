import React, {ChangeEvent, RefObject} from "react";
import { StoreType} from "../../../redux/store";
import {AddPostCreator, ChangePostCreator} from "../../../redux/profileReducer";
import Myposts from "./Myposts";

type MypostContainPropsType = {
    store: StoreType
}

export const MypostsContain:React.FC<MypostContainPropsType> = (props) => {


    const state = props.store.getState().profilePageState

    const addNewPost = (newPostText:string) => {
            props.store.dispatch(AddPostCreator(newPostText))
        }


    const onChangePost = (newPostElement:string)=>{
        props.store.dispatch(ChangePostCreator(newPostElement))
    }



    return (
        <div>
         <Myposts
             posts={state.posts}
             newTextPostValue={state.newTextPostValue}
             addNewPost={addNewPost}
             onChangePost={onChangePost}
         />
        </div>)
}

