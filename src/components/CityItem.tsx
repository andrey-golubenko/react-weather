import React from 'react'
import {ICity} from '../interfaces'
import {useAppDispatch} from '../app/hooks'
import {
    toCelsius,
    toFahrenheit,
    fetchCityUpdate,
    deleteCity
} from '../app/weatherSlice'
import {ReactComponent as IconDelete} from '../media/iconDelete.svg'


export const CityItem: React.FC<ICity> = (props) => {

    const {
        id = 0,
        cityName = '',
        date = '',
        temperature = 0,
        temperatureMin = 0,
        temperatureMax = 0,
        humidity = 0,
        pressure = 0,
        description = '',
        weatherIcon = '',
        windSpeed = 0,
        isCelsius = true
    } = props;

    const dispatch = useAppDispatch();


    const updateToCelsius = (event: React.MouseEvent) => {
        if (!isCelsius) {
            dispatch(toCelsius(id));
        }
        event.preventDefault();
    };

    const updateToFahrenheit = (event: React.MouseEvent) => {
        if (isCelsius) {
            dispatch(toFahrenheit(id));
        }
        event.preventDefault();
    };

    const updateSingleCity = (event: React.MouseEvent) => {
        dispatch(fetchCityUpdate(cityName));
        event.preventDefault()
    };

    const deleteCityItem = (event: React.MouseEvent) => {
        dispatch(deleteCity(id));
        event.preventDefault()
    };

    let activeDegreeCel = '';
    let activeDegreeFar = '';
    if (isCelsius) {
        activeDegreeCel = 'active-degree'
    } else {
        activeDegreeFar = 'active-degree'
    }

    return (
        <div className="card">
            <div className="card-content">
                <div className="card-geo-data">
                    <span className="card-title">{cityName}</span>
                    <span className="card-title">{date}</span>
                </div>
                <div className="card-temperature">
                    <div className="card-temperature-degrees">
                        <span>
                            {Math.round(temperature)}
                        </span>
                    </div>
                    <div className="card-temperature-measure">
                        <div className="temperature-measure-kind">
                            <span
                                className={`temperature-measure-cel  ${activeDegreeCel}`}
                                onClick={updateToCelsius}
                            >°C</span>
                            <div className="temperature-measure-delimiter"/>
                            <span
                                className={`temperature-measure-far  ${activeDegreeFar}`}
                                onClick={updateToFahrenheit}
                            >°F</span>
                        </div>
                        <div className="temperature-measure-minmax">
                            <div className="temperature-measure-max">
                                <span className="temperature-mark">↑</span>
                                <p className="temperature-text">
                                    <span>
                                        {Math.round(temperatureMax)}
                                    </span>
                                </p>
                                <span className="temperature-unit">
                                    {isCelsius ? '°C' : '°F'}
                                </span>
                            </div>
                            <div className="temperature-measure-min">
                                <span className="temperature-mark">↓</span>
                                <p className="temperature-text">
                                    <span>
                                        {Math.round(temperatureMin)}
                                    </span>
                                </p>
                                <span className="temperature-unit">
                                    {isCelsius ? '°C' : '°F'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-details">
                    <div className="card-details-wrap">
                        <span className="details-icon">
                            <i className={weatherIcon}/>
                        </span>
                        <div className="detail-description">
                            {description}
                        </div>
                    </div>
                    <div className="detail-box">
                        <div className="detail-indicator">
                            <div className="detail-info">
                                    <span>
                                        {windSpeed}
                                    </span>
                                <span className="detail-measure">m/s</span>
                            </div>
                            <div className="detail-name">wind speed</div>
                        </div>
                        <div className="detail-indicator">
                            <div className="detail-info">
                                    <span>
                                        {humidity}
                                    </span>
                                <span className="detail-measure">%</span>
                            </div>
                            <div className="detail-name">humidity</div>
                        </div>
                        <div className="detail-indicator">
                            <div className="detail-info">
                                    <span>
                                        {pressure}
                                    </span>
                                <span className="detail-measure">hpa</span>
                            </div>
                            <div className="detail-name">pressure</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-action">
                <button
                    className="btn"
                    onClick={updateSingleCity}
                >update
                </button>
                <div
                    className="removal-tool"
                    onClick={deleteCityItem}
                >
                    <IconDelete className="city-delete"/>
                </div>
            </div>
        </div>
    )
};