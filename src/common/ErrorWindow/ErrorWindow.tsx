import s from './ErrorWindow.module.css'

type ErrorWindowType = {
    error:string
}

export const ErrorWindow = (props:ErrorWindowType) => {

    return(
        <div className={s.container} >
          <div className={s.errorMessage}>
              {props.error}
          </div>
        </div>
    )
}