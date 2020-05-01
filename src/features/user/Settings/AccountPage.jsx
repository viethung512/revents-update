import React from 'react';
import { Card, Form, Typography, Input, Button } from 'antd';

const { Title, Text } = Typography;

function AccountPage(props) {
  const [form] = Form.useForm();

  const validateConfirmPassword = (rule, value) => {
    const currentPassword = form.getFieldValue('password');
    if (value !== currentPassword) {
      return Promise.reject('Password does not match!');
    }

    return Promise.resolve();
  };

  const handleSubmit = values => console.log(values);

  return (
    <Card className='card'>
      <Form form={form} size='large' onFinish={handleSubmit}>
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
          name='password'
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
          <Button className='btn btn--success' size='large'>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AccountPage;
