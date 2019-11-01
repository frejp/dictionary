import React, { useContext,useState }  from 'react';
import { AppContext } from '../AppState/AppContext'
import { PrimaryButton, ButtonText, SpacingYS, Input, Label} from '../SharedComponents'
import uuidv1 from "uuid/v1";

const NewEntryForm = ({setIsModalOpen}) => {

    const { dispatch } = useContext(AppContext);
    const [domain, setDomain] = useState('');
    const [range, setRange] = useState('');

    const addNewEntry = (e) => {
        e.preventDefault();
        if (domain.length && range.length > 0) {
            dispatch({type: 'ADD_ENTRY_TO_DICTIONARY', entry: {domain: domain, range: range, id: uuidv1()}})
            dispatch({type: 'UPDATE_SELECTED_DICTIONARY'})
            setIsModalOpen(false)
        }
    }

    return (
        <form onSubmit={addNewEntry} style={{padding: '20px'}}>
            <Label for="domain">Domain</Label>
            <Input onChange={(event) => setDomain(event.target.value)} id="domain" name="domain"/>
            <label style={{fontSize: '12px'}} for="range">Range</label>
            <Input onChange={(event) => setRange(event.target.value)} id="range" name="range"/>
            <SpacingYS />
            <PrimaryButton>
                <ButtonText>Save</ButtonText>
            </PrimaryButton>
        </form>)

}

export default NewEntryForm;
