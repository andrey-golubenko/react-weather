import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {API_KEY, API_URL} from '../config'
import {IInitWeatherSliceState} from '../interfaces'
import {getWeatherDate} from '../unils/getWeatherDate';
import {iconsMark} from '../unils/iconsMark';


const initialState: IInitWeatherSliceState = {
    cities: [],
    currentLocation: '',
    status: null,
    error: null,
    locationError: null,
    hourlyForecast: []
};

export const fetchCities = createAsyncThunk(
    'cities/fetchCurrentCities',
    async function (searchingCity: string, {rejectWithValue}) {
        try {
            const response = await fetch(`${API_URL}weather?q=${searchingCity}&units=metric&appid=${API_KEY}`);
            if (!response.ok && response.status !== 404) {
                throw new Error('Server responded with an error');
            } else if (response.status === 404) {
                throw new Error('such city not found');
            }
            const data = await response.json();

            return {
                temperature: data.main.temp,
                temperatureMax: data.main.temp_max,
                temperatureMin: data.main.temp_min,
                date: getWeatherDate(data.dt),
                cityName: data.name,
                windSpeed: data.wind.speed,
                humidity: data.main.humidity.toFixed(0),
                pressure: data.main.pressure.toFixed(0),
                weatherDescription: (data.weather[ 0 ].description).toUpperCase(),
                weatherIcon: iconsMark(data.weather[ 0 ].id),
                coordLat: data.coord.lat,
                coordLon: data.coord.lon,
                isCelsius: true,
                id: data.id
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchCityUpdate = createAsyncThunk(
    'cities/fetchCityUpdate',
    async function (cityName: string, {rejectWithValue}) {
        try {
            const response = await fetch(`${API_URL}weather?q=${cityName}&units=metric&appid=${API_KEY}`);
            if (!response.ok && response.status !== 404) {
                throw new Error('Server responded with an error');
            }
            const data = await response.json();

            return {
                temperature: data.main.temp,
                temperatureMax: data.main.temp_max,
                temperatureMin: data.main.temp_min,
                date: getWeatherDate(data.dt),
                cityName: data.name,
                windSpeed: data.wind.speed,
                humidity: data.main.humidity.toFixed(0),
                pressure: data.main.pressure.toFixed(0),
                weatherDescription: (data.weather[ 0 ].description).toUpperCase(),
                weatherIcon: iconsMark(data.weather[ 0 ].id),
                coordLat: data.coord.lat,
                coordLon: data.coord.lon,
                isCelsius: true,
                id: data.id
            }
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchSingleCity = createAsyncThunk(
    'hourlyForecast/fetchSingleCity',
    async function (cityGeoData: { lat: number, lon: number }, {rejectWithValue}) {
        try {
            const response = await fetch(`${API_URL}onecall?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&exclude=current,minutely,daily,alerts&units=metric&appid=${API_KEY}`);
            if (!response.ok) {
                throw new Error('Server responded with an error');
            }
            const allData = await response.json();
            const data = await allData.hourly.slice(0, 24).filter((item: {}, index: number) => {
                if (index % 3 === 0) {
                    return item;
                }
                return null;
            });
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setError(state, action) {
            state.error = action.payload;
        },
        resetError(state) {
            state.error = null;
        },
        getCurrentLocation(state, action) {
            state.currentLocation = action.payload;
        },
        setLocationError(state, action) {
            state.locationError = action.payload;
        },
        toFahrenheit(state, action) {
            state.cities = state.cities.map((item) => {
                if (item.id === action.payload) {
                    item.isCelsius = false;
                    item.temperature = (item.temperature*9/5)+32;
                    item.temperatureMax = (item.temperatureMax*9/5)+32;
                    item.temperatureMin = (item.temperatureMin*9/5)+32;
                    return item;
                }
                return item;
            });
        },
        toCelsius(state, action) {
            state.cities = state.cities.map((item) => {
                if (item.id === action.payload) {
                    item.isCelsius = true;
                    item.temperature = (item.temperature-32)*5/9;
                    item.temperatureMax = (item.temperatureMax-32)*5/9;
                    item.temperatureMin = (item.temperatureMin-32)*5/9;
                    return item;
                }
                return item;
            });
        },
        deleteCity(state, action) {
            state.cities = state.cities.filter(
                item => item.id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCities.pending, (state) => {
            state.status = 'loading';
            state.error = null;
        })
            .addCase(fetchCities.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.cities.push(action.payload);
            })
            .addCase(fetchCities.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(fetchCityUpdate.pending, (state) => {
                state.error = null;
            })
            .addCase(fetchCityUpdate.fulfilled, (state, action) => {
                state.cities = state.cities.map((item) => {
                    if (item.id === action.payload.id) {
                        item = action.payload;
                        return item;
                    }
                    return item;
                });
            })
            .addCase(fetchCityUpdate.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            })
            .addCase(fetchSingleCity.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchSingleCity.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.hourlyForecast = action.payload;
            })
            .addCase(fetchSingleCity.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload as string;
            });
    }
});

export const {
    setError,
    resetError,
    getCurrentLocation,
    setLocationError,
    toFahrenheit,
    toCelsius,
    deleteCity
} = weatherSlice.actions;

export const weatherReducer = weatherSlice.reducer;
