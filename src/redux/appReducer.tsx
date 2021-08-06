import {ActionsTypes} from "./redux-store"
import {ThunkAction} from "redux-thunk";
import {authMe, AuthType} from "./auth-reducer";

export type appReducerType = ReturnType<typeof initializeApp>

export type AppStateType = {
    initialized:boolean
}

const INITIALIZED_SUCCESS = "social-network/app-reducer/INITIALIZED_SUCCESS"


let initialState: AppStateType = {
    initialized:false
}


export const appReducer = (state: AppStateType = initialState, action: appReducerType): AppStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS:

            return {
                ...state,
                initialized:true
            }

        default:
            return state
    }
}
export const initializeApp = () => ( {type:INITIALIZED_SUCCESS} as const)


export const initializeAppTC = ():ThunkAction<void,AuthType,unknown, ActionsTypes > => async (dispatch) => {
    const promise = dispatch(authMe())
    Promise.all([promise])
        .then(()=>{
            dispatch(initializeApp())
        })
}

