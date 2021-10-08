import React from 'react'
import styles from './Alert.module.css'
import {useAppDispatch, useAppSelector} from '../../app/hooks'
import {resetError} from '../../app/weatherSlice'


export const Alert: React.FC = () => {
    const hasError = useAppSelector(state => state.weather.error);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.alertMessage} role="alert">
            <span
                className={styles.closeWarningMessage}
                onClick={() => {
                    dispatch(resetError())
                }}
            >&#10006;</span>
            An error occurred : {hasError} ! We work on this. Try again latter, please.
        </div>
    )
};