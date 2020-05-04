import React from 'react';
import { Card, Form, Typography, Input, Button } from 'antd';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

function AccountPage({ updatePassword }) {
  const [form] = Form.useForm();
  const { loading } = useSelector(state => state.async);

  const validateConfirmPassword = (rule, value) => {
    const currentPassword = form.getFieldValue('newPassword');
    if (value !== currentPassword) {
      return Promise.reject('Password does not match!');
    }

    return Promise.resolve();
  };

  return (
    <Card className='card'>
      <Form
        form={form}
        size='large'
        onFinish={values => updatePassword(values)}
      >
        <Form.Item>
          <Title level={3}>Account</Title>
          <Title
            level={4}
            style={{ fontSize: 13, marginBottom: 0, color: '#00b5ad' }}
          >
            CHANGE PASSWORD
          </Title>
          <Text>Use this form to update your account settings.</Text>
        </Form.Item>
        <Form.Item
          name='newPassword'
          rules={[
            { required: true, message: 'Password is require' },
            { min: 6, message: 'Password length must at least 6 character' },
          ]}
        >
          <Input.Password placeholder='New Password' />
        </Form.Item>
        <Form.Item
          name='confirmPassword'
          rules={[{ validator: validateConfirmPassword }]}
        >
          <Input.Password placeholder='Confirm Password' />
        </Form.Item>
        <Form.Item>
          <Button
            className='btn btn--success'
            size='large'
            htmlType='submit'
            loading={loading}
          >
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AccountPage;
