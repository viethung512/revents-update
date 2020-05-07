import React, { Fragment } from 'react';
import '../main.style.css';
import { Layout } from 'antd';
import { useSelector } from 'react-redux';

import Logo from '../Menus/Logo';
import MenuBar from '../Menus/MenuBar';
import MenuActions from '../Menus/MenuActions';
import Mobile from '../Menus/Mobile';
import UserMenu from '../Menus/UserMenu';

const { Header } = Layout;

function NavBar(props) {
  const {
    profile: { isLoaded, isEmpty },
    auth: { uid },
  } = useSelector(state => state.firebase);

  const authenticated = isLoaded && !isEmpty;

  return (
    <Fragment>
      <Header className='header'>
        <div className='header__left'>
          <Logo />
          <MenuBar
            className='header__left-menubar'
            authenticated={authenticated}
          />
          {authenticated && (
            <div className='header__left-actions'>
              <MenuActions />
            </div>
          )}
        </div>
        <UserMenu authenticated={authenticated} />
      </Header>
      <Mobile authenticated={authenticated} authenticatedId={uid} />
    </Fragment>
  );
}

export default NavBar;
