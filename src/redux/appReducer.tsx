import {ActionsTypes} from "./redux-store"
import {ThunkAction} from "redux-thunk";
import {authMe, AuthType} from "./auth-reducer";


type AppStateType = {
    initialized:boolean
    error:string | null
}

const INITIALIZED_SUCCESS = "social-network/app-reducer/INITIALIZED_SUCCESS"
const SET_ERROR_NOTIFICATION = "social-network/app-reducer/SET_ERROR_NOTIFICATION"

export type appReducerType = ReturnType<typeof initializeApp> | setErrorNotificationType
export type setErrorNotificationType = ReturnType<typeof setErrorNotification>

let initialState: AppStateType = {
    initialized:false,
    error: null
}

export const appReducer = (state: AppStateType = initialState, action: appReducerType): AppStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:
            return {
                ...state,
                initialized:true
            }
        case SET_ERROR_NOTIFICATION:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}
export const initializeApp = () => ( {type:INITIALIZED_SUCCESS} as const)
export const setErrorNotification = (error:string) => ( {type:SET_ERROR_NOTIFICATION, error} as const)


export const initializeAppTC = ():ThunkAction<void,AuthType,unknown, ActionsTypes > => async (dispatch) => {
    const promise = dispatch(authMe())
    Promise.all([promise])
        .then(()=>{
            dispatch(initializeApp())
        })
}

