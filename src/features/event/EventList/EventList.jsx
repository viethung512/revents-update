import React, { useEffect } from 'react';
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
  const { events, moreEvents } = useSelector(state => state.event);
  const { loading } = useSelector(state => state.async);

  const initEvent = async () => await dispatch(getEventsForDashboard());

  useEffect(() => {
    dispatch(clearEvents());
    initEvent();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFirestoreConnect({
    collection: 'events',
    storeAs: 'events',
  });

  const handleLoadMore = async () => {
    const lastEvent = events[events.length - 1];
    await dispatch(getEventsForDashboard(lastEvent));
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
        dataSource={events}
        renderItem={event => <EventListItem event={event} />}
      >
        {loading && moreEvents && events.length > 0 && (
          <div className='loading-container'>
            <Spin indicator={loadingIcon} />
          </div>
        )}
      </List>
    </InfiniteScroll>
  );
}

export default EventList;
