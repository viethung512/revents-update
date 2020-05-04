import React from 'react';
import { Card, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserDetailedSidebar({ user: { id } }) {
  const authId = useSelector(state => state.firebase.auth.uid);
  return (
    <Card className='card' bodyStyle={{ padding: 12 }}>
      {authId === id ? (
        <Link to='/settings/basic'>
          <Button
            ghost
            type='primary'
            style={{ width: '100%', color: '#00b5ad', borderColor: '#00b5ad' }}
          >
            Edit profile
          </Button>
        </Link>
      ) : (
        <Button
          ghost
          type='primary'
          style={{ width: '100%', color: '#00b5ad', borderColor: '#00b5ad' }}
        >
          Follow User
        </Button>
      )}
    </Card>
  );
}

export default UserDetailedSidebar;
