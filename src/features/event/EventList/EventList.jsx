import React from 'react';
import { List } from 'antd';
import EventListItem from './EventListItem';

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

function EventList(props) {
  return (
    <List
      style={{ backgroundColor: '#fff' }}
      itemLayout='horizontal'
      dataSource={data}
      renderItem={item => <EventListItem event={item} />}
    />
  );
}

export default EventList;
