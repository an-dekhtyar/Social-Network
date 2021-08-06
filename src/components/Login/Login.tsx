import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Checkbox, Input} from "../../common/formControl/FormControl";
import {MaxValueCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {NavLink, Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import style from '../../common/formControl/FormControl.module.css'
import s from './Login.module.css'


type FormDataType = {
    email: string
    password: string
    rememberMe: boolean
    captcha:string
    captchaUrl:string | null
}
type IpropsType = {
    captchaUrl:string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha:string) => void
}
type MapStateToPropsType = {
    isAuth: boolean
    captchaUrl:string | null
}
type LoginType = MapDispatchToPropsType & MapStateToPropsType
const maxValue10 = MaxValueCreator(20)

const LoginForm: React.FC<InjectedFormProps<FormDataType, IpropsType> & IpropsType> = ({handleSubmit, error, captchaUrl}) => {
    return (
        <div className={s.loginPageContent}>
        <form onSubmit={handleSubmit}>
            <h2>Sing In</h2>
            <div className={s.superInput}>
                <label htmlFor={'email'}>Email</label>
                <Field
                    component={Input}
                    name={'email'}
                    validate={[required, maxValue10]}
                />
            </div>
            <div>
                <label htmlFor={'password'}>Password</label>
                <Field
                    component={Input}
                    name={'password'}
                    type='password'
                    validate={[required, maxValue10]}

                />
            </div>
            <div className={style.checkbox}>
                <Field type={'checkbox'}
                       component={Checkbox}
                       name={'rememberMe'}
                />
                <span className={s.rememberMe}>Remember me</span>
            </div>
            {error && <div className={style.commonAuthError}>{error}</div>}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <Field
                placeholder={'Symbols from image'}
                component={Input}
                name={'captcha'}
                validate={[required]}

            />}
                 <button className={s.loginButton}>Sing in</button>

                <div className={s.singUp}>
            <div>Don't have an account?</div>
            <a href={'https://social-network.samuraijs.com/signUp'}>Sing up</a>
            </div>
        </form>
            </div>
    )
}

const LoginReduxForm = reduxForm<FormDataType, IpropsType>({
    form: 'login'
})(LoginForm)


const Login: React.FC<LoginType> = (props) => {
    const onSubmit = (formData: FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe, formData.captcha)
    }
    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }
    return (
        <div className={s.loginPageContainer}>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const MapStateToProps = (state: AppStateType) => ({
    isAuth: state.authUserData.isAuth,
    captchaUrl:state.authUserData.captchaUrl
})

export default connect(MapStateToProps, {login})(Login)