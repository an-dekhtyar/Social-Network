import {WrappedFieldProps} from "redux-form";
import style from './FormControl.module.css'

export const FormControl:React.FC<WrappedFieldProps> = ({ input, meta,...props }) => {

    const hasError = meta.touched && meta.error

    return (
        <div className={`${style.formControl} ${hasError ? style.error : ''}`}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}
export const TextArea = (props:WrappedFieldProps) => {
    const { input, meta,...restProps } = props
    return <FormControl {...props}><textarea {...input} {...restProps}/></FormControl>

}
export const Input = (props:WrappedFieldProps) => {
    const { input, meta,...restProps } = props
    return <FormControl {...props}><input {...input} {...restProps}/></FormControl>

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
