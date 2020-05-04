import React from 'react';
import { Card, Avatar, Typography } from 'antd';
import { calculateAge } from '../../../app/util/helper';

const { Title, Text } = Typography;

function UserDetailedHeader({
  user: { avatarUrl, displayName, city, dateOfBirth },
}) {
  const age = calculateAge(dateOfBirth);

  const title = <Title level={3}>{displayName}</Title>;

  const description = (
    <Text style={{ fontWeight: 'bold' }}>
      {age ? age : 'Unknown'} age, Live in {city ? city : 'Unknown'} city
    </Text>
  );

  return (
    <Card className='card'>
      <Card.Meta
        avatar={
          <Avatar size={150} shape='circle' src={avatarUrl} alt={displayName} />
        }
        title={title}
        description={description}
      ></Card.Meta>
    </Card>
  );
}

export default UserDetailedHeader;
