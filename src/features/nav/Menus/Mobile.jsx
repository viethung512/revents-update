import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { Menu, Affix } from 'antd';
import {
  EventIcon,
  PeopleIcon,
  ActivityIcon,
  UserSettingIcon,
  SettingIcon,
} from '../../../app/layout/common/CustomIcon';

function Mobile({ authenticated, authenticatedId }) {
  return (
    <Affix offsetTop={0}>
      <div className='navbar-mobile'>
        <Menu mode='horizontal' className='navbar-mobile__menu'>
          <Menu.Item key='events' className='navbar-mobile__menu-item'>
            <Link to='/events'>
              <EventIcon />
            </Link>
          </Menu.Item>
          {authenticated && (
            <Menu.Item key='people' className='navbar-mobile__menu-item'>
              <Link to='/people'>
                <PeopleIcon />
              </Link>
            </Menu.Item>
          )}
          {authenticated && (
            <Menu.Item key='activity' className='navbar-mobile__menu-item'>
              <Link to='/activity'>
                <ActivityIcon />
              </Link>
            </Menu.Item>
          )}

          {authenticated && (
            <Menu.Item key='person' className='navbar-mobile__menu-item'>
              <Link to={`/profile/${authenticatedId}`}>
                <UserSettingIcon />
              </Link>
            </Menu.Item>
          )}

          {authenticated && (
            <Menu.Item key='setting' className='navbar-mobile__menu-item'>
              <Link to='/settings'>
                <SettingIcon />
              </Link>
            </Menu.Item>
          )}
        </Menu>
      </div>
    </Affix>
  );
}

export default Mobile;
