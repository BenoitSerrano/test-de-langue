import React from 'react';
import { Button, Modal as MuiModal, Typography, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function Modal(props: {
    children: React.ReactElement | Array<React.ReactElement | boolean>;
    isOpen: boolean;
    close: () => void;
    onConfirm: () => void;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
    isConfirmLoading?: boolean;
    title?: string;
}) {
    return (
        <MuiModal open={props.isOpen} onClose={props.close}>
            <ModalContent>
                {!!props.title && (
                    <ModalHeader>
                        <Typography variant="h2">{props.title}</Typography>
                    </ModalHeader>
                )}
                <ModalBody>{props.children}</ModalBody>
                <ModalFooter>
                    <Button onClick={props.close}>{props.cancelButtonLabel || 'Cancel'}</Button>
                    <LoadingButton
                        loading={props.isConfirmLoading}
                        variant="contained"
                        onClick={onConfirm}
                    >
                        {props.confirmButtonLabel || 'Confirm'}
                    </LoadingButton>
                </ModalFooter>
            </ModalContent>
        </MuiModal>
    );

    function onConfirm() {
        props.close();
        props.onConfirm();
    }
}

const ModalHeader = styled('div')({ marginBottom: 8 });

const ModalContent = styled('div')({
    borderRadius: '2px',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '40%',
    minHeight: '40%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: 'white',
});

const ModalBody = styled('div')({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
});
const ModalFooter = styled('div')({
    display: 'flex',
    justifyContent: 'flex-end',
});

export { Modal };
