import React, { useState } from 'react';
import '../main.style.css';
import { Button, Layout, Menu } from 'antd';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';

const { Header } = Layout;

function NavBar(props) {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <Header className='header'>
      <div className='header__left'>
        <Menu
          mode='horizontal'
          defaultSelectedKeys={['2']}
          className='header__menu'
        >
          <Menu.Item key='1' style={{ fontWeight: 700 }}>
            <img
              src='/assets/logo.png'
              alt='logo'
              style={{
                height: 40,
                marginRight: 16,
              }}
            />
            Revents
          </Menu.Item>
          <Menu.Item key='2'>People</Menu.Item>
        </Menu>
        <div style={{ padding: '0 24px' }}>
          <Button
            size='large'
            className='btn'
            style={{ backgroundColor: 'rgba(33, 186, 69, 1)' }}
          >
            Create Event
          </Button>
        </div>
      </div>

      <div className='header__right'>
        {authenticated ? (
          <SignedInMenu logout={logout} />
        ) : (
          <SignedOutMenu login={login} />
        )}
      </div>
    </Header>
  );
}

export default NavBar;
