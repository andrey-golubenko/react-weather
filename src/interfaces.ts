import React from 'react';

/*
export interface ICity {
    [key: string]: string | {}
    coord: {
        lon : number, // coordLat
        lat : number // coordLon
    },
    weather: [
        {
            [key: string]: string,
            icon: string,
            description: string, // weatherDescription
        }
    ],
    main: {
        [key: string]: string | number,
        temp: number, // temperature
        temp_max: number,
        temp_min: number,
        humidity: number, // humidity
        pressure: number // pressure
    },
    visibility: string,
    wind: {
        [key: string]: string | number
        speed: number, // windSpeed
    },
    clouds: {
        [key: string]: string
    },
    dt: number // date
    sys: {
        [key: string]: string
    },
    id: string,
    name: string, // cityName
    cod: string
}
*/
export interface ICity {
    [key: string]: string | {}
    coordLat : number,
    coordLon : number,
    weatherDescription: string,
    temperature: number,
    temperatureMax: number,
    temperatureMin: number,
    humidity: number,
    pressure: number,
    windSpeed: number,
    date: string,
    id: number,
    cityName: string,
    weatherIcon: string,
    isCelsius: boolean,
}

export interface IIcons {
    [key: string] : {
        label: string,
        icon: string
    }
}

export interface IOneDay {
    dt           : number,
    temp         : number,
    feels_like   : number,
    pressure     : number,
    humidity     : number,
    dew_point    : number,
    uvi          : number,
    clouds       : number,
    visibility   : number,
    wind_speed   : number,
    wind_deg     : number,
    wind_gust    : number,
    weather : [
        {
            id          : number,
            main        : string,
            description : string,
            icon        : string
        }
    ],
    elemWithMinTemp? : number
}

export interface IAutoCompleteCity  {
    label: string,
    language: string,
    countryCode: string,
    locationId: string,
    address: {
        country: string,
        state: string,
        county: string,
        city: string,
        postalCode: number
    },
    matchLevel: string
}

export interface ISearchProps {
    onChangeValue : (searchStringVal: string) => void,
    onClearField  : () => void,
    onKeyCatcher  : (event: React.KeyboardEvent) => void,
    onSubmitButton : (event: React.KeyboardEvent | ICustomEvent) => void,
    textValue     : string,
}

export interface ICustomEvent extends React.MouseEvent {
    key?: string
}

// ================ toolkit

export interface IInitWeatherSliceState {
    cities          : ICity[],
    currentLocation : string,
    status          : null | string,
    error           : null | string,
    locationError   : null | string,
    hourlyForecast  : IOneDay[]
}

