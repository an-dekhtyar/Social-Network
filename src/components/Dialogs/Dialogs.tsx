import React, {ChangeEvent} from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {DialogPageType} from "../../redux/store";
import {InMessage, OutMessage} from './Message/Message';


type DialogsPropsType = {
    dialogsPageState: DialogPageType
    newOutMessageText: string
    addOutMessage:(newMessageText:string) => void
    outMessageChange:(newTextElement:string) => void
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
            props.addOutMessage(newMessage)
        }
    }

    const outMessageChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        props.outMessageChange(e.currentTarget.value)
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