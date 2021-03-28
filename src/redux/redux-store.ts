import {createStore} from 'redux'
import { combineReducers } from "redux"
import {DialogPageReducerType, dialogReducer} from "./dialogReducer";
import {ProfilePageReducerType, profileReducer} from "./profileReducer";
import {sidebarReducer} from "./navbarReducer";
import {UsersPageReducerType, userReducer} from "./usersReducer";


/*export type combinedReducerType = {
    dialogReducer:(state:DialogPageType, action:ActionsTypes) => DialogPageType
    profileReducer:(state: ProfilePageType, action: ActionsTypes) => ProfilePageType
    navbarReducer:(state:SideBarType, action:ActionsTypes)=> SideBarType
}*/

export type ActionsTypes = DialogPageReducerType | ProfilePageReducerType | UsersPageReducerType

let rootReducers = combineReducers ({
    dialogsPageState:dialogReducer,
    profilePageState:profileReducer,
    sideBarState:sidebarReducer,
    usersPageState:userReducer
})

export type AppStateType = ReturnType<typeof rootReducers>



export let store = createStore(rootReducers)
















