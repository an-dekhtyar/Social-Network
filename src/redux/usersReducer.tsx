import {ActionsTypes} from "./redux-store"
import {followAPI, userAPI} from "../api/api";
import {Dispatch} from "redux";

import {updateObjectInArray} from './../utils/validators/object-helper'

export type UsersPageReducerType =
    followSuccessType
    | unFollowSuccessType
    | setUsersType
    | setCurrentPageType
    | setTotalCountType
    | toggleIsFetchingType
    | toggleIsFollowingType

export type followSuccessType = ReturnType<typeof followSuccess>
export type unFollowSuccessType = ReturnType<typeof unfollowSuccess>
export type setUsersType = ReturnType<typeof setUsers>
export type setCurrentPageType = ReturnType<typeof setCurrentPage>
export type setTotalCountType = ReturnType<typeof setTotalCount>
export type toggleIsFetchingType = ReturnType<typeof toggleIsFetching>
export type toggleIsFollowingType = ReturnType<typeof toggleIsFollowing>



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

const FOLLOW = "social-network/user-reducer/FOLLOW"
const UNFOLLOW = "social-network/user-reducer/UNFOLLOW"
const SET_USERS = "social-network/user-reducer/SET-USERS"
const SET_CURRENT_PAGE = "social-network/user-reducer/SET_CURRENT_PAGE"
const SET_TOTAL_COUNT = "social-network/user-reducer/SET_TOTAL_COUNT"
const TOGGLE_IS_FETCHING = "social-network/user-reducer/TOGGLE_IS_FETCHING"
const TOGGLE_IS_FOLLOWING_PROGRESS = "social-network/user-reducer/TOGGLE_IS_FOLLOWING_PROGRESS"

export const followSuccess = (userID: number) =>
    ({type: FOLLOW, userID}) as const;
export const unfollowSuccess = (userID: number) =>
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
    pageSize: 8,
    isFetching: true,
    followingInProgress:[]
}

export const userReducer = (state: UserPageType = initialState, action: ActionsTypes): UserPageType => {
    switch (action.type) {
        case FOLLOW:

            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: true})
            }
        case UNFOLLOW:

            return {
                ...state,
                users: updateObjectInArray(state.users, action.userID, 'id', {followed: false})
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


export const requestUsers = (currentPage:number, pageSize:number) => async (dispatch:Dispatch<UsersPageReducerType>) => {
    dispatch(toggleIsFetching(true))
    let data = await userAPI.getUsers(currentPage, pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalCount(data.totalCount))

}

export const changeUsersPage = (page:number, pageSize:number) => async (dispatch:Dispatch<UsersPageReducerType>) =>{
    dispatch(toggleIsFetching(true))
    dispatch(setCurrentPage(page))
    let data = await userAPI.changeUsersPage(page,pageSize)
    dispatch(toggleIsFetching(false))
    dispatch(setUsers(data.items))

}


export const follow = (userId:number) => async (dispatch:Dispatch<UsersPageReducerType>) => {

    dispatch(toggleIsFollowing(true, userId))
    let data = await followAPI.onFollow(userId)
    if (data.resultCode === 0) {
        dispatch(followSuccess(userId))
    }
    dispatch(toggleIsFollowing(false, userId))
}

export const unfollow = (userId:number) => async (dispatch:Dispatch<UsersPageReducerType>) => {

    dispatch(toggleIsFollowing(true, userId))
    let data = await followAPI.onUnFollow(userId)
    if (data.resultCode === 0) {
        dispatch(unfollowSuccess(userId))
    }
    dispatch(toggleIsFollowing(false, userId))
}
