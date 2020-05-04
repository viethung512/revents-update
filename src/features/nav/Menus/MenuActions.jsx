import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { openDrawer } from '../../drawer/drawer.actions';

function MenuActions({ className }) {
  const dispatch = useDispatch();

  return (
    <Button
      size='large'
      className={`${className} btn btn--success`}
      style={{ border: '2px solid #fff' }}
      onClick={() => dispatch(openDrawer('EventActionDrawer'))}
    >
      Create Event
    </Button>
  );
}

export default MenuActions;
