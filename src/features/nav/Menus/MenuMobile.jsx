import React, { Fragment } from 'react';
import { Drawer, Typography, Menu, Button, Avatar, Divider } from 'antd';
import {
  PlusOutlined,
  CalendarFilled,
  UserSwitchOutlined,
  UserOutlined,
  SettingFilled,
  LogoutOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const title = <Typography level={3}>REVENTS</Typography>;

function MenuMobile({ onClose, visible, authenticated, login, logout }) {
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
        <Menu.Item key='6' onClick={logout}>
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
      <Button size='large' style={{ flex: '1' }} onClick={login}>
        Login
      </Button>
      <Button size='large' style={{ flex: '1' }}>
        Register
      </Button>
    </div>
  );
  return (
    <Drawer
      title={title}
      placement='right'
      closable={false}
      onClose={onClose}
      visible={visible}
      bodyStyle={{ paddingLeft: 0 }}
    >
      {authArea}
      <Divider />
      <Menu style={{ width: 256 }} mode='inline'>
        <Menu.Item key='events'>Events</Menu.Item>
        <Menu.Item key='people'>People</Menu.Item>
      </Menu>
    </Drawer>
  );
}

export default MenuMobile;
