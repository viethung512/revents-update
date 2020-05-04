import React from 'react';
import { useDispatch } from 'react-redux';
import { Drawer, Typography } from 'antd';
import { closeDrawer } from './drawer.actions';
import EventAction from '../event/EventAction/EventAction';

const { Title } = Typography;

function EventActionDrawer({ id }) {
  const dispatch = useDispatch();
  const isMobile = window.innerWidth >= 450 ? false : true;

  const title = (
    <Title level={4} style={{ color: '#00BCCA', textTransform: 'uppercase' }}>
      {id ? `Edit event ${id}` : 'Create new Event'}
    </Title>
  );
  return (
    <Drawer
      title={title}
      width={isMobile ? '100%' : 450}
      getContainer={false}
      visible={true}
      onClose={() => dispatch(closeDrawer())}
      placement='left'
    >
      <EventAction id={id} />
    </Drawer>
  );
}

export default EventActionDrawer;
