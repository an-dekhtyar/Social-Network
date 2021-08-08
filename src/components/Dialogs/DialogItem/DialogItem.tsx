import React, {useEffect} from "react";
import s from "../Dialogs.module.css";
import {NavLink, useLocation} from "react-router-dom";

type DialogItemPropsType = {
    id: number
    name: string
    urlImage: string
    changeCollocutorHandler:(id:number | null) => void
}

const DialogItem: React.FC<DialogItemPropsType> = (props) => {
    let path = "/dialogs/" + props.id

    let url = useLocation<string>()
    let id = Number(url.pathname.split('/')[2])

    useEffect(()=>{
        if(url.pathname === '/dialogs') {
            props.changeCollocutorHandler(null)
        } else {
            props.changeCollocutorHandler(id)
        }
    },[url.pathname, id, props])
    const onClickHandler = () => {

    }

    return (
                <div className={s.dialog}>
                    <img alt={'userImg'} src={props.urlImage}/>
                    <NavLink to={path} activeClassName={s.active} onClick={onClickHandler}>
                        {props.name}
                    </NavLink>
                </div>


    )
}

export default DialogItem