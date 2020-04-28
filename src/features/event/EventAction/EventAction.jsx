import React, { useEffect } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Typography,
  AutoComplete,
  DatePicker
} from 'antd';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const categories = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const EventAction = ({ id }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      form.setFieldsValue({
        name: 'test',
        category: 'film',
        description: 'ngo viet hung',
        city: 'ha noi',
        venue: 'some'
        // date: Date.now()
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSelectChange = value => form.setFieldsValue({ category: value });
  const handleDateChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };

  const onFinish = values => {
    console.log(values);
  };

  return (
    <Form form={form} name='control-hooks' onFinish={onFinish} size='large'>
      <Form.Item style={{ marginBottom: 0 }}>
        <Title
          level={4}
          style={{ fontSize: 14, textTransform: 'uppercase', color: '#00BCCA' }}
        >
          Event details
        </Title>
      </Form.Item>
      <Form.Item
        name='title'
        rules={[{ required: true, message: 'The event title is require' }]}
      >
        <Input placeholder='Give your event a name' />
      </Form.Item>
      <Form.Item
        name='category'
        rules={[{ required: true, message: 'The event category is require' }]}
      >
        <Select
          placeholder='What is your event about?'
          onChange={handleSelectChange}
          allowClear
        >
          {categories.map(({ key, text, value }) => (
            <Option key={key} value={value}>
              {text}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item
        name='description'
        rules={[{ required: true, message: 'Please enter the description' }]}
      >
        <TextArea rows={3} placeholder='Tell us about your event' />
      </Form.Item>
      <Form.Item style={{ marginBottom: 0 }}>
        <Title
          level={4}
          style={{ fontSize: 14, textTransform: 'uppercase', color: '#00BCCA' }}
        >
          Event location details
        </Title>
      </Form.Item>

      <Form.Item
        name='city'
        rules={[{ required: true, message: 'City is require' }]}
      >
        <AutoComplete placeholder='Event City' />
      </Form.Item>
      <Form.Item
        name='venue'
        rules={[{ required: true, message: 'Venue is require' }]}
      >
        <AutoComplete placeholder='Event Venue' />
      </Form.Item>
      <Form.Item
        name='date'
        rules={[{ required: true, message: 'Date is require' }]}
      >
        <DatePicker
          placeholder='Event Date'
          showToday
          onChange={handleDateChange}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type='primary'
          style={{
            backgroundColor: '#21ba45',
            marginRight: 12,
            borderRadius: 4
          }}
          htmlType='submit'
        >
          Submit
        </Button>
        <Button type='ghost' style={{ borderRadius: 4 }}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventAction;
