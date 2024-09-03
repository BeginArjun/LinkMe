import { FiX, FiChevronLeft  } from "react-icons/fi";
import { useModal } from "./ModalContext";

// Modal.Header
export const ModalHeader = ({ children }) => (
    <div className="flex justify-center items-center mb-4">
      {children}
    </div>
  );
  
  // Modal.CloseBtn
  export const ModalCloseBtn = () => {
    const { onClose } = useModal();
    return (
      <button
        className="absolute top-3 right-2 text-gray-500 hover:text-gray-700 text-xl"
        onClick={onClose}
      >
       <FiX/>
      </button>
    );
  };
  
  // Modal.BackBtn
  export const ModalBackBtn = () => {
    const { onBack } = useModal();
    return onBack ? (
      <button
        className="absolute top-3 left-2 text-gray-500 hover:text-gray-700"
        onClick={onBack}
      >
        <FiChevronLeft className="text-xl"/>
      </button>
    ) : null;
  };
  
  // Modal.Body
  export const ModalBody = ({ children }) => (
    <div className="flex flex-col justify-between items-center gap-3">
      {children}
    </div>
  );
  
  // Modal.Text
  export const ModalText = ({ children }) => (
    <p className="text-lg font-semibold">
      {children}
    </p>
  );
  
  // Modal.Description
  export const ModalDescription = ({ children }) => (
    <p className="text-sm text-gray-500">
      {children}
    </p>
  );
  