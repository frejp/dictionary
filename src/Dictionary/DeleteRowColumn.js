import React from "react";
import { Td } from '../SharedComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components/macro";

const Button = styled.button`
    background: none;
    border: none;
    padding: 5px;
    flex: 0;
    padding: 10px;
`;

export const DeleteRowColumn = ({onInputDeleteDictionary}) => {
    return (<Td>
        <Button onClick={onInputDeleteDictionary}>
            <FontAwesomeIcon size="1x" icon={faTrashAlt}/>
        </Button>
    </Td>)
}
export default DeleteRowColumn