import React from 'react';
import { Card, Typography, Button } from 'antd';
import { SwapLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';
import { useSelector } from 'react-redux';

const { Title } = Typography;

const PhotoItem = ({ src, isMainPhoto, deletePhoto, setMainPhoto, photo }) => {
  const { loading, elementName, actionType } = useSelector(
    state => state.async
  );

  const loadingDelete =
    photo && actionType === 'deletePhoto' && elementName === photo.name
      ? loading
      : null;
  const loadingSetMain =
    photo && actionType === 'setMainPhoto' && elementName === photo.name
      ? loading
      : null;

  const handleDelete = () => deletePhoto(photo);

  const handleSetMain = () => setMainPhoto(photo);

  return (
    <Card
      bordered
      cover={
        <LazyLoad
          height={300}
          placeholder={<img src='/assets/user.png' alt='user' />}
        >
          <img src={src} alt='user' />
        </LazyLoad>
      }
      bodyStyle={
        isMainPhoto
          ? { backgroundColor: '#21ba45', padding: 12 }
          : { padding: 0, display: 'flex' }
      }
    >
      {isMainPhoto ? (
        <Title
          level={4}
          style={{
            fontSize: 13,
            color: '#fff',
            textAlign: 'center',
            marginBottom: 0,
          }}
        >
          Main photo
        </Title>
      ) : (
        <div style={{ width: '100%' }}>
          <Button
            loading={loadingSetMain}
            disabled={loadingDelete}
            className='btn btn--success'
            style={{ borderRadius: 'unset', width: '50%' }}
            icon={<SwapLeftOutlined />}
            onClick={handleSetMain}
          />
          <Button
            loading={loadingDelete}
            disabled={loadingSetMain}
            className='btn btn--danger'
            onClick={handleDelete}
            style={{ borderRadius: 'unset', width: '50%' }}
            icon={<DeleteOutlined />}
          />
        </div>
      )}
    </Card>
  );
};

export default PhotoItem;
