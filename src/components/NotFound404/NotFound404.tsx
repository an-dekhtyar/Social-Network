import backgroundImage from "../../assets/images/404.png";
import React from "react";
import s from './NotFound404.module.css'

export const NotFound = () => {

    const image = {
        backgroundImage:`url(${backgroundImage})`
    }
    return(
        <div className={s.container} >
            <div className={s.imageContainer}>
                <div className={s.image} style={image}/>
            </div>
        </div>
    )

}