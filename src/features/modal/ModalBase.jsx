import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { closeModal } from './modal.actions';
import { CloseCircleOutlined } from '@ant-design/icons';

function ModalBase({ title, children }) {
  const dispatch = useDispatch();

  return (
    <Modal
      title={title}
      visible={true}
      onCancel={() => dispatch(closeModal())}
      width={360}
      footer={null}
      closeIcon={<CloseCircleOutlined />}
    >
      {children}
    </Modal>
  );
}

export default ModalBase;
