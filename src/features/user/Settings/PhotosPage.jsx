import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { Card, Typography, Row, Col, Divider } from 'antd';
import DropzoneInput from '../../../app/layout/image/DropzoneInput';
import CropperInput from '../../../app/layout/image/CropperInput';
import PreviewImage from '../../../app/layout/image/PreviewImage';
import { uploadProfileImage, deletePhoto, setMainPhoto } from '../user.actions';
import PhotoItem from './PhotoItem';

const { Title } = Typography;

function PhotosPage(props) {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.async);
  const profile = useSelector(({ firebase: { profile } }) => profile);
  const auth = useSelector(({ firebase: { auth } }) => auth);
  const photos = useSelector(({ firestore: { ordered } }) =>
    ordered.photos ? ordered.photos : []
  );

  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useFirestoreConnect(() => {
    if (auth.uid) {
      return {
        collection: 'users',
        doc: auth.uid,
        subcollections: [{ collection: 'photos' }],
        storeAs: 'photos',
      };
    }
  });

  const handleUploadImage = async () => {
    await dispatch(uploadProfileImage(image, files[0].name));
    handleCancelCrop();
  };

  const handleCancelCrop = () => {
    setFiles([]);
    setImage(null);
  };

  const handleDeletePhoto = photo => {
    dispatch(deletePhoto(photo));
  };

  const handleSetMainPhoto = photo => dispatch(setMainPhoto(photo));

  const { avatarUrl = '/assets/user.png' } = profile;

  return (
    <Card className='card'>
      <Title level={3}>Your Photos</Title>
      <Divider />
      <Title level={4} style={{ fontSize: 13, color: '#00b5ad' }}>
        STEPS TO UPLOAD
      </Title>
      <Row gutter={[16, 24]}>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          <DropzoneInput setFiles={setFiles} />
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          {files.length > 0 && (
            <CropperInput setImage={setImage} imagePreview={files[0].preview} />
          )}
        </Col>
        <Col xs={24} sm={12} md={8} lg={8} xl={8}>
          {files.length > 0 && (
            <PreviewImage
              loading={loading}
              upload={handleUploadImage}
              cancel={handleCancelCrop}
            />
          )}
        </Col>
      </Row>
      <Divider />
      <Title level={4} style={{ fontSize: 13, color: '#00b5ad' }}>
        ALL PHOTOS
      </Title>
      <Row gutter={[16, 24]}>
        <Col xs={12} sm={8} md={6} lg={6} xl={4}>
          <PhotoItem src={avatarUrl} isMainPhoto={true} />
        </Col>
        {photos &&
          photos.length > 1 &&
          photos
            .filter(photo => photo.url !== avatarUrl)
            .map(photo => (
              <Col xs={12} sm={8} md={6} lg={6} xl={4} key={photo.id}>
                <PhotoItem
                  src={photo.url}
                  isMainPhoto={false}
                  deletePhoto={handleDeletePhoto}
                  setMainPhoto={handleSetMainPhoto}
                  photo={photo}
                  loading={loading}
                />
              </Col>
            ))}
      </Row>
    </Card>
  );
}

export default PhotosPage;
