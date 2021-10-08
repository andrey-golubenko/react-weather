import React from 'react'
import styles from './Success.module.css'
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {resetError} from '../../app/weatherSlice'


export const Success: React.FC = () => {
    const hasError = useAppSelector(state => state.weather.error);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.successMessage} role="alert">
            <span
                className={styles.closeSuccessMessage}
                onClick={() => {
                    dispatch(resetError())
                }}
            >&#10006;</span>
            <p>{hasError} Check entering data and try again, please !</p>
        </div>
    )
};