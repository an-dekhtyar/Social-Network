import {createStore} from 'redux'
import { combineReducers, applyMiddleware  } from "redux"
import {DialogPageReducerType, dialogReducer} from "./dialogReducer";
import {ProfilePageReducerType, profileReducer} from "./profileReducer";
import {sidebarReducer} from "./navbarReducer";
import {UsersPageReducerType, userReducer} from "./usersReducer";
import {authReducer, AuthReducerType} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'

export type ActionsTypes = DialogPageReducerType | ProfilePageReducerType | UsersPageReducerType | AuthReducerType

let rootReducers = combineReducers ({
    dialogsPageState:dialogReducer,
    profilePageState:profileReducer,
    sideBarState:sidebarReducer,
    usersPageState:userReducer,
    authUserData:authReducer,
    form: formReducer
})

export type AppStateType = ReturnType<typeof rootReducers>



export let store = createStore(rootReducers, applyMiddleware(thunkMiddleware))
















