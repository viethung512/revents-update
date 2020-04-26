import React, { useState } from 'react';
import '../main.style.css';
import { Layout } from 'antd';
import SignedOutMenu from '../Menus/SignedOutMenu';
import SignedInMenu from '../Menus/SignedInMenu';
import MainMenu from '../Menus/MainMenu';

const { Header } = Layout;

function NavBar(props) {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <Header className='header'>
      <div className='header__left'>
        <MainMenu authenticated={authenticated} />
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
