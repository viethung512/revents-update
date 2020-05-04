import React from 'react';
import { Link } from '../../../app/layout/common/CustomRouter';
import { Card, Typography, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { formatEventDate } from '../../../app/util/helper';
import { openDrawer } from '../../drawer/drawer.actions';
import { goingToEvent, cancelGoingToEvent } from '../event.actions';

const { Title, Text } = Typography;

function EventDetailedHeader({
  event,
  profile: { isLoaded, isEmpty },
  className,
  authenticatedId,
  attendees,
}) {
  const dispatch = useDispatch();
  const goingToEventLoading = useSelector(state =>
    state.async.actionType === 'goingToEvent' ? true : null
  );
  const cancelGoingToEventLoading = useSelector(state =>
    state.async.actionType === 'cancelGoingToEvent' ? true : null
  );

  const { title, hostedBy, hostUid, date, category } = event;

  const isGoing = attendees.find(attendee => attendee.id === authenticatedId);

  const initEventAction = () =>
    dispatch(openDrawer('EventActionDrawer', { event }));

  const joinEvent = () => dispatch(goingToEvent(event));
  const cancelMyPlace = () => dispatch(cancelGoingToEvent(event));

  const authenticated = isLoaded && !isEmpty;

  const actions = authenticated
    ? authenticatedId === hostUid
      ? [
          <Button
            size='large'
            className='btn btn--warning'
            style={{
              float: 'right',
              marginRight: 12,
            }}
            onClick={initEventAction}
          >
            Manage event
          </Button>,
        ]
      : event.cancelled
      ? [
          <Button
            ghost
            danger
            size='large'
            style={{ float: 'left', marginLeft: 12 }}
          >
            This event has been cancelled
          </Button>,
        ]
      : isGoing
      ? [
          <Button
            size='large'
            className='btn btn--default'
            style={{ float: 'left', marginRight: 'auto', marginLeft: 12 }}
            onClick={cancelMyPlace}
            loading={cancelGoingToEventLoading}
          >
            Cancel My Place
          </Button>,
        ]
      : [
          <Button
            size='large'
            className='btn btn--primary'
            style={{ float: 'left', margin: '0 12px' }}
            onClick={joinEvent}
            loading={goingToEventLoading}
          >
            JOIN THIS EVENT
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
          src={`/assets/categoryImages/${category}.jpg`}
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
          {date && <span>{formatEventDate(date)}</span>}
        </Text>
        <Text className='event-detailed__header-title-description'>
          Hosted by{' '}
          <Link to={`/profile/${hostUid}`}>
            <strong>{hostedBy}</strong>
          </Link>
        </Text>
      </div>
    </Card>
  );
}

export default EventDetailedHeader;
