import React from 'react';
import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';

const modalLookup = {
  LoginModal,
  RegisterModal
};

function ModalManager(props) {
  const currentModal = useSelector(state => state.modal);
  let renderModal;

  if (currentModal) {
    const { modalType, modalProps } = currentModal;
    const ModalComponent = modalLookup[modalType];

    renderModal = <ModalComponent {...modalProps} />;
  }

  return <span>{renderModal}</span>;
}

export default ModalManager;
