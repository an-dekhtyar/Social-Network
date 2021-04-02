import {ActionsTypes} from "./redux-store"


export type UsersPageReducerType =
    ReturnType<typeof followAC>
    | ReturnType<typeof unfollowAC>
    | ReturnType<typeof setUsersAC>

export type UserPageType = {
    users: Array<UserItemType>
}

export type UserItemType = {
    id: number
    followed: boolean
    name: string
    status: string | null
    photos: AxiosUsersPhotoType
}

export type AxiosUsersResponceType = {
    items:Array<UserItemType>
    totalCount:number
    error:number | null
}

export type AxiosUsersPhotoType = {
    small: string | null
    large: string | null
}

export type LocationType = {
    city: string
    country: string
}

const FOLLOW = "FOLLOW"
const UNFOLLOW = "UNFOLLOW"
const SET_USERS = "SET-USERS"

export const followAC = (userID: number) =>
    ({type: FOLLOW, userID}) as const;
export const unfollowAC = (userID: number) =>
    ({type: UNFOLLOW, userID}) as const;
export const setUsersAC = (users: Array<UserItemType>) =>
    ({type: SET_USERS, users}) as const;
;


let initialState: UserPageType = {
    users: []

}

export const userReducer = (state: UserPageType = initialState, action: ActionsTypes): UserPageType => {
    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: true}
                    }
                    return u
                })
            }
        case UNFOLLOW:

            return {
                ...state,
                users: state.users.map(u => {
                    if (u.id === action.userID) {
                        return {...u, followed: false}
                    }
                    return u
                })
            }
        case SET_USERS:

            return {
                ...state,
                users: [...state.users, ...action.users]
            }

        default:
            return state
    }

}