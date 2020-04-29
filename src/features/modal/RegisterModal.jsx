import React from 'react';
import { Typography } from 'antd';
import RegisterForm from '../auth/Register/RegisterForm';
import ModalBase from './ModalBase';

const { Title } = Typography;

function RegisterModal(props) {
  const title = <Title level={4}>Sign up to Re-vents!</Title>;

  return (
    <ModalBase title={title}>
      <RegisterForm />
    </ModalBase>
  );
}

export default RegisterModal;
