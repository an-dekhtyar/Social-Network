import React from 'react';
import preloaderGif from '../assets/preloader/preloader.gif'
import s from './Preloader.module.css'

export const Preloader = () => {

    const preloader = {
        backgroundImage:`url(${preloaderGif})`
    }

    return(
        <div className={s.preloaderContain}>
            <div className={s.preloader} style={preloader}/>
        </div>
    )

}
