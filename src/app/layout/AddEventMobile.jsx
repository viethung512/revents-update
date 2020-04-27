import React from 'react';
import './layout.style.css';
import { PlusOutlined } from '@ant-design/icons';
import { Affix, Button } from 'antd';
import { Link } from './common/CustomRouter';

function AddEventMobile(props) {
  return (
    <Link to='/event/create'>
      <Affix
        style={{
          position: 'absolute',
          bottom: 32,
          right: 32
        }}
        className='add-event-mobile'
      >
        <Button size='large' shape='circle' icon={<PlusOutlined />} />
      </Affix>
    </Link>
  );
}

export default AddEventMobile;
