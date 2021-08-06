import s from "./Post.module.css";
import React from "react";
import userIcon from '../../../../assets/images/user.png'
import deleteIcon from '../../../../assets/images/delete.png'
import likeIcon from '../../../../assets/images/like.png'
import jpg from '../../../../assets/images/like.jpg'


type PostPropsType = {
    id: number
    message: string
    likesAmount: number
    userPhoto: null | string
    isAuth: boolean
    userName: string
    deletePost: (id: number) => void
}


export const Post: React.FC<PostPropsType> = (props) => {

    const photo = {
        backgroundImage: `url(${props.userPhoto ? props.userPhoto : userIcon})`
    }
    const deleteI = {
        backgroundImage: `url(${deleteIcon})`
    }
    const like = {
        backgroundImage: `url(${likeIcon})`
    }

    const onClickHandler = () => {
        props.deletePost(props.id)
    }

    return (
        <div className={s.item}>
            <div className={s.header}>
                <div className={s.photoAndName}>
                    <div className={s.userPhoto} style={photo}/>
                    <div className={s.userName}>{props.userName}</div>

                </div>
                    <div onClick={onClickHandler} className={s.deleteButton} style={deleteI}/>
                </div>
            <div className={s.text}>
                {props.message}
            </div>
                <div className={s.likes}>
                    <div className={s.like} style={like}/>
                    <span >{props.likesAmount}</span>
                </div>
            </div>
            )
            }