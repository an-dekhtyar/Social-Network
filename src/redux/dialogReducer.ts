import {ActionsTypes, DialogPageType, MessageType} from "./state";


export type DialogPageReducerType = ReturnType<typeof AddOutMessageCreator> |
    ReturnType<typeof ChangeOutMessageCreator>


const ADD_OUT_MESSAGE = "ADD-OUT-MESSAGE"
const CHANGE_VALUE_OUT_MESSAGE = "CHANGE-VALUE-OUT-MESSAGE"

export const AddOutMessageCreator = (newMessage: string) =>
    ({type: ADD_OUT_MESSAGE, newOutMessageText: newMessage}) as const;
export const ChangeOutMessageCreator = (newText: string) =>
    ({type: CHANGE_VALUE_OUT_MESSAGE, newText: newText}) as const;


export const dialogReducer = (state:DialogPageType, action:ActionsTypes):DialogPageType => {
    switch (action.type) {
        case "ADD-OUT-MESSAGE":
            let newMessage: MessageType = {
                id: 4,
                message: action.newOutMessageText
            }
            state.outMessages.push(newMessage)
            state.newOutMessageText = ''
            return state;
        case "CHANGE-VALUE-OUT-MESSAGE":
            state.newOutMessageText = action.newText
            return state;
        default: return state
    }

}