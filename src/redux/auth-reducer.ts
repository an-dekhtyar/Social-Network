import {ActionsTypes} from "./redux-store"
import {authAPI, securityAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {appReducerType} from "./appReducer";

export type AuthReducerType = ReturnType<typeof setAuthUserData> | ReturnType<typeof setCaptchaUrl>

export type AuthType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
    captchaUrl: string | null
}

const SET_USER_DATA = "social-network/auth-reducer/SET_USER_DATA"
const SET_CAPTCHA_URL = "social-network/auth-reducer/SET_CAPTCHA_URL"


export const setAuthUserData = (id:number | null, login:string | null, email:string | null, isAuth:boolean) =>
    ({type: SET_USER_DATA, payload : {id, login, email, isAuth} }) as const;
export const setCaptchaUrl = (captchaUrl:string) =>
    ({ type: SET_CAPTCHA_URL, payload : {captchaUrl}}) as const;


let initialState: AuthType = {
    id: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
}


export const authReducer = (state: AuthType = initialState, action: ActionsTypes): AuthType => {
    switch (action.type) {
        case SET_USER_DATA:
        case SET_CAPTCHA_URL:
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }

}

export const authMe = ()=> async (dispatch: Dispatch<AuthReducerType>) => {
    let data = await authAPI.getAuthUserData()
    if (data.resultCode === 0) {
        let {id, login, email} = data.data
        dispatch(setAuthUserData(id, login, email,true))
    }

}

export const login = (email: string, password: string, rememberMe: boolean, captcha:string |null = null):ThunkAction<void,AuthType,unknown, ActionsTypes > => async (dispatch) => {
    let response = await authAPI.login(email, password, rememberMe, captcha)
    if (response.data.resultCode === 0) {
        dispatch(authMe())
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
}

export const logout = () => async (dispatch: Dispatch<AuthReducerType | appReducerType>) => {
    let response = await authAPI.logout()
    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null,false))
    }
}
export const getCaptcha = ():ThunkAction<void,AuthType,unknown, ActionsTypes > => async (dispatch) => {
    let response = await securityAPI.getCaptcha()
    dispatch(setCaptchaUrl(response))
}