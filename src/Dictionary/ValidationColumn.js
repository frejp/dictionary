import React from "react";
import { Td } from '../SharedComponents'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'
import styled from "styled-components/macro";

const Button = styled.button`
    background: none;
    border: none;
    flex: 0;
    padding: 5px;
`;

export const ValidationColumn = ({row, showInfoModal}) => {

    const validationMessage = row.validation.code;

    return (validationMessage === 'noError' ? <Td style={{textAlign: 'center', fontSize: '11px'}}>{`Ok`}</Td> :
        <Td style={{textAlign: 'center'}}>
            <span style={{color: row.validation.severityColor}}>{validationMessage}</span>
            <Button aria-label="show-information"  onClick={showInfoModal}>
                <FontAwesomeIcon size="1x" icon={faInfoCircle}/>
            </Button>
        </Td>)
}

export default ValidationColumn