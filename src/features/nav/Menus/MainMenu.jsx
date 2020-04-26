import React, { Fragment } from 'react';
import { Menu, Button } from 'antd';
import { NavLink, Link } from '../../../app/layout/common/CustomRouter';

function MainMenu({ authenticated }) {
  return (
    <Fragment>
      <Menu
        mode='horizontal'
        defaultSelectedKeys={['2']}
        className='header__menu'
      >
        <Menu.Item key='1' style={{ fontWeight: 700 }}>
          <NavLink to='/'>
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{
                height: 40,
                marginRight: 16,
              }}
            />
            Revents
          </NavLink>
        </Menu.Item>
        <Menu.Item>
          <NavLink to='/event'>Events</NavLink>
        </Menu.Item>
        <Menu.Item key='2'>
          <NavLink to='/people'>People</NavLink>
        </Menu.Item>
      </Menu>
      {authenticated && (
        <div style={{ padding: '0 24px' }}>
          <Link to='/events/create'>
            <Button
              size='large'
              className='btn'
              style={{ backgroundColor: 'rgba(33, 186, 69, 1)' }}
            >
              Create Event
            </Button>
          </Link>
        </div>
      )}
    </Fragment>
  );
}

export default MainMenu;
