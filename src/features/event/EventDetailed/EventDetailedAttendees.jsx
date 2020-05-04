import React from 'react';
import { Link } from '../../../app/layout/common/CustomRouter';
import { Card, List, Avatar, Typography } from 'antd';

const { Text } = Typography;

function EventDetailedAttendees({ className, attendees }) {
  return (
    <Card
      className={className}
      headStyle={{ backgroundColor: '#00b5ad', textAlign: 'center' }}
      bodyStyle={{ padding: 12 }}
      title={
        <Text className='event-detailed__attendees-title'>2 People Going</Text>
      }
    >
      <List
        itemLayout='horizontal'
        dataSource={attendees}
        renderItem={({ id, photoURL, displayName }) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar shape='square' size='large' src={photoURL} />}
              title={
                <Link to={`/profile/${id}`}>
                  <Text>{displayName}</Text>
                </Link>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default EventDetailedAttendees;
