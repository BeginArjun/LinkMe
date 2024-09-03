import React, { createContext, useContext } from 'react';

const ModalContext = createContext<React.PropsWithChildren | null>(null);

export const useModal = () => useContext(ModalContext);

const ModalProvider = ({ children, ...props }: React.PropsWithChildren) => {
  return (
    <ModalContext.Provider value={props}>
      <div className="modal-container">{children}</div>
    </ModalContext.Provider>
  );
};

export default ModalProvider;