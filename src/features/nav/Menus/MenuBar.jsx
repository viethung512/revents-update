import React from 'react';
import { Menu } from 'antd';
import { NavLink } from '../../../app/layout/common/CustomRouter';

function MenuBar({ className, authenticated }) {
  return (
    <Menu mode='horizontal' defaultSelectedKeys={['1']} className={className}>
      <Menu.Item key='1'>
        <NavLink to='/events'>Events</NavLink>
      </Menu.Item>
      {authenticated && (
        <Menu.Item key='2'>
          <NavLink to='/people'>People</NavLink>
        </Menu.Item>
      )}
    </Menu>
  );
}

export default MenuBar;
