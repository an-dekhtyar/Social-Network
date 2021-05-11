import { ActionsTypes } from "./redux-store"


export type DialogPageReducerType = ReturnType<typeof addMessage>

export type DialogPageType = {
    dialogs: Array<DialogItemType>
    inMessages: Array<MessageType>
    outMessages: Array<MessageType>

}

export type DialogItemType = {
    id: number
    name: string
    urlImage: string
}
export type MessageType = {
    id: number
    message: string
}

const ADD_OUT_MESSAGE = "ADD-OUT-MESSAGE"

export const addMessage = (newMessage: string) =>
    ({ type: ADD_OUT_MESSAGE, newOutMessageText: newMessage }) as const;

let initialState: DialogPageType = {
    dialogs: [
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
        {
            id: 4,
            name: "Nastya",
            urlImage: "https://i.pinimg.com/originals/fa/53/2d/fa532da807474b076afdfad93565e447.jpg"
        },
        {
            id: 5,
            name: "Tanya",
            urlImage: "https://i.pinimg.com/originals/19/5a/51/195a519a5dff6fb6495d2b1ea7176240.jpg"
        },
        {
            id: 6,
            name: "Alex",
            urlImage: "https://previews.123rf.com/images/sudowoodo/sudowoodo1706/sudowoodo170600033/80907546-green-alien-face-emoji-extraterrestrial-humanoid-head-icon-vector-illustration-.jpg"
        }
    ],
    inMessages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Where are you from?" },
        { id: 4, message: "Where are you?" },
    ],
    outMessages: [
        { id: 1, message: "Hi" },
        { id: 2, message: "How are you?" },
        { id: 3, message: "Where are you from?" },
        { id: 4, message: "Where are youu?" },
    ],
}



export const dialogReducer = (state: DialogPageType = initialState, action: ActionsTypes): DialogPageType => {
    switch (action.type) {
        case "ADD-OUT-MESSAGE": {
            let newMessage: MessageType = {
                id: 4,
                message: action.newOutMessageText
            }

            let stateCopy = {
                ...state,
                outMessages: [...state.outMessages, newMessage],
                newOutMessageText: ''
            }
            return stateCopy;
        }
        default: return state
    }

}