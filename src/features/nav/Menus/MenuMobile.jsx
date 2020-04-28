import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Menu, Button, Avatar, Divider } from 'antd';
import {
  PlusOutlined,
  CalendarFilled,
  UserSwitchOutlined,
  UserOutlined,
  SettingFilled,
  LogoutOutlined
} from '@ant-design/icons';
import { logout, login } from '../../auth/auth.actions';

const { SubMenu } = Menu;

function MenuMobile(props) {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.auth);

  const authArea = authenticated ? (
    <Menu>
      <SubMenu
        key='sub1'
        title={
          <Fragment>
            <Avatar
              size='small'
              src='/assets/user.png'
              shape='circle'
              style={{ marginRight: 12 }}
            />
            Ngô Việt Hưng
          </Fragment>
        }
      >
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
        <Menu.Item key='6' onClick={() => dispatch(logout())}>
          <LogoutOutlined />
          Sign Out
        </Menu.Item>
      </SubMenu>
    </Menu>
  ) : (
    <div
      style={{
        padding: '0 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
    >
      <Button
        size='large'
        style={{ flex: '1' }}
        onClick={() => dispatch(login())}
      >
        Login
      </Button>
      <Button size='large' style={{ flex: '1' }}>
        Register
      </Button>
    </div>
  );
  return (
    <Fragment>
      {authArea}
      <Divider />
      <Menu style={{ width: 256 }} mode='inline'>
        <Menu.Item key='events'>Events</Menu.Item>
        <Menu.Item key='people'>People</Menu.Item>
      </Menu>
    </Fragment>
  );
}

export default MenuMobile;
