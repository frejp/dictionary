import produce from "immer";
import uuidv1 from "uuid/v1";

const addEntryToDictionary = produce((draft, entry,id) => {
    entry = {...entry, validation: ''}
    const dictionaryIndex = draft.dictionaries.findIndex(x => x.id === draft.dictionary.id);
    draft.dictionaries[dictionaryIndex].entries.push(entry);
    draft.dictionary.validated = false;
});

const deleteEntryInDictionary = produce((draft, entry) => {
    const dictionaryIndex = draft.dictionaries.findIndex(x => x.id === draft.dictionary.id);
    const entryIndex = draft.dictionaries[dictionaryIndex].entries.findIndex(x => x.id === entry.id);
    draft.dictionaries[dictionaryIndex].entries.splice(entryIndex, 1);
    draft.dictionary.validated = false;
});

const changeEntryInDictionary = produce((draft, entry) => {
    const entryIndex = draft.dictionary.entries.findIndex(x => x.id === entry.id);
    const dictionaryIndex = draft.dictionaries.findIndex(x => x.id === draft.dictionary.id);
    draft.dictionaries[dictionaryIndex].entries[entryIndex] = entry
    draft.dictionary.validated = false;
});

const setValidatedDictionary = produce((state, dictionary) => {
    const dictionaryIndex = state.dictionaries.findIndex(x => x.id === dictionary.id);
    state.dictionaries[dictionaryIndex].entries = dictionary.entries
    state.dictionary = dictionary
    state.dictionary.validated = true;
});

export const initialState = {
    dictionary: {},
    dictionaries: [],
    nonProcessable: false
};

const reducer = (state, action) => {
    const dictionaries = state.dictionaries;
    switch (action.type) {
        case 'SET_STATE_FROM_LOCAL_STORAGE':
            return {
                ...action.dictionary
            }
        case 'SET_DICTIONARY':
            return {
                ...state,
                dictionary: {
                    ...action.dictionary,
                    entries: dictionaries.filter((item) => item.id === action.dictionary.id)[0].entries
                }
            }
        case 'UPDATE_SELECTED_DICTIONARY':
            return {
                ...state,
                dictionary: {
                    ...state.dictionary,
                    entries: dictionaries.filter((item) => item.id === state.dictionary.id)[0].entries
                }
            }
        case 'SET_VALIDATED_DICTIONARY':
            return setValidatedDictionary(state, action.validatedDictionary)
        case 'SET_DICTIONARY_IS_NON_PROCESSABLE':
            return {
                ...state,
                nonProcessable: action.nonProcessable
            }
        case 'ADD_NEW_DICTIONARY':
            const id = uuidv1();
            return {
                ...state,
                dictionaries: [...state.dictionaries, {id: id, name: action.name, entries: []}]
            }
        case 'DELETE_DICTIONARY':
            const indexOfDictionaryToBeDeleted = dictionaries.findIndex(x => x.id === action.dictionary.id);
            const dictionary = state.dictionary.id ===  action.dictionary.id ? {} : state.dictionary;
            return {
                ...state,
                dictionary: dictionary,
                dictionaries: dictionaries.filter((item, index) => index !== indexOfDictionaryToBeDeleted)
            }
        case 'ADD_ENTRY_TO_DICTIONARY':
            return addEntryToDictionary(state, action.entry);
        case 'DELETE_ENTRY_IN_DICTIONARY':
            return deleteEntryInDictionary(state, action.entry);
        case 'CHANGE_ENTRY_IN_DICTIONARY':
            return changeEntryInDictionary(state, action.entry);
        default:
            return state
    }
};

export default reducer;