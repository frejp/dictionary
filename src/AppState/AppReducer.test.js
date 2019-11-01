import React, { useReducer } from "react";
import reducer from './AppReducer'
import { renderHook, act } from '@testing-library/react-hooks';

export const initialState = {
    dictionary: {name: 'apa', id: 1},
    dictionaries: [
        {
            id: 1, entries: [
            {
                domain: 'apa',
                range: 'johan',
                "validation": ""
            },
        ]
        }
    ]
};

it('delete dictionary', () => {
    const expectedState = {
        dictionary: {},
        dictionaries: []
    };
    const newEntryAction = ({type: 'DELETE_DICTIONARY', dictionary: {name: 'apa', id: 1}});
    const { result } = renderHook(() => useReducer(reducer, initialState));
    const [, dispatch] = result.current;
    act(() => {
        dispatch(newEntryAction);
    })
    expect(result.current[0]).toEqual(expectedState);
})

it('add new entry to dictionary', () => {
    const expectedState = {
        dictionary: {name: 'apa', id: 1, "validated": false},
        dictionaries: [{id: 1, entries: [{id: 1, domain: 'apa', range: 'johan', "validation": ""}, {id: 2, domain: 'ja', range: 'nej', "validation": ""},]}]
    };
    const newEntryAction = ({type: 'ADD_ENTRY_TO_DICTIONARY', entry: {domain: 'ja', range: 'nej', id: 2}});
    const { result } = renderHook(() => useReducer(reducer, initialState));
    const [, dispatch] = result.current;
    act(() => {
        dispatch(newEntryAction);
    })
    expect(result.current[0]).toEqual({"dictionaries": [{"entries": [{"domain": "apa", "range": "johan", "validation": ""}, {"domain": "ja", "id": 2, "range": "nej", "validation": ""}], "id": 1}], "dictionary": {"id": 1, "name": "apa", "validated": false}});
})


it('change entry in dictionary', () => {
    const initialState = {
        dictionary: {name: 'apa', id: 1, entries: [{id: 1, domain: 'apa', range: 'johan', "validation": ""}, {id: 2, domain: 'ja', range: 'nej', "validation": ""},]},
        dictionaries: [{id: 1, entries: [{id: 1, domain: 'apa', range: 'johan', "validation": ""}, {id: 2, domain: 'ja', range: 'nej', "validation": ""},]}]
    };
    const expectedState = {
        dictionary: {name: 'apa', id: 1, entries: [{id: 1, domain: 'apa', range: 'johan', "validation": ""}, {id: 2, domain: 'ja', range: 'nej', "validation": ""},], validated: false},
        dictionaries: [{id: 1, entries: [{id: 1, domain: 'apa', range: 'johan', "validation": ""}, {id: 2, domain: 'ja', range: 'nej'},]}]
    };
    const newEntryAction = ({type: 'CHANGE_ENTRY_IN_DICTIONARY', entry: {id: 2, domain: 'ja', range: 'nej'}});
    const { result } = renderHook(() => useReducer(reducer, initialState));
    const [, dispatch] = result.current;
    act(() => {
        dispatch(newEntryAction);
    })
    expect(result.current[0]).toEqual(expectedState);
})