import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { openDrawer } from '../../drawer/drawer.actions';

function MenuActions({ className }) {
  const dispatch = useDispatch();

  return (
    <Button
      size='large'
      className={`${className} btn`}
      style={{ backgroundColor: 'rgba(33, 186, 69, 1)' }}
      onClick={() => dispatch(openDrawer('EventActionDrawer'))}
    >
      Create Event
    </Button>
  );
}

export default MenuActions;
