import React, { Fragment } from 'react';
import './style.css';
import { List, Avatar, Card, Typography, Button } from 'antd';

import { ClockCircleFilled, EnvironmentFilled } from '@ant-design/icons';
import IconText from '../../../app/layout/common/IconText';
import { Link } from '../../../app/layout/common/CustomRouter';
import { objectToArray, formatEventDate } from '../../../app/util/helper';

const { Title, Text } = Typography;

function EventListItem({ event }) {
  const {
    id,
    attendees,
    date,
    description,
    hostPhotoURL,
    hostedBy,
    hostUid,
    title,
    venue,
  } = event;

  const attendeesData = objectToArray(attendees);

  return (
    <List.Item>
      <Card
        bordered
        className='event'
        bodyStyle={{
          padding: 0,
        }}
      >
        <Card.Meta
          className='event__header'
          avatar={<Avatar size={80} src={hostPhotoURL || '/assets/user.png'} />}
          title={
            <Link to={`/event/${id}`}>
              <Title level={4}>{title}</Title>
            </Link>
          }
          description={
            <span>
              Hosted By
              <Link to={`/profile/${hostUid}`}>
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
                  label={date && <span>{formatEventDate(date)}</span>}
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
                alignItems: 'center',
              }}
            >
              <Text type='secondary'>{description}</Text>
              <Link to={`/event/${id}`}>
                <Button
                  type='primary'
                  size='large'
                  style={{
                    backgroundColor: '#52B6AD',
                    outline: 'none',
                    border: 'none',
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
