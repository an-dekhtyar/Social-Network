import React from "react";
import s from "../Dialogs.module.css";
import {NavLink} from "react-router-dom";
import { DialogItemType } from "../../../redux/dialogReducer";




const DialogItem:React.FC<DialogItemType> = (props) => {
    let path = "/dialogs/" + props.id
    return (

        <div className={s.dialog}>
            <NavLink to={path} activeClassName={s.active}>
                <img src={props.urlImage}/>
                {props.name}
            </NavLink>

        </div>
    )
}

export default DialogItem