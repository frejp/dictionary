import React from "react";
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        border: '1px solid #e1e4e8',
        padding: '0'
    }
};

const FlexWrapper = styled.header`
    display: flex;
    background-color: #f6f8fa;
    padding: 5px;
    color: black;
    border-bottom: 1px solid #d1d5da;
`;

const ModalHeading = styled.header`
    margin: 0;
    padding: 10px;
    flex: 1;
    color: #24292e;
    fontSize: 14px;
`;

const ModalCloseButton= styled.button`
    background: none;
    border: none;
    padding: 5px;
    flex: 0;
`;

export const GenericModal = (props) => {

    return (
        <Modal
            isOpen={props.isModalOpen}
            contentLabel="Example Modal"
            style={customStyles}
        >
            <FlexWrapper>
                <ModalHeading>{props.title}</ModalHeading>
                <ModalCloseButton aria-label="delete"  onClick={() => props.setIsModalOpen(false)}>
                    <FontAwesomeIcon size="1x" icon={faTimes}/>
                </ModalCloseButton>
            </FlexWrapper>
            {props.children}
        </Modal>
    )
}

export default GenericModal



