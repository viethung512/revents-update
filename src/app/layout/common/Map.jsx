import React from 'react';
import { EnvironmentFilled } from '@ant-design/icons';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => (
  <div>
    <EnvironmentFilled style={{ color: 'red' }} /> {text}{' '}
  </div>
);

function Map({ lat, lng }) {
  const zoom = 14;
  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyCOn_bhrgWm0Ufa3WAdJNmgOIYjPItdDhs' }}
      defaultCenter={{ lat, lng }}
      defaultZoom={zoom}
    >
      <Marker text='My Marker' lat={lat} lng={lng} />
    </GoogleMapReact>
  );
}

export default Map;
