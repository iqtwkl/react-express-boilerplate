import { Button, Modal } from 'flowbite-react';
import { HiOutlineExclamationCircle } from "react-icons/hi"
import { useAuth } from '../../../hooks/AuthContext.hooks';

export class ApplicationError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}

interface ErrorProps {
  error: ApplicationError | null,
  isError: boolean,
  setIsError: (isError: boolean) => void,  
}

export default function ErrorModalComponent(props: ErrorProps) {
  const { error, isError, setIsError } = props;
  const { logout } = useAuth();

  const handleButtonClick = () => {
    setIsError(false);
    if (error?.status == 401) {
      logout();
    }
  }

  return (
    <>
      <Modal show={isError} size="md" onClose={() => setIsError(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
              Something went wrong! Please try again.
            </h3>
            <p className='mb-5'>{error && error.message ? error.message : ''}</p>
            <div className="flex justify-center gap-4">
              <Button color="gray" onClick={handleButtonClick}>
                Ok
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
    
  );
}