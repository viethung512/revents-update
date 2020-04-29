import React from 'react';
import { Form, Input } from 'antd';
import AuthBtnSubmit from '../AuthBtnSubmit/AuthBtnSubmit';

function RegisterForm(props) {
  const handleSubmit = values => console.log(values);

  return (
    <Form size='large' onFinish={handleSubmit}>
      <Form.Item
        name='displayName'
        rules={[{ required: true, message: 'Display name is require' }]}
      >
        <Input placeholder='Known As' />
      </Form.Item>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Email is require' },
          { type: 'email', message: 'Must be a valid email address' }
        ]}
      >
        <Input placeholder='What is your email address' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Password is require' },
          { min: 6, message: 'Password must at least 6 character' }
        ]}
      >
        <Input placeholder='Please enter your password' type='password' />
      </Form.Item>
      <Form.Item name='confirmPassword'>
        <Input placeholder='Please re-enter your password' type='password' />
      </Form.Item>
      <AuthBtnSubmit btnContent='Register' />
    </Form>
  );
}

export default RegisterForm;
