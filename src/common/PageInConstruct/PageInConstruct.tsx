import backgroundImage from "../../assets/images/construction.png";
import React from "react";
import s from './PageInConstruct.module.css'

export const PageInConstruct = () => {

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