import React from 'react';
import { Card, Typography, List } from 'antd';
import { SmileOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons';
import { format } from 'date-fns';

const { Title, Text } = Typography;

const showInformations = (occupation, origin, createdAt) => {
  return [
    <Text>
      I am a: <strong>{occupation ? occupation : 'tbn'}</strong>{' '}
    </Text>,
    <Text>
      Originally from: <strong>{origin ? origin : 'tbn'}</strong>
    </Text>,
    <Text>
      Member since:{' '}
      <strong>
        {createdAt
          ? format(createdAt.toDate(), 'ccc do MMM yyyy hh:mm:ss a')
          : 'tbn'}
      </strong>
    </Text>,
  ];
};

function UserDetailedInfo({
  user: { displayName, occupation, origin, createdAt, interests = [] },
}) {
  return (
    <Card className='card' bodyStyle={{ display: 'flex' }}>
      <Card.Meta
        style={{ flex: 2 }}
        title={
          <Title level={4} style={{ marginBottom: 0 }}>
            <SmileOutlined /> About {displayName}
          </Title>
        }
        description={
          <List
            grid={{ gutter: 16, column: 1 }}
            size='small'
            dataSource={showInformations(occupation, origin, createdAt)}
            renderItem={item => (
              <List.Item style={{ paddingLeft: 0 }}>{item}</List.Item>
            )}
          />
        }
      />
      <Card.Meta
        style={{ flex: 1 }}
        title={
          <Title level={4} style={{ marginBottom: 0 }}>
            <HeartOutlined /> Interests
          </Title>
        }
        description={
          <List
            grid={{ gutter: 16, column: 1 }}
            size='small'
            dataSource={interests}
            renderItem={interest => (
              <List.Item style={{ padding: 0 }}>
                <Text>
                  <HeartFilled /> {interest}
                </Text>
              </List.Item>
            )}
          />
        }
      />
    </Card>
  );
}

export default UserDetailedInfo;
