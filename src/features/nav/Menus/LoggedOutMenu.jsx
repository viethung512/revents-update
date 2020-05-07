import React from 'react';
import { UserIcon } from '../../../app/layout/common/CustomIcon';
import { Avatar, Dropdown, Menu } from 'antd';

const LoggedOutMenu = ({ login, register }) => {
  const loggedOutMenu = (
    <Menu>
      <Menu.Item key='login' onClick={login}>
        Login
      </Menu.Item>
      <Menu.Item key='register' onClick={register}>
        Register
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={loggedOutMenu} trigger={['click', 'hover']}>
      <Avatar
        icon={<UserIcon />}
        shape='circle'
        style={{ backgroundColor: '#fff' }}
      />
    </Dropdown>
  );
};

export default LoggedOutMenu;
