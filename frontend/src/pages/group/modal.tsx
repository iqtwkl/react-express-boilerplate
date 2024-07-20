import { Button, Label, Modal, TextInput, Toast } from "flowbite-react";
import { HiCheck, } from "react-icons/hi";
import { GroupInterface } from "../../components/entity/group";
import { useState } from "react";

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,  
    handleSave: () => void,
    group?: GroupInterface,
    setGroup: (group: GroupInterface | undefined) => void,
    isSuccess: boolean,
    setIsSuccess: (isSuccess: boolean) => void,
}

export const CreateModal = (props: ModalProps) => {
    const { isOpen, setIsOpen, handleSave, isSuccess, setIsSuccess, setGroup } = props;
    let group: GroupInterface | any = {};

    const handleClose = () => {
        setIsSuccess(false);
        setIsOpen(false);
        setGroup(undefined);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        group = (prevState: GroupInterface) => ({
            ...prevState,
            [name]: value
        });
        setGroup(group);
    }

    return (
        <>
            <Modal show={isOpen} onClose={handleClose}>
                <Modal.Header>
                    <h3>Add Group</h3>
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
                    <div className="grid gap-4 mb-4 sm:grid-cols-1">
                        <div>
                            <Label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</Label>
                            <TextInput 
                                name="name" 
                                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Name" value={group?.name} onChange={(e) => handleChange(e)}
                            />
                        </div>
                    </div>
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
