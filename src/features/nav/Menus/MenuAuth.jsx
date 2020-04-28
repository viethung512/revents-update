import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import { login, logout } from '../../auth/auth.actions';

function MenuAuth({ className }) {
  const dispatch = useDispatch();
  const { authenticated } = useSelector(state => state.auth);

  const handleLogin = () => dispatch(login());
  const handleLogout = () => dispatch(logout());

  return (
    <Fragment>
      {authenticated ? (
        <SignedInMenu className={className} logout={handleLogout} />
      ) : (
        <SignedOutMenu className={className} login={handleLogin} />
      )}
    </Fragment>
  );
}

export default MenuAuth;
