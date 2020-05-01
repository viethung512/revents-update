import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Input } from 'antd';
import AuthBtnSubmit from '../AuthBtnSubmit/AuthBtnSubmit';
import { register } from '../auth.actions';

function RegisterForm(props) {
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const { loading, error } = useSelector(state => state.async);

  const handleSubmit = values => dispatch(register(values));

  const validateConfirmPassword = (rule, value) => {
    const currentPassword = form.getFieldValue('password');

    if (value !== currentPassword) {
      return Promise.reject('Password does not match!');
    }

    return Promise.resolve();
  };

  return (
    <Form size='large' onFinish={handleSubmit} form={form}>
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
          { type: 'email', message: 'Must be a valid email address' },
        ]}
      >
        <Input placeholder='What is your email address' />
      </Form.Item>
      <Form.Item
        name='password'
        rules={[
          { required: true, message: 'Password is require' },
          { min: 6, message: 'Password must at least 6 character' },
        ]}
      >
        <Input.Password placeholder='Please enter your password' />
      </Form.Item>
      <Form.Item
        name='confirmPassword'
        rules={[{ validator: validateConfirmPassword }]}
        style={
          error && Object.keys(error).length > 0 ? { marginBottom: 0 } : null
        }
      >
        <Input.Password placeholder='Please re-enter your password' />
      </Form.Item>
      <AuthBtnSubmit btnContent='Register' loading={loading} error={error} />
    </Form>
  );
}

export default RegisterForm;
