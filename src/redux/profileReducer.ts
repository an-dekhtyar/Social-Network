import { ActionsTypes } from "./redux-store"

export type ProfilePageReducerType= ReturnType<typeof AddPostCreator> | ReturnType<typeof ChangePostCreator>


export type ProfilePageType = {
    posts: Array<PostType>
    newTextPostValue: string
}
export type PostType = {
    id: number
    message: string
    likesAmount: number
    urlImage: string
}


const ADD_POST = "ADD-POST"
const CHANGE_VALUE_POST = "CHANGE-VALUE-POST"

export const AddPostCreator = (newPostElement: string) =>
    ({type: ADD_POST, postMessage: newPostElement}) as const;
export const ChangePostCreator = (newText: string) =>
    ({type: CHANGE_VALUE_POST, newText: newText}) as const;

let initialState: ProfilePageType = {
    posts: [
        {
            id: 1,
            message: "Hi, how are you?",
            likesAmount: 45,
            urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
        },
        {
            id: 2,
            message: "What is your name?",
            likesAmount: 24,
            urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
        },
        {
            id: 3,
            message: "What is your favorite TV-show?",
            likesAmount: 56,
            urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
        },
    ],
    newTextPostValue: ""
}


export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST":{
            let newPost: PostType = {
                id: 4,
                message: action.postMessage,
                likesAmount: 0,
                urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
            }
            let copyState = {
                ...state,
                posts:[...state.posts, newPost],
                newTextPostValue:""
            }
            return copyState;}
        case "CHANGE-VALUE-POST":
            let stateCopy = {
                ...state,
                newTextPostValue:action.newText
            }
            return stateCopy;
        default:
            return state
    }

}
