import React from "react";
import s from "./ProfileInfo.module.css"


const  ProfileInfo = () => {
    return (
        <div>
            <div className={s.profileInfoImg}>
                <img src='https://draft.gr/wp-content/uploads/sites/56/2018/12/1200-x-300-website-sliders-china-man.jpg'/>
            </div>
            <div className={s.profileInfoBlock}>
                ava + discription
            </div>
        </div>
    )
}

export default ProfileInfo