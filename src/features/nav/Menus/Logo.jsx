import React from 'react';
import { NavLink } from '../../../app/layout/common/CustomRouter';

function Logo(props) {
  return (
    <NavLink to='/'>
      <img
        src='/assets/logo.png'
        alt='logo'
        style={{
          height: 40,
          marginRight: 16,
        }}
      />
      Revents
    </NavLink>
  );
}

export default Logo;
