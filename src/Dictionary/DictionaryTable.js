import React, {useContext} from "react";
import { Table, Tr, Th } from '../SharedComponents'
import { AppContext } from '../AppState/AppContext'
import DictionaryRow from './DictionaryRow'

export const DictionaryTable = ({dictionary}) => {

    const { state } = useContext(AppContext);
    const entries = state.dictionary.entries;

    return (
        <Table>
            {entries.length > 0 ?
                <Tr>
                    <Th>Domain</Th>
                    <Th>Range</Th>
                    <Th>Validation</Th>
                </Tr> : null}
            {entries ? entries.map((row) => <DictionaryRow row={row}/>) : null}
        </Table>
    )
}

export default DictionaryTable