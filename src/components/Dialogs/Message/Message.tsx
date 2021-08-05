import React from "react";
import { MessageType } from "../../../redux/dialogReducer";
import s from "../Dialogs.module.css";






export const InMessage:React.FC<MessageType> = (props) => {
    return (
        <div className={s.containera}>
            <div className={s.inMessageContain}>
                <div className={s.messageStyle}>
                    {props.message}
                </div>
            </div>
        </div>
    )
}

export const OutMessage:React.FC<MessageType> = (props) => {
    return (
        <div className={s.containerb}>
            <div className={s.outMessageContain}>
                <div className={s.messageStyle}>
                    {props.message}
                </div>
            </div>
        </div>
    )
}




