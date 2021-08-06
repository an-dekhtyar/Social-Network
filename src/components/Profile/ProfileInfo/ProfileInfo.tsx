import React, {ChangeEvent} from "react";
import {Preloader} from "../../../common/Preloader";
import s from "./ProfileInfo.module.css"
import p from "./ProfileDataForm.module.css"
import {changeProfileData, ProfileType, toggleEditMode} from "../../../redux/profileReducer";
import userPhoto from "../../../assets/images/userPhoto.png"
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataForm from "./ProfileDataForm";
import {useDispatch} from "react-redux";
import {faCamera} from "@fortawesome/free-solid-svg-icons";
import icon from "../../../assets/images/edit.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";



type ProfileInfoType = {
    profile: ProfileType | null
    status: string
    updateUserStatus: (status: string) => void
    isOwner: boolean
    updatePhoto: (newPhoto: object) => void
    editMode: boolean
}

export const editIcon = {
    backgroundImage: `url(${icon})`
}
const ProfileInfo = (props: ProfileInfoType) => {


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
    const onSubmitEdit = (formData: any) => {
        dispatch(changeProfileData(formData))
    }

    return (
        <div className={s.profileContainer}>
            <div className={s.profileInfoBlock}>
                <div className={s.photo} style={userImg}/>
                {isOwner &&
                <div className={s.wrapper}>
                    <div className={s.fileUpload}>
                        <input type="file" onChange={onSavePhotoHandler}/>
                        <FontAwesomeIcon icon={faCamera} size={"1x"}/>
                    </div>
                </div>}
            </div>
            <div>
                <div className={s.userName}>{profile.fullName}</div>
                <ProfileStatusWithHooks isOwner={isOwner} status={status} updateUserStatus={updateUserStatus}/>
                {!editMode
                    ? <ProfileData profile={profile} isOwner={isOwner}/>
                    : <ProfileDataForm profile={profile} initialValues={profile} onSubmit={onSubmitEdit}/>}
            </div>

        </div>
    )
}

type ContactsPropsType = {
    contactTitle: string
    contactValue: string
}
export type ProfileDataPropsType = {
    profile: ProfileType
    isOwner?: boolean
}

export const Contact = (props: ContactsPropsType) => {
    return (
        <div >
            <span className={s.contact}>{props.contactTitle}</span>: {props.contactValue}
        </div>
    )
}

export const ProfileData = (props: ProfileDataPropsType) => {

    let {profile, isOwner} = props
    const dispatch = useDispatch()
    const editModeHandler = () => {
        dispatch(toggleEditMode(true))
    }

    return (
        <div className={s.userInfo}>
            <div className={s.informationBlock}>
                <div className={p.title}>
                    Main information
                </div>
                {isOwner && <div className={s.editIcon} onClick={editModeHandler} style={editIcon}>
                </div>}</div>


            <div>
                <span className={s.contact}>About me</span>: {profile.aboutMe}
            </div>
            <div>
                <span className={s.contact}>Looking for a job</span>: {profile.lookingForAJob ? 'Yes' : 'No'}

                </div>
            <div>
                <span className={s.contact}>My skills</span>: {profile.lookingForAJobDescription}

            </div>
            <div>
                <div className={p.title}>Contacts</div> {Object.keys(profile.contacts).map(key =>
                <Contact contactTitle={key} contactValue={profile.contacts[key]}/>)}
            </div>
        </div>
    )
}


export default ProfileInfo