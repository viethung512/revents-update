import React from 'react';

import { useFirestoreConnect } from 'react-redux-firebase';

import { List } from 'antd';
import EventListItem from './EventListItem';
import { useSelector } from 'react-redux';
import { objectToArray } from '../../../app/util/helper';

function EventList(props) {
  const events = useSelector(({ firestore: { data } }) =>
    data.events ? objectToArray(data.events) : []
  );

  useFirestoreConnect({
    collection: 'events',
    storeAs: 'events',
  });

  const loading = events.length > 0 ? false : true;
  return (
    <List
      itemLayout='horizontal'
      dataSource={events}
      renderItem={event => <EventListItem event={event} />}
      grid={{ gutter: 16, column: 1 }}
      loading={loading}
    />
  );
}

export default EventList;
