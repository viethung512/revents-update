import React from 'react';
import './style.css';
import { Col, Row } from 'antd';

import EventList from '../EventList/EventList';
import EventActivity from '../EventActivity/EventActivity';

function EventDashboard(props) {
  return (
    <div className='event-dashboard'>
      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <EventList />
        </Col>
        <Col xs={0} sm={0} md={0} lg={8} xl={8}>
          <EventActivity />
        </Col>
      </Row>
    </div>
  );
}

export default EventDashboard;
