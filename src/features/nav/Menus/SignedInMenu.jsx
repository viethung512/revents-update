import React from 'react';
import { Dropdown, Button, Avatar, Menu } from 'antd';
import {
  DownOutlined,
  PlusOutlined,
  CalendarFilled,
  UserSwitchOutlined,
  UserOutlined,
  SettingFilled,
  LogoutOutlined,
} from '@ant-design/icons';

function SignedInMenu({ logout, className }) {
  const menu = () => (
    <Menu className={className} >
      <Menu.Item key='1'>
        <PlusOutlined />
        Create Event
      </Menu.Item>
      <Menu.Item key='2'>
        <CalendarFilled />
        My Events
      </Menu.Item>
      <Menu.Item key='3'>
        <UserSwitchOutlined />
        My Network
      </Menu.Item>
      <Menu.Item key='4'>
        <UserOutlined />
        My Profile
      </Menu.Item>
      <Menu.Item key='5'>
        <SettingFilled />
        Settings
      </Menu.Item>
      <Menu.Item key='6' onClick={logout}>
        <LogoutOutlined />
        Sign Out
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown trigger={['click']} overlay={menu} icon={<DownOutlined />}>
      <Button
        size='large'
        className='header__auth btn'
        style={{ border: 'none' }}
      >
        <Avatar
          size='small'
          src='/assets/user.png'
          shape='circle'
          style={{ marginRight: 12 }}
        />
        Ngô Việt Hưng
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default SignedInMenu;
