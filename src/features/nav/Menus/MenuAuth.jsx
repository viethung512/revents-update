import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';
import { login } from '../../auth/auth.actions';

function MenuAuth({ className }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const firebase = useFirebase();
  const { auth, profile } = useSelector(state => state.firebase);
  const { isLoaded, isEmpty } = auth;

  const authenticated = isLoaded && !isEmpty;

  const handleLogin = () => dispatch(login());
  const handleLogout = () => {
    firebase.logout();
    history.push('/');
  };

  return (
    <Fragment>
      {authenticated ? (
        <SignedInMenu
          className={className}
          logout={handleLogout}
          profile={profile}
          auth={auth}
        />
      ) : (
        <SignedOutMenu className={className} login={handleLogin} />
      )}
    </Fragment>
  );
}

export default MenuAuth;
