import React from 'react';
import { List, Avatar } from 'antd';

function EventListItem({ event }) {
  return (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' />
        }
        title={<a href='https://ant.design'>{event.title}</a>}
        description='Ant Design, a design language for background applications, is refined by Ant UED Team'
      />
    </List.Item>
  );
}

export default EventListItem;
