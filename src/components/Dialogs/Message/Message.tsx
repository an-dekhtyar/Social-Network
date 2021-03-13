import React from "react";
import s from "../Dialogs.module.css";
import {MessageType} from "../../../redux/state";


type MessagePropsType ={
    inMessages:Array<MessageType>
    outMessages:Array<MessageType>

}


export const InMessage:React.FC<MessageType> = (props) => {
    return (
        <div className={s.containera}>
        <div className={s.inMessageContain}>
            <div className={s.inMessage}>
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
            <div className={s.outMessage}>
                {props.message}
            </div>
        </div>
        </div>
    )
}




