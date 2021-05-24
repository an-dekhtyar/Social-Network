import {ActionsTypes} from "./redux-store"
import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";
import {stopSubmit} from "redux-form";
import {appReducerType, initializeApp} from "./appReducer";

export type AuthReducerType = ReturnType<typeof setAuthUserData> /*| ReturnType<typeof stopSubmit>*/

export type AuthType = {
    id: number | null
    login: string | null
    email: string | null
    isAuth: boolean
}

const SET_USER_DATA = "SET_USER_DATA"


export const setAuthUserData = (id:number | null, login:string | null, email:string | null, isAuth:boolean) =>
    ({
        type: SET_USER_DATA, payload : {
            id,
            login,
            email,
            isAuth
        }
    }) as const;

let initialState: AuthType = {
    id: null,
    login: null,
    email: null,
    isAuth: false
}


export const authReducer = (state: AuthType = initialState, action: ActionsTypes): AuthType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.payload,
            }

        default:
            return state
    }

}

export const authMe = ()=> (dispatch: Dispatch<AuthReducerType>) => {
    return authAPI.getAuthUserData().then(data => {
        if (data.resultCode === 0) {
            let {id, login, email} = data.data
            dispatch(setAuthUserData(id, login, email,true))
        }
    })
}

export const login = (email: string, password: string, rememberMe: boolean):ThunkAction<void,AuthType,unknown, ActionsTypes > => (dispatch) => {
    authAPI.login(email, password, rememberMe)
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(authMe())
            } else {
                const error = response.data.messages.length > 0 ? response.data.messages[0] : 'Some Error!'
                dispatch(stopSubmit('login',{_error:error}) as AuthReducerType)
            }
        })
}

export const logout = () => (dispatch: Dispatch<AuthReducerType | appReducerType>) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null,false))
            }
        })
}