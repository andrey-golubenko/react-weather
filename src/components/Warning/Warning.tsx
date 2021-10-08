import React from 'react'
import styles from './Warning.module.css'
import {useAppSelector, useAppDispatch} from '../../app/hooks'
import {resetError} from '../../app/weatherSlice'


export const Warning: React.FC = () => {
    const hasError = useAppSelector(state => state.weather.error);
    const dispatch = useAppDispatch();

    return (
        <div className={styles.warningMessage} role="alert">
            <span
                className={styles.closeWarningMessage}
                onClick={() => {
                    dispatch(resetError())
                }}
            >&#10006;</span>
            <p>Unfortunately, {hasError}. Check entering data and try again, please !</p>
        </div>
    )
};