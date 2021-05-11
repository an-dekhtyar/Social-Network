import React from "react";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {Input} from "../../common/formControl/FormControl";
import {MaxValueCreator, required} from "../../utils/validators/validators";

type FormDataType = {
    login: string
    password: string
    rememberMe:boolean
}
const maxValue10 = MaxValueCreator(10)

const LoginForm:React.FC<InjectedFormProps<FormDataType>> = (props) => {
    return(
            <form onSubmit={props.handleSubmit}>
                <div>
                    <Field
                        placeholder={'Login'}
                        component={Input}
                        name={'login'}
                        validate={[required, maxValue10]}
                        // type={"text"}
                        // title={"Login"}
                    />
                </div>
                <div>
                    <Field
                        placeholder={'Password'}
                        component={Input}
                        name={'password'}
                        validate={[required, maxValue10]}
                        // type={"text"}
                        // title={"password"}

                    />
                </div>
                <div>
                    <Field type={'checkbox'}
                           component={Input}
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