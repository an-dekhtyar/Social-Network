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
    fullName: string
    status: string
    location: LocationType
    urlImage: string
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
    users: [{
        id: 1,
        fullName: 'Andrey',
        followed: true,
        location: {country: 'Belarus', city: 'Minsk'},
        status: 'Life is life',
        urlImage: "https://pbs.twimg.com/profile_images/488616487197106177/xIFT8idk.jpeg"
    },
        {
            id: 2,
            fullName: 'Dima',
            followed: true,
            location: {country: 'Russia', city: 'Moscow'},
            status: 'dont cry!',
            urlImage:  "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
        },
        {
            id: 3,
            fullName: 'Sasha',
            followed: true,
            location: {country: 'Ukraine', city: 'Kiev'},
            status: 'got is king',
            urlImage: "https://i.pinimg.com/originals/d5/28/70/d52870bf3c60d63d304a589f395e6a86.png"
        },
        {
            id: 4,
            fullName: 'Olga',
            followed: true,
            location: {country: 'Belarus', city: 'Minsk'},
            status: 'sport is life',
            urlImage:  "https://bohnice.cz/wp-content/uploads/2020/05/avatarka.jpg"
        },
        {
            id: 5,
            fullName: 'Sveta',
            followed: true,
            location: {country: 'Belarus', city: 'Minsk'},
            status: 'pam pam',
            urlImage:  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTE1vTzqH-MVVPtDn_aoZ-5Jm_ibot1uqH9VQ&usqp=CAU"
        }]

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