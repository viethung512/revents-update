import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFirebase } from 'react-redux-firebase';
import { openModal } from '../../modal/modal.actions';
import LoggedInMenu from './LoggedInMenu';
import LoggedOutMenu from './LoggedOutMenu';

function UserMenu({ authenticated, className }) {
  const dispatch = useDispatch();
  const firebase = useFirebase();
  const history = useHistory();

  const { auth, profile } = useSelector(state => state.firebase);

  const login = () => dispatch(openModal('LoginModal'));
  const register = () => dispatch(openModal('RegisterModal'));
  const logout = () => {
    firebase.logout();
    history.push('/');
  };

  return (
    <div className='user-menu'>
      {authenticated ? (
        <LoggedInMenu
          className={className}
          logout={logout}
          profile={profile}
          auth={auth}
        />
      ) : (
        <LoggedOutMenu login={login} register={register} />
      )}
    </div>
  );
}

export default UserMenu;
