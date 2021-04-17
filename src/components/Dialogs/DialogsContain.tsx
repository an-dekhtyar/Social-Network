import React, {ChangeEvent} from 'react';

import {addMessage, changeMessage, DialogPageType} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";

import { AppStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';



export type MapStatePropsType = {
    dialogsPageState:DialogPageType
}

export type mapDispatchToPropsType = {
    addMessage:(newMessageText:string) => void
    changeMessage: (newTextElement:string) => void
}

const mapStateToProps =(state:AppStateType):MapStatePropsType => {
    return {
        dialogsPageState: state.dialogsPageState
    }
}



export const DialogsContain = connect(mapStateToProps,{
    addMessage,
    changeMessage
})(Dialogs)