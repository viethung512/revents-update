import React from 'react';
import { useSelector } from 'react-redux';
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal';
import UnAuthModal from './UnAuthModal';

const modalLookup = {
  LoginModal,
  RegisterModal,
  UnAuthModal,
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
