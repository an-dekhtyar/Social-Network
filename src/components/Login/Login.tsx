import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";

type FormDataType = {
    login: string
    password: string
    rememberMe:boolean
}

const LoginForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return(
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field
                        placeholder={'Login'}
                        component={'input'}
                        name={'login'}
                        // type={"text"}
                        // title={"Login"}
                    />
                </div>
                <div>
                    <Field
                        placeholder={'Password'}
                        component={'input'}
                        name={'password'}
                        // type={"text"}
                        // title={"password"}

                    />
                </div>
                <div>
                    <Field type={'checkbox'}
                           component={'input'}
                           name={'rememberMe'}
                           // title={"checkbox"}
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



const Login = () => {
    const onSubmit = (formData:FormDataType) => {
        console.log(formData)
    }
    return(
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit}/>
        </div>
    )
}
export default Login