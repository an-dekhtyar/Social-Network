import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/formControl/FormControl";
import {MaxValueCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";
import style from '../../common/formControl/FormControl.module.css'


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
        <form onSubmit={handleSubmit}>
            <div>
                <Field
                    placeholder={'Email'}
                    component={Input}
                    name={'email'}
                    validate={[required, maxValue10]}
                />
            </div>
            <div>
                <Field
                    placeholder={'Password'}
                    component={Input}
                    name={'password'}
                    type='password'
                    validate={[required, maxValue10]}

                />
            </div>
            <div>
                <Field type={'checkbox'}
                       component={Input}
                       name={'rememberMe'}
                />
            </div>
            {error && <div className={style.commonAuthError}>{error}</div>}
            {captchaUrl && <img src={captchaUrl}/>}
            {captchaUrl && <Field
                placeholder={'Symbols from image'}
                component={Input}
                name={'captcha'}
                validate={[required]}

            />}
            <div>
                <button>Login</button>
            </div>
        </form>
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
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl}/>
        </div>
    )
}

const MapStateToProps = (state: AppStateType) => ({
    isAuth: state.authUserData.isAuth,
    captchaUrl:state.authUserData.captchaUrl
})

export default connect(MapStateToProps, {login})(Login)