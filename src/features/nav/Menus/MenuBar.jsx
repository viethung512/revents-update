import React from 'react';
import { Menu } from 'antd';
import { NavLink } from '../../../app/layout/common/CustomRouter';

function MenuBar(props) {
  return (
    <Menu
      mode='horizontal'
      defaultSelectedKeys={['1']}
      className='header__menu'
    >
      <Menu.Item key='1'>
        <NavLink to='/event'>Events</NavLink>
      </Menu.Item>
      <Menu.Item key='2'>
        <NavLink to='/people'>People</NavLink>
      </Menu.Item>
    </Menu>
  );
}

export default MenuBar;
