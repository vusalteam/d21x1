import React, { FC, useState, ReactNode } from 'react';
import { Modal } from 'react-responsive-modal';
import "react-responsive-modal/styles.css"

interface IProps {
   closeModal: () => void
   visible: boolean
   children: ReactNode
}

const CustomModal: FC<IProps> = ({ closeModal, visible, children }) => {
    const [showModal, setShowModal] = useState<boolean>(visible || false);
    
    const openHandler = () => setShowModal(true);
    const closeHandler = () => setShowModal(false);

    return (
        <Modal 
            open={showModal}
            onClose={closeHandler}
            onOverlayClick={closeHandler}
            closeOnEsc
        >
            {children}
        </Modal>
    )
} 

export default CustomModal;