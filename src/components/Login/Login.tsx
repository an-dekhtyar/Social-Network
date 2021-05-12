import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/formControl/FormControl";
import {MaxValueCreator, required} from "../../utils/validators/validators";
import {connect} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../../redux/redux-store";

type FormDataType = {
    email: string
    password: string
    rememberMe:boolean
}
type MapDispatchToPropsType = {
    login:(email: string, password: string, rememberMe: boolean)=> void
}
type MapStateToPropsType = {
    isAuth:boolean
}
type LoginType = MapDispatchToPropsType & MapStateToPropsType
const maxValue10 = MaxValueCreator(20)

const LoginForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return(
            <form onSubmit={props.handleSubmit}>
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
                <div>
                    <button>Login</button>
                </div>
            </form>
    )
}
const LoginReduxForm = reduxForm<FormDataType>({
    form: 'login'
})(LoginForm)


const Login:React.FC<LoginType>= (props) => {
    const onSubmit = (formData:FormDataType) => {
        props.login(formData.email, formData.password, formData.rememberMe)
    }
    if (props.isAuth) {
        return <Redirect to='/profile'/>
    }
    return(
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}

const MapStateToProps = (state:AppStateType) => ({
    isAuth:state.authUserData.isAuth
})

export default connect(MapStateToProps,{login})(Login)