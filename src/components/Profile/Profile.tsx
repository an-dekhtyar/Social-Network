import React from "react";
import s from './Profile.module.css'
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import {StoreType} from "../../redux/store";
import {MypostsContain} from "./Mypost/MypostContain";

type ProfilePropsType={
    store:StoreType

}


const Profile:React.FC<ProfilePropsType> = (props) => {
    return (
        <div className={s.content}>
            <ProfileInfo/>
            <MypostsContain store={props.store}/>

        </div>
    )
}

export default Profile