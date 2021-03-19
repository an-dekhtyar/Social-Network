import s from "./Post.module.css";
import React from "react";
import { PostType } from "../../../../redux/store";






const Post:React.FC<PostType> = (props) => {
    return (
        <div className={s.item}>
            <img src={props.urlImage}/>
            {props.message}
            <div>
                <span>like</span>
                <span> {props.likesAmount}</span>
            </div>
        </div>)
}

export default Post