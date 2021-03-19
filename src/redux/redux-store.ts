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

let reducers = combineReducers ({
    dialogsPageState:dialogReducer,
    profilePageState:profileReducer,
    sideBarState:sidebarReducer

})

export type RootStoreType = typeof reducers

export let store:RootStoreType = createStore(combineReducers)




export default combineReducers({})












