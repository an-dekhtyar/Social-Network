import {ActionsTypes} from "./redux-store"


export type UsersPageReducerType =
    ReturnType<typeof follow>
    | ReturnType<typeof unfollow>
    | ReturnType<typeof setUsers>
    | ReturnType<typeof setCurrentPage>
    | ReturnType<typeof setTotalCount>
    | ReturnType<typeof toggleIsFetching>
    | ReturnType<typeof toggleIsFollowing>

export type UserPageType = {
    users: Array<UserItemType>
    currentPage: number
    totalCount: number
    pageSize: number
    isFetching: boolean
    followingInProgress: number[]
}

export type UserItemType = {
    id: number
    followed: boolean
    name: string
    status: string | null
    photos: AxiosUsersPhotoType
}

export type AxiosUsersResponceType = {
    items: Array<UserItemType>
    totalCount: number
    error: number | null
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
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE"
const SET_TOTAL_COUNT = "SET_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS"

export const follow = (userID: number) =>
    ({type: FOLLOW, userID}) as const;
export const unfollow = (userID: number) =>
    ({type: UNFOLLOW, userID}) as const;
export const setUsers = (users: Array<UserItemType>) =>
    ({type: SET_USERS, users}) as const;
export const setCurrentPage = (currentPage: number) =>
    ({type: SET_CURRENT_PAGE, currentPage}) as const;
export const setTotalCount = (totalCount: number) =>
    ({type: SET_TOTAL_COUNT, totalCount}) as const
export const toggleIsFetching = (isFetching: boolean) =>
    ({type: TOGGLE_IS_FETCHING, isFetching}) as const;
export const toggleIsFollowing = (isFetching: boolean, userId:number) =>
    ({type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}) as const;

let initialState: UserPageType = {
    users: [],
    currentPage: 1,
    totalCount: 0,
    pageSize: 5,
    isFetching: true,
    followingInProgress:[]
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
                users: [...action.users]
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalCount: action.totalCount
            }
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            return {
                ...state,
                followingInProgress: action.isFetching
                    ? [...state.followingInProgress, action.userId]
                    : state.followingInProgress.filter(f => f !== action.userId)
            }
        default:
            return state
    }

}