import React, {useEffect, useRef, useState} from 'react'
import {API_KEY_AUTO_COMPLETE} from '../config'
import {useAppDispatch, useAppSelector} from '../app/hooks'
import {fetchCities, setError} from '../app/weatherSlice'
import {Search} from './Search'
import {IAutoCompleteCity, ICustomEvent} from '../interfaces'

export const AutoComplete: React.FC = () => {


    const isCancelled = useRef(false); // true - block update load data from autocomplete api
    const [textValue, setTextValue] = useState(''); // input data
    const [cities, setCities] = useState<IAutoCompleteCity[]>([]); // saved full collection from autocomplete api
    const [suggestions, setSuggestions] = useState<IAutoCompleteCity[]>([]); // saved only filtered data

    // the index of the drop-down list item to select using the up and down keys.
    // After pressing, the enter will return to position -1
    const [focusSuggestion, setFocusSuggestion] = useState(-1);
    const dispatch = useAppDispatch();
    const citiesFromStore = useAppSelector(state => state.weather.cities);

    useEffect(() => {
        const loadUsers = async () => {
            try {
                const response = await fetch(`https://autocomplete.geocoder.ls.hereapi.com/6.2/suggest.json?query=${encodeURIComponent(textValue)}&maxresults=20&apikey=${API_KEY_AUTO_COMPLETE}`);
                const data = await response.json();
                const suggestionsCollection = data.suggestions;

                const suggestionsFilter = cityFilter(suggestionsCollection);

                if (suggestionsFilter) {
                    setCities(suggestionsFilter);
                }
                if (!response.ok) {
                    throw new Error('Sorry, something wrong with input autocomplete')
                }
            } catch (err) {
                dispatch(setError('Sorry, something wrong with input autocomplete'));
                isCancelled.current = true;
            }
        };

        // If an error occurs while receiving data from the server,
        // then we no longer make a request to the server
        if (!isCancelled.current) {
            clearFocusSuggestion();
            clearSuggestion(textValue);
            loadUsers();
        }
        return () => {
            setCities([]);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [textValue]);


    const cityFilter = (suggestionList: IAutoCompleteCity[]) => {
        if (suggestionList) {
            return suggestionList
                .filter(suggestObj => ['district', 'city'].includes(suggestObj.matchLevel))
        }

        return suggestionList;
    };

    const clearFocusSuggestion = () => {
        if (focusSuggestion !== -1) {
            setFocusSuggestion(-1);
        }
    };

    const clearSuggestion = (textValue: string) => {
        if (!textValue.length && suggestions.length) {
            setSuggestions([]);
        }
    };

    const cityNameLayout = (suggestion: IAutoCompleteCity) => {
        const countyName = suggestion.address.county;
        const cityName = suggestion.address.city;

        return `${cityName}, ${countyName}`;
    };


    const handleChangeValue = (searchStringVal: string) => {
        setSuggestions(cities);
        setTextValue(searchStringVal);
    };

    const handleSuggestClick = (event: React.MouseEvent<HTMLOListElement>) => {
        const textClick = (event.target as HTMLInputElement).innerText;
        setTextValue(textClick);
        setSuggestions([]);
    };

    const handleClearField = () => {
        setTimeout(() => {
            setSuggestions([]);
        }, 200)
    };

    const handleKeyCatcher = (event: React.KeyboardEvent) => {
        if ((event.key === 'ArrowUp')
            && (focusSuggestion > -1)) {
            setFocusSuggestion(focusSuggestion - 1);
        }

        const maxSuggest = suggestions.length - 1;
        if ((event.key === 'ArrowDown')
            && (focusSuggestion !== maxSuggest)) {
            setFocusSuggestion(focusSuggestion + 1);
        }

        if ((event.key === 'Enter')
            && (focusSuggestion !== -1)) {
            setTextValue(cityNameLayout(suggestions[focusSuggestion]));
            handleClearField();
        }
    };

    const handleSubmitButton = (event: React.KeyboardEvent | ICustomEvent) => {
        // checking event source
        if (event.key === 'Enter' || event.currentTarget.className === 'btn search-btn') {
            // checking type of entering data
            if (textValue && !(parseInt(textValue) >= 0 || parseInt(textValue) <= 0)) {
                // checking is required city already in the store
                const isInStore = citiesFromStore.filter(item => item.name === encodeURIComponent(textValue.split(',')[0]));
                if (!isInStore.length) {
                    dispatch(fetchCities(textValue));
                    clearFocusSuggestion();
                    setTextValue('');
                    handleClearField();
                } else {
                    setTextValue('');
                    dispatch(setError('You already have such a city'))
                }
            } else {
                dispatch(setError('you enter unacceptable data'))
            }
        }
    };

    const mapSuggestion = (suggestion: IAutoCompleteCity, index: number) => {
        return <li
            className={'search-autocomplete-item ' + ((focusSuggestion === index) ? 'search-autocomplete-item-color' : '')}
            key={suggestion.locationId}
        >
            {cityNameLayout(suggestion)}
        </li>
    };

    return (
        <>
            <Search
                onChangeValue={handleChangeValue}
                onClearField={handleClearField}
                onKeyCatcher={handleKeyCatcher}
                onSubmitButton={handleSubmitButton}
                textValue={textValue}
            >
                {
                    suggestions.length
                        ? <ul
                            className="search-autocomplete"
                            onClick={handleSuggestClick}
                        >
                            {suggestions.map(mapSuggestion)}
                        </ul>
                        : null
                }
            </Search>
        </>
    );
};