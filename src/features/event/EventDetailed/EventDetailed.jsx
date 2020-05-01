import React from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Row, Col } from 'antd';
import EventDetailedHeader from './EventDetailedHeader';
import EventDetailedInfo from './EventDetailedInfo';
import EventDetailedChat from './EventDetailedChat';
import EventDetailedAttendees from './EventDetailedAttendees';
import Loading from '../../../app/layout/common/Loading';
import NotFound from '../../../app/layout/NotFound';

function EventDetailed(props) {
  const { id } = useParams();
  const event = useSelector(({ firestore: { data } }) =>
    data.event ? data.event : {}
  );
  const { event: loading } = useSelector(
    ({
      firestore: {
        status: { requesting },
      },
    }) => requesting
  );

  useFirestoreConnect({
    collection: 'events',
    doc: id,
    storeAs: 'event',
  });

  const result =
    !loading && Object.keys(event).length <= 0 ? (
      <NotFound title={`Oops - event not found`} />
    ) : (
      <Loading loading={loading}>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <EventDetailedHeader
              event={event}
              className='card event-detailed__header'
            />
            <EventDetailedInfo
              event={event}
              className='card event-detailed__info'
            />
            <EventDetailedChat
              event={event}
              className='card event-detailed__chat'
            />
          </Col>
          <Col xs={0} sm={0} md={0} lg={8} xl={8}>
            <EventDetailedAttendees
              className='card event-detailed__attendees'
              event={event}
            />
          </Col>
        </Row>
      </Loading>
    );

  return <div className='event-detailed'>{result}</div>;
}

export default EventDetailed;
