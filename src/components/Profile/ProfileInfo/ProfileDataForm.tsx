import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../../common/formControl/FormControl";
import {ProfileType} from "../../../redux/profileReducer";
import s from "./ProfileDataForm.module.css"
import style from "../../../common/formControl/FormControl.module.css";
import { MaxValueCreator } from "../../../utils/validators/validators";

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
const maxValueCreator20 = MaxValueCreator(20)

 const ProfileForm: React.FC<InjectedFormProps<FormDataType, IProps> & IProps> = ({profile,error,handleSubmit}) => {



    return(
        <div className={s.profileDataFormBlock}>
        <form onSubmit={handleSubmit}>
            <div className={s.buttonContain}>

            </div>

            <div className={s.headerForm}>
                <div className={s.title}>Main information</div>
                <button className={s.button}>Save</button>
            </div>
            <div className={s.forError}>
            {error && <div className={style.commonAuthError}>{error}</div>}
            </div>
            <div className={s.contactsInput}>
                <label htmlFor={'fullName'}>Name</label>
                <Field
                    component={Input}
                    name={'fullName'}
                    validate={[maxValueCreator20]}
                />
            </div>
            <div className={s.contactsInput}>
                <label htmlFor={'aboutMe'}>About me</label>
                <Field
                component={Input}
                name={'aboutMe'}
                validate={[maxValueCreator20]}
            />
            </div>

            <div className={s.contactsInput}>
                <label htmlFor={'lookingForAJobDescription'}>My professional skills</label>
                <Field
                    component={Input}
                    name={'lookingForAJobDescription'}
                    validate={[maxValueCreator20]}
                />
            </div>
            <div className={s.checkbox}>

                <Field
                    component={Input}
                    name={'lookingForAJob'}
                    type={'checkbox'}
                    initialValue={profile.lookingForAJob}
                />

            </div>
            <span className={s.lookingJob}>Looking for a job</span>
            <div>
                <div className={s.title}>Contacts</div>{Object.keys(profile.contacts).map(key =>
                <div className={s.contactsInput}>
                <label htmlFor={`contacts[${key}]`}>{key}</label> <Field
                    component={Input}
                    name={`contacts[${key}]`}
                    validate={[maxValueCreator20]}
                />
                </div>
            )}
            </div>
        </form>
        </div>
    )
}

const ProfileDataForm = reduxForm<FormDataType, IProps>({
    form: 'edit-profile'
})(ProfileForm)

export default ProfileDataForm