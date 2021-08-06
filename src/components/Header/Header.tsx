import React from "react";
import s from './Header.module.css'
import {NavLink, useLocation} from "react-router-dom";
import cn from "classnames";
import logoImage from '../../assets/images/logo.png'
import logOutImage from '../../assets/images/logout.jpg'
import userImage from '../../assets/images/user.png'


export const backgroundImageHelper = (image:string | null) => {

    if (image) {
        return   { backgroundImage: `url(${image})`}
    } else {
        return   { backgroundImage: `url(${userImage})`}
    }
}



type HeaderPropsType = {
    userPhoto: string | null
    isAuth: boolean
    logout: () => void
}

const Header = (props: HeaderPropsType) => {

    const params = useLocation().pathname

    const logoutHandler = () => {
        props.logout()
    }
    console.log(props.userPhoto)

    return (
        <header className={s.header}>
            <div className={s.logo} style={backgroundImageHelper(logoImage)}/>
            <div className={s.loginBlock}>
                {props.isAuth
                    ?
                    <NavLink to='/profile'>
                    <div>
                        <span className={s.userImage} style={backgroundImageHelper(props.userPhoto)}/>
                        <span className={s.logOut} style={backgroundImageHelper(logOutImage)} onClick={logoutHandler}/>
                    </div>
                    </NavLink>
                        :

                    <NavLink to='/login'>
                        <div className={cn(s.button, {[s.hide]: params === '/login'}, '')}>
                            Sing In
                    </div>
                    </NavLink>
                }
            </div>
        </header>)
}

export default Header