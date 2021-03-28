import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {MypostsContain} from "./Mypost/MypostContain";




const Profile = () => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MypostsContain
                //store={props.store}
            />

        </div>
    )
}

export default Profile