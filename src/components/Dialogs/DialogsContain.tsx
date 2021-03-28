import React, {ChangeEvent} from 'react';

import {AddOutMessageCreator, ChangeOutMessageCreator, DialogPageType} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";

import { AppStateType } from '../../redux/redux-store';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';



export type MapStatePropsType = {
    dialogsPageState:DialogPageType
}

export type mapDispatchToPropsType = {
    addOutMessage:(newMessageText:string) => void
    outMessageChange: (newTextElement:string) => void
}

const mapStateToProps =(state:AppStateType):MapStatePropsType => {
    return {
        dialogsPageState: state.dialogsPageState
    }
}

const mapDispatchToProps =(dispatch:Dispatch):mapDispatchToPropsType => {
    return {
        addOutMessage: (newMessageText:string) => {
            dispatch(AddOutMessageCreator(newMessageText))
        },
        outMessageChange: (newTextElement:string) => {
            dispatch(ChangeOutMessageCreator(newTextElement))
        }
    }
}

export const DialogsContain = connect(mapStateToProps,mapDispatchToProps)(Dialogs)