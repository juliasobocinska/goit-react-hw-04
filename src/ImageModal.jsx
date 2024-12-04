import React, { useEffect } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

function ImageModal({ isOpen, image, onClose }) {
  
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
  
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  
  if (!isOpen || !image) return null;

  return (
    <Modal
      isOpen={isOpen} 
      onRequestClose={onClose} 
      contentLabel="Image Modal"
      style={{
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        },
      }}
    >
         <img
          src={image}
          alt="Modal Content"
          style={{
            width: '100%',
            height: 'auto',
            borderRadius: '8px',
            maxHeight: '80vh',
          }}
        />
    </Modal>
  );
}

export default ImageModal;
