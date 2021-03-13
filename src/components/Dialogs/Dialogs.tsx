import React, {ChangeEvent, RefObject} from 'react';
import s from './Dialogs.module.css'
import {NavLink} from "react-router-dom";
import DialogItem from "./DialogItem/DialogItem";
import {ActionsTypes,DialogPageType} from "../../redux/state";
import {InMessage, OutMessage} from './Message/Message';
import {AddOutMessageCreator, ChangeOutMessageCreator} from "../../redux/dialogReducer";


type DialogsPropsType = {
    dialogsPageState: DialogPageType
    newOutMessageText: string
    dispatch: (action: ActionsTypes) => void
}


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let outMessagesElements = props.dialogsPageState.outMessages.map(m =>
        <OutMessage key={m.id} message={m.message} id={m.id}/>)
    let inMessagesElement = props.dialogsPageState.inMessages.map(m =>
        <InMessage key={m.id} message={m.message} id={m.id}/>)
    let dialogElements = props.dialogsPageState.dialogs.map(d =>
        <DialogItem key={d.id} id={d.id} name={d.name} urlImage={d.urlImage}/>)


    const addOutMessageHandler = () => {
        let newMessage = props.newOutMessageText
        if (newMessage) {
            props.dispatch(AddOutMessageCreator(newMessage))
        }
    }

    const outMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.dispatch(ChangeOutMessageCreator(e.currentTarget.value))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogElements}
            </div>
            <div className={s.messages}>
                {inMessagesElement}
                {outMessagesElements}
                <div className={s.dialogTextArea}>
                    <textarea value={props.newOutMessageText} onChange={outMessageChangeHandler}
                              placeholder={"Enter your message "}/>
                    <div>
                        <button onClick={addOutMessageHandler}>Send</button>
                    </div>
                </div>
            </div>

        </div>
    )


}


export default Dialogs