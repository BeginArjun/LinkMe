import { useCallback, useEffect, useRef } from "react";
import ModalProvider from "./ModalContext";
import { motion } from "framer-motion";
import clsx from "clsx";


const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: '-100vh' },
  visible: { opacity: 1, y: '0', transition: { duration: 0.3 } },
  exit: { opacity: 0, y: '100vh', transition: { duration: 0.3 } },
};

export default function Modal ({children, onClose, size='medium', style={}, ...props}) {
  const modalSize = {
    small: 'w-1/3',
    medium: 'w-1/2',
    large: 'w-2/3',
  }

  const dialogRef = useRef(null)

  useEffect(()=>{
    if(dialogRef.current){
      dialogRef.current.showModal()
    }

    return () => {
      if(dialogRef.current){
        dialogRef.current.close()
      }
    }
  },[])

  const handleOutsideClick = useCallback((e) => {
    if(dialogRef.current && !dialogRef.current.contains(e.target)){
      onClose()
    }
  }, [dialogRef.current])


  return (
    <ModalProvider {...props} onClose={onClose}>
      <motion.div className="shadow-md fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={handleOutsideClick}
      >
        <motion.dialog ref={dialogRef} className={clsx(
          'bg-white shadow-lg rounded-lg',
          modalSize[size],
          'overflow-visible'
        )}
        style={style}
        onClick={(e) => e.stopPropagation()}
        >
          <motion.div
            className="w-full px-6 py-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
          >
            {children}
          </motion.div>
        </motion.dialog>

      </motion.div>
    </ModalProvider>
  );
}