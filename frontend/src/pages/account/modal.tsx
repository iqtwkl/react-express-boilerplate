/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Label, Modal, TextInput, Toast, ToggleSwitch } from "flowbite-react";
import { AccountInterface } from "../../components/entity/account";
import { HiCheck, HiExclamation, HiOutlineExclamationCircle } from "react-icons/hi";
import React, { useState } from "react";
import { useCrudState } from "../../hooks/CrudState.hooks";

interface ModalProps {
    handleSave: () => void,
    account?: AccountInterface,
    setAccount: (account: AccountInterface | any) => void,
}

export const CreateModal = (props: ModalProps) => {
    const { handleSave, setAccount: parentSetAccount } = props;
    const { isCreate, setIsCreate, isSuccess, setIsSuccess } = useCrudState();
    const [account, setAccount] = useState<AccountInterface | any>({
        username: '',
        email: '',
        password: '',
        is_admin: 0
    });

    const handleClose = () => {
        setIsSuccess(false);
        setIsCreate(false);
        setAccount(undefined);
        parentSetAccount(undefined);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | boolean) => {
        let name: string;
        let value: any;

        if (typeof e === 'boolean') {
            name = 'is_admin';
            value = e ? 1 : 0;
        } else if (e && e.target) {
            name = e.target.name;
            value = e.target.value;
        }
        setAccount((prevState: AccountInterface) => ({
            ...prevState,
            [name]: value
        }));

        parentSetAccount(account);
    }

    return (
        <>
            <Modal show={isCreate} onClose={handleClose}>
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
                    <div className="grid gap-4 mb-4 sm:grid-cols-1">
                        <div>
                            <Label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</Label>
                            <TextInput 
                                name="username" 
                                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Username" value={account?.username} onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</Label>
                            <TextInput 
                                type="email"
                                name="email" 
                                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Email" value={account?.email} onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</Label>
                            <TextInput 
                                type="password"
                                name="password" 
                                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Password" value={account?.password} onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <span>{account?.is_admin == 1 ? "true" : "false"}</span>
                            <ToggleSwitch checked={account?.is_admin === 1} label="Is Admin?" onChange={() => handleChange(account.is_admin === 0)} /> 
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

export const EditModal = (props: ModalProps) => {
    const { handleSave, account, setAccount } = props;
    const { isEdit, setIsEdit, isSuccess, setIsSuccess} = useCrudState();

    const handleClose = () => {
        setIsSuccess(false);
        setIsEdit(false);
        setAccount(undefined);
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement> | boolean) => {
        let name: string;
        let value: any;

        if (typeof e === 'boolean') {
            name = 'is_admin';
            value = e ? 1 : 0;
        } else if (e && e.target) {
            name = e.target.name;
            value = e.target.value;
        }
        const editedAccount = (prevState: AccountInterface) => ({
            ...prevState,
            [name]: value
        })
        setAccount(editedAccount);
    };

    return (
        <>
            <Modal show={isEdit} onClose={handleClose}>
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
                    <div className="grid gap-4 mb-4 sm:grid-cols-1">
                        <div>
                            <Label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</Label>
                            <TextInput 
                                name="username" 
                                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Username" value={account?.username} onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</Label>
                            <TextInput 
                                type="email"
                                name="email" 
                                className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                placeholder="Email" value={account?.email} onChange={(e) => handleChange(e)}
                            />
                        </div>
                        <div>
                            <ToggleSwitch checked={account?.is_admin == 1 ? true : false} label="Is Admin?" onChange={(e) => handleChange(e)} /> 
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


export const DeleteModal = (props: ModalProps) => {
    const { handleSave, account, setAccount } = props;
    const { isDelete, setIsDelete, isSuccess, setIsSuccess } = useCrudState();

    const handleClose = () => {
        setIsSuccess(false);
        setIsDelete(false);
        setAccount(undefined);
    }

    return (
        <>
            <Modal show={isDelete} onClose={handleClose}>
                <Modal.Header>
                    <h3>Delete Account {account?.username}</h3>
                </Modal.Header>
                <Modal.Body>
                    { isSuccess && (
                        <Toast>
                            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                                <HiExclamation className="h-5 w-5" />
                            </div>
                            <div className="ml-3 text-sm font-normal">Item deleted successfully.</div>
                            <Toast.Toggle />
                        </Toast>
                    )}
                    <div className="text-center mb-4">
                        <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Are you sure Delete Account {account?.username} ?
                        </h3>
                    </div>
                    <div className="flex justify-center gap-4 pt-4">
                        <Button
                        color="failure" onClick={handleSave}>
                            Delete
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