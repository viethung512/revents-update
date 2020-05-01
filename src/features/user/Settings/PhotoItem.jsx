import React from 'react';
import { Card, Typography, Radio } from 'antd';
import { SwapLeftOutlined, DeleteOutlined } from '@ant-design/icons';
import LazyLoad from 'react-lazyload';

const { Title } = Typography;

const PhotoItem = ({ src, isMainPhoto, deletePhoto, photo, loading }) => {
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
        <Radio.Group style={{ width: '100%' }}>
          <Radio.Button
            value='main'
            style={{ width: '50%' }}
            className='btn btn--success'
            loading={loading}
            disabled={loading}
          >
            <SwapLeftOutlined
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Radio.Button>
          <Radio.Button
            value='delete'
            style={{ width: '50%' }}
            className='btn btn--danger'
            loading={loading}
            disabled={loading}
            onClick={() => deletePhoto(photo)}
          >
            <DeleteOutlined
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          </Radio.Button>
        </Radio.Group>
      )}
    </Card>
  );
};

export default PhotoItem;
