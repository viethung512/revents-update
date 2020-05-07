import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Avatar, Button, Dropdown, Menu, Typography } from 'antd';
import {
  DownOutlined,
  LogoutOutlined,
  SettingFilled,
  UserOutlined,
  UserSwitchOutlined,
  CalendarFilled,
  PlusOutlined,
} from '@ant-design/icons';
import { openDrawer } from '../../drawer/drawer.actions';

const { Title } = Typography;

const LoggedInMenu = ({
  profile: { displayName, avatarUrl = '/assets/user.png' },
  logout,
  auth,
}) => {
  const dispatch = useDispatch();

  const loggedInMenu = (
    <Menu>
      <Menu.Item>
        <Title level={4} className='auth-info--mobile'>
          {displayName}
        </Title>
      </Menu.Item>
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
    <Dropdown
      trigger={['click']}
      overlay={loggedInMenu}
      icon={<DownOutlined />}
    >
      <Button size='large' className='auth-button-info'>
        <Avatar
          size='small'
          src={avatarUrl}
          shape='circle'
          style={{ marginRight: 12 }}
        />
        <div className='auth-info'>
          <span>{displayName}</span>
          <DownOutlined />
        </div>
      </Button>
    </Dropdown>
  );
};

export default LoggedInMenu;
