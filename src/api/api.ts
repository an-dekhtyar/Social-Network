import axios from "axios"
import {ProfileType} from "../redux/profileReducer";

const instance = axios.create({
    baseURL: `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials: true,
    headers: {"API-KEY": "05d9bcdd-f837-4b7d-a2a0-c9d433328199"}
})


export const userAPI = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get(`users?page=${currentPage}&count=${pageSize}`, {
            withCredentials: true
        })
            .then(response => response.data)
    },

    changeUsersPage(page: number, pageSize: number) {
        return instance.get(`users?page=${page}&count=${pageSize}`, {
            withCredentials: true
        })
            .then(response => response.data)
    }
}


export const profileAPI = {
    selectUser(userId: string) {
        return instance.get(`profile/${userId}`)
            .then(response => response.data)
    },
    getUserStatus(userId: string) {
        return instance.get(`profile/status/${userId}`)
            .then(response => response.data)
    },
    updateStatus(status: string) {
        return instance.put(`profile/status`, {status: status})
    },
    savePhoto(image: any) {
        const formData = new FormData();
        formData.append("image", image);
        return instance.put('profile/photo',formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    },
    changeProfile(profileData:ProfileType){
        return instance.put('profile',profileData)
    }
}

export const authAPI = {
    getAuthUserData() {
        return instance.get(`auth/me`)
            .then(response => response.data)
    },
    login(email: string, password: string, rememberMe: boolean = false, captcha:string | null = null) {
        console.log("rememberMe",rememberMe)
        return instance.post('auth/login', {email, password, rememberMe, captcha})
    },
    logout() {
        return instance.delete('auth/login')

    }
}


export const followAPI = {
    onFollow(id: number) {
        return instance.post(`follow/` + id, {},)
            .then(response => response.data)
    },

    onUnFollow(id: number) {
        return instance.delete(`follow/` + id,)
            .then(response => response.data)
    }
}

export const securityAPI = {
    getCaptcha() {
        return instance.get(`security/get-captcha-url`)
            .then(response => response.data.url)
    },
}

