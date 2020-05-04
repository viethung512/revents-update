import React, { useEffect } from 'react';
import './style.css';
import { useParams } from 'react-router-dom';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Row, Col } from 'antd';
import UserDetailedHeader from './UserDetailedHeader';
import UserDetailedInfo from './UserDetailedInfo';
import UserDetailedPhoto from './UserDetailedPhoto';
import UserDetailedEvent from './UserDetailedEvent';
import UserDetailedSidebar from './UserDetailedSidebar';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../../app/layout/common/Loading';
import { clearUserEvent } from '../user.actions';

function UserDetailed(props) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const user = useSelector(({ firestore: { data } }) =>
    data.user ? { ...data.user, id } : {}
  );
  const auth = useSelector(state => state.firebase.auth);
  const userPhotos = useSelector(({ firestore: { ordered } }) =>
    ordered.userPhotos ? ordered.userPhotos : []
  );
  const { user: loading } = useSelector(
    ({
      firestore: {
        status: { requesting },
      },
    }) => requesting
  );

  useFirestoreConnect({
    collection: 'users',
    doc: id,
    storeAs: 'user',
  });

  useFirestoreConnect({
    collection: 'users',
    doc: id,
    subcollections: [{ collection: 'photos' }],
    storeAs: 'userPhotos',
  });

  useEffect(() => {
    dispatch(clearUserEvent());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='user-detailed'>
      <Loading color='rgb(0, 181, 173)' loading={loading}>
        <UserDetailedHeader user={user} />
        <Row gutter={[16, 24]}>
          <Col xs={24} sm={24} md={24} lg={20} xl={20}>
            <UserDetailedInfo user={user} />
            <UserDetailedPhoto user={user} photos={userPhotos} />
            <UserDetailedEvent user={user} auth={auth} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={4} xl={4}>
            <UserDetailedSidebar user={user} />
          </Col>
        </Row>
      </Loading>
    </div>
  );
}

export default UserDetailed;
