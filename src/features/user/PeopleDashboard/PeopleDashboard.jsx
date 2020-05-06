import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Card, List, Avatar } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function PeopleDashboard(props) {
  const authId = useSelector(state => state.firebase.auth.uid);
  const {
    following: followingLoading,
    follower: followerLoading,
  } = useSelector(
    ({
      firestore: {
        status: { requesting },
      },
    }) => requesting
  );
  const following = useSelector(
    ({ firestore: { ordered } }) => ordered.following
  );
  const follower = useSelector(
    ({ firestore: { ordered } }) => ordered.follower
  );

  useFirestoreConnect(() => {
    if (authId) {
      return {
        collection: 'users',
        doc: authId,
        subcollections: [{ collection: 'following' }],
        storeAs: 'following',
      };
    }
  });

  useFirestoreConnect(() => {
    if (authId) {
      return {
        collection: 'users',
        doc: authId,
        subcollections: [{ collection: 'follower' }],
        storeAs: 'follower',
      };
    }
  });

  return (
    <div className='people-dashboard'>
      <Card className='card' title='People following me'>
        <List
          loading={{ spinning: followerLoading, indicator: loadingIcon }}
          grid={{
            gutter: [12, 16],
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 8,
          }}
          dataSource={follower}
          renderItem={({ id, avatarUrl, displayName, city }) => (
            <List.Item>
              <Link to={`/profile/${id}`}>
                <Card
                  cover={
                    <Avatar
                      src={avatarUrl}
                      shape='square'
                      style={{ width: '100%', height: 'auto' }}
                    />
                  }
                >
                  <Card.Meta title={displayName} description={city} />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </Card>

      <Card className='card' title='People I am following'>
        <List
          loading={{ spinning: followingLoading, indicator: loadingIcon }}
          grid={{
            gutter: [12, 16],
            xs: 1,
            sm: 2,
            md: 4,
            lg: 4,
            xl: 6,
            xxl: 8,
          }}
          dataSource={following}
          renderItem={({ id, displayName, city, avatarUrl }) => (
            <List.Item>
              <Link to={`/profile/${id}`}>
                <Card
                  hoverable
                  bordered
                  cover={
                    <Avatar
                      src={avatarUrl}
                      shape='square'
                      style={{ width: '100%', height: 'auto' }}
                    />
                  }
                >
                  <Card.Meta title={displayName} description={city} />
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
}

export default PeopleDashboard;
