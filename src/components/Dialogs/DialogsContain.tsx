import React, {ChangeEvent} from 'react';
import {StoreType} from "../../redux/store";
import {AddOutMessageCreator, ChangeOutMessageCreator} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";


type DialogsContainPropsType = {
    store:StoreType
}


export const DialogsContain: React.FC<DialogsContainPropsType> = (props) => {

    const state = props.store.getState().dialogsPageState

    const addOutMessage = (newMessageText:string) => {
            props.store.dispatch(AddOutMessageCreator(newMessageText))
        }

    const outMessageChange = (newTextElement:string) => {
        props.store.dispatch(ChangeOutMessageCreator(newTextElement))
    }

    return (
        <div>
           <Dialogs
               dialogsPageState={state}
               newOutMessageText={state.newOutMessageText}
               addOutMessage={addOutMessage}
               outMessageChange={outMessageChange}
           />
        </div>
    )


}

