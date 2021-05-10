import {ActionsTypes} from "./redux-store"
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";

export type ProfilePageReducerType =
    ReturnType<typeof addPost> |
    ReturnType<typeof changePost> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof getStatus>

export type ProfilePageType = {
    posts: Array<PostType>
    newTextPostValue: string
    profile: ProfileType | null
    status: string | null
}
export type PostType = {
    id: number
    message: string
    likesAmount: number
    urlImage: string
}
export type ContactsType = {
    github: string | null
    vk: string | null
    facebook: string | null
    instagram: string | null
    twitter: string | null
    website: string | null
    youtube: string | null
    mainLink: string | null
}
export type PhotosType = {
    small: string | null
    large: string | null
}
export type ProfileType = {
    contacts: ContactsType
    photos: PhotosType
    userId: number | null
    lookingForAJob: boolean
    lookingForAJobDescription: string | null
    fullName: string
    aboutMe: string | null

}


const ADD_POST = "ADD_POST"
const CHANGE_VALUE_POST = "CHANGE_VALUE_POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const GET_USER_STATUS = "GET_USER_STATUS"

export const addPost = (newPostElement: string) =>
    ({type: ADD_POST, postMessage: newPostElement}) as const;
export const changePost = (newText: string) =>
    ({type: CHANGE_VALUE_POST, newText: newText}) as const;
export const setUserProfile = (profile: ProfileType) =>
    ({type: SET_USER_PROFILE, profile}) as const;
export const getStatus = (status:string) =>
    ({type:GET_USER_STATUS, status }) as const;

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
    newTextPostValue: "",
    profile: null,
    status: null
}


export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case "ADD_POST": {
            let newPost: PostType = {
                id: 4,
                message: action.postMessage,
                likesAmount: 0,
                urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
            }
            let copyState = {
                ...state,
                posts: [...state.posts, newPost],
                newTextPostValue: ""
            }
            return copyState;
        }
        case "CHANGE_VALUE_POST": {
            let stateCopy = {
                ...state,
                newTextPostValue: action.newText
            }
            return stateCopy;
        }
        case "SET_USER_PROFILE":
            return {
                ...state,
                profile: action.profile
            }
        case GET_USER_STATUS:
            return {
                ...state,
                status:action.status
            }
        default:
            return state
    }

}

export const selectUser = (userId: string) => (dispatch: Dispatch<ProfilePageReducerType>) => {
    profileAPI.selectUser(userId)
        .then(data => {
            dispatch(setUserProfile(data))
        })
}

export const getUserStatus = (userId:string) => (dispatch: Dispatch<ProfilePageReducerType>) => {
    profileAPI.getUserStatus(userId)
        .then(data => {
            dispatch(getStatus(data))
        })

}