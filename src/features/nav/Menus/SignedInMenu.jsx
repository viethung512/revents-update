import React from 'react';
import { Link } from '../../../app/layout/common/CustomRouter';
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
import { useDispatch } from 'react-redux';
import { openDrawer } from '../../drawer/drawer.actions';

function SignedInMenu({ logout, className, profile, auth }) {
  const dispatch = useDispatch();
  const { displayName, avatarUrl = '/assets/user.png' } = profile;

  const menu = () => (
    <Menu className={className}>
      <Menu.Item
        key='1'
        onClick={() => dispatch(openDrawer('EventActionDrawer'))}
      >
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
        <Link
          to={`/profile/${auth.uid}`}
          style={{ color: 'rgba(0, 0, 0, 0.65)' }}
        >
          <UserOutlined /> My Profile
        </Link>
      </Menu.Item>
      <Menu.Item key='5'>
        <Link to='/settings' style={{ color: 'rgba(0, 0, 0, 0.65)' }}>
          <SettingFilled /> Settings
        </Link>
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
          src={avatarUrl}
          shape='circle'
          style={{ marginRight: 12 }}
        />
        {displayName}
        <DownOutlined />
      </Button>
    </Dropdown>
  );
}

export default SignedInMenu;
