import React, { useEffect } from 'react';
import { Typography, Card, Form, Input, Radio, Button, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
// import DatePicker from '../../../app/layout/common/DatePicker';
import PlaceInput from '../../../app/layout/common/PlaceInput';
import moment from 'moment';

const { Title } = Typography;

function BasicPage({ profile, updateProfile }) {
  const [form] = Form.useForm();
  const { loading } = useSelector(state => state.async);

  useEffect(() => {
    if (Object.keys(profile).length > 2) {
      form.setFieldsValue({
        ...profile,
        dateOfBirth: profile.dateOfBirth
          ? moment.unix(profile.dateOfBirth)
          : '',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <Card className='card'>
      <Form
        form={form}
        size='large'
        onFinish={values => updateProfile(values)}
        autoComplete='off'
      >
        <Form.Item>
          <Title level={3}>Basics</Title>
        </Form.Item>
        <Form.Item
          name='displayName'
          rules={[{ required: true, message: 'Please enter your name' }]}
        >
          <Input placeholder='Known As' />
        </Form.Item>
        <Form.Item name='gender' label='Gender'>
          <Radio.Group>
            <Radio value='male'>Male</Radio>
            <Radio value='female'>Female</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name='dateOfBirth'>
          <DatePicker
            placeholder='What is your birth day'
            style={{ width: '100%', height: '100%' }}
            showTime
            format='YYYY-MM-DD'
          />
        </Form.Item>
        <Form.Item name='city'>
          <PlaceInput placeholder='Home Town' />
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

export default BasicPage;
