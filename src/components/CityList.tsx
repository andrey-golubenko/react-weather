import React from 'react'
import {Link} from 'react-router-dom'
import {useAppSelector} from '../app/hooks'
import {CityItem} from './CityItem'


export const CityList: React.FC = () => {

    const cities = useAppSelector(state => state.weather.cities);

    const listClass = ['list'];
    if (cities.length <= 2) {
        listClass.push('single-item-list')
    }

    return (
        <div className={listClass.join(' ')}>
            {
                cities.map(item =>
                    <Link
                        to={`/cities/${item.name.toLowerCase()}`}
                        key={item.id}
                    >
                        <CityItem {...item} />
                    </Link>)
            }
        </div>
    )
};