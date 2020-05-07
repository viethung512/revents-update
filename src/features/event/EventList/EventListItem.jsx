import React, { Fragment } from 'react';
import './style.css';
import { List, Avatar, Card, Typography, Button, Tag } from 'antd';
import { ClockCircleFilled, EnvironmentFilled } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
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
    cancelled,
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
        {cancelled && (
          <Tag
            color='red'
            className='ribbon ribbon--danger'
            style={{ right: '-12px' }}
          >
            This event has been cancelled
          </Tag>
        )}

        <Card.Meta
          className='event__header'
          avatar={
            <LazyLoad
              height={300}
              placeholder={<Avatar size={80} src='/assets/user.png' />}
            >
              <Avatar size={80} src={hostPhotoURL || '/assets/user.png'} />
            </LazyLoad>
          }
          title={
            <Link to={`/events/${id}`}>
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
              <Link to={`/profile/${attendee.id}`} key={attendee.id}>
                <LazyLoad
                  height={100}
                  placeholder={<Avatar size='default' src='/assets/user.png' />}
                >
                  <Avatar size='default' src={attendee.photoURL} />
                </LazyLoad>
              </Link>
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
              <Link to={`/events/${id}`}>
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
