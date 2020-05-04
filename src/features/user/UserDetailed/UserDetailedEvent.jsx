import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Typography, List } from 'antd';
import { CalendarFilled } from '@ant-design/icons';
import { getUserEventByKey } from '../user.actions';
import { formatEventDate } from '../../../app/util/helper';
import { Link } from 'react-router-dom';

const { Title } = Typography;

const tabList = [
  {
    key: 'tab1',
    tab: 'All Events',
  },
  {
    key: 'tab2',
    tab: 'Pass Events',
  },
  {
    key: 'tab3',
    tab: 'Future Events',
  },
  {
    key: 'tab4',
    tab: 'Events Hosted',
  },
];

const EventList = ({ events, loading }) => {
  return (
    <List
      loading={loading}
      grid={{ gutter: [16, 24], column: 5 }}
      dataSource={events}
      renderItem={item => {
        return (
          <List.Item>
            <Link to={`/event/${item.id}`}>
              <Card
                size='small'
                hoverable
                bordered
                cover={
                  <img
                    src={`/assets/categoryImages/${item.category}.jpg`}
                    alt={item.category}
                  />
                }
                bodyStyle={{ textAlign: 'center' }}
              >
                <Card.Meta
                  title={item.title}
                  description={formatEventDate(item.date)}
                />
              </Card>
            </Link>
          </List.Item>
        );
      }}
    />
  );
};

function UserDetailedEvent({ user: { id } }) {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.async);
  const userEventByKey = useSelector(state => state.user.events);

  const [key, setKey] = useState('tab1');

  useEffect(() => {
    if (id) {
      dispatch(getUserEventByKey(id, key));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onTabChange = key => {
    setKey(key);
    dispatch(getUserEventByKey(id, key));
  };

  return (
    <Card
      className='card'
      style={{ width: '100%' }}
      title={
        <Title level={4}>
          <CalendarFilled /> Events
        </Title>
      }
      tabList={tabList}
      activeTabKey={key}
      onTabChange={key => onTabChange(key)}
    >
      <EventList events={userEventByKey} loading={loading} />
    </Card>
  );
}

export default UserDetailedEvent;
