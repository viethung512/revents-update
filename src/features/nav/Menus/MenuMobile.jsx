import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { Menu, Button, Avatar, Divider } from 'antd';
import {
  PlusOutlined,
  CalendarFilled,
  UserSwitchOutlined,
  UserOutlined,
  SettingFilled,
  LogoutOutlined,
} from '@ant-design/icons';
import { Link } from '../../../app/layout/common/CustomRouter';
import { openModal } from '../../modal/modal.actions';
import { closeDrawer } from '../../drawer/drawer.actions';

const { SubMenu } = Menu;

function MenuMobile(props) {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const history = useHistory();

  const {
    profile: { isLoaded, isEmpty, displayName, avatarUrl = '/assets/user.png' },
  } = useSelector(state => state.firebase);

  const authenticated = isLoaded && !isEmpty;

  const handleLogin = () => {
    dispatch(openModal('LoginModal'));
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    history.push('/');
    dispatch(closeDrawer());
  };

  const authArea = authenticated ? (
    <Menu>
      <SubMenu
        key='sub1'
        title={
          <Fragment>
            <Avatar
              size='small'
              src={avatarUrl}
              shape='circle'
              style={{ marginRight: 12 }}
            />
            {displayName}
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
          <Link to='/settings'>
            <SettingFilled />
            Settings
          </Link>
        </Menu.Item>
        <Menu.Item key='6' onClick={handleLogout}>
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
        alignItems: 'center',
      }}
    >
      <Button size='large' style={{ flex: '1' }} onClick={handleLogin}>
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
