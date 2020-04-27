import React, { Fragment } from 'react';
import './style.css';
import { List, Avatar, Card, Typography, Button } from 'antd';

import { ClockCircleFilled, EnvironmentFilled } from '@ant-design/icons';
import IconText from '../../../app/layout/common/IconText';
import { Link } from '../../../app/layout/common/CustomRouter';
import { objectToArray } from '../../../app/util/helper';
import { format } from 'date-fns';

const { Title, Text } = Typography;

function EventListItem({ event }) {
  const {
    attendees,
    date,
    description,
    hostPhotoURL,
    hostedBy,
    title,
    venue
  } = event;

  const attendeesData = objectToArray(attendees);

  return (
    <List.Item>
      <Card
        bordered
        className='event'
        bodyStyle={{
          padding: 0
        }}
      >
        <Card.Meta
          className='event__header'
          avatar={<Avatar size={80} src={hostPhotoURL || '/assets/user.png'} />}
          title={
            <Link to='/event/:id'>
              <Title level={4}>{title}</Title>
            </Link>
          }
          description={
            <span>
              Hosted By
              <Link to='/profile/:id'>
                <Text strong> {hostedBy}</Text>
              </Link>
            </span>
          }
        />
        <Card.Meta
          className='event__description'
          description={
            <Fragment>
              <span style={{ marginRight: 12 }}>
                <IconText
                  icon={<ClockCircleFilled />}
                  label={
                    <span>
                      <span>{format(date.toDate(), 'EEEEEE do MMM')}</span> at{' '}
                      <span>{format(date.toDate(), 'aa')}</span>
                    </span>
                  }
                />
              </span>
              |
              <span style={{ marginLeft: 12 }}>
                <IconText icon={<EnvironmentFilled />} label={venue} />
              </span>
            </Fragment>
          }
        />
        <Card.Meta
          className='event__attendees'
          description={
            attendees &&
            attendeesData.length > 0 &&
            attendeesData.map(attendee => (
              <Avatar
                key={attendee.id}
                size='default'
                src={attendee.photoURL}
              />
            ))
          }
        />
        <Card.Meta
          className='event__action'
          description={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Text type='secondary'>{description}</Text>
              <Link to='/event/:id'>
                <Button
                  type='primary'
                  size='large'
                  style={{
                    backgroundColor: '#52B6AD',
                    outline: 'none',
                    border: 'none'
                  }}
                >
                  View
                </Button>
              </Link>
            </div>
          }
        />
      </Card>
    </List.Item>
  );
}

export default EventListItem;
