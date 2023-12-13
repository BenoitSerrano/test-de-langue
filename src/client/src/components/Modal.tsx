import { Modal as MuiModal, Typography, styled } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Button } from './Button';

function Modal(props: {
    isConfirmDisabled?: boolean;
    children: React.ReactElement | Array<React.ReactElement | boolean>;
    isOpen: boolean;
    close: () => void;
    onConfirm: () => void;
    onCancel?: () => void;
    confirmButtonLabel?: string;
    cancelButtonLabel?: string;
    isConfirmLoading?: boolean;
    title?: string;
}) {
    return (
        <StyledModal open={props.isOpen} onClose={props.close}>
            <ModalContent>
                {!!props.title && (
                    <ModalHeader>
                        <Typography variant="h2">{props.title}</Typography>
                    </ModalHeader>
                )}
                <ModalBody>{props.children}</ModalBody>
                <ModalFooter>
                    <Button onClick={onCancel}>{props.cancelButtonLabel || 'Annuler'}</Button>
                    <LoadingButton
                        disabled={props.isConfirmDisabled}
                        loading={props.isConfirmLoading}
                        variant="contained"
                        onClick={props.onConfirm}
                    >
                        {props.confirmButtonLabel || 'Confirmer'}
                    </LoadingButton>
                </ModalFooter>
            </ModalContent>
        </StyledModal>
    );

    function onCancel() {
        if (props.onCancel) {
            props.onCancel();
        } else {
            props.close();
        }
    }
}

const ModalHeader = styled('div')({ marginBottom: 8 });

const ModalContent = styled('div')({
    borderRadius: '2px',
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '80%',
    minHeight: '80%',
    maxHeight: '80%',
    maxWidth: '80%',
    display: 'flex',
    flexDirection: 'column',
    padding: '20px',
    overflow: 'auto',
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

const StyledModal = styled(MuiModal)({ zIndex: 999 });

export { Modal };
