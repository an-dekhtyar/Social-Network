import {ActionsTypes, PostType, ProfilePageType} from "./state";


export type ProfilePageReducerType= ReturnType<typeof AddPostCreator> | ReturnType<typeof ChangePostCreator>

const ADD_POST = "ADD-POST"
const CHANGE_VALUE_POST = "CHANGE-VALUE-POST"

export const AddPostCreator = (newPostElement: string) =>
    ({type: ADD_POST, postMessage: newPostElement}) as const;
export const ChangePostCreator = (newText: string) =>
    ({type: CHANGE_VALUE_POST, newText: newText}) as const;

export const profileReducer = (state: ProfilePageType, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case "ADD-POST":
            let newPost: PostType = {
                id: 4,
                message: action.postMessage,
                likesAmount: 0,
                urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
            }
            state.posts.push(newPost)
            state.newTextPostValue = ''
            return state;
        case "CHANGE-VALUE-POST":
            state.newTextPostValue = action.newText
            return state;
        default:
            return state
    }

}
