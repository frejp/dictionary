import {render, fireEvent, getByTestId ,waitForElement} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import DictionaryRow from '../DictionaryRow';
import {AppContext} from '../../AppState/AppContext';
import { useReducer, useEffect } from "react";
import reducer, {initialState} from '../../AppState/AppReducer';
import * as React from "react";
import Modal from 'react-modal';
Modal.setAppElement(document.createElement('div'));

test("Click on select link will dispatch SET_DICTIONARY ie select a dictionary", async() => {
    const dictionary =  {"id":"4733e730-fb9a-11e9-8227-75b55a1d636e","name":"ffsd","entries":[]};
    const dispatch = jest.fn();
    const value = { state: { dictionaries: [], dictionary: {"id":"4733e730-fb9a-11e9-8227-75b55a1d636e","name":"ffsd","entries":[] }} , dispatch: dispatch};
    const { getByTestId } = render(<AppContext.Provider value={ value }><DictionaryRow dictionary={dictionary}/></AppContext.Provider>);
    fireEvent.click(getByTestId("selectDictionary"));
    expect(dispatch).toBeCalledWith({type: 'SET_DICTIONARY', dictionary: dictionary});
});

test("Click on delete button will dispatch DELETE_DICTIONARY ie delete a dictionary", async() => {
    const dictionary =  {"id":"4733e730-fb9a-11e9-8227-75b55a1d636e","name":"ffsd","entries":[]};
    const dispatch = jest.fn();
    const value = { state: { dictionaries: [], dictionary: {"id":"4733e730-fb9a-11e9-8227-75b55a1d636e","name":"ffsd","entries":[] }} , dispatch: dispatch};
    const { getByTestId } = render(<AppContext.Provider value={ value }><DictionaryRow dictionary={dictionary}/></AppContext.Provider>);
    fireEvent.click(getByTestId("deleteDictionary"));
    expect(dispatch).toBeCalledWith({type: 'DELETE_DICTIONARY', dictionary: dictionary});
});
