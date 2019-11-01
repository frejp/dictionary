// If dicationy is non processble sohw it for the user
// If there is no dictionart selected show CTA text.

import {render, fireEvent, getByTestId ,waitForElement} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import Dictionary from '../Dictionary';
import {AppContext} from '../../AppState/AppContext';
import { useReducer, useEffect } from "react";
import reducer, {initialState} from '../../AppState/AppReducer';
import * as React from "react";
import Modal from 'react-modal';

Modal.setAppElement(document.createElement('div'));

jest.mock("../DictionaryTable", () => {
    const DictionaryTable = () => <div></div>;
    return DictionaryTable;
});

jest.mock("../NewEntryForm", () => {
    const NewDictionaryForm = () => <div data-testid="newEntryForm"></div>;
    return NewDictionaryForm;
});


test("click on NewEntryForm button, open NewEntryForm", async() => {
    const value = { state: { dictionary: { nonProcessable: false, id: 1 }, dictionaries: [] } , dispatch: jest.fn()};
    const { getByTestId } = render(<AppContext.Provider value={ value }><Dictionary/></AppContext.Provider>);
    fireEvent.click(getByTestId("newEntryButton"));
    await waitForElement(
        () => getByTestId("newEntryForm"));
    expect(getByTestId("newEntryForm")).toBeVisible();
});