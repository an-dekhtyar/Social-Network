import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MypostsContain} from "./Mypost/MypostContain";
import {ProfileType} from "../../redux/profileReducer";
import { NoPostYet } from "./Mypost/NoPostYet";
import {Preloader} from "../../common/Preloader";

type ProfilePropsType = {
    profile:ProfileType | null
    status:string
    updateUserStatus:(status:string)=>void
    isOwner:boolean
    updatePhoto:(newPhoto:object)=>void
    editMode:boolean
    isFetching:boolean
}


const Profile = (props:ProfilePropsType) => {

    const {profile, status, updateUserStatus, isOwner, updatePhoto, editMode, isFetching} = props

    if (!profile || !isFetching) {

        return <Preloader/>

    }
    return (

        <div className={s.content}>

            <ProfileInfo profile={profile}
                         status={status}
                         updateUserStatus={updateUserStatus}
                         isOwner={isOwner}
                         updatePhoto={updatePhoto}
                         editMode={editMode}
            />
            {isOwner ? <MypostsContain/> : <NoPostYet/>}
        </div>
    )
}

export default Profile