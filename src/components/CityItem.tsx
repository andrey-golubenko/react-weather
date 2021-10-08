import React, {useState} from 'react'
import {ICity} from '../interfaces'
import {useAppDispatch} from '../app/hooks'
import {getWeatherDate} from '../unils/getWeatherDate'
import {
    toCelsius,
    toFahrenheit,
    fetchCityUpdate,
    deleteCity
} from '../app/weatherSlice'
import {iconsMark} from '../unils/iconsMark'
import {ReactComponent as IconDelete} from '../media/iconDelete.svg'


export const CityItem: React.FC<ICity> = (props) => {

    const {
        id = 0,
        name = '',
        dt = 0,
        main = {
            temp: 0,
            temp_max: 0,
            temp_min: 0,
            humidity: 0,
            pressure: 0,
        },
        weather = [
            {
                icon: '',
                description: ''
            }
        ],
        wind = {speed: 0}
    } = props;

    const [degreeMetricCel, setDegreeMetricCel] = useState<boolean>(true);

    const date = getWeatherDate(dt);
    const weatherIcon = iconsMark(+weather[0].id);

    const dispatch = useAppDispatch();

    const updateToCelsius = (event: React.MouseEvent) => {
        if (!degreeMetricCel) {
            dispatch(toCelsius(id));
            setDegreeMetricCel(prevState => !prevState);
        }
        event.preventDefault();
    };

    const updateToFahrenheit = (event: React.MouseEvent) => {
        if (degreeMetricCel) {
            dispatch(toFahrenheit(id));
            setDegreeMetricCel(prevState => !prevState);
        }
        event.preventDefault();
    };

    const updateSingleCity = (event: React.MouseEvent) => {
        dispatch(fetchCityUpdate(name));
        event.preventDefault()
    };

    const deleteCityItem = (event: React.MouseEvent) => {
        dispatch(deleteCity(id));
        event.preventDefault()
    };

    let activeDegreeCel = '';
    let activeDegreeFar = '';
    if (degreeMetricCel) {
        activeDegreeCel = 'active-degree'
    } else {
        activeDegreeFar = 'active-degree'
    }

    return (
        <div className="card">
            <div className="card-content">
                <div className="card-geo-data">
                    <span className="card-title">{name}</span>
                    <span className="card-title">{date}</span>
                </div>
                <div className="card-temperature">
                    <div className="card-temperature-degrees">
                        <span>
                            {Math.round(main.temp)}
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
                                        {Math.round(main.temp_max)}
                                    </span>
                                </p>
                                <span className="temperature-unit">
                                    {degreeMetricCel ? '°C' : '°F'}
                                </span>
                            </div>
                            <div className="temperature-measure-min">
                                <span className="temperature-mark">↓</span>
                                <p className="temperature-text">
                                    <span>
                                        {Math.round(main.temp_min)}
                                    </span>
                                </p>
                                <span className="temperature-unit">
                                    {degreeMetricCel ? '°C' : '°F'}
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
                            {weather[0].description}
                        </div>
                    </div>
                    <div className="detail-box">
                        <div className="detail-indicator">
                            <div className="detail-info">
                                    <span>
                                        {wind.speed}
                                    </span>
                                <span className="detail-measure">m/s</span>
                            </div>
                            <div className="detail-name">wind speed</div>
                        </div>
                        <div className="detail-indicator">
                            <div className="detail-info">
                                    <span>
                                        {main.humidity}
                                    </span>
                                <span className="detail-measure">%</span>
                            </div>
                            <div className="detail-name">humidity</div>
                        </div>
                        <div className="detail-indicator">
                            <div className="detail-info">
                                    <span>
                                        {main.pressure}
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