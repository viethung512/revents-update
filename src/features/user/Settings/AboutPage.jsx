import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Form, Typography, Radio, Input, Select, Button } from 'antd';
import PlaceInput from '../../../app/layout/common/PlaceInput';

const { Title, Text } = Typography;

const interests = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

function AboutPage({ profile, updateProfile }) {
  const [form] = Form.useForm();
  const { loading } = useSelector(state => state.async);

  useEffect(() => {
    form.setFieldsValue({
      ...profile,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className='card'>
      <Form form={form} size='large' onFinish={values => updateProfile(values)}>
        <Form.Item>
          <Title level={3}>About Me</Title>
          <Text>Complete your profile to get the most out of this site</Text>
        </Form.Item>
        <Form.Item name='status' label='Tell us your status'>
          <Radio.Group>
            <Radio value='single'>Single</Radio>
            <Radio value='relationship'>Relationship</Radio>
            <Radio value='married'>Married</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name='about'
          label='Tell us about your self'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input.TextArea placeholder='About me' rows='3' />
        </Form.Item>
        <Form.Item name='interests'>
          <Select
            options={interests}
            placeholder='Select your interests'
            mode='multiple'
          />
        </Form.Item>
        <Form.Item name='occupation'>
          <Input placeholder='Occupation' />
        </Form.Item>
        <Form.Item name='origin'>
          <PlaceInput placeholder='Country of Origin' />
        </Form.Item>
        <Form.Item>
          <Button
            className='btn btn--success'
            size='large'
            htmlType='submit'
            loading={loading}
          >
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default AboutPage;
