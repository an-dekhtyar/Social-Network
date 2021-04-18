import { ActionsTypes } from "./redux-store"

export type AuthReducerType = ReturnType<typeof setUserData>

export type AuthType = {
    id: number |  null
    login: string |  null
    email: string |  null
}

const SET_USER_DATA = "SET_USER_DATA"


export const setUserData = (data: AuthType) =>
    ({type: SET_USER_DATA, data}) as const;

let initialState: AuthType = {
    id: null,
    login: null,
    email: null
}


export const authReducer = (state: AuthType = initialState, action: ActionsTypes): AuthType => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                ...action.data
            }

        default:
            return state
    }

}
