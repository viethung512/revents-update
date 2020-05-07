import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Input, Button, Select, Typography, DatePicker } from 'antd';
import { createEvent, updateEvent, cancelToggle } from '../event.actions';
import moment from 'moment';
import PlaceInput from '../../../app/layout/common/PlaceInput';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const categories = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' },
];

const EventAction = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loading } = useSelector(state => state.async);
  const createEventLoading = useSelector(state =>
    state.async.actionType === 'createEvent' ? loading : null
  );
  const updateEventLoading = useSelector(state =>
    state.async.actionType === 'updateEvent' ? loading : null
  );
  const cancelEventLoading = useSelector(state =>
    state.async.actionType === 'cancelToggleEvent' ? loading : null
  );

  const event = useSelector(({ drawer }) =>
    drawer.drawerProps ? drawer.drawerProps.event : null
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (event && event.id) {
      form.setFieldsValue({
        ...event,
        date: moment.unix(event.date),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  const handleSelectChange = value => form.setFieldsValue({ category: value });

  const handleSubmit = async values => {
    values.venueLatLng = {
      lat: 40.7484405,
      lng: 73.98566440000002,
    };
    // values['date'] = values['date'].format('YYYY-MM-DD HH:mm:ss');

    values['date'] = values['date'].unix();

    if (event && event.id) {
      const newEvent = { ...event, ...values };

      dispatch(updateEvent(newEvent));
    } else {
      const createdEvent = await dispatch(createEvent(values));
      history.push(`/events/${createdEvent.id}`);
    }
  };

  const handleToggleEvent = () =>
    dispatch(cancelToggle(event.cancelled, event.id));

  return (
    <Form
      form={form}
      name='control-hooks'
      onFinish={handleSubmit}
      size='large'
      autoComplete='off'
    >
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
        <PlaceInput placeholder='Event City' />
      </Form.Item>
      <Form.Item
        name='venue'
        rules={[{ required: true, message: 'Venue is require' }]}
      >
        <PlaceInput placeholder='Event Venue' />
      </Form.Item>
      <Form.Item
        name='date'
        rules={[{ required: true, message: 'Date is require' }]}
        style={{ height: '100%' }}
      >
        <DatePicker
          placeholder='Event date'
          style={{ width: '100%', height: '100%' }}
          showTime
          format='YYYY-MM-DD HH:mm:ss'
        />
      </Form.Item>
      <Form.Item>
        <Button
          loading={createEventLoading || updateEventLoading}
          type='primary'
          className='btn btn--success'
          style={{ marginRight: 8 }}
          htmlType='submit'
        >
          Submit
        </Button>
        <Button className='btn btn--default'>Cancel</Button>

        {event && event.id && (
          <Button
            loading={cancelEventLoading}
            className={event.cancelled ? 'btn btn--success' : 'btn btn--danger'}
            style={{ float: 'right' }}
            onClick={handleToggleEvent}
          >
            {event.cancelled ? 'Reactivate Event' : 'Cancel Event'}
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default EventAction;
