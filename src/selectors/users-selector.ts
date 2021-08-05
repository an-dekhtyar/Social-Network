
import { AppStateType } from '../redux/redux-store'
import { UserItemType } from '../redux/usersReducer'

export const getUsers = (state:AppStateType):Array<UserItemType> => {
    return state.usersPageState.users
}
export const getCurrentPage = (state:AppStateType):number => {
    return state.usersPageState.currentPage
}
export const getTotalCount = (state:AppStateType):number => {
    return state.usersPageState.totalCount
}
export const getPageSize = (state:AppStateType):number => {
    return state.usersPageState.pageSize
}
export const getIsFetchingValue = (state:AppStateType):boolean => {
    return state.usersPageState.isFetching
}
export const getFollowInProgresValue = (state:AppStateType):number[] => {
    return state.usersPageState.followingInProgress
}
export const getIsAuthValue = (state:AppStateType):boolean => {
    return state.authUserData.isAuth
}