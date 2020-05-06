import React from 'react';
import './style.css';
import { useSelector } from 'react-redux';
import { Col, Row, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import EventList from '../EventList/EventList';
import EventActivity from '../EventActivity/EventActivity';

const loadingIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function EventDashboard(props) {
  const loading = useSelector(
    ({
      firestore: {
        status: {
          requesting: { events, activities },
        },
      },
    }) => (!events && !activities ? false : true)
  );
  return (
    <div className='event-dashboard'>
      <Spin spinning={loading} indicator={loadingIcon} tip='Loading...'>
        <Row gutter={16}>
          <Col xs={24} sm={24} md={24} lg={16} xl={16}>
            <EventList />
          </Col>
          <Col xs={0} sm={0} md={0} lg={8} xl={8}>
            <EventActivity />
          </Col>
        </Row>
      </Spin>
    </div>
  );
}

export default EventDashboard;
