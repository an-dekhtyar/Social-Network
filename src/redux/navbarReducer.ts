import {ActionsTypes, SideBarType} from "./store";



let initialState:SideBarType = {
    friends: [
        {
            id: 1,
            name: "Andrey",
            urlImage: "https://pbs.twimg.com/profile_images/488616487197106177/xIFT8idk.jpeg"
        },
        {
            id: 2,
            name: "Sasha",
            urlImage: "https://i.pinimg.com/originals/d5/28/70/d52870bf3c60d63d304a589f395e6a86.png"
        },
        {
            id: 3,
            name: "Sveta",
            urlImage: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE1vTzqH-MVVPtDn_aoZ-5Jm_ibot1uqH9VQ&usqp=CAU"
        },
    ]}

export const sidebarReducer = (state:SideBarType = initialState, action:ActionsTypes):SideBarType => {
    return state

}

