import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setErrorNotification } from '../../redux/appReducer'
import s from './ErrorWindow.module.css'

type ErrorWindowType = {
    error:string
}

export const ErrorWindow = (props:ErrorWindowType) => {

    const dispatch = useDispatch()
    const closeNotiffHandler = () => {
        dispatch(setErrorNotification(''))
    }

    useEffect(()=>{
        setTimeout(()=>{
            dispatch(setErrorNotification(''))
        },5000)
    },[dispatch])

    return(
        <div className={s.container} >
            <div className={s.errorMessage}>
                {props.error}
            </div>
            <div className={s.closeIcon}>
                <FontAwesomeIcon style={{color:'#fff'}} icon={faTimes} size={"1x"} onClick={closeNotiffHandler}  />
            </div>
        </div>
    )
}