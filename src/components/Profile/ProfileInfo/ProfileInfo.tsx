import React, {ChangeEvent, useState} from "react";
import {Preloader} from "../../../common/Preloader";
import s from "./ProfileInfo.module.css"
import {changeProfileData, ContactsType, ProfileType, toggleEditMode} from "../../../redux/profileReducer";
import userPhoto from "../../../assets/images/userPhoto.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {useDispatch} from "react-redux";


type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    updatePhoto: (newPhoto: object) => void
    editMode:boolean
}


const ProfileInfo = (props: ProfileInfoType) => {

    //const [editMode, setEditMode] = useState(false)
    const dispatch = useDispatch()

    const {profile, status, updateUserStatus, isOwner, updatePhoto, editMode} = props
    if (!profile) {
        return <Preloader/>
    }

    const userImg = {
        backgroundImage: `url(${profile.photos.large || userPhoto})`,
    };
    const onSavePhotoHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            updatePhoto(e.target.files[0])
        }
    }
    const onSubmitEdit = (formData:any) => {
        dispatch(changeProfileData(formData))
    }

    return (
        <div>
            <div className={s.profileInfoBlock}>
                <div className={s.photo} style={userImg}/>
                <ProfileStatusWithHooks status={status} updateUserStatus={updateUserStatus}/>
                {isOwner && <input type={'file'} onChange={onSavePhotoHandler}/>}
                {!editMode
                    ?<ProfileData profile={profile} isOwner={isOwner}/>
                    :<ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmitEdit}/>}

            </div>
        </div>
    )
}

type ContactsPropsType = {
    contactTitle:string
    contactValue:string
}
export type ProfileDataPropsType = {
    profile: ProfileType
    isOwner?:boolean
}

export const Contact = (props:ContactsPropsType) => {
    return(
        <div className={s.contact}>
            <b>{props.contactTitle}</b>: {props.contactValue}
        </div>
    )
}

export const ProfileData = (props:ProfileDataPropsType) => {

    let {profile, isOwner} = props
    const dispatch = useDispatch()
    const editModeHandler = () => {
        dispatch(toggleEditMode(true))
    }

    return(
        <div>
            {isOwner && <div>
                <button onClick={editModeHandler}>Edit</button>
            </div>}
            <div>
                <b>Name</b>: {profile.fullName}
            </div>
            <div>
                <b>About me</b>: {profile.aboutMe}
            </div>
            <div>
                <b>Looking for a job</b>: {profile.lookingForAJob ? 'Yes' : 'No'}
            </div>
            <div>
                <b>My professional skills</b>: {profile.lookingForAJobDescription}
            </div>
            <div>
                <b>Contacts</b> : {Object.keys(profile.contacts).map(key =>
                <Contact contactTitle={key} contactValue={profile.contacts[key]}/>)}
            </div>
        </div>
    )
}


export default ProfileInfo