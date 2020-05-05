import React from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect, useFirebaseConnect } from 'react-redux-firebase';
import { Row, Col } from 'antd';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedAttendees from './EventDetailedAttendees';
import Loading from '../../../app/layout/common/Loading';
import NotFound from '../../../app/layout/NotFound';
import { objectToArray } from '../../../app/util/helper';

function EventDetailed(props) {
  const { id } = useParams();
  const authenticatedId = useSelector(state => state.firebase.auth.uid);
  const event = useSelector(({ firestore: { data } }) =>
    data.event ? { ...data.event, id } : {}
  );
  const eventChat = useSelector(({ firebase: { ordered } }) =>
    ordered.event_chat && ordered.event_chat[id]
      ? ordered.event_chat[id].map(chat => ({ id: chat.key, ...chat.value }))
      : []
  );

  const { event: loading } = useSelector(
    ({
      firestore: {
        status: { requesting },
      },
    }) => requesting
  );
  const { profile } = useSelector(state => state.firebase);

  useFirestoreConnect({
    collection: 'events',
    doc: id,
    storeAs: 'event',
  });

  useFirebaseConnect(`event_chat/${id}`);

  const attendees =
    event && event.attendees ? objectToArray(event.attendees) : [];

  const result =
    !loading && Object.keys(event).length <= 0 ? (
      <NotFound title={`Oops - event not found`} />
    ) : (
      <Loading loading={loading}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <EventDetailedHeader
              event={event}
              profile={profile}
              attendees={attendees}
              authenticatedId={authenticatedId}
              className='card event-detailed__header'
            />
            <EventDetailedInfo
              event={event}
              className='card event-detailed__info'
            />
            <EventDetailedChat
              event={event}
              profile={profile}
              eventChat={eventChat}
              className='card event-detailed__chat'
            />
          </Col>
          <Col xs={0} sm={0} md={0} lg={8} xl={8}>
            <EventDetailedAttendees
              className='card card--ribbon event-detailed__attendees'
              attendees={attendees}
            />
          </Col>
        </Row>
      </Loading>
    );

  return <div className='event-detailed'>{result}</div>;
}

export default EventDetailed;
