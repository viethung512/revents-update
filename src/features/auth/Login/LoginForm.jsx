import React from 'react';
import { Form, Input } from 'antd';
import AuthBtnSubmit from '../AuthBtnSubmit/AuthBtnSubmit';

function LoginForm(props) {
  const handleSubmit = values => {
    console.log(values);
  };
  return (
    <Form size='large' autoComplete='false' onFinish={handleSubmit}>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Must be a valid email address' }
        ]}
      >
        <Input placeholder='Email Address' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Password is required' },
          { min: 6, message: 'Password must at least  6 character' }
        ]}
      >
        <Input placeholder='Password' type='password' />
      </Form.Item>
      <AuthBtnSubmit btnContent='Login' />
    </Form>
  );
}

export default LoginForm;
