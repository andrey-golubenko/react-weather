import {API_KEY, API_URL} from '../config'

export async function fetchChosenCity(cityName: string) {

    const response = await fetch(`${API_URL}weather?q=${cityName}&appid=${API_KEY}`);
    if (!response.ok && response.status !== 404) {
        throw new Error('Server responded with an error')
    }
    const data = await response.json();
    return await data.coord
}