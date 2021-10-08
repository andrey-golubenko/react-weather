import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {API_KEY, API_URL} from '../config'
import {IInitWeatherSliceState} from '../interfaces'


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
            return await response.json();
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
            return await response.json();
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
                    item.main.temp = (item.main.temp * 9 / 5) + 32;
                    item.main.temp_max = (item.main.temp_max * 9 / 5) + 32;
                    item.main.temp_min = (item.main.temp_min * 9 / 5) + 32;
                    return item;
                }
                return item;
            });
        },
        toCelsius(state, action) {
            state.cities = state.cities.map((item) => {
                if (item.id === action.payload) {
                    item.main.temp = (item.main.temp - 32) * 5 / 9;
                    item.main.temp_max = (item.main.temp_max - 32) * 5 / 9;
                    item.main.temp_min = (item.main.temp_min - 32) * 5 / 9;
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
