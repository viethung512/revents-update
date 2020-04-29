import React from 'react';
import { Typography } from 'antd';
import LoginForm from '../auth/Login/LoginForm';
import ModalBase from './ModalBase';

const { Title } = Typography;

function LoginModal(props) {
  const title = <Title level={4}>Login to Re-vents</Title>;

  return (
    <ModalBase title={title}>
      <LoginForm />
    </ModalBase>
  );
}

export default LoginModal;
