import React from 'react';
import './eventdashboard.style.css';

import { Layout, Col, Row } from 'antd';
import EventList from '../EventList/EventList';
import EventActivity from '../EventActivity/EventActivity';

const { Content } = Layout;

function EventDashboard(props) {
  return (
    <Content style={{ padding: '0 50px' }}>
      <div className='layout-content'>
        <Row gutter={16}>
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            <EventList />
          </Col>
          <Col xs={0} sm={8} md={8} lg={8} xl={8}>
            <EventActivity />
          </Col>
        </Row>
      </div>
    </Content>
  );
}

export default EventDashboard;
