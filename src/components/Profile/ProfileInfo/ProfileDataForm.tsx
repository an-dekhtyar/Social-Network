import React from "react";
import {Contact } from "./ProfileInfo";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../../common/formControl/FormControl";
import {required} from "../../../utils/validators/validators";
import {ProfileType} from "../../../redux/profileReducer";
import s from "./ProfileInfo.module.css"
import style from "../../../common/formControl/FormControl.module.css";

export type ProfileDataPropsType = {
    profile: ProfileType
    isOwner?:boolean
    setEditMode:(editMode:boolean)=>void
}
export  type FormDataType = {}
export  type IProps = {
    profile: ProfileType,
    initialValues: ProfileType
}


 const ProfileForm: React.FC<InjectedFormProps<FormDataType, IProps> & IProps> = ({profile,error,handleSubmit}) => {



    return(
        <form onSubmit={handleSubmit}>
            <div>
                <button>Save</button>
            </div>
            {error && <div className={style.commonAuthError}>{error}</div>}
            <div>
                <b>Name</b>:
                <Field
                    placeholder={'Name'}
                    component={Input}
                    name={'fullName'}
                    validate={[]}
                />
            </div>
            <div>
                <b>About me</b>:
                <Field
                placeholder={'About me'}
                component={Input}
                name={'aboutMe'}
                validate={[]}
            />
            </div>
            <div>
                <b>Looking for a job</b>:
                <Field
                    placeholder={'Looking for a job'}
                    component={Input}
                    name={'lookingForAJob'}
                    type={'checkbox'}
                    checked={profile.lookingForAJob}
                />
            </div>
            <div>
                <b>My professional skills</b>:
                <Field
                    placeholder={'My professional skills'}
                    component={Input}
                    name={'lookingForAJobDescription'}
                    validate={[]}
                />
            </div>
            <div>
                <b>Contacts</b> : {Object.keys(profile.contacts).map(key =>
                <div>
                <b>{key}:</b> <Field
                    component={Input}
                    name={`contacts[${key}]`}
                    validate={[]}
                />
                </div>
            )}
            </div>
        </form>
    )
}

const ProfileDataForm = reduxForm<FormDataType, IProps>({
    form: 'edit-profile'
})(ProfileForm)

export default ProfileDataForm