import React, { Fragment } from 'react';
import { Button } from 'antd';

function SignedOutMenu({ login }) {
  return (
    <Fragment>
      <Button
        size='large'
        className='btn'
        style={{ marginRight: 16 }}
        onClick={login}
      >
        Login
      </Button>
      <Button size='large' className='btn'>
        Register
      </Button>
    </Fragment>
  );
}

export default SignedOutMenu;
