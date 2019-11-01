import React, { useContext,useState }  from 'react';
import { AppContext } from '../AppState/AppContext'
import { PrimaryButton, ButtonText, SpacingYS, Input, Label} from '../SharedComponents'

const NewDictionaryForm = ({setIsModalOpen}) => {

    const { dispatch } = useContext(AppContext);
    const [name, setName] = useState('');

    const addNewDictionary = (e) => {
        e.preventDefault();
        if (name.length > 0) {
            dispatch({type: 'ADD_NEW_DICTIONARY', name: name})
            setIsModalOpen(false)
        }
    }

    return (
        <form onSubmit={addNewDictionary} style={{padding: '20px'}}>
            <Label htmlFor="dictionaryName">Name</Label>
            <Input data-testid="dictionaryName" onChange={(event) => setName(event.target.value)} id="dictionaryName"
                   name="dictionaryName"/>
            <SpacingYS />
            <PrimaryButton data-testid="save">
                <ButtonText>Save</ButtonText>
            </PrimaryButton>
        </form>
    )

}

export default NewDictionaryForm;
