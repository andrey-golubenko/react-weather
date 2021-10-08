import React from 'react'
import {useAppSelector} from '../app/hooks'
import {Warning} from './Warning/Warning'
import {ISearchProps} from '../interfaces'

export const Search: React.FC<ISearchProps> = (props) => {
    const {
        children,
        onChangeValue = () => {},
        onClearField = () => {},
        onKeyCatcher = () => {},
        onSubmitButton = () => {},
        textValue
    } = props;

    const hasError = useAppSelector(state => state.weather.error);

    const onChangeInputVal = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChangeValue(event.target.value)
    };


    return (
        <>
            <div className='row'>
                <div className="input-field search-field">
                    <input
                        required
                        type="search"
                        placeholder="Search City"
                        onKeyDown={onKeyCatcher}
                        onKeyPress={onSubmitButton}
                        onChange={onChangeInputVal}
                        onBlur={onClearField}
                        value={textValue}
                    />
                    <button
                        className="btn search-btn"
                        onClick={onSubmitButton}
                    >Search
                    </button>
                    {
                        children
                    }
                </div>
            </div>
            {
                hasError === 'you enter unacceptable data'
                && <Warning/>
            }
        </>
    )
};
