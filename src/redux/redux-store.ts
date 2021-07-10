import {compose, createStore} from 'redux'
import { combineReducers, applyMiddleware  } from "redux"
import {DialogPageReducerType, dialogReducer} from "./dialogReducer";
import {ProfilePageReducerType, profileReducer} from "./profileReducer";
import {sidebarReducer} from "./navbarReducer";
import {UsersPageReducerType, userReducer} from "./usersReducer";
import {authReducer, AuthReducerType} from "./auth-reducer";
import thunkMiddleware from "redux-thunk"
import { reducer as formReducer } from 'redux-form'
import {appReducer, appReducerType} from "./appReducer";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

export type ActionsTypes = DialogPageReducerType | ProfilePageReducerType | UsersPageReducerType | AuthReducerType | appReducerType

let rootReducers = combineReducers ({
    dialogsPageState:dialogReducer,
    profilePageState:profileReducer,
    sideBarState:sidebarReducer,
    usersPageState:userReducer,
    authUserData:authReducer,
    form: formReducer,
    app:appReducer
})

export type AppStateType = ReturnType<typeof rootReducers>

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export let store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunkMiddleware)))
















