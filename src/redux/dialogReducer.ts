import {ActionsTypes} from "./redux-store"
import girl1 from '../assets/images/girl1.png'
import girl2 from '../assets/images/girl2.png'
import girl3 from '../assets/images/girl3.png'
import man1 from '../assets/images/man1.png'
import man2 from '../assets/images/man2.png'
import man3 from '../assets/images/man3.png'

export type DialogPageReducerType = ReturnType<typeof addMessage> | ReturnType<typeof changeCollocutor>

export type DialogPageType = {
    dialogs: Array<DialogItemType>
    currentCollocutor: number | null
}

export type DialogItemType = {
    id: number
    name: string
    urlImage: string
    messages: Messages
}
export type MessageType = {
    id: number
    message: string
}
export type Messages = {
    inMessages: Array<MessageType>
    outMessages: Array<MessageType>
}

const ADD_OUT_MESSAGE = "social-network/dialog-reducer/ADD-OUT-MESSAGE"
const CHANGE_COLLOCUTOR_MESSAGE = "social-network/dialog-reducer/CHANGE_COLLOCUTOR_MESSAGE"

export const addMessage = (newMessage: string, id: number | null) =>
    ({type: ADD_OUT_MESSAGE, newOutMessageText: newMessage, id}) as const;
export const changeCollocutor = (id: number | null) =>
    ({type: CHANGE_COLLOCUTOR_MESSAGE, id}) as const;

let initialState: DialogPageType = {
    currentCollocutor: null,
    dialogs: [
        {
            id: 1,
            name: "Andrey Koval",
            urlImage: man1,
            messages: {
                inMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "How are you?"},
                    {id: 3, message: "Where are you from?"},
                    {id: 4, message: "Where are you?"},
                ],
                outMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "I'm fine"},
                    {id: 3, message: "I'm from Minsk"},
                    {id: 4, message: "Where are you from"},

                ],
            }
        },
        {
            id: 2,
            name: "Sveta Rys",
            urlImage: girl1,
            messages: {
                inMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "yesterday i`ll have a party"},
                    {id: 3, message: "Come and visit)"},
                    {id: 4, message: "grab a bottle of wine)"},
                ],
                outMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "With great pleasure"},
                    {id: 3, message: "I will grab a bottle of Brancote Estate"},
                    {id: 4, message: "What time does it start?"},
                ],
            }
        },
        {
            id: 3,
            name: "Sasha Ivanov",
            urlImage:  man2,
            messages: {
                inMessages: [
                    {id: 1, message: "Hello"},
                    {id: 2, message: "I watched a new film yesterday"},
                    {id: 3, message: "Green book"},
                    {id: 4, message: "highly recommend!"},
                ],
                outMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "I have not watched this movie"},
                    {id: 3, message: "I will definitely watch"},
                    {id: 4, message: "Thnks"},
                ],
            }
        },
        {
            id: 4,
            name: "Nastya Bolovina",
            urlImage: girl3,
            messages: {
                inMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "How are you?"},
                    {id: 3, message: "What are your plans for the summer"},
                    {id: 4, message: "Where do you plan to go?"},
                ],
                outMessages: [
                    {id: 1, message: "HI"},
                    {id: 2, message: "I'm fine"},
                    {id: 3, message: "I plan to take a vacation in August"},
                    {id: 4, message: "and visit italy"},
                ],
            }
        },
        {
            id: 5,
            name: "Tanya Karas",
            urlImage: girl2,
            messages: {
                inMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "you were at the game yesterday?"},
                    {id: 3, message: "found out that you favorite team won"},
                    {id: 4, message: "congratulations!"},
                ],
                outMessages: [
                    {id: 1, message: "Ou Hi!"},
                    {id: 2, message: "yes"},
                    {id: 3, message: "it was a very difficult game"},
                    {id: 4, message: "Thnks"},
                ],
            }
        },
        {
            id: 6,
            name: "Alex Bryl",
            urlImage: man3,
            messages: {
                inMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "you are looking for a job for the position of Frontend Developer?"},
                    {id: 3, message: "how are you doing in this"},
                    {id: 4, message: "how many interviews have you had"},
                ],
                outMessages: [
                    {id: 1, message: "Hi"},
                    {id: 2, message: "yes looking job for the position of Frontend Developer"},
                    {id: 3, message: "already had 5 interviews"},
                    {id: 4, message: "So far no results"},
                ],
            }
        }
    ],

}


export const dialogReducer = (state: DialogPageType = initialState, action: ActionsTypes): DialogPageType => {
    switch (action.type) {
        case ADD_OUT_MESSAGE:
            let newMessage: MessageType = {
                id: Math.random(),
                message: action.newOutMessageText
            }

            return {
                ...state,
                dialogs: state.dialogs
                    .map(d => d.id === action.id
                        ? {
                            ...d,
                            messages: {
                                ...d.messages,
                                outMessages: [...d.messages.outMessages, newMessage]
                            }
                        }
                        : d)


            }
        case CHANGE_COLLOCUTOR_MESSAGE:
            return {
                ...state,
                currentCollocutor: action.id
            }
        default:
            return state
    }

}