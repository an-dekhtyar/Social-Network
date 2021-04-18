import {createStore} from 'redux'
import { combineReducers } from "redux"
import {DialogPageReducerType, dialogReducer} from "./dialogReducer";
import {ProfilePageReducerType, profileReducer} from "./profileReducer";
import {sidebarReducer} from "./navbarReducer";
import {UsersPageReducerType, userReducer} from "./usersReducer";
import {authReducer, AuthReducerType} from "./auth-reducer";


export type ActionsTypes = DialogPageReducerType | ProfilePageReducerType | UsersPageReducerType | AuthReducerType

let rootReducers = combineReducers ({
    dialogsPageState:dialogReducer,
    profilePageState:profileReducer,
    sideBarState:sidebarReducer,
    usersPageState:userReducer,
    authUserData:authReducer
})

export type AppStateType = ReturnType<typeof rootReducers>



export let store = createStore(rootReducers)
















