import React from 'react';
import {
  Card,
  Form,
  Typography,
  Radio,
  Input,
  Select,
  AutoComplete,
  Button,
} from 'antd';

const { Title, Text } = Typography;

function AboutPage(props) {
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
            options={[{ value: 1, label: 'Test' }]}
            placeholder='Select your interests'
          />
        </Form.Item>
        <Form.Item name='occupation'>
          <Input placeholder='Occupation' />
        </Form.Item>
        <Form.Item name='origin'>
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

export default AboutPage;
