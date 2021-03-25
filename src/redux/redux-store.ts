import {createStore} from 'redux'
import { combineReducers } from "redux"
import {dialogReducer} from "./dialogReducer";
import {profileReducer} from "./profileReducer";
import {sidebarReducer} from "./navbarReducer";
import {ActionsTypes, DialogPageType, ProfilePageType, SideBarType} from "./store";


/*export type combinedReducerType = {
    dialogReducer:(state:DialogPageType, action:ActionsTypes) => DialogPageType
    profileReducer:(state: ProfilePageType, action: ActionsTypes) => ProfilePageType
    navbarReducer:(state:SideBarType, action:ActionsTypes)=> SideBarType
}*/

let rootReducers = combineReducers ({
    dialogsPageState:dialogReducer,
    profilePageState:profileReducer,
    sideBarState:sidebarReducer

})

export type AppStateType = ReturnType<typeof rootReducers>



export let store = createStore(rootReducers)
















