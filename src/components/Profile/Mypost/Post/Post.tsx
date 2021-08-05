import s from "./Post.module.css";
import React from "react";
import userIcon from '../../../../assets/images/user.png'
import deleteIcon from '../../../../assets/images/delete.png'


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
                {props.message}
                <div>
                    <span>like</span>
                    <span> {props.likesAmount}</span>
                </div>
            </div>
            )
            }