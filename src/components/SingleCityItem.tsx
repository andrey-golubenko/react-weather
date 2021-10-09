import React from 'react'
import {getHourlyTime} from '../utils/getHourlyTime'
import {IOneDay} from '../interfaces'
import {getWeatherDate} from '../utils/getWeatherDate'


export const SingleCityItem: React.FC<IOneDay> = (props) => {

    const {
        dt = 0,
        temp = 0,
        pressure = 0,
        humidity = 0,
        wind_speed = 0,
        weather: [
            {
                description = '',
                icon = ''
            }
        ],
        elemWithMinTemp
    } = props;

    const time = getHourlyTime(dt);
    const date = getWeatherDate(dt);
    const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    const integerTemp = Math.ceil(temp);


    const setStyles = (): {} => {

        const boxShadowPlus = `0 0 40px rgba(${250 - (100 - integerTemp * 10)},  ${220 - (100 - integerTemp * 12)}, 0, ${1 - (integerTemp / 100 + .4)}) inset`;

        const boxShadowMinus = `0 0 40px rgba(${250 - (100 - integerTemp * 12)},  ${255 - (100 - integerTemp * 8)}, 250, ${1 - (integerTemp / 100 + .3)}) inset`;

        const diffTemp = (integerTemp - elemWithMinTemp!) * 12;
        const bottom = diffTemp + 'px';

        if (integerTemp > 0) {
            return {
                boxShadow: boxShadowPlus,
                bottom: bottom,
            }
        } else {
            return {
                boxShadow: boxShadowMinus,
                bottom: bottom,
            }
        }
    };


    return (
        <div className="card day-card">
            <div className="card-content card-content-day">
                <div className="card-geo-data card-geo-data-day">
                    <h5>{time}</h5>
                    <p>{date}</p>
                </div>
                <div className="card-temperature-day">
                    <div className="temperature-day"
                         style={setStyles()}
                    >
                        <span>
                            {
                                (temp > 0) ?
                                    `+${integerTemp}°C` :
                                    `${integerTemp}°C`}
                        </span>
                    </div>
                </div>
            </div>
            <div className="card-details card-details-day">
                <div className="card-details-wrap">
                        <span className="details-icon">
                            <img src={iconSrc} alt=""/>
                        </span>
                    <div className="detail-description-day">
                        {description}
                    </div>
                </div>
                <div className="detail-box detail-box-day">
                    <div className="detail-indicator">
                        <div className="detail-info">
                                    <span>
                                        {wind_speed}
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
    )
};