import React, { Fragment, useState } from 'react';
import { Card, Typography, List, Button } from 'antd';
import {
  InfoOutlined,
  CalendarFilled,
  EnvironmentFilled,
} from '@ant-design/icons';
import Map from '../../../app/layout/common/Map';
import { formatEventDate } from '../../../app/util/helper';

const { Text } = Typography;

const getEventInfoData = (date, description, venue) => {
  return [
    {
      label: description,
      icon: <InfoOutlined />,
    },
    {
      label: date ? <span>{formatEventDate(date)}</span> : '',
      icon: <CalendarFilled />,
    },
    {
      label: venue,
      icon: <EnvironmentFilled />,
    },
  ];
};

function EventDetailedInfo({ className, event }) {
  const [isShowMap, setIsShowMap] = useState(false);
  const { description, date, venue, venueLatLng } = event;

  const handleToggleMap = () => setIsShowMap(!isShowMap);

  const data = getEventInfoData(date, description, venue);

  return (
    <Card className={className}>
      <List
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item, index) => (
          <List.Item className='event-detailed__info-item'>
            <Text className='event-detailed__info-item-text'>{item.icon}</Text>
            <Text>{item.label}</Text>
            {index === data.length - 1 && (
              <Fragment>
                <Button
                  className='btn btn--primary'
                  style={{ marginLeft: 'auto', marginRight: 24 }}
                  onClick={handleToggleMap}
                >
                  {isShowMap ? 'Hide Map' : 'Show Map'}
                </Button>
              </Fragment>
            )}
          </List.Item>
        )}
      />
      {isShowMap && venueLatLng && (
        <div style={{ height: 300, width: '100%' }}>
          <Map lat={venueLatLng.lat} lng={venueLatLng.lng} />
        </div>
      )}
    </Card>
  );
}

export default EventDetailedInfo;
