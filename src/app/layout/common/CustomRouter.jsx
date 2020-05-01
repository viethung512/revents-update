import React from 'react';
import {
  NavLink as ReactRouterNavLink,
  Link as ReactRouterLink,
} from 'react-router-dom';

export const NavLink = props => (
  <ReactRouterNavLink
    style={{
      color: '#fff',
      textDecoration: 'none',
    }}
    {...props}
  >
    {props.children}
  </ReactRouterNavLink>
);

export const Link = props => (
  <ReactRouterLink
    style={{
      color: '#fff',
      textDecoration: 'none',
    }}
    {...props}
  >
    {props.children}
  </ReactRouterLink>
);
