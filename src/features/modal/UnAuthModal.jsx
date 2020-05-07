import React from 'react';
import { useDispatch } from 'react-redux';
import { Typography, Modal, Button } from 'antd';
import { openModal, closeModal } from './modal.actions';
import { useHistory, useLocation } from 'react-router-dom';

const { Title, Text } = Typography;

function UnAuthModal(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const handleCancel = () => {
    if (!location.pathname.includes('/event')) {
      history.goBack();
    }
    dispatch(closeModal());
  };

  const login = () => dispatch(openModal('LoginModal'));
  const register = () => dispatch(openModal('RegisterModal'));

  return (
    <Modal
      title={<Title level={4}>You need to be signed in!</Title>}
      visible={true}
      onCancel={handleCancel}
      width={360}
      footer={
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Text>Or click cancel to continue as a guest</Text>
          <Button
            style={{ marginTop: 12 }}
            className='btn btn--default'
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      }
      closeIcon={null}
      destroyOnClose
      bodyStyle={{ padding: '12px 24px' }}
    >
      <Text>Please either login or register to see this page</Text>
      <div style={{ marginTop: 12, display: 'flex', width: '100%' }}>
        <Button
          className='btn btn--primary'
          style={{ flex: 1, marginRight: 4 }}
          onClick={login}
        >
          Login
        </Button>
        <Button
          className='btn btn--success'
          style={{ flex: 1, marginLeft: 4 }}
          onClick={register}
        >
          Register
        </Button>
      </div>
    </Modal>
  );
}

export default UnAuthModal;
