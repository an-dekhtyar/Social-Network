import React from "react";
import { Preloader } from "../../../common/Preloader";
import s from "./ProfileInfo.module.css"
import {ProfileType} from "../../../redux/profileReducer";
import ProfileStatus from "./ProfileStatus";

type ProfileInfoType = {
    profile:ProfileType | null
    status: string
    updateUserStatus:(status:string)=>void
}


const  ProfileInfo = (props:ProfileInfoType) => {
    if (!props.profile){
        return <Preloader/>
    }

    return (
        <div>
            {/*<div className={s.profileInfoImg}>
                <img src='https://draft.gr/wp-content/uploads/sites/56/2018/12/1200-x-300-website-sliders-china-man.jpg'/>
            </div>*/}
            <div className={s.profileInfoBlock}>
                <img src={props.profile.photos.large?props.profile.photos.large:'' }/>
                <ProfileStatus status={props.status} updateUserStatus={props.updateUserStatus}/>
                <span>{props.profile.aboutMe}</span>


            </div>
        </div>
    )
}


export default ProfileInfo