import React from 'react';
import {
  Typography,
  Card,
  Form,
  Input,
  Radio,
  DatePicker,
  AutoComplete,
  Button,
} from 'antd';

const { Title } = Typography;

function BasicPage(props) {
  const [form] = Form.useForm();

  const onSearch = searchText => {
    console.log(searchText);
  };
  const onSelect = data => {
    console.log('onSelect', data);
  };

  const handleSubmit = values => console.log(values);

  return (
    <Card className='card'>
      <Form form={form} size='large' onFinish={handleSubmit}>
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
            showTime
            placeholder='Date of birth'
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item name='city'>
          <AutoComplete
            // options={options}
            style={{ width: '100%' }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder='Home Town'
          />
        </Form.Item>
        <Form.Item>
          <Button className='btn btn--success' size='large'>
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
}

export default BasicPage;
