import {WrappedFieldProps} from "redux-form";
import style from './FormControl.module.css'
import s from "../../components/Login/Login.module.css";
import React from "react";

export const FormControl:React.FC<WrappedFieldProps> = ({ input, meta,...props }) => {

    const hasError = meta.touched && meta.error

    return (
        <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
            <div>
                {props.children}
            </div>
            {hasError && <div className={s.error}>{meta.error}</div>}
        </div>
    )
}
export const TextArea = (props:WrappedFieldProps) => {
    const { input, meta,...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>

}
export const Input = (props:WrappedFieldProps) => {
    const { input, meta,...restProps } = props
    return <FormControl {...props}><input className={style.superInput} {...input} {...restProps}/></FormControl>

}
export const Checkbox = (props:WrappedFieldProps) => {
    const { input, meta,...restProps } = props
    return <FormControl {...props}><input className={style.superCheckBox} type={'checkbox'} {...input} {...restProps}/>
    {/*<span className={style.rememberMe}>Remember me</span>*/}
    </FormControl>

}
/*

const Element = (Element:string ):React.FC<WrappedFieldProps> => ({ input, meta, ...props }) => {

    const hasError = meta.touched && meta.error;

    return (

        <div className={ s.formControl + " " + (hasError ? s.error : "") }>

            <Element {...input} {...props} />

            { hasError && <span> { meta.error } </span> }

        </div>

    );

};*/
