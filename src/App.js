import React, { useReducer, useEffect } from "react";
import styled from 'styled-components';
import Dictionary from './Dictionary/Dictionary';
import Dictionaries from './Dictionaries/Dictionaries'
import reducer, {initialState} from './AppState/AppReducer';
import {AppContext} from './AppState/AppContext';
import store from 'store';
import { validateDictionary } from './ValidationEngine/ValidationEngine'

const Header = styled.header`
    background: gray;
    width: 100%;
    height: 10px;
`;

const MainWrapper = styled.main`
    display: flex;
`;

function App() {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (store.get('state')) {
            dispatch({type: 'SET_STATE_FROM_LOCAL_STORAGE', dictionary: store.get('state')})
        }
    }, []);

    useEffect(() => {
        if (state.dictionary.entries && !state.dictionary.validated) {
            const validation = validateDictionary(state.dictionary.entries);
            const validatedDictionary = {...state.dictionary, entries: validation.validatedDictionary}
            dispatch({type: 'SET_VALIDATED_DICTIONARY', validatedDictionary: validatedDictionary})
            dispatch({type: 'SET_DICTIONARY_IS_NON_PROCESSABLE', nonProcessable: validation.nonProcessable})
        }
        store.set('state', state);
    }, [state]);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            <div className="App">
                <Header></Header>
                <MainWrapper>
                    <Dictionaries></Dictionaries>
                    <Dictionary></Dictionary>
                </MainWrapper>
            </div>
        </AppContext.Provider>
    );
}
export default App;