import React, { Fragment } from 'react';
import SignedInMenu from './SignedInMenu';
import SignedOutMenu from './SignedOutMenu';

function MenuAuth(props) {
  const { authenticated } = props
  return (
    <Fragment>
      {authenticated ? (
        <SignedInMenu {...props} />
      ) : (
          <SignedOutMenu {...props} />
        )}
    </Fragment>
  );
}

export default MenuAuth;
