import React from 'react';
import { Button } from 'antd';
import { Link } from '../../../app/layout/common/CustomRouter';

function MenuActions(props) {
  return (
    <Link to='/events/create'>
      <Button
        size='large'
        className='btn'
        style={{ backgroundColor: 'rgba(33, 186, 69, 1)' }}
      >
        Create Event
      </Button>
    </Link>
  );
}

export default MenuActions;
