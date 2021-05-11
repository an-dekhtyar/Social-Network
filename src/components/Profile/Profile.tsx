import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MypostsContain} from "./Mypost/MypostContain";
import {ProfileType} from "../../redux/profileReducer";

type ProfilePropsType = {
    profile:ProfileType | null
    status:string
    updateUserStatus:(status:string)=>void
}


const Profile = (props:ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status} updateUserStatus={props.updateUserStatus}/>
            <MypostsContain/>
        </div>
    )
}

export default Profile