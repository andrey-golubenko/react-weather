import React from 'react'
import {useAppSelector} from '../app/hooks'

export const SuccessLocation: React.FC = () => {

    const currentCity = useAppSelector(state => state.weather.currentLocation);

    return (
        <>
            {
                currentCity &&
                <div className="location-banner">
                    <h5 className="location-banner-heading">
                        Your current city is <b>{currentCity || 'undefined'}</b> and
                        you {currentCity ? 'can' : 'can\'t'} view current weather in it below.
                    </h5>
                    <p className="location-banner-text">
                        Also, to view the current weather in another city, enter its name in the field below.
                    </p>
                </div>
            }
        </>
    )
};
