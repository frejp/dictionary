import {render, fireEvent, getById ,waitForElement} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import NewDictionaryForm from '../NewDictionaryForm';
import {AppContext} from '../../AppState/AppContext';
import { useReducer, useEffect } from "react";
import reducer, {initialState} from '../../AppState/AppReducer';
import * as React from "react";
import Modal from 'react-modal';
Modal.setAppElement(document.createElement('div'));

test("Click on select link will dispatch SET_DICTIONARY ie select a dictionary", async() => {
    const dictionary = {"id": "4733e730-fb9a-11e9-8227-75b55a1d636e", "name": "ffsd", "entries": []};
    const dispatch = jest.fn();
    const setModalIsOpen = jest.fn();
    const value = {dispatch: dispatch};
    const { getByTestId , getByText} = render(<AppContext.Provider value={ value }><NewDictionaryForm
        setIsModalOpen={setModalIsOpen}
        onSubmit={dictionary}/></AppContext.Provider>);
    fireEvent.change(getByTestId("dictionaryName"), {target: {value: 'name'}})
    fireEvent.click(getByTestId("save"))
    expect(dispatch).toBeCalledWith({type: 'ADD_NEW_DICTIONARY', name: 'name'});
});

