import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {InMessage, OutMessage} from './Message/Message';
import { mapDispatchToPropsType, MapStatePropsType } from './DialogsContain';
import { Redirect } from 'react-router-dom';


type DialogsPropsType = MapStatePropsType & mapDispatchToPropsType


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let outMessagesElements = props.dialogsPageState.outMessages.map(m =>
        <OutMessage key={m.id} message={m.message} id={m.id}/>)
    let inMessagesElement = props.dialogsPageState.inMessages.map(m =>
        <InMessage key={m.id} message={m.message} id={m.id}/>)
    let dialogElements = props.dialogsPageState.dialogs.map(d =>
        <DialogItem key={d.id} id={d.id} name={d.name} urlImage={d.urlImage}/>)


    const addOutMessageHandler = () => {
        let newMessage = props.dialogsPageState.newOutMessageText
        if (newMessage) {
            props.addMessage(newMessage)
        }
    }

    const outMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.changeMessage(e.currentTarget.value)
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
                    <textarea value={props.dialogsPageState.newOutMessageText} onChange={outMessageChangeHandler}
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