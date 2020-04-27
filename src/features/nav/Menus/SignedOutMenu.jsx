import React from 'react';
import { Button } from 'antd';

function SignedOutMenu({ login, className }) {
  return (
    <div className={className}>
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
    </div>
  );
}

export default SignedOutMenu;
