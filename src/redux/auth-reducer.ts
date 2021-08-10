import {ActionsTypes} from "./redux-store"
import {authAPI, profileAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {appReducerType, setErrorNotification, setErrorNotificationType} from "./appReducer";
import { toggleIsFetching } from "./profileReducer";

export type AuthReducerType = |
    ReturnType<typeof setAuthUserData> |
    ReturnType<typeof setCaptchaUrl> |
    ReturnType<typeof setAuthUserPhoto> |
    ReturnType<typeof setLoginRedirect> |
    setErrorNotificationType



export type AuthType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
    userPhoto: string | null
    authUserPhoto: string | null
    logInSuccess:boolean
}

const SET_USER_DATA = "social-network/auth-reducer/SET_USER_DATA"
const SET_CAPTCHA_URL = "social-network/auth-reducer/SET_CAPTCHA_URL"
const SET_AUTH_USER_PHOTO = "social-network/auth-reducer/SET_AUTH_USER_PHOTO"
const SET_LOGIN_SUCCESS = "social-network/auth-reducer/SET_LOGIN_SUCCESS"


export const setAuthUserData = (id:number | null, login:string | null, email:string | null, isAuth:boolean) =>
    ({type: SET_USER_DATA, payload : {id, login, email, isAuth} }) as const;
export const setCaptchaUrl = (captchaUrl:string | null) =>
    ({ type: SET_CAPTCHA_URL, payload : {captchaUrl}}) as const;
export const setAuthUserPhoto = (photo:string | null) =>
    ({ type: SET_AUTH_USER_PHOTO, photo}) as const;
export const setLoginRedirect = (values:boolean) =>
    ({ type: SET_LOGIN_SUCCESS, values}) as const;

let initialState: AuthType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null,
    userPhoto:null,
    authUserPhoto:null,
    logInSuccess:false,
}


export const authReducer = (state: AuthType = initialState, action: ActionsTypes): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            };
        case SET_AUTH_USER_PHOTO:
            return {
                ...state,
                authUserPhoto:action.photo
            };
        case SET_LOGIN_SUCCESS:
            return {
                ...state,
                logInSuccess:action.values
            }
        default:
            return state
    }

}

export const authMe = (): ThunkAction<void,AuthType,unknown, ActionsTypes >=> async (dispatch) => {
    try {
        let data = await authAPI.getAuthUserData()
        if (data.resultCode === 0) {
            let {id, login, email, } = data.data
            dispatch(setAuthUserData(id, login, email,true))
            dispatch(getAuthUserPhoto(id))
        }
    }
    catch (e) {
        dispatch(setErrorNotification(e.message))
    }
}
export const getAuthUserPhoto = (id:string) => async (dispatch: Dispatch<AuthReducerType>) => {
    try {
        let data = await profileAPI.selectUser(id)
        dispatch(setAuthUserPhoto(data.photos.large))
    } catch (e) {
        dispatch(setErrorNotification(e.message))
    }
}

export const login = (email: string, password: string, rememberMe: boolean, captcha:string |null = null):ThunkAction<void,AuthType,unknown, ActionsTypes > => async (dispatch) => {
        dispatch(toggleIsFetching(false))
    try {
        let response = await authAPI.login(email, password, rememberMe, captcha)
        if (response.data.resultCode === 0) {
            dispatch(authMe())
            dispatch(setCaptchaUrl(null))
        } else {
            if(response.data.resultCode === 10) {
                const error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error!'
                dispatch(stopSubmit('login',{_error:error}) as AuthReducerType)
                dispatch(getCaptcha())
            } else {
                const error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error!'
                dispatch(stopSubmit('login',{_error:error}) as AuthReducerType)
            }
        }
        dispatch(toggleIsFetching(true))
    } catch (e) {
        dispatch(setErrorNotification(e.message))
        dispatch(toggleIsFetching(true))
    }
}

export const logout = () => async (dispatch: Dispatch<AuthReducerType | appReducerType>) => {
    try {
        let response = await authAPI.logout()
        if (response.data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null,false))
            dispatch(setLoginRedirect(true))
        }
    } catch (e) {
        dispatch(setErrorNotification(e.message))
    }
}
export const getCaptcha = ():ThunkAction<void,AuthType,unknown, ActionsTypes > => async (dispatch) => {
    try {
        let response = await securityAPI.getCaptcha()
        dispatch(setCaptchaUrl(response))
    } catch (e) {
        dispatch(setErrorNotification(e.message))
    }
}