import React, { useState } from 'react';
import '../main.style.css';
import { Layout, Button } from 'antd';
import Logo from '../Menus/Logo';
import MenuBar from '../Menus/MenuBar';
import MenuActions from '../Menus/MenuActions';
import MenuAuth from '../Menus/MenuAuth';
import { MenuOutlined } from '@ant-design/icons';

const { Header } = Layout;

function NavBar(props) {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <Header className='header'>
      <Button icon={<MenuOutlined />} className='menu-mobile' />
      <div className='header__left'>
        <Logo />
        <MenuBar />
        <MenuActions />
      </div>
      <div className='header__right'>
        <MenuAuth authenticated={authenticated} login={login} logout={logout} />
      </div>
    </Header>
  );
}

export default NavBar;
