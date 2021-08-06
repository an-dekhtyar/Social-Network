import React from "react";
import s from './NoPostYet.module.css'
import post from '../../../assets/images/post.png'

const postImg = {
    backgroundImage:`url(${post})`
}

export const NoPostYet = () => {
    return(
        <div className={s.noPostYetContainer}>
            <div className={s.image} style={postImg}/>
            <div className={s.message}>User doesn't have any content</div>
        </div>

    )
}
