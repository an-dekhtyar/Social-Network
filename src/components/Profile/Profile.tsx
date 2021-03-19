import React from "react";
import s from './Profile.module.css'
import Myposts from "./Mypost/Myposts";
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {ActionsTypes, newTextPostValueType, ProfilePageType} from "../../redux/store";

type ProfilePropsType={
    profilePageState:ProfilePageType
    newTextPostValue:string
    dispatch:(action:ActionsTypes)=>void

}


const Profile:React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <Myposts
                posts={props.profilePageState.posts}
                newTextPostValue={props.newTextPostValue}
                dispatch = {props.dispatch}
            />
        </div>
    )
}

export default Profile