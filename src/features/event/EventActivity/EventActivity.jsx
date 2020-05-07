import React from 'react';
import './style.css';
import { List, Avatar, Affix, Typography } from 'antd';
import { useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatDistance } from 'date-fns';

const { Title, Text } = Typography;

function EventActivity(props) {
  const activities = useSelector(
    ({ firestore: { ordered } }) => ordered.activities
  );
  useFirestoreConnect({
    collection: 'activities',
    orderBy: 'eventDate',
    limit: 5,
    storeAs: 'activities',
  });

  return (
    <Affix offsetTop={100}>
      <div className='event-activity'>
        <List
          style={{ backgroundColor: '#fff' }}
          itemLayout='horizontal'
          header={
            <Title level={4} style={{ marginBottom: 0, padding: '0 12px' }}>
              Recent Activity
            </Title>
          }
          bordered
          dataSource={activities}
          renderItem={item => (
            <List.Item style={{ padding: 12 }}>
              <List.Item.Meta
                avatar={<Avatar src={item.photoURL} alt={item.hostedBy} />}
                title={
                  item.type === 'newEvent' ? 'New Event' : 'Event Cancelled'
                }
                description={
                  <Text>
                    <Link to={`/profile/${item.hostUid}`}>{item.hostedBy}</Link>{' '}
                    {item.type === 'newEvent'
                      ? 'is hosting '
                      : 'has cancelled '}
                    <Link to={`/event/${item.eventId}`}>{item.title}</Link>
                    {item.timestamp && (
                      <Text
                        style={{
                          marginLeft: 4,
                          fontSize: 10,
                          color: 'rgba(0, 0, 0, 0.2)',
                        }}
                      >
                        {formatDistance(item.timestamp.toDate(), Date.now())}{' '}
                        ago
                      </Text>
                    )}
                  </Text>
                }
              />
            </List.Item>
          )}
        />
      </div>
    </Affix>
  );
}

export default EventActivity;
