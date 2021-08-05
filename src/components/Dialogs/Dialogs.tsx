import React, {useEffect} from 'react';
import s from './Dialogs.module.css'
import b from '../Login/Login.module.css'
import DialogItem from "./DialogItem/DialogItem";
import {InMessage, OutMessage} from './Message/Message';
import {mapDispatchToPropsType, MapStatePropsType} from './DialogsContain';
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {TextArea} from "../../common/formControl/FormControl";
import {MaxValueCreator, required} from "../../utils/validators/validators";
import image from '../../assets/images/dialog.png'
import {useDispatch} from "react-redux";
import {changeCollocutor} from "../../redux/dialogReducer";

const dialogImg = {
    backgroundImage: `url(${image})`
}


type DialogsPropsType = MapStatePropsType & mapDispatchToPropsType


const Dialogs: React.FC<DialogsPropsType> = (props) => {

    useEffect(()=>{
        return()=>{
            dispatch(changeCollocutor(null))
        }
    },[])

    const dispatch = useDispatch()

    const changeCollocutorHandler = (id:number | null) => {
        dispatch(changeCollocutor(id))
    }

    let outMessagesElements = props.dialogs.find(d => d.id === props.currentCollocutor)?.messages.outMessages.map(m =>
        <OutMessage key={m.id} message={m.message} id={m.id}/>)
    let inMessagesElement = props.dialogs.find(d => d.id === props.currentCollocutor)?.messages.inMessages.map(m =>
        <InMessage key={m.id} message={m.message} id={m.id}/>)
    let dialogElements = props.dialogs.map(d =>
        <DialogItem key={d.id} id={d.id} name={d.name} urlImage={d.urlImage} changeCollocutorHandler={changeCollocutorHandler}/>)


    const addMessage = (message: MessageFormType) => {
        if (message.messageText) {
            props.addMessage(message.messageText, props.currentCollocutor)
            message.messageText = ''
        }
    }


    return (
        <div className={s.dialogs}>
            <div className={s.dialogItems}>
                {dialogElements}
            </div>
            {!props.currentCollocutor
                ? <div className={s.chooseDialog}>
                    <div className={s.dialogImage} style={dialogImg}/>
                    <div className={s.chooseMessage}>Choose who you would like to write to</div>
                </div>
                : <div className={s.messages}>
                    {inMessagesElement}
                    {outMessagesElements}
                    <div className={s.dialogTextArea}>
                        <AddMessageReduxForm onSubmit={addMessage}/>
                    </div>
                </div>}


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
                <div className={s.dialogTextArea}>
                    <Field name={'messageText'} component={TextArea} placeholder={"..."}
                           validate={[]}/>
                </div>

                <button className={`${b.loginButton} ${s.button}`}>Sent</button>

            </div>
        </form>
    )
}
const AddMessageReduxForm = reduxForm<MessageFormType>({
    form: 'AddMessageForm'
})(AddMessageForm)

export default Dialogs