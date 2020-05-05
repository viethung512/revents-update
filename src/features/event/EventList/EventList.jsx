import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useFirestoreConnect } from 'react-redux-firebase';
import { List, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import EventListItem from './EventListItem';
import { useSelector, useDispatch } from 'react-redux';
import { getEventsForDashboard, clearEvents } from '../event.actions';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function EventList(props) {
  const dispatch = useDispatch();
  const events = useSelector(state => state.event.events);
  const { loading } = useSelector(state => state.async);

  const [moreEvents, setMoreEvents] = useState(true);
  const [loadedEvents, setLoadedEvents] = useState([]);

  useEffect(() => {
    const initialEvents = async () => {
      const next = dispatch(getEventsForDashboard());

      if (next && next.docs && next.docs.length >= 1) {
        setMoreEvents(true);
      }
    };

    initialEvents();

    return () => {
      setLoadedEvents([]);
      dispatch(clearEvents());
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (loadedEvents.length === 0 && events.length !== 0) {
      setLoadedEvents(events);
    } else {
      setLoadedEvents([...loadedEvents, ...events]);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events.length]);

  useFirestoreConnect({
    collection: 'events',
    storeAs: 'events',
  });

  const handleLoadMore = async () => {
    const lastEvent = events[events.length - 1];
    let next = await dispatch(getEventsForDashboard(lastEvent));

    if (!(next && next.docs && next.docs.length > 1)) {
      setMoreEvents(false);
    }
  };

  return (
    <InfiniteScroll
      pageStart={0}
      loadMore={handleLoadMore}
      hasMore={!loading && moreEvents}
      initialLoad={false}
    >
      <List
        itemLayout='vertical'
        dataSource={loadedEvents}
        renderItem={event => <EventListItem event={event} />}
      >
        {loading && moreEvents && (
          <div className='loading-container'>
            <Spin indicator={loadingIcon} />
          </div>
        )}
      </List>
    </InfiniteScroll>
  );
}

export default EventList;
