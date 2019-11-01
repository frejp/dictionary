import React, { useContext } from "react";
import { AppContext } from '../AppState/AppContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import styled, { css } from "styled-components/macro";

const leftBorder = css`
    border-left-color: #6c6c6c;
    border-left-style: solid;
    border-left-width: 2px;
`

const RowWrapper = styled.ul`
    display: flex;
    padding: 0;
    margin: 0;
    border-bottom: 1px solid #e1e4e8;
    ${(props) => (props).isSelected ? leftBorder : ''}
    ${(props) => (props).isSelected ? {color: 'black'} : ''}
    & :first-child {
    border-color:
    border-top: 0;
    border-top-radius: 2px;
    }
`;

const DictionaryLink = styled.a`
    color: black;
    font-size: 14px;
    text-align: left;
    background: none;
    border: none;
    flex: 1;
    padding: 10px;
    text-decoration: none;
`;


const DeleteButton = styled.button`
    background: none;
    border: none;
    padding: 5px;
    flex: 0;
    padding: 12px;
`;

const DictionaryRow = ({dictionary}) => {

    const { state, dispatch } = useContext(AppContext);

    const selectDictionary = (e) => {
        e.preventDefault();
        dispatch({type: 'SET_DICTIONARY', dictionary: dictionary})
    }

    const deleteDictionary = () => {
        dispatch({type: 'DELETE_DICTIONARY', dictionary: dictionary})
    }

    return (<nav>
        <RowWrapper isSelected={state.dictionary.id === dictionary.id ? true: false}>
        <DictionaryLink href='/' data-testid="selectDictionary" aria-label="select dictionary" onClick={selectDictionary}>{dictionary.name}</DictionaryLink>
        <span style={{flex: '0'}}>
        <DeleteButton data-testid="deleteDictionary" aria-label="delete dictionary"
                onClick={deleteDictionary}>
            <FontAwesomeIcon size="1x" icon={faTrashAlt}/>
        </DeleteButton></span>
    </RowWrapper>
    </nav>)

}

export default DictionaryRow