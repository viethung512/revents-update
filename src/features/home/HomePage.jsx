import React from 'react';
import './style.css';
import { Layout, Button } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from '../../app/layout/common/CustomRouter';

const { Content } = Layout;

function HomePage(props) {
  return (
    <Content className='homepage'>
      <div className='homepage__header'>
        <img
          src='/assets/logo.png'
          alt='logo'
          className='homepage__header-img'
        />
        <h1 className='homepage__header-title'>Re-vents</h1>
      </div>
      <Link to='/event'>
        <Button
          icon={<ArrowRightOutlined className='homepage__action-icon' />}
          shape='round'
          size='large'
          className='homepage__action'
        >
          <span className='homepage__action-title'>Get started</span>
        </Button>
      </Link>
    </Content>
  );
}

export default HomePage;
