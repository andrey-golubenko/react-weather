import {API_KEY_LOCATION} from '../config'

export const fetchDataLocation = async () => {
    let locationInfo = '';

    try {
        const response = await fetch(`https://ipinfo.io/json?token=${API_KEY_LOCATION}`);
        const data = await response.json();
        locationInfo = data.city;
        if (!response.ok) {
            throw new Error('Location is not defined')
        }
    } catch (error) {
        console.log(error)
    }

    return locationInfo
};