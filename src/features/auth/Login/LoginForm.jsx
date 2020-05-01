import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from 'antd';
import AuthBtnSubmit from '../AuthBtnSubmit/AuthBtnSubmit';
import { login } from '../auth.actions';

function LoginForm(props) {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.async);

  const handleSubmit = values => dispatch(login(values));

  return (
    <Form size='large' autoComplete='false' onFinish={handleSubmit}>
      <Form.Item
        name='email'
        rules={[
          { required: true, message: 'Email is required' },
          { type: 'email', message: 'Must be a valid email address' },
        ]}
      >
        <Input placeholder='Email Address' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Password is required' },
          { min: 6, message: 'Password must at least  6 character' },
        ]}
        style={
          error && Object.keys(error).length > 0 ? { marginBottom: 0 } : null
        }
      >
        <Input.Password placeholder='Password' />
      </Form.Item>
      <AuthBtnSubmit btnContent='Login' loading={loading} error={error} />
    </Form>
  );
}

export default LoginForm;
