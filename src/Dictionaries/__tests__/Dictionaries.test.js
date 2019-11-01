import {render, fireEvent, getByTestId ,waitForElement} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect"
import Dictionaries from '../Dictionaries';
import {AppContext} from '../../AppState/AppContext';
import { useReducer, useEffect } from "react";
import reducer, {initialState} from '../../AppState/AppReducer';
import * as React from "react";
import Modal from 'react-modal';
Modal.setAppElement(document.createElement('div'));

jest.mock("../NewDictionaryForm", () => {
    const NewDictionaryForm = () => <div data-testid="newDictionaryForm"></div>;
    return NewDictionaryForm;
});

test("click on New Dictionary button open NewDictionaryForm ", async() => {
    const value = { state: { dictionaries: [], dictionary: {} } , dispatch: jest.fn()};
    const { getByTestId } = render(<AppContext.Provider value={ value }><Dictionaries /></AppContext.Provider>);
    fireEvent.click(getByTestId("newDictionaryButton"));
    await waitForElement(
        () => getByTestId("newDictionaryForm"));
    expect(getByTestId("newDictionaryForm")).toBeVisible();
});