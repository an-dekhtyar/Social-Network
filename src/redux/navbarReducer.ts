import { ActionsTypes } from "./redux-store"
import andrey from '../assets/images/andrey.png'
import alena from '../assets/images/alena.png'
import sasha from '../assets/images/sasha.png'
import sveta from '../assets/images/sveta.png'

export type FriendsType = {
    id: number
    name: string
    urlImage: string

}
export type SideBarType = {
    friends: Array<FriendsType>
}

let initialState:SideBarType = {
    friends: [
        {
            id: 1,
            name: "Andrey",
            urlImage: andrey
        },
        {
            id: 2,
            name: "Sveta",
            urlImage: sveta
        },
        {
            id: 3,
            name: "Sasha",
            urlImage: sasha
        },

        {
            id: 4,
            name: "Alena",
            urlImage: alena
        },
    ]}

export const sidebarReducer = (state:SideBarType = initialState, action:ActionsTypes):SideBarType => {
    return state

}

