import React from 'react';
import s from './Dialogs.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {InMessage, OutMessage} from './Message/Message';
import {mapDispatchToPropsType, MapStatePropsType} from './DialogsContain';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../common/formControl/FormControl";
import {MaxValueCreator, required} from "../../utils/validators/validators";


type DialogsPropsType = MapStatePropsType & mapDispatchToPropsType


const Dialogs: React.FC<DialogsPropsType> = (props) => {
    let outMessagesElements = props.dialogsPageState.outMessages.map(m =>
        <OutMessage key={m.id} message={m.message} id={m.id}/>)
    let inMessagesElement = props.dialogsPageState.inMessages.map(m =>
        <InMessage key={m.id} message={m.message} id={m.id}/>)
    let dialogElements = props.dialogsPageState.dialogs.map(d =>
        <DialogItem key={d.id} id={d.id} name={d.name} urlImage={d.urlImage}/>)


    const addMessage = (message:MessageFormType) => {
        if (message.messageText) {
            props.addMessage(message.messageText)
        }
        console.log(message)
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
                    <AddMessageReduxForm onSubmit={addMessage}/>
                </div>
            </div>


        </div>
    )
}
type MessageFormType = {
    messageText: string
}
const maxValue100 = MaxValueCreator(100)

const AddMessageForm: React.FC<InjectedFormProps<MessageFormType>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <div>
                    <Field name={'messageText'} component={TextArea} placeholder={"Enter your message "}
                           validate={[required,maxValue100]}/>
                </div>
                <div>
                    <button>Add post</button>
                </div>
            </div>
        </form>
    )
}
const AddMessageReduxForm = reduxForm<MessageFormType>({
    form: 'AddMessageForm'
})(AddMessageForm)

export default Dialogs