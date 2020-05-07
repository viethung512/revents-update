import React from 'react';
import { Card, List, Avatar, Typography, Tag } from 'antd';
import LazyLoad from 'react-lazyload';
import { Link } from '../../../app/layout/common/CustomRouter';

const { Text } = Typography;

function EventDetailedAttendees({ className, attendees }) {
  attendees = attendees.sort((a, b) => a.joinDate - b.joinDate);
  return (
    <Card
      className={className}
      headStyle={{ backgroundColor: '#00b5ad', textAlign: 'center' }}
      bodyStyle={{ padding: 12 }}
      title={
        <Text className='event-detailed__attendees-title'>
          {attendees.length > 1
            ? `${attendees.length} People Going`
            : '1 Person Going'}
        </Text>
      }
    >
      <List
        itemLayout='horizontal'
        dataSource={attendees}
        renderItem={({ id, photoURL, displayName, host }) => (
          <List.Item>
            {host && (
              <Tag
                className='ribbon ribbon--warning'
                color='orange'
                style={{ top: 0, right: '-24px' }}
              >
                Host
              </Tag>
            )}
            <List.Item.Meta
              avatar={
                <LazyLoad
                  height={150}
                  placeholder={
                    <Avatar
                      shape='square'
                      size='large'
                      src='/assets/user.png'
                    />
                  }
                >
                  <Avatar shape='square' size='large' src={photoURL} />
                </LazyLoad>
              }
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
