import React from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'antd';
import { closeModal } from './modal.actions';
import { CloseCircleOutlined } from '@ant-design/icons';
import { asyncActionFinish } from '../async/async.actions';

function ModalBase({ title, children }) {
  const dispatch = useDispatch();

  const handleCancel = () => {
    dispatch(closeModal());
    dispatch(asyncActionFinish());
  };

  return (
    <Modal
      title={title}
      visible={true}
      onCancel={handleCancel}
      width={360}
      footer={null}
      closeIcon={<CloseCircleOutlined />}
      destroyOnClose
    >
      {children}
    </Modal>
  );
}

export default ModalBase;
