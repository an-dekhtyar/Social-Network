import React, {ChangeEvent, useEffect, useState} from "react";
import s from './ProfileInfo.module.css'
import {editIcon} from "./ProfileInfo";


type ProfileStatusType = {
    status:string
    updateUserStatus:(status:string)=>void
    isOwner: boolean
}


export const ProfileStatusWithHooks = (props:ProfileStatusType) => {

    let [status, setStatus] = useState<string>(props.status)
    let [editMode, setEditmode] = useState<boolean>(false)
    useEffect(()=>{
        setStatus(props.status)
    },[props.status])


    let activateEditMode = () => {
        setEditmode(true)
    }
    let deactivateEditMode = () => {
        setEditmode(false)
        props.updateUserStatus(status)
    }
    let changeStatusHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value)
    }

    return (
        <div>
            {!editMode &&
            <div className={s.status}>
                <span>{props.status || '--------'}</span>
                {props.isOwner && <div className={s.editIcon} onClick={activateEditMode} style={editIcon}>
                </div>}
            </div>
            }
            {editMode &&
            <div className={s.editInput}>
                <input value={status} onChange={changeStatusHandler} onBlur={deactivateEditMode} autoFocus/>
            </div>
            }
        </div>
    )
}



export default ProfileStatusWithHooks