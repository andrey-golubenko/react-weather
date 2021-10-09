import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../app/hooks'
import {fetchDataLocation} from '../utils/fetchDataLocation'
import {getCurrentLocation} from '../app/weatherSlice'
import {SuccessLocation} from './SuccessLocation'
import {ErrorLocation} from './ErrorLocation'

export const Banner: React.FC = () => {

    const dispatch = useAppDispatch();
    const locationError = useAppSelector(state => state.weather.locationError);

    const location = async () => {
        const getLocation = await fetchDataLocation();
        dispatch(getCurrentLocation(getLocation))
    };

    useEffect(() => {
        location();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {locationError ? <ErrorLocation/> : <SuccessLocation/>}
        </>
    )
};
