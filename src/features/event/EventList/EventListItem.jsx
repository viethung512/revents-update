import React, { Fragment } from 'react';
import { List, Avatar, Card, Typography, Divider, Button } from 'antd';

import { ClockCircleFilled, EnvironmentFilled } from '@ant-design/icons';
import IconText from '../../../app/layout/common/IconText';
import { Link } from '../../../app/layout/common/CustomRouter';
import { objectToArray } from '../../../app/util/helper';

const { Title, Text } = Typography;

function EventListItem({ event }) {
  const {
    attendees,
    category,
    city,
    date,
    description,
    hostPhotoURL,
    hostedBy,
    id,
    title,
    venue,
  } = event;

  const attendeesData = objectToArray(attendees);

  return (
    <List.Item>
      <Card bordered style={{ width: '100%', borderRadius: 8 }}>
        <Card.Meta
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
        <Divider />
        <Card.Meta
          description={
            <Fragment>
              <span style={{ marginRight: 12 }}>
                <IconText
                  icon={<ClockCircleFilled />}
                  label='Monday 27th Apr at 6:00 AM'
                />
              </span>
              |
              <span style={{ marginLeft: 12 }}>
                <IconText icon={<EnvironmentFilled />} label={venue} />
              </span>
            </Fragment>
          }
        />
        <Divider />
        <Card.Meta
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
          style={{ backgroundColor: '#f3f4f5' }}
        />
        <Divider />
        <Card.Meta
          description={
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
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
