import React, { useContext, useState }  from 'react';
import styled from 'styled-components';
import { PrimaryButton, ButtonText, Heading2, SpacingYS, Line, SpacingYXS} from '../SharedComponents'
import { AppContext } from '../AppState/AppContext'
import DictionaryTable from './DictionaryTable'
import {GenericModal} from '../SharedComponents'
import NewEntryForm from './NewEntryForm'

const DictionaryWrapper = styled.div`
     flex: 1;
     margin-left: 2%;
`;

const PleaseSelect = ({state}) => {
    return (<div>
        <SpacingYS></SpacingYS><Heading2>{state.dictionaries.length > 0 ? 'Please Select A Dictionary' : 'Please Create A Dictionary'}</Heading2>
    </div>)
}

const NonProcessable = ({nonProcessable}) => {
    return (<div>{nonProcessable ? (
        <div><SpacingYS></SpacingYS><Heading2>{`Dictionary are non-processable,
        you can change and delete but not add new entries`}</Heading2></div>) : null}</div>)
}

export const Dictionary = () => {

    const { state } = useContext(AppContext);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onNewDictionaryClick = () => {
        setIsModalOpen(true)
    }

    return (<DictionaryWrapper>
        {state.dictionary.id ? <div>
            <SpacingYS></SpacingYS>
            <Heading2>Dictionary Name</Heading2>
            <SpacingYS></SpacingYS>
            <Line></Line>
            <SpacingYXS></SpacingYXS>
            <SpacingYS></SpacingYS>
            {state.nonProcessable ? null : <PrimaryButton data-testid='newEntryButton' onClick={onNewDictionaryClick}>
                <ButtonText>New Entry</ButtonText>
            </PrimaryButton>}
            <SpacingYS></SpacingYS>
            <DictionaryTable />
            <GenericModal title={'Add New Entry'} setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}
                          disabled={state.nonProcessable}>
                <NewEntryForm setIsModalOpen={setIsModalOpen}/>
            </GenericModal>
        </div> : <PleaseSelect state={state}/>}
        <NonProcessable nonProcessable={state.nonProcessable}/>
    </DictionaryWrapper>)
}

export default Dictionary