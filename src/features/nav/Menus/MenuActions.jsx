import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { openDrawer } from '../../drawer/drawer.actions';

function MenuActions(props) {
  const dispatch = useDispatch();

  const createEvent = () => dispatch(openDrawer('EventActionDrawer'));

  return (
    <Button
      size='large'
      className='btn btn--success'
      style={{ border: '2px solid #fff', color: '#fff' }}
      onClick={createEvent}
    >
      Create Event
    </Button>
  );
}

export default MenuActions;
