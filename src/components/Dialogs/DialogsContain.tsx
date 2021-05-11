import React, {ChangeEvent} from 'react';

import {addMessage, DialogPageType} from "../../redux/dialogReducer";
import Dialogs from "./Dialogs";

import { AppStateType } from '../../redux/redux-store';
import { connect } from 'react-redux';
import {withAuthRedirect} from "../../hoc/withAuthRedirect";
import {compose} from "redux";



export type MapStatePropsType = {
    dialogsPageState:DialogPageType
    isAuth:boolean
}

export type mapDispatchToPropsType = {
    addMessage:(newMessageText:string) => void
}

const mapStateToProps =(state:AppStateType):MapStatePropsType => {
    return {
        dialogsPageState: state.dialogsPageState,
        isAuth:state.authUserData.isAuth
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps,{addMessage}),
    withAuthRedirect
)(Dialogs)

