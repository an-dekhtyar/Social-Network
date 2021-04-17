import React from "react";
import { Preloader } from "../../../common/Preloader";
import { mapStatePropsProfileType } from "../ProfileContainer";
import s from "./ProfileInfo.module.css"

type ProfileInfoType = mapStatePropsProfileType


const  ProfileInfo = (props:ProfileInfoType) => {
    debugger
    if (!props.profile){
        return <Preloader/>
    }

    return (
        <div>
            <div className={s.profileInfoImg}>
                <img src='https://draft.gr/wp-content/uploads/sites/56/2018/12/1200-x-300-website-sliders-china-man.jpg'/>
            </div>
            <div className={s.profileInfoBlock}>
                <img src={props.profile.photos.large?props.profile.photos.large:'' }/>
                <span>{props.profile.aboutMe}</span>

            </div>
        </div>
    )
}


export default ProfileInfo