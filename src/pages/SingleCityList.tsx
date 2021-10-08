import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../app/hooks'
import {useParams} from 'react-router-dom'
import {fetchSingleCity} from '../app/weatherSlice'
import {SingleCityItem} from '../components/SingleCityItem'
import {fetchChosenCity} from '../unils/fetchChosenCity'

export const SingleCityList: React.FC = () => {

    const dispatch = useAppDispatch();
    const hourlyForecast = useAppSelector(state => state.weather.hourlyForecast);
    const {name} = useParams<{ name: string }>();

    useEffect(() => {
        fetchChosenCity(name).then(data => dispatch(fetchSingleCity({lat: data.lat, lon: data.lon})))
    }, [name, dispatch]);

    const elemWithMinTemp = Math.ceil(
        Math.min.apply(null,
            hourlyForecast.map(item => item.temp)
        )
    );

    return (
        <>
            <div className="location-banner">
                <h5 className="location-banner-heading">
                    Daily weather forecast for <b>
                    <pre>{name.toUpperCase()}</pre>
                </b>
                </h5>
            </div>
            <div className='list day-list'>
                {
                    hourlyForecast.map(item =>
                        <SingleCityItem
                            elemWithMinTemp={elemWithMinTemp}
                            key={item.dt}
                            {...item}
                        />)
                }
            </div>
        </>
    )
};