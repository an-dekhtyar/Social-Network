import React, {ChangeEvent} from 'react';
import {addMessage, DialogItemType} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";
import { AppStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



export type MapStatePropsType = {
    dialogs:Array<DialogItemType>
    isAuth:boolean
    currentCollocutor:number | null
}

export type mapDispatchToPropsType = {
    addMessage:(newMessageText:string, id:number | null) => void
}

const mapStateToProps =(state:AppStateType):MapStatePropsType => {
    return {
        dialogs: state.dialogsPageState.dialogs,
        isAuth:state.authUserData.isAuth,
        currentCollocutor: state.dialogsPageState.currentCollocutor
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,{addMessage}),
    withAuthRedirect
)(Dialogs)

