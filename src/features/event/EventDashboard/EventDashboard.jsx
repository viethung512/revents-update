import React from 'react';
import { Col, Row } from 'antd';

import EventList from '../EventList/EventList';
import EventActivity from '../EventActivity/EventActivity';

function EventDashboard(props) {
  return (
    <div style={{ padding: 24 }}>
      <Row gutter={16}>
        <Col xs={24} sm={16} md={16} lg={16} xl={16}>
          <EventList />
        </Col>
        <Col xs={0} sm={8} md={8} lg={8} xl={8}>
          <EventActivity />
        </Col>
      </Row>
    </div>
  );
}

export default EventDashboard;
