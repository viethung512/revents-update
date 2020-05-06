import React from 'react';
import { Card, Button } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useFirestoreConnect } from 'react-redux-firebase';

function UserDetailedSidebar({ user: { id }, followUser, unFollowUser }) {
  const authId = useSelector(state => state.firebase.auth.uid);
  const loading = useSelector(state =>
    state.async.actionType === 'follow-unFollow' ? state.async.loading : null
  );
  const isFollow = useSelector(({ firestore: { ordered } }) =>
    ordered.follower ? ordered.follower.find(fl => fl.id === authId) : []
  );

  useFirestoreConnect(() => {
    if (id && authId && authId !== id) {
      return {
        collection: 'users',
        doc: id,
        subcollections: [{ collection: 'follower' }],
        storeAs: 'follower',
      };
    }
  });

  const handleToggleFollow = () => {
    if (isFollow) {
      unFollowUser();
    } else {
      followUser();
    }
  };

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
          loading={loading}
          ghost
          type='primary'
          style={{ width: '100%', color: '#00b5ad', borderColor: '#00b5ad' }}
          onClick={handleToggleFollow}
        >
          {isFollow ? 'UnFollow user' : 'Follow User'}
        </Button>
      )}
    </Card>
  );
}

export default UserDetailedSidebar;
