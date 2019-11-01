import React, {useContext, useState} from "react";
import styled from 'styled-components';
import { Tr , Td} from '../SharedComponents'
import { AppContext } from '../AppState/AppContext'
import {GenericModal} from '../SharedComponents'
import {ValidationInformationText} from './ValidationInformationText'
import {ValidationColumn} from './ValidationColumn'
import {DeleteRowColumn} from './DeleteRowColumn'

const InputInTd = styled.input`
    display: block;
    width: 100%;
    height: 100%;
    padding: 10px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border: none;  /* if you want no box around the input field */
`;

export const DictionaryRow = ({row}) => {

    const { dispatch } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onInputChangeDomain = (event) => {
        event.preventDefault();
        dispatch({
            type: 'CHANGE_ENTRY_IN_DICTIONARY',
            entry: {...row,range: row.range, domain: event.target.value, id: row.id}
        })
        dispatch({type: 'UPDATE_SELECTED_DICTIONARY'})
    }

    const onInputChangeRange = (event) => {
        event.preventDefault();
        dispatch({
            type: 'CHANGE_ENTRY_IN_DICTIONARY',
            entry: {...row,range: event.target.value, domain: row.domain, id: row.id}
        })
        dispatch({type: 'UPDATE_SELECTED_DICTIONARY'})
    }

    const onInputDeleteDictionary = (event) => {
        event.preventDefault();
        dispatch({type: 'DELETE_ENTRY_IN_DICTIONARY', entry: row})
        dispatch({type: 'UPDATE_SELECTED_DICTIONARY'})
    }

    const showInfoModal = (event) => {
        event.preventDefault();
        setIsModalOpen(true)
    }

    return (
        <Tr>
            <Td>
                <InputInTd onChange={onInputChangeDomain} value={row.domain}/>
            </Td>
            <Td>
                <InputInTd onChange={onInputChangeRange} value={row.range}/>
            </Td>
            <ValidationColumn showInfoModal={showInfoModal} row={row}/>
            <DeleteRowColumn row={row} onInputDeleteDictionary={onInputDeleteDictionary}/>
            <GenericModal title={'Validation Information'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
                <ValidationInformationText />
            </GenericModal>
        </Tr>
    )
}

export default DictionaryRow