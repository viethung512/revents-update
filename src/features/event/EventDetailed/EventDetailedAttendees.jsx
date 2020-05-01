import React from 'react';
import { Link } from '../../../app/layout/common/CustomRouter';
import { Card, List, Avatar, Typography } from 'antd';
import { objectToArray } from '../../../app/util/helper';

const { Text } = Typography;

function EventDetailedAttendees({ className, event }) {
  let { attendees = {} } = event;

  attendees = objectToArray(attendees);

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
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar shape='square' size='large' src={item.photoURL} />
              }
              title={
                <Link to='/profile/:userId'>
                  <Text>{item.name}</Text>
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
