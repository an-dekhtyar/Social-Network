import axios from "axios"

const instance = axios.create({
    baseURL:`https:https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {"API-KEY": "05d9bcdd-f837-4b7d-a2a0-c9d433328199"}
})


export const userAPI = {
    getUsers (currentPage: number, pageSize: number) {

        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${pageSize}`, {
            withCredentials: true
        })
            .then(responce => responce.data)
    },

    changeUsersPage (page: number, pageSize: number) {

        return instance.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${pageSize}`, {
            withCredentials: true
        })
            .then(responce => responce.data)
    }
}


export const profileAPI = {
    selectUser (userId: string) {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/profile/` + userId)
            .then(responce => responce.data)
    }

}

export const authAPI = {
    getAuthUserData () {
        return instance.get(`https://social-network.samuraijs.com/api/1.0/auth/me`, {
            withCredentials: true
        })
            .then(responce => responce.data)
    }
}


export const followAPI = {
    onFollow (id:number) {
        return instance.post(`https://social-network.samuraijs.com/api/1.0/follow/` + id, {}, {
            withCredentials: true
        })
            .then(responce => responce.data)
    },

    onUnFollow (id:number) {
        return instance.delete(`https://social-network.samuraijs.com/api/1.0/follow/` + id, {
            withCredentials: true,
        })
            .then(responce => responce.data)
    }
}
