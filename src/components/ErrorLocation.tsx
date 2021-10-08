import React from 'react'

export const ErrorLocation: React.FC = () => {

    return (
        <div className="error-location-spoiler">
            <h5 className="location-spoiler-heading">
                Unfortunately, we could not determine your current city. </h5>
            <p className="location-spoiler-text">
                To view the current weather in your or another city, enter its name in the field below.
            </p>
        </div>
    )
};
