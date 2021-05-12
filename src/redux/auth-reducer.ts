import {ActionsTypes} from "./redux-store"
import {authAPI} from "../api/api";
import {Dispatch} from "redux";
import {ThunkAction} from "redux-thunk";

export type AuthReducerType = ReturnType<typeof setAuthUserData>

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
    authAPI.getAuthUserData().then(data => {
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
            }
        })
}

export const logout = () => (dispatch: Dispatch<AuthReducerType>) => {
    authAPI.logout()
        .then(response => {
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null,false))
            }
        })
}