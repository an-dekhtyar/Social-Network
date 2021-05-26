import React, {ChangeEvent, useEffect, useState} from "react";


type ProfileStatusType = {
    status:string
    updateUserStatus:(status:string)=>void
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
            <div>
                <span onDoubleClick={activateEditMode}>{props.status || '--------'}</span>
            </div>
            }
            {editMode &&
            <div>
                <input value={status} onChange={changeStatusHandler} onBlur={deactivateEditMode} autoFocus/>
            </div>
            }
        </div>
    )
}



export default ProfileStatusWithHooks