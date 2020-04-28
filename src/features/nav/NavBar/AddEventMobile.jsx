import React from 'react';
import './style.css';
import { PlusOutlined } from '@ant-design/icons';
import { Affix, Button } from 'antd';

function AddEventMobile({ onClick }) {
  return (
    <Affix
      style={{
        position: 'absolute',
        bottom: 32,
        right: 32
      }}
      className='add-event-mobile'
    >
      <Button
        size='large'
        shape='circle'
        icon={<PlusOutlined />}
        onClick={onClick}
      />
    </Affix>
  );
}

export default AddEventMobile;
