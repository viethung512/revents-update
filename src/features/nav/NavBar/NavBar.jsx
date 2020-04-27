import React, { useState } from 'react';
import '../main.style.css';
import { Layout, Button } from 'antd';
import Logo from '../Menus/Logo';
import MenuBar from '../Menus/MenuBar';
import MenuActions from '../Menus/MenuActions';
import MenuAuth from '../Menus/MenuAuth';
import { MenuOutlined } from '@ant-design/icons';
import MenuMobile from '../Menus/MenuMobile';

const { Header } = Layout;

function NavBar(props) {
  const [authenticated, setAuthenticated] = useState(false);
  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  const handleOpenMenuMobile = () => setOpenMenuMobile(true);
  const handleCloseMenuMobile = () => setOpenMenuMobile(false);

  return (
    <Header className='header'>
      <div className='header__left'>
        <Logo />
        <MenuBar className='header__left-menubar' />
        <MenuActions className='header__left-actions' />
      </div>
      <div className='header__right'>
        <MenuAuth
          authenticated={authenticated}
          login={login}
          logout={logout}
          className='header__right-menu-auth'
        />
      </div>
      <Button
        icon={<MenuOutlined />}
        className='menu-mobile'
        onClick={handleOpenMenuMobile}
      />
      <MenuMobile
        onClose={handleCloseMenuMobile}
        visible={openMenuMobile}
        authenticated={authenticated}
        login={login}
        logout={logout}
      />
    </Header>
  );
}

export default NavBar;
