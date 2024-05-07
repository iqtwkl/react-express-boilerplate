import { Button, Modal } from 'flowbite-react';
import { useEffect } from 'react';
import { HiOutlineExclamationCircle } from "react-icons/hi"

interface ErrorProps {
  error: string,
  isError: boolean,
  setIsError: (isError: boolean) => void,  
}

export default function ErrorModalComponent(props: ErrorProps) {
  const { error, isError, setIsError } = props;

  return (
    <>
      <Modal show={isError} size="md" onClose={() => setIsError(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Something went wrong! Please try again.
            </h3>
            <p>error: <span>{error}</span></p>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={() => setIsError(false)}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
    
  );
}