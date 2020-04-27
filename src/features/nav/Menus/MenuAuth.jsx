import React, { Fragment } from 'react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

function MenuAuth({ authenticated, login, logout }) {
  return (
    <Fragment>
      {authenticated ? (
        <SignedInMenu logout={logout} />
      ) : (
        <SignedOutMenu login={login} />
      )}
    </Fragment>
  );
}

export default MenuAuth;
