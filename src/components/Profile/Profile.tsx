import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MypostsContain} from "./Mypost/MypostContain";
import { mapStatePropsProfileType } from "./ProfileContainer";
import {ProfileType} from "../../redux/profileReducer";

type ProfilePropsType = {
    profile:ProfileType | null
    status:string | null
}


const Profile = (props:ProfilePropsType) => {
    return (
        <div className={s.content}>
            <ProfileInfo profile={props.profile} status={props.status}/>
            <MypostsContain/>
        </div>
    )
}

export default Profile