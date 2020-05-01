import React from 'react';
import { Link } from '../../../app/layout/common/CustomRouter';
import { Card, Typography, Button } from 'antd';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const { Title, Text } = Typography;

function EventDetailedHeader({ event, className }) {
  const {
    profile: { isLoaded, isEmpty },
  } = useSelector(state => state.firebase);

  const { id, title, hostedBy, date } = event;

  const authenticated = isLoaded && !isEmpty;

  const actions = authenticated
    ? [
        <Button size='large' className='btn btn--primary'>
          JOIN THIS EVENT
        </Button>,
        <Button
          style={{ backgroundColor: '#e0e1e2', color: 'rgba(0, 0, 0, 0.6)' }}
          size='large'
          className='btn btn--default'
        >
          Cancel My Place
        </Button>,
        <Button
          size='large'
          className='btn btn--warning'
          style={{
            float: 'right',
            marginRight: 12,
          }}
        >
          Manage event
        </Button>,
      ]
    : [
        <Button
          size='large'
          className='btn btn--primary'
          style={{ marginLeft: 12, float: 'left' }}
        >
          JOIN THIS EVENT
        </Button>,
      ];

  return (
    <Card
      bordered
      cover={
        <img
          src='/assets/categoryImages/travel.jpg'
          alt='category'
          className='event-detailed__header-img'
        />
      }
      bodyStyle={{ padding: 0 }}
      actions={actions}
      className={className}
    >
      <div className='event-detailed__header-title'>
        <Title level={2} className='event-detailed__header-title-main'>
          {title}
        </Title>
        <Text className='event-detailed__header-title-description'>
          {date ? format(date.toDate(), 'dddd Do MMMM') : ''}
        </Text>
        <Text className='event-detailed__header-title-description'>
          Hosted by{' '}
          <Link to={`/profile/${id}`}>
            <strong>{hostedBy}</strong>
          </Link>
        </Text>
      </div>
    </Card>
  );
}

export default EventDetailedHeader;
