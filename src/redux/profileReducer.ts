import {ActionsTypes} from "./redux-store"
import {profileAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {setErrorNotification, setErrorNotificationType} from "./appReducer";



export type ProfilePageReducerType =
    ReturnType<typeof addPost> |
    ReturnType<typeof setUserProfile> |
    ReturnType<typeof getStatus> |
    ReturnType<typeof deletePost> |
    ReturnType<typeof setPhoto> |
    ReturnType<typeof toggleEditMode> |
    ToggleIsFetchingType | setErrorNotificationType



export type  ToggleIsFetchingType = ReturnType<typeof toggleIsFetching>

export type ProfilePageType = {
    posts: Array<PostType>
    profile: ProfileType | null
    status: string
    editMode:boolean
    isFetching:boolean
}
export type PostType = {
    id: number
    message: string
    likesAmount: number
}
export interface ContactsType {
    [key: string]: string;
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
const SET_PHOTO = "social-network/profile-reducer/SET_PHOTO"
const TOGGLE_EDIT_MODE = "social-network/profile-reducer/TOGGLE_EDIT_MODE"
const TOGGLE_IS_FETCHING = "social-network/profile-reducer/TOGGLE_IS_FETCHING"

export const addPost = (newPostElement: string) =>
    ({type: ADD_POST, postMessage: newPostElement}) as const;
export const setUserProfile = (profile: ProfileType) =>
    ({type: SET_USER_PROFILE, profile}) as const;
export const getStatus = (status:string) =>
    ({type:GET_USER_STATUS, status }) as const;
export const deletePost = (id:number) =>
    ({type:DELETE_POST, id} as const)
export const setPhoto = (photo:string) =>
    ({type:SET_PHOTO, photo} as const)
export const toggleEditMode = (value:boolean) =>
    ({type:TOGGLE_EDIT_MODE, value} as const)
export const toggleIsFetching = (value:boolean) =>
    ({type:TOGGLE_IS_FETCHING, value} as const)

let initialState: ProfilePageType = {
    posts: [
        {
            id: 1,
            message: "In his work Leonard Bernstein, Humphrey Burton explained: When it was decided to add Tony’s first-act song “Something’s Coming,” Bernstein and Sond",
            likesAmount: 45,
        },
        {
            id: 2,
            message: "In his work Leonard Bernstein, Humphrey Burton explained: When it was decided to add Tony’s first-act song “Something’s Coming,” Bernstein and Sond",
            likesAmount: 24,
        },
        {
            id: 3,
            message: "In his work Leonard Bernstein, Humphrey Burton explained: When it was decided to add Tony",
            likesAmount: 56,
        },
    ],
    profile: null,
    status: "",
    editMode: false,
    isFetching:true
}


export const profileReducer = (state: ProfilePageType = initialState, action: ActionsTypes): ProfilePageType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: PostType = {
                id: Math.random(),
                message: action.postMessage,
                likesAmount: 0,

            }
            return {
                ...state,
                posts: [newPost, ...state.posts ],
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
            debugger
            return {
                ...state,
                posts: state.posts.filter(p => p.id !== action.id)
            }
        case TOGGLE_EDIT_MODE:
            return {
                ...state,
                editMode:action.value
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching:action.value
            }
        case SET_PHOTO:
            if (state.profile)
                return {
                    ...state,
                    profile: {
                        ...state.profile,
                        photos: {
                            ...state.profile.photos,
                            large: action.photo
                        }
                    }
                }
            else return state
        default:
            return state
    }

}

export const selectUser = (userId: string) => async (dispatch: Dispatch<ProfilePageReducerType>) => {

    dispatch(toggleIsFetching(false))
    try {
        let data = await profileAPI.selectUser(userId)
        dispatch(setUserProfile(data))
        dispatch(toggleIsFetching(true))
    } catch (e){
        dispatch(setErrorNotification(e.message))
        dispatch(toggleIsFetching(true))
    }

}

export const getUserStatus = (userId:string) => async (dispatch: Dispatch<ProfilePageReducerType>) => {
    try {
        let data = await profileAPI.getUserStatus(userId)
        dispatch(getStatus(data))
    } catch (e) {
        dispatch(setErrorNotification(e.message))
    }


}
export const updateUserStatus = (status:string) => async (dispatch: Dispatch<ProfilePageReducerType>) => {
    try {
        let response = await profileAPI.updateStatus(status)
        if (response.data.resultCode === 0) {
            dispatch(getStatus(status))
        }
    } catch (e) {
        dispatch(setErrorNotification(e.message))
    }
}
export const updatePhoto = (photoFile:any) => async (dispatch: Dispatch<ProfilePageReducerType>) => {

    try {
        let response = await profileAPI.savePhoto(photoFile)
        if (response.data.resultCode === 0) {
            console.log(response.data.data)
            dispatch(setPhoto(response.data.data.photos.large))
        }
    } catch (e) {
        dispatch(setErrorNotification(e.message))
    }



}
export const changeProfileData = (profileData:ProfileType):ThunkAction<void,ProfilePageType,unknown, ActionsTypes > => async (dispatch, getState:Function) => {
    try {
        const id = getState().authUserData.id
        let response = await profileAPI.changeProfile(profileData)
        if (response.data.resultCode === 0) {
            dispatch(selectUser(id))
            dispatch(toggleEditMode(false))
        } else {
            let error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error!'
            if (error.includes('Contacts->')) {
                let newError = error.split(' (')[0]
                let field = error.split('->')[1].slice(0, -1).toLowerCase()
                dispatch(stopSubmit('edit-profile',{ 'contacts' : { [field] : newError }} ))
            }
            else {
                dispatch(stopSubmit('edit-profile',{_error:error}) as ProfilePageReducerType)
            }
        }
    } catch (e) {
        dispatch(setErrorNotification(e.message))
    }

}




