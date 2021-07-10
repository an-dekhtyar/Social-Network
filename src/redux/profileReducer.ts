import {ActionsTypes} from "./redux-store"
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";
import { stat } from "fs";

export type ProfilePageReducerType =
    ReturnType<typeof addPost> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof getStatus> |
    ReturnType<typeof deletePost>

export type ProfilePageType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string
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


const ADD_POST = "social-network/profile-reducer/ADD_POST"
const SET_USER_PROFILE = "social-network/profile-reducer/SET_USER_PROFILE"
const GET_USER_STATUS = "social-network/profile-reducer/GET_USER_STATUS"
const DELETE_POST = "social-network/profile-reducer/DELETE_POST"

export const addPost = (newPostElement: string) =>
    ({type: ADD_POST, postMessage: newPostElement}) as const;
export const setUserProfile = (profile: ProfileType) =>
    ({type: SET_USER_PROFILE, profile}) as const;
export const getStatus = (status:string) =>
    ({type:GET_USER_STATUS, status }) as const;
export const deletePost = (id:number) =>
    ({type:DELETE_POST, id} as const)

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
    profile: null,
    status: ""
}


export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: 4,
                message: action.postMessage,
                likesAmount: 0,
                urlImage: "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
            };
        }
        case SET_USER_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case GET_USER_STATUS:
            return {
                ...state,
                status:action.status
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }
        default:
            return state
    }

}

export const selectUser = (userId: string) => async (dispatch: any) => {
    let data = await profileAPI.selectUser(userId)
    dispatch(setUserProfile(data))
}

export const getUserStatus = (userId:string) => async (dispatch: Dispatch<ProfilePageReducerType>) => {
    let data = await profileAPI.getUserStatus(userId)
    dispatch(getStatus(data))

}
export const updateUserStatus = (status:string) => async (dispatch: Dispatch<ProfilePageReducerType>) => {
    let response = await profileAPI.updateStatus(status)
    if (response.data.resultCode === 0) {
        dispatch(getStatus(status))
    }
}
