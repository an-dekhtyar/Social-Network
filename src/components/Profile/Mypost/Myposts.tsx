import s from "./Myposts.module.css"
import React, {ChangeEvent, RefObject} from "react";
import Post from "./Post/Post";
import {ActionsTypes, PostType} from "../../../redux/state";
import {AddPostCreator, ChangePostCreator} from "../../../redux/profileReducer";

type MypostPropsType ={
    posts:Array<PostType>
    newTextPostValue:string
    dispatch:(action:ActionsTypes)=>void
}


const Myposts:React.FC<MypostPropsType> = (props) => {

    let postElements = props.posts.map(p => <Post key={p.id} id ={p.id} message={p.message} likesAmount={p.likesAmount} urlImage={p.urlImage}/> )


    const newPostHandler = () => {
        let newPostElement= props.newTextPostValue
        if(newPostElement) {
            props.dispatch(AddPostCreator(newPostElement))
        }
    }

    const onChangePostHandler = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.dispatch(ChangePostCreator(e.currentTarget.value))
    }



    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.newTextPostValue}
                              onChange={onChangePostHandler}
                    />
                </div>
                <div>
                    <button onClick={newPostHandler} >Add post</button>
                </div>
            </div>

            <div className={s.posts}>
                {postElements}
            </div>
        </div>)
}

export default Myposts