import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'antd';
import { openModal } from '../../modal/modal.actions';

function SignedOutMenu({ login, className }) {
  const dispatch = useDispatch();

  return (
    <div className={className}>
      <Button
        size='large'
        className='btn'
        style={{ marginRight: 16 }}
        // onClick={login}
        onClick={() => dispatch(openModal('LoginModal'))}
      >
        Login
      </Button>
      <Button
        size='large'
        className='btn'
        onClick={() => dispatch(openModal('RegisterModal'))}
      >
        Register
      </Button>
    </div>
  );
}

export default SignedOutMenu;
