import React, { useContext, useState }  from 'react';
import styled from "styled-components/macro";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { PrimaryButton, ButtonWithIconText, Heading2, SpacingYS} from '../SharedComponents'
import { AppContext } from '../AppState/AppContext'
import {GenericModal} from '../SharedComponents'
import DictionaryRow from './DictionaryRow'
import NewDictionaryForm from './NewDictionaryForm'

const DictionaryWrapper = styled.div`
     flex: 0;
     margin-left: 2%;
     margin-top: 20px;
     padding-right: 5%;
     border-right:1px solid #efefef;
     height: 99vh;
`;

const NavList = styled.nav`
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    border: 1px solid #e1e4e8;
    width: 20%;
    min-width: 200px;
    border-radius: 3px;
`;

export const Dictionaries = () => {

    const { state } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onNewDictionaryClick = () => {
        setIsModalOpen(true)
    }

    return (
        <DictionaryWrapper>
            <Heading2>Dictionaries</Heading2>
            <SpacingYS />
            <PrimaryButton data-testid="newDictionaryButton" onClick={onNewDictionaryClick}>
                <FontAwesomeIcon icon={faStethoscope}/>
                <ButtonWithIconText >New Dictionary</ButtonWithIconText>
            </PrimaryButton>
            <SpacingYS />
            <NavList>
                {state.dictionaries && state.dictionaries.map((dictionary) => <DictionaryRow dictionary={dictionary}></DictionaryRow>)}
            </NavList>
            <GenericModal title={'Add New Dictionary'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
                <NewDictionaryForm setIsModalOpen={setIsModalOpen}/>
            </GenericModal>
        </DictionaryWrapper>
    )
}

export default Dictionaries