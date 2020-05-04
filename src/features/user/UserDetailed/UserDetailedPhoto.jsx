import React from 'react';
import { Card, List, Typography } from 'antd';
import { PictureFilled } from '@ant-design/icons';

const { Title } = Typography;

function UserDetailedPhoto({ user, photos }) {
  return (
    <Card className='card'>
      <List
        grid={{ gutter: 12, column: 4 }}
        header={
          <Title level={4}>
            <PictureFilled /> Photos
          </Title>
        }
        dataSource={photos}
        renderItem={item => (
          <List.Item>
            <img src={item.url} alt={item.name} style={{ width: '100%' }} />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default UserDetailedPhoto;
