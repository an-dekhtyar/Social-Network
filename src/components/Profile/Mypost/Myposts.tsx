import s from "./Myposts.module.css"
import React, {ChangeEvent} from "react";
import Post from "./Post/Post";
import { mapDispatchPropsType, mapStatePropsType } from "./MypostContain";

type MypostPropsType = mapStatePropsType & mapDispatchPropsType


const Myposts:React.FC<MypostPropsType> = (props) => {

    let postElements = props.profilePageState.posts.map(p => <Post key={p.id} id ={p.id} message={p.message} likesAmount={p.likesAmount} urlImage={p.urlImage}/> )


    const newPostHandler = () => {
        let newPostElement= props.profilePageState.newTextPostValue
        if(newPostElement) {
            props.addPost(newPostElement)
        }
    }

    const onChangePostHandler = (e:ChangeEvent<HTMLTextAreaElement>)=>{
        props.changePost(e.currentTarget.value)
    }



    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <div>
                    <textarea value={props.profilePageState.newTextPostValue}
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