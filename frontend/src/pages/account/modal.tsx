import { Button, Modal, Toast } from "flowbite-react";
import { AccountInterface } from "../../components/entity/account";
import { HiCheck } from "react-icons/hi";

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,  
    handleSave: () => void,
    account?: AccountInterface,
    setAccount: (account: AccountInterface | undefined) => void,
    isSuccess: boolean,
    setIsSuccess: (isSuccess: boolean) => void,
}

export const CreateModal = (props: ModalProps) => {
    const { isOpen, setIsOpen, handleSave, isSuccess, setIsSuccess, setAccount } = props;

    const handleClose = () => {
        setIsSuccess(false);
        setIsOpen(false);
        setAccount(undefined);
    }

    return (
        <>
            <Modal show={isOpen} onClose={handleClose}>
                <Modal.Header>
                    <h3>Add Account</h3>
                </Modal.Header>
                <Modal.Body>
                    { isSuccess && (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Item add successfully.</div>
                            <Toast.Toggle />
                        </Toast>
                    )}

                    <div className="flex justify-end gap-4">
                        <Button
                        color="warning" onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                        color="gray" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}

export const EditModal = (props: ModalProps) => {
    const { isOpen, setIsOpen, handleSave, account, setAccount, isSuccess, setIsSuccess } = props;

    const handleClose = () => {
        setIsSuccess(false);
        setIsOpen(false);
        setAccount(undefined);
    }

    return (
        <>
            <Modal show={isOpen} onClose={handleClose}>
                <Modal.Header>
                    <h3>Edit Account {account?.username}</h3>
                </Modal.Header>
                <Modal.Body>
                    { isSuccess && (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiCheck className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Item edited successfully.</div>
                            <Toast.Toggle />
                        </Toast>
                    )}
                    
                    <div className="flex justify-end gap-4">
                        <Button
                        color="warning" onClick={handleSave}>
                            Save
                        </Button>
                        <Button
                        color="gray" onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}