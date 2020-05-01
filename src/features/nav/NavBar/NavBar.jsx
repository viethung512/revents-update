import React, { Fragment } from 'react';
import '../main.style.css';
import { Layout, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import Logo from '../Menus/Logo';
import MenuBar from '../Menus/MenuBar';
import MenuActions from '../Menus/MenuActions';
import MenuAuth from '../Menus/MenuAuth';
import { MenuOutlined } from '@ant-design/icons';
import AddEventMobile from './AddEventMobile';
import { openDrawer } from '../../drawer/drawer.actions';

const { Header } = Layout;

function NavBar(props) {
  const dispatch = useDispatch();
  const {
    profile: { isLoaded, isEmpty },
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
          {authenticated && <MenuActions className='header__left-actions' />}
        </div>
        <div className='header__right'>
          <MenuAuth className='header__right-menu-auth' />
        </div>
        <Button
          icon={<MenuOutlined />}
          className='menu-mobile'
          onClick={() => dispatch(openDrawer('MenuMobileDrawer'))}
        />
      </Header>
      <AddEventMobile
        onClick={() => dispatch(openDrawer('EventActionDrawer', { id: 12 }))}
      />
    </Fragment>
  );
}

export default NavBar;
