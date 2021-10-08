import React, {useEffect} from 'react'
import {useAppDispatch, useAppSelector} from '../app/hooks'
import {fetchCities, setLocationError} from '../app/weatherSlice'
import {fetchDataLocation} from '../unils/fetchDataLocation'
import {Preloader} from '../components/Preloader'
import {Alert} from '../components/Alert/Alert'
import {Warning} from '../components/Warning/Warning'
import {Success} from '../components/Success/Success'
import {CityList} from '../components/CityList'
import {Banner} from '../components/Banner'
import {AutoComplete} from '../components/AutoComplete'


export const Home: React.FC = () => {

    const dispatch = useAppDispatch();
    const statusIs = useAppSelector(state => state.weather.status);
    const hasError = useAppSelector(state => state.weather.error);
    const locationError = useAppSelector(state => state.weather.locationError);
    const cities = useAppSelector(state => state.weather.cities);
    const currentCity = useAppSelector(state => state.weather.currentLocation);


    useEffect(() => {
        if ((cities.length < 1) && !currentCity) {
            const localStore: string [] = JSON.parse(localStorage.getItem('citiesList')!);

            if (localStore && localStore.length !== 0) {
                const getSavedCities = async () => {
                    for (let item of localStore) {
                        await dispatch(fetchCities(item))
                    }
                };
                getSavedCities()
            } else {
                fetchDataLocation()
                    .then(locationInfo => locationInfo ?
                        dispatch(fetchCities(locationInfo)) :
                        dispatch(setLocationError('Location is not defined'))
                    );
            }
        }
    }, [cities.length, currentCity, dispatch]);

    useEffect(() => {
        const citiesNames = cities.map(item => item.name);
        citiesNames.length
            ? localStorage.setItem('citiesList', JSON.stringify(citiesNames))
            : localStorage.clear();
    }, [cities]);


    return (
        <>
            <Banner/>
            <AutoComplete />
            {statusIs === 'loading' && <Preloader/>}
            {
                (hasError === 'Server responded with an error'
                    && !locationError)
                && <Alert/>
            }
            {hasError === 'such city not found' && <Warning/>}
            {hasError === 'You already have such a city'
                && <Success/>}
            <CityList/>
        </>
    )
};
